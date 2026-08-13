---
date: 2026-08-10
category:
  - Cpp
order: 3
---

# 클래스와 캡슐화

## 클래스 정의와 접근 제어자

C++에서 클래스는 객체 지향 프로그래밍의 핵심 개념으로, 속성(데이터)과 행동(함수)을 하나로 묶어 표현하는 도구다. 클래스는 객체를 만들기 위한 `설계도`이며, 객체가 가져야 할 속성과 행동을 정의해 놓은 틀이다. 클래스 자체는 실체가 아니고, 클래스를 기반으로 객체가 생성되어야 프로그램 안에서 실제로 동작한다.

자동차로 비유하면, 자동차는 바퀴 4개, 엔진 1개, 핸들 1개를 가진다는 `속성`과 빠르게 달릴 수 있고 멈출 수도 있다는 `행동`이 정의된 설계도(클래스)가 있고, 이 설계도로 만들어진 자동차가 `객체`다.

- `멤버 함수`: 행동(동작)을 정의한다. 보통 외부에서도 접근하게 하는 경우가 많다.
- `멤버 변수`: 세부 데이터를 관리한다. 보통 외부에서 접근하지 못하게 감춘다.

필요한 동작만 공개하고 세부 데이터는 숨기는 방식이 데이터 보호와 재사용성을 높여 유지보수를 쉽게 만든다. 이를 `캡슐화`라고 하며 객체 지향 프로그래밍의 핵심 원칙 중 하나다.

### 접근 지정자

클래스의 멤버 함수나 멤버 변수에 접근할 때는 객체 뒤에 멤버 접근 연산자 `.`를 사용한다. C++의 접근 지정자는 `public`, `private`, `protected` 세 가지가 있으며, 명시하지 않으면 `private`로 설정된다.

- **public**: 모든 코드에서 접근 가능. 클래스의 인터페이스 역할을 담당한다. 예: 외부에서 호출할 수 있는 메서드.
- **protected**: 같은 클래스와 파생 클래스(상속받은)에서만 접근 가능. 외부에서는 접근 불가. 예: 상속 구조에서 자식 클래스가 부모의 내부 기능을 활용할 때.
- **private**: 같은 클래스 내부와 friend 함수/클래스에서만 접근 가능. 외부 및 파생 클래스에서는 접근 불가. 예: 내부 데이터(멤버 변수)를 보호할 때.

```cpp
class Base {
  public:
    int pubVar;        // 어디서든 접근 가능
  protected:
    int protVar;       // 파생 클래스에서 접근 가능
  private:
    int privVar;       // 클래스 내부에서만 접근 가능
};

class Derived : public Base {
  public:
    void test() {
      pubVar = 1;    // OK
      protVar = 2;   // OK (상속받았으므로 접근 가능)
      // privVar = 3; // ERROR (private은 접근 불가)
    }
};

int main() {
  Base b;
  b.pubVar = 10;     // OK
  // b.protVar = 20; // ERROR
  // b.privVar = 30; // ERROR
}
```

### getter, setter

`private` 멤버 변수를 제어하기 위해 `getter`와 `setter`를 사용한다. 멤버 변수를 바꿀 때 `setter`를, 값을 가져올 때 `getter`를 사용하면 변수를 직접 노출하지 않고 데이터를 안전하게 다룰 수 있다.

::: tip

- 꼭 모든 멤버 변수를 private로 해야 하는 것은 아니지만, 정보 은닉을 위해 기본적으로 private에 두는 것이 좋다.
- 멤버 함수도 항상 public일 필요는 없다. 클래스 내부에서만 쓰이는 보조 함수는 private로 둘 수 있다.
- 외부에서 멤버 변수에 접근해야 할 경우, getter/setter 함수를 만들어 안전하게 접근하도록 한다.

:::

### struct와 class

구조체(`struct`)는 서로 관련 있는 여러 데이터(멤버 변수)를 하나의 타입으로 묶어서 다루기 위한 사용자 정의 타입이다. C에서는 데이터만 묶는 용도로 사용하고 함수·생성자를 가질 수 없지만, C++에서는 class와 거의 동일하게 동작하며 멤버 함수, 생성자, 접근 제어자, 상속까지 모두 지원한다.

struct와 class의 기능적 차이는 딱 하나, **기본 접근 제어자**뿐이다.

```cpp
struct Point {
    int x; // 기본 public
    int y;
};

class PointClass {
    int x; // 기본 private
    int y;
};

Point p;
p.x = 10; // OK: struct 멤버는 기본 public

PointClass pc;
pc.x = 10; // 컴파일 에러: private 멤버 접근 불가
```

- struct 멤버/상속의 기본 접근 지정자는 `public`
- class 멤버/상속의 기본 접근 지정자는 `private`
- 관례적으로 데이터 위주(POD, Plain Old Data)의 단순한 구조에는 struct를, 캡슐화와 동작(메서드)이 중요한 경우에는 class를 사용한다.

**초기화 방법**

```cpp
struct Student {
    string name;
    double score;
};

// 1. 집합 초기화 (Aggregate Initialization)
Student s1 = { "Alice", 95.5 };

// 2. 멤버 이름을 지정하는 지정 초기화 (C++20)
Student s2 = { .name = "Bob", .score = 88.0 };

// 3. 생성자를 직접 정의해서 초기화
struct Point {
    int x, y;
    Point(int x, int y) : x(x), y(y) {}
};
Point p(1, 2);
```

생성자, 가상 함수, `private` 멤버가 없는 struct는 "집합체(Aggregate)"로 취급되어 `{}`를 이용한 초기화가 가능하다. 생성자를 직접 정의하면 더 이상 집합체가 아니게 되어 반드시 생성자를 통해서만 초기화해야 한다.

구조체는 멤버로 다른 구조체(혹은 클래스)를 포함할 수도 있다.

```cpp
struct Address {
    string city;
    string street;
};

struct Student {
    string name;
    Address address; // 구조체 안에 다른 구조체를 멤버로 포함 가능
};

Student s;
s.name = "Alice";
s.address.city = "Seoul";
s.address.street = "Gangnam";
```

## 생성자와 소멸자

### 생성자

생성자는 객체를 생성할 때마다 한 번씩 자동으로 호출되는 특별한 멤버 함수다. 보통 필요한 멤버 변수를 초기화하거나 객체가 동작할 준비를 하기 위해 사용한다. 생성자는 반환형을 명시하지 않으며, class 이름과 동일한 이름을 가진 함수로 정의된다. 정의된 class를 변수로 선언하면 메모리에 올라간 객체가 되는데, 이를 인스턴스화라고 한다. 객체가 생성될 때 멤버 변수를 포함해 필요한 정보들이 메모리에 올라간 뒤 생성자가 호출된다.

```cpp
class Person {
private:
    string name;
    int age;

public:
    void introduce() {
        cout << "이름: " << name << ", 나이: " << age << endl;
    }
    int getName() { return name; }
    int getAge() { return age; }
    void setName(string newName) { name = newName; }
    void setAge(int newAge) { if (newAge > 0) age = newAge; }
};

int main() {
  // public에 생성자가 없어도 기본적으로 생성을 해준다.
  Person p1;

  p1.setName("형래");
  p1.setAge(30);
  p1.introduce();

  cout << "나이만 따로 출력: " << p1.getAge() << endl;
  return 0;
}
```

매개변수와 기본값을 가진 생성자도 정의할 수 있다.

```cpp
class Person {
private:
    string name;
    int age;

public:
    // 기본 매개변수가 있는 생성자
    // 선언만 하고 정의하지 않으면 에러 발생
    Person(string n = "김형래", int a = 29) {
      name = n;
      age = a;
    }
    // ...
};

int main() {
  Person p1;           // 생성자의 기본값을 사용해 객체 생성
  Person p2("형래", 30); // 생성자에 값을 지정하여 객체 생성
  // 생성자에 기본값이 없는데 인자를 충분히 넘겨주지 않으면 에러가 발생한다.
}
```

### 소멸자

소멸자는 객체가 수명을 다했을 때 자동으로 호출되는 특별한 함수로, 객체가 사라질 때 마지막으로 실행되는 정리(clean-up) 코드다. C++은 메모리 관리가 자동이 아니라서 `new`로 할당한 메모리는 반드시 `delete`로 해제해야 하는데, 소멸자를 잘 활용하면 객체가 사라질 때 자동으로 정리되므로 메모리 누수(memory leak)를 막을 수 있다.

클래스 이름 앞에 `~`를 붙여서 정의하며, 객체가 스코프를 벗어나거나 `delete`로 메모리를 해제할 때 자동으로 실행된다. 주로 동적 메모리 해제, 파일 닫기, 리소스 반환 같은 정리 작업을 담당한다.

```cpp
class MyClass {
public:
    ~MyClass() {
        std::cout << "소멸자 호출!" << std::endl;
    }
};
```

**소멸자를 꼭 정의해야 하는가.** 안 만들면 컴파일러가 기본 소멸자를 자동으로 만들어준다. 언제 안 만들어도 되는지는 멤버 구성에 달려 있다.

- `int`, `std::string`, `std::vector` 등 자체 관리 타입만 멤버로 있을 때는 소멸자를 안 써도 된다. 기본 소멸자가 각 멤버의 소멸자를 순서대로 호출해주고, 그 멤버들이 알아서 자기 리소스를 정리한다.
- raw pointer로 힙 메모리를 직접 소유할 때는 반드시 직접 작성해서 `delete`/`delete[]`해야 한다.
- `virtual` 함수가 있는 부모 클래스일 때는 몸체가 비어있어도(`virtual ~Animal() {}`) `virtual` 키워드는 반드시 붙여야 한다. 안 그러면 부모 포인터로 자식을 `delete`할 때 자식 소멸자가 호출되지 않는 문제가 생긴다(상속과 다형성 문서 참고).

## this 포인터와 초기화 리스트

### this 포인터

생성자 본문의 `hp = hp;`는 왼쪽/오른쪽 둘 다 "표현식" 자리라서 스코프 규칙이 그대로 적용된다. 함수 매개변수는 클래스 멤버보다 더 안쪽 스코프라 이름이 겹치면 매개변수가 멤버를 가려버린다(shadowing). 그래서 `hp = hp;`는 매개변수를 자기 자신에 대입하는 의미 없는 코드가 되고, 멤버는 손도 못 댄다. `this->hp`로 "멤버 쪽"이라고 명시해야 진짜로 멤버가 바뀐다.

```cpp
class Monster
{
    int hp;

  public:
    Monster(int hp)
    {
        this->hp = hp; // 매개변수 hp와 멤버 hp 이름이 같아서, this->hp로 멤버 쪽을 명시함
    }

    Monster &SetHP(int hp)
    {
        this->hp = hp;
        return *this; // 자기 자신(포인터가 가리키는 객체)을 참조로 반환 -> 메서드 체이닝 가능
    }

    int GetHP() { return hp; }
};

Monster m(50);
m.SetHP(80).SetHP(100); // SetHP가 *this를 반환하니 이어서 호출 가능
std::cout << m.GetHP() << std::endl; // 100
```

`SetHP`처럼 `*this`를 반환하면(`this`는 객체를 가리키는 포인터, `*this`는 그 객체 자체) 메서드 체이닝이 가능해진다. `m.SetHP(80)`이 `m` 자신(참조)을 반환하니 그 반환값에 바로 `.SetHP(100)`을 이어 호출할 수 있는 것이다.

### 초기화 리스트

```cpp
Monster(int hp) : hp(hp) {}
```

이건 `this`가 생략된 게 아니라, 애초에 애매할 자리가 아니다. 초기화 리스트를 두 부분으로 나눠보면:

- **왼쪽 `hp`** (`(` 앞)는 "표현식"이 아니라 "어떤 멤버를 초기화할 건지 지정하는 이름"이다. 이 위치는 문법적으로 멤버/베이스 클래스 이름만 올 수 있는 특수한 자리라서, 매개변수가 있든 없든 상관없이 컴파일러가 무조건 클래스 멤버 목록에서 찾는다.
- **오른쪽 `hp`** (`(` 안)는 진짜 "표현식"이라 일반 스코프 규칙이 적용된다. 함수 매개변수가 더 안쪽 스코프라 멤버를 가리므로, 괄호 안의 `hp`는 매개변수를 가리킨다.

즉 왼쪽은 문법 구조상 멤버로 확정되고 오른쪽은 스코프 규칙상 매개변수로 확정되어 애초에 겹칠 여지가 없다. 반면 생성자 본문은 두 자리 다 "표현식"이라 스코프 규칙만 적용되고, 그 결과 매개변수가 멤버를 가려버려서 `this->`로 직접 구분해줘야 하는 것이다.

앞서 배운 상속에서의 초기화 리스트 문법도 같은 원리다.

```cpp
class A {
    int x;
public:
    A(int val) : x(val) { } // 멤버 초기화 리스트
};
```

**초기화 리스트 vs 본문 대입은 결과만 같아 보일 뿐 동작이 다르다.**

```cpp
Monster(int hp) : hp(hp) {}          // 방법 1: 초기화
Monster(int hp) { this->hp = hp; }   // 방법 2: 기본생성 후 대입
```

`int` 멤버 하나만 보면 결과가 똑같아 보이지만 실제 동작은 다르다.

- 방법 1은 멤버 `hp`를 처음부터 그 값으로 **초기화(initialization)**한다. 한 단계.
- 방법 2는 멤버 `hp`가 먼저 기본 초기화된 다음, 본문에서 값을 **대입(assignment)**하는 두 단계다. `int`는 기본 초기화가 사실상 아무것도 안 하는(쓰레기값) 원시 타입이라 이 차이가 안 보였을 뿐이다.

클래스 타입 멤버에서는 차이가 뚜렷하게 드러난다.

```cpp
class Player
{
    std::string name;

  public:
    Player(const std::string &name) : name(name) {}
    // name을 곧바로 매개변수 값으로 "생성" -> 생성 1번

    Player(const std::string &name)
    {
        this->name = name;
        // 1) name 멤버가 먼저 기본 생성자로 빈 문자열("")로 만들어짐
        // 2) 본문에서 매개변수 name을 대입(복사 대입 연산자 호출)
        // -> 기본 생성 1번 + 대입 1번 = 총 2번 작업
    }
};
```

`std::string`처럼 자체 생성자/대입 연산자가 있는 타입은, 본문에서 대입하는 방식이 불필요한 기본 생성을 한 번 더 하고 버리는 셈이라 비효율적이다.

**const/참조 멤버는 초기화 리스트가 필수다.**

```cpp
class Player
{
    const int maxHp;
    int &hpRef;

  public:
    Player(int maxHp, int &hpRef)
    {
        this->maxHp = maxHp; // 컴파일 에러! const는 생성 후 대입 불가
        this->hpRef = hpRef; // 컴파일 에러! 참조는 재바인딩이 안 되고, =는 참조 대상의 값을 바꾸는 것으로 해석됨
    }
};
```

`const`나 참조(`&`) 멤버는 "일단 만들고 나중에 값 넣기"가 애초에 불가능하다. 반드시 초기화 리스트에서 처음부터 값을 정해줘야 한다.

```cpp
Player(int maxHp, int &hpRef) : maxHp(maxHp), hpRef(hpRef) {}
```

초기화 리스트에 있는 멤버만 이 규칙(생성 시점에 값 확정)을 만족하므로, `const`와 참조 멤버가 동시에 있다면 둘 다 빠짐없이 초기화 리스트에 넣어야 한다. 하나라도 빠지면 그 멤버 때문에 컴파일이 안 된다.

정리하면, `int` 하나짜리 예제에서는 초기화 리스트와 본문 대입이 결과적으로 같아 보이지만, 일반적으로는 초기화 리스트가 "한 번에 만들기"고 본문 대입은 "일단 기본으로 만들고 나서 덮어쓰기"라 원시 타입이 아닌 멤버에서는 성능 차이가 나고, `const`/참조 멤버에서는 아예 필수다. 특별한 이유가 없으면 초기화 리스트를 기본으로 쓰는 습관을 들이는 게 좋다.

## Rule of Three / Rule of Five / Rule of Zero

**Rule of Three (C++98/03)**: 소멸자, 복사 생성자, 복사 대입 연산자 중 **하나라도** 직접 작성해야 한다면 나머지 둘도 거의 확실히 같이 작성해야 한다. 이 셋 중 하나가 필요하다는 건 보통 raw pointer 같은 리소스를 직접 관리하고 있다는 신호이고, 그럼 나머지도 얕은 복사로는 해결이 안 되기 때문이다.

**Rule of Five (C++11~)**: C++11에서 이동 시맨틱(`&&`, `std::move`)이 추가되면서 두 개가 더 늘었다 — 이동 생성자, 이동 대입 연산자. 위 3개 중 하나라도 필요하다면 이 2개도 같이 고려해야 한다. 없어도 동작은 하지만(이동 대신 복사로 대체됨), 이동이 줄 수 있는 성능 이점을 놓친다.

대입 연산자(`operator=`)까지 포함해서 5개를 전부 작성하는 연습을 `IntArray`(동적 int 배열을 관리하는 클래스)로 해봤다.

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

### raw pointer가 있으면 5개 모두에 "결정"이 필요하다

raw pointer 멤버가 있다고 5개를 전부 "직접 구현"해야만 하는 건 아니다. 정확히는, **5개 각각에 대해 어떻게 할지 명시적으로 정해야 한다**는 뜻이고, 그 결정이 항상 "깊은 복사 구현하기"일 필요는 없다.

**옵션 1: 전부 구현 (복사도 이동도 허용)** — 위 `IntArray`로 연습한 방식. `std::vector`, `std::string`처럼 여러 곳에서 자유롭게 복제해서 써도 되는 리소스일 때.

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
