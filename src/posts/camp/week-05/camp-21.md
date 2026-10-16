---
date: 2026-07-27
category:
  - Camp
  - Unreal
order: 2
---

# 캠프 21일차

## 프로그래머스 코테 연습

<programmers-coding :test-id="12948">

::: tabs

@tab replace

```cpp
#include <string>

using namespace std;

string solution(string pn) {
    string answer = pn.replace(0, pn.size() - 4, pn.size() - 4, '*');

    return answer;
}
```

@tab 문자열 마스킹

```cpp
#include <string>

using namespace std;

string solution(string pn) {
    string answer = "";
    string hidden(pn.size() - 4 , '*');
    string last_num  = pn.substr(pn.size() - 4, 4);
    answer = hidden.append(last_num);
    return answer;
}
```

:::

</programmers-coding>

## 객체지향 4대 원칙

각 원칙을 "어떤 코드가 부족한가"를 직접 찾고 고치는 방식으로 하나씩 확인했다.

### 캡슐화 (Encapsulation)

시작 코드는 `damage`, `durability`가 `public`이라 외부에서 아무 값이나 대입할 수 있었다 (`sword.durability = -9999;`처럼). 캡슐화는 **클래스 내부 데이터를 외부가 함부로 건드리지 못하게 막고, 값의 유효성은 클래스 스스로 책임지는 것**이다.

```cpp
class Weapon
{
  private:
    int damage;
    int durability;

  public:
    Weapon(int damage, int durability) : damage(damage), durability(durability) {}

    void Attack()
    {
        if (durability > 0)
        {
            durability -= 1;
            std::cout << damage << " 데미지!" << std::endl;
        }
        else
        {
            std::cout << "더 이상 공격 할 수 없습니다." << std::endl;
        }
    }

    void SetDamage(int newDamage)
    {
        if (newDamage > 0) damage = newDamage;
        else std::cout << "데미지는 0 이하일 수 없습니다." << std::endl;
    }
};
```

여기서 두 가지를 놓치기 쉬웠다.

- `private`으로만 막으면 끝이 아니라, **클래스 내부 로직도 스스로 검증해야 한다.** 처음엔 `Attack()` 안에서 `durability -= 1;`을 검증 없이 실행해서, `Setter`의 유효성 검사를 우회해 `durability`가 마이너스로 계속 내려가는 문제가 있었다. `Attack()` 안에도 `durability > 0` 체크를 넣어야 진짜로 "항상 유효한 상태"가 보장된다.
- 멤버를 생성자에서 초기화하지 않으면, `Setter` 호출 전까지 쓰레기값 상태로 쓰일 수 있다. 생성자 초기화 리스트로 값이 없는 객체 자체를 만들 수 없게 강제하는 게 안전하다.

### 상속 (Inheritance)

`Dog`, `Cat`처럼 겉보기엔 다른 클래스가 `name`, `hp`, `Move()`, `TakeDamage()` 같은 코드를 토씨 하나 안 틀리고 중복해서 갖고 있는 게 상속이 빠진 신호다. 공통 부분을 부모 클래스로 뽑아낸다.

```cpp
class Animal
{
  private:
    std::string name;
    int hp;

  public:
    Animal(std::string name, int hp) : name(name), hp(hp) {}

    virtual ~Animal() {}

    void TakeDamage(int amount)
    {
        hp -= amount;
        std::cout << name << " 현재 체력: " << hp << std::endl;
    }

    virtual void Move() {}
};

class Dog : public Animal
{
  public:
    Dog(std::string name, int hp) : Animal(name, hp) {}
    void Move() override { std::cout << "네 발로 달립니다." << std::endl; }
    void Bark() { std::cout << "개가 짖습니다." << std::endl; }
};
```

`TakeDamage`처럼 모든 동물이 동일하게 동작하는 기능은 부모(`Animal`)에 한 번만 작성하고, `Move()`처럼 동물마다 다르게 동작해야 하는 기능은 `virtual`로 선언해서 자식이 각자 오버라이드하게 한다.

**소멸자를 잊기 쉽다.** `Move()`를 `virtual`로 선언했다는 건 이 클래스가 포인터/참조로 다형적으로 쓰일 거라는 뜻인데, 소멸자가 `virtual`이 아니면 `Animal*`로 `Dog`를 가리키다 `delete`할 때 `Dog`의 소멸자가 호출되지 않아 메모리가 샐 수 있다. **클래스에 `virtual` 함수가 하나라도 있으면 소멸자도 반드시 `virtual`로 선언해야 한다.**

```cpp
virtual ~Animal() {}
```

### 다형성 (Polymorphism)

`virtual`로 선언해뒀다고 저절로 다형성이 증명되는 건 아니고, **실제 타입이 아니라 부모 타입의 포인터/참조로 다뤘을 때, 그 안의 진짜 타입에 맞는 함수가 런타임에 자동으로 선택되는 것**을 직접 확인해야 체감이 된다.

```cpp
std::vector<Animal *> animals = {
    new Dog("개1", 30), new Bird("새1", 20),
    new Dog("개2", 50), new Bird("새2", 40)};

for (Animal *animal : animals)
{
    animal->Move();  // if문으로 Dog인지 Bird인지 구분하지 않았는데도 각자 알맞게 동작
    delete animal;   // virtual 소멸자 덕분에 실제 타입의 소멸자까지 정상 호출됨
}
```

`animal`의 정적 타입은 전부 `Animal*`이지만, `Move()`를 호출하면 그 포인터가 진짜로 가리키는 객체가 `Dog`인지 `Bird`인지에 따라 다른 코드가 실행된다(동적 바인딩). `if (dynamic_cast<Dog*>(animal))` 같은 타입 분기 없이 하나의 반복문으로 여러 타입을 다루는 게 다형성의 핵심 가치다.

### 추상화 (Abstraction)

`Animal`은 그 자체로 존재해선 안 되는 개념이다 ("동물"이라는 것 자체는 구체적인 실체가 아니다). 이걸 강제하려면 **순수 가상 함수(pure virtual function, `= 0`)**를 쓴다.

```cpp
class Animal
{
  public:
    virtual void Move() = 0;
    virtual void Attack(Animal *target) = 0;
    // Animal a("동물", 10); 처럼 직접 생성하면 컴파일 에러
};

class Dog : public Animal
{
  public:
    void Attack(Animal *target) override
    {
        std::cout << GetName() << "이 " << target->GetName() << "을 물어뜯습니다." << std::endl;
        target->TakeDamage(GetDamage());
    }
    void Move() override { std::cout << "네 발로 달립니다." << std::endl; }
};
```

`Animal`은 "동물은 움직일 수 있고 공격할 수 있다"는 **규약(인터페이스)만 정의**하고, "어떻게"는 전혀 모르는 채로 둔다. 자식 클래스가 그 방법을 채우지 않으면 컴파일이 안 되므로, 구현을 빠뜨리는 게 원천적으로 불가능해진다. 구현 세부사항은 숨기고 "무엇을 할 수 있는가"만 노출하는 게 추상화다.

::: tip virtual, override, `= 0`을 역할별로 정리
헷갈리기 쉬운 세 키워드를 표로 정리하면:

| 키워드 | 역할 |
|---|---|
| `virtual` (일반, 몸체 있음) | 다형성 활성화 — 실제 타입에 맞는 함수가 런타임에 선택됨 |
| `virtual ... = 0` (순수 가상) | 추상화 — 구현 없이 규약만 강제, 클래스를 추상 클래스로 만듦 (인스턴스화 불가) |
| `override` | 오버라이드 실수 방지용 컴파일 타임 체크. 개념 자체와는 무관하고 안전장치일 뿐 |

`virtual`이라는 하나의 키워드가 몸체가 있으면 다형성의 토대가 되고, `= 0`이 붙으면 추상화의 토대가 된다. `Move()`가 `Animal`에서 `= 0`으로 정의된 건 추상화 쪽이고, 그걸 `Dog`/`Bird`가 구현한 뒤 `Animal*`로 호출하는 순간(`animal->Move()`)이 다형성이 실제로 발현되는 지점이다. 둘은 협력 관계지 딱 나눠지는 게 아니다.

또 하나 주의할 점: **소멸자를 순수 가상으로 만들 필요는 없다.** `virtual ~Animal() = 0;`처럼 쓰면 컴파일은 되지만, 소멸자는 자식→부모로 항상 체인 호출되기 때문에 본문이 없으면 **링크 에러**가 난다(`undefined reference`). 추상 클래스를 만드는 목적은 이미 `Move()`, `Attack()`을 순수 가상으로 만들면서 달성됐으므로, 소멸자는 그냥 `virtual ~Animal() {}`로 충분하다.
:::

## Rule of Three / Rule of Five

**Rule of Three (C++98/03)**: 소멸자, 복사 생성자, 복사 대입 연산자 중 **하나라도** 직접 작성해야 한다면 나머지 둘도 거의 확실히 같이 작성해야 한다. 이 셋 중 하나가 필요하다는 건 보통 raw pointer 같은 리소스를 직접 관리하고 있다는 신호이고, 그럼 나머지도 얕은 복사로는 해결이 안 되기 때문이다.

**Rule of Five (C++11~)**: C++11에서 이동 시맨틱(`&&`, `std::move`)이 추가되면서 두 개가 더 늘었다 — 이동 생성자, 이동 대입 연산자. 위 3개 중 하나라도 필요하다면 이 2개도 같이 고려해야 한다. 없어도 동작은 하지만(이동 대신 복사로 대체됨), 이동이 줄 수 있는 성능 이점을 놓친다.

대입 연산자(`operator=`)까지 포함해서 직접 5개를 전부 작성하는 연습을 `IntArray`(동적 int 배열을 관리하는 클래스)로 해봤다.

```cpp
class IntArray
{
  private:
    int *arr;
    int size;

  public:
    IntArray(int size) : arr(new int[size]), size(size) {}

    ~IntArray() { delete[] arr; }

    IntArray(const IntArray &other) : arr(new int[other.size]), size(other.size)
    {
        for (int i = 0; i < size; i++) arr[i] = other.arr[i];
    }

    IntArray &operator=(const IntArray &other)
    {
        if (this == &other) return *this;   // 자기 대입 방지

        delete[] arr;                        // 기존 메모리 먼저 해제 (메모리 누수 방지)
        size = other.size;
        arr = new int[size];
        for (int i = 0; i < size; i++) arr[i] = other.arr[i];

        return *this;                        // *this 반환 -> 연쇄 대입(a = b = c) 가능
    }

    IntArray(IntArray &&other) : arr(other.arr), size(other.size)
    {
        other.arr = nullptr;
    }

    IntArray &operator=(IntArray &&other)
    {
        if (this == &other) return *this;

        delete[] arr;
        arr = other.arr;
        size = other.size;
        other.arr = nullptr;

        return *this;
    }
};
```

처음 작성했을 때 놓쳤던 부분들:

- **`operator=`는 값이 아니라 `클래스타입&`을 반환해야 한다.** 값으로 반환하면 불필요한 복사가 한 번 더 생기고, `a = b = c;` 같은 연쇄 대입도 안 된다. `return *this;`로 참조를 반환하는 게 정석이다.
- **대입 연산자는 기존 메모리를 먼저 해제해야 한다.** `a = b;`를 실행할 때 `a`가 원래 갖고 있던 메모리를 `delete`하지 않고 그냥 새 값으로 덮어쓰면, 원래 메모리는 아무도 해제하지 못하는 메모리 누수가 된다.
- **자기 자신을 대입하는 경우(`a = a;`)를 방어해야 한다.** 방어 코드 없이 `delete[] arr;`부터 실행하면, `other`와 `this`가 같은 객체일 때 정작 복사해야 할 원본 데이터까지 먼저 지워버리는 사고가 날 수 있다.
- **복사 생성자도 배열 전체를 원소 단위로 복사해야 한다.** `new int(*other.arr)`처럼 배열이 아니라 `int` 하나만 할당하면, `new`(단일 객체)와 소멸자의 `delete[]`(배열)가 짝이 안 맞아 undefined behavior가 되고, 크기가 2 이상인 배열의 나머지 원소도 통째로 유실된다.

::: tip Rule of Zero
요즘 실무 트렌드는 오히려 이 5개 중 아무것도 직접 안 쓰는 것이다. `char*` 같은 raw pointer 대신 `std::string`, `std::vector`, `std::unique_ptr`을 멤버로 쓰면, 그 타입들이 이미 자기 자신의 복사/이동/소멸을 올바르게 구현해뒀기 때문에 컴파일러가 자동 생성하는 기본 버전만으로 5개 전부가 저절로 맞게 동작한다. Rule of Five는 "직접 관리해야 하는 리소스가 있을 때"를 위한 규칙이고, 애초에 그런 리소스를 raw pointer로 직접 들지 않도록 설계하는 게 가장 좋은 선택이다.

실무에서 5개를 직접 다 쓰는 일은 드물지만, 그래도 알아둬야 하는 이유는: (1) 언리얼 엔진처럼 자체 리소스 관리 클래스를 직접 만들어야 할 때가 있고, (2) `std::vector`, `std::string`이 내부적으로 정확히 이 5개를 구현한 클래스이므로 "왜 안전한지"를 이해하는 기반이 되고, (3) 코드 리뷰나 디버깅 중 "왜 이 클래스가 이상하게 복사/소멸되지"를 판단하는 근거가 된다는 점이다.
:::

### 소멸자를 꼭 정의해야 하는가

안 만들면 컴파일러가 기본 소멸자를 자동으로 만들어준다. 다만 "언제 안 만들어도 되는지"는 멤버 구성에 달려 있다.

- **`int`, `std::string`, `std::vector` 등 자체 관리 타입만 멤버로 있을 때**: 소멸자를 안 써도 된다. 기본 소멸자가 각 멤버의 소멸자를 순서대로 호출해주고, 그 멤버들이 알아서 자기 리소스를 정리한다. (위 Rule of Zero와 같은 이야기)
- **raw pointer로 힙 메모리를 직접 소유할 때**: 반드시 직접 작성해서 `delete`/`delete[]`해야 한다.
- **`virtual` 함수가 있는 부모 클래스일 때**: 몸체가 비어있어도(`virtual ~Animal() {}`) `virtual` 키워드는 반드시 붙여야 한다. 안 그러면 부모 포인터로 자식을 `delete`할 때 자식 소멸자가 호출 안 되는 문제가 생긴다 ([[상속]] 참고).

### raw pointer가 있으면 5개 모두에 "결정"이 필요하다

여기서 헷갈렸던 부분: raw pointer 멤버가 있다고 5개를 전부 "직접 구현"해야만 하는 건 아니다. 정확히는, **5개 각각에 대해 어떻게 할지 명시적으로 정해야 한다**는 뜻이고, 그 결정이 항상 "깊은 복사 구현하기"일 필요는 없다.

**옵션 1: 전부 구현 (복사도 이동도 허용)** — 지금까지 `IntArray`로 연습한 방식. `std::vector`, `std::string`처럼 여러 곳에서 자유롭게 복제해서 써도 되는 리소스일 때.

**옵션 2: 복사는 막고 이동만 허용 (move-only 타입)**

```cpp
class IntArray
{
    int *arr;
  public:
    ~IntArray() { delete[] arr; }

    IntArray(const IntArray &other) = delete;             // 복사 생성자 금지
    IntArray &operator=(const IntArray &other) = delete;  // 복사 대입 금지

    IntArray(IntArray &&other) { /* 소유권 이전 */ }
    IntArray &operator=(IntArray &&other) { /* 소유권 이전 */ }
};
```

`std::unique_ptr`이 정확히 이 패턴이다. "소유자는 항상 하나뿐이어야 한다, 복사는 말이 안 되지만 소유권을 넘기는 건 괜찮다"는 의미일 때 쓴다.

**옵션 3: 복사도 이동도 둘 다 금지**

```cpp
class Mutex
{
    void *handle;
  public:
    ~Mutex() { /* 잠금 해제 */ }
    Mutex(const Mutex &) = delete;
    Mutex &operator=(const Mutex &) = delete;
    Mutex(Mutex &&) = delete;
    Mutex &operator=(Mutex &&) = delete;
};
```

뮤텍스나 파일 핸들처럼, 객체가 있는 위치 자체가 의미를 가져서 복제도 이동도 둘 다 말이 안 되는 리소스라면 전부 막는다.

**왜 "결정"이 반드시 필요한가.** raw pointer 멤버가 있는 상태에서 소멸자만 직접 정의하고 복사 생성자를 안 건드리면, 컴파일러가 자동 생성한 기본 복사 생성자(얕은 복사)가 그대로 살아있게 된다. 그럼 아무도 의도하지 않은 이중 해제 버그가 조용히 숨어있는 채로 컴파일이 통과돼버린다. `= delete`로 명시적으로 막는 것도 "5개에 대한 결정"에 포함되므로, raw pointer로 리소스를 소유하는 순간 5개 전부에 대해 최소한 "구현할지, 막을지"는 명시적으로 정해야 안전하다. 아무 결정도 안 내리는 것(컴파일러 기본값에 그냥 맡기는 것) 자체가 가장 위험한 선택이다.

## 연산자 오버로딩

연산자(`+`, `-`, `*`, `==`, `<<` 등)를 직접 만든 클래스에서도 쓸 수 있게 만드는 것. `Vector2D`(x, y를 가진 2차원 벡터)로 연습했다.

```cpp
class Vector2D
{
  private:
    float x, y;

  public:
    Vector2D(float x = 0.0f, float y = 0.0f) : x(x), y(y) {}
    float GetX() const { return x; }
    float GetY() const { return y; }

    Vector2D operator+(const Vector2D &other) const
    {
        return Vector2D(x + other.x, y + other.y);
    }

    Vector2D operator*(float scalar) const
    {
        return Vector2D(x * scalar, y * scalar);
    }

    Vector2D &operator+=(const Vector2D &other)
    {
        x += other.x;
        y += other.y;
        return *this;
    }

    bool operator==(const Vector2D &other) const
    {
        return x == other.x && y == other.y;
    }
};
```

`+`, `-`, `*(스칼라)`, `==`처럼 **왼쪽 피연산자가 항상 이 클래스 자기 자신인 연산**은 멤버 함수로 자연스럽게 만들 수 있다.

### 멤버로 못 만드는 연산자는 전역 함수로

```cpp
// std::cout << vector; 를 지원하려면
std::ostream &operator<<(std::ostream &os, const Vector2D &v)
{
    os << "(" << v.GetX() << ", " << v.GetY() << ")";
    return os;
}

// 2.0f * vector; 처럼 스칼라가 왼쪽에 오는 경우
Vector2D operator*(float scalar, const Vector2D &v) { return v * scalar; }
```

`operator<<`를 멤버 함수로 만들면 왼쪽 피연산자가 무조건 `Vector2D`여야 하는데, `std::cout << vector;`는 왼쪽 피연산자가 `std::ostream`(`cout`)이라 순서가 안 맞는다. `2.0f * vector`도 마찬가지로 `float`에는 멤버 함수를 추가할 수 없다. 이런 "왼쪽 피연산자가 이 클래스가 아닌 경우"는 클래스 밖의 전역(비멤버) 함수로 정의해야 한다. 이때 `private` 멤버에 접근해야 한다면 클래스 안에 `friend` 선언이 필요하지만, 지금처럼 `GetX()`/`GetY()`가 `public`이면 그걸 통해 접근하면 되므로 `friend` 없이도 된다.

## 템플릿

같은 로직을 타입만 다르게 여러 번 반복해서 작성하지 않도록, 타입 자체를 매개변수로 넘길 수 있게 하는 기능이다.

### 함수 템플릿

```cpp
template <typename T>
T Max(T a, T b)
{
    return (a > b) ? a : b;
}

Max(3, 7);        // T = int로 자동 추론
Max(3.5, 1.2);     // T = double로 자동 추론
Max<int>(3, 7);    // 타입을 명시적으로 지정도 가능
```

`typename T`는 "T라는 이름의 타입 자리를 하나 만든다"는 뜻이고, 실제 호출 시점에 넘긴 인자의 타입을 보고 컴파일러가 `T`를 채워 넣는다(템플릿 인자 추론). `int`용, `double`용 함수를 따로 작성할 필요가 없다.

### 템플릿 특수화

일반 템플릿 로직이 특정 타입에는 안 맞을 때, 그 타입 전용 버전을 따로 정의할 수 있다.

```cpp
// Vector2D는 operator>가 없어서 위 일반 템플릿을 그대로 못 씀
template <>
Vector2D Max<Vector2D>(Vector2D a, Vector2D b)
{
    float lenA = a.GetX() * a.GetX() + a.GetY() * a.GetY();
    float lenB = b.GetX() * b.GetX() + b.GetY() * b.GetY();
    return (lenA > lenB) ? a : b;  // 길이(크기)가 더 큰 벡터를 반환
}
```

### 클래스 템플릿

함수뿐 아니라 클래스 전체도 템플릿으로 만들 수 있다. 앞서 만든 `IntArray`(Rule of Five 포함)를 `int` 전용에서 아무 타입 `T`로 일반화하면:

```cpp
template <typename T>
class Array
{
  private:
    T *arr;
    int size;

  public:
    Array(int size) : arr(new T[size]), size(size) {}
    ~Array() { delete[] arr; }

    Array(const Array &other) : arr(new T[other.size]), size(other.size)
    {
        for (int i = 0; i < size; i++) arr[i] = other.arr[i];
    }

    // 복사 대입, 이동 생성자, 이동 대입도 동일한 구조로 T만 바뀐 채 그대로 작성

    T &operator[](int index) { return arr[index]; }
};

Array<int> intArr(3);
intArr[0] = 10;

Array<std::string> strArr(2);   // 같은 클래스 하나가 완전히 다른 타입에도 그대로 재사용됨
strArr[0] = "안녕";
```

`Array<int>`, `Array<std::string>`처럼 같은 코드 한 벌이 서로 다른 타입에 대해 각각 별도로 컴파일되어(템플릿 인스턴스화) 동작한다. `std::vector<T>`가 표준 라이브러리 내부에서 정확히 이런 구조로 만들어져 있다고 생각하면 된다. 지금까지 라이브러리를 "사용"만 해왔는데, 그 라이브러리가 내부적으로 Rule of Five + 템플릿을 조합해서 만들어졌다는 걸 직접 만들어보며 이해했다.