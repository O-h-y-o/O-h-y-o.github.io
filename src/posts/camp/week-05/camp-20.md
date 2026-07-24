---
date: 2026-07-24
category:
  - Camp
  - Unreal
order: 5
---

# 캠프 20일차

## 프로그래머스 코테 연습

<programmers-coding :test-id="76501">

::: tabs

@tab 반복문

반복문을 사용하여 간단하게 구현했는데 몇 가지 개선되어야 할 부분이 있다. (반복문 개선 탭)

```cpp
#include <vector>

using namespace std;

int solution(vector<int> absolutes, vector<bool> signs) {
    int answer = 0;

    for (int i = 0; i < absolutes.size(); i++) {
        signs[i] ? answer += absolutes[i] : answer -= absolutes[i];
    }

    return answer;
}
```

@tab 반복문 개선

`size()`는 부호없는 정수를 반환하는데 int(부호 있는 정수)랑 비교하면 컴파일러가 signed/unsigned 비교 경고를 낼 수 있어서 타입을 맞춰주는게 좋다.
원래 코드는 `signs[i] ? answer += absolutes[i] : answer -= absolutes[i];` 처럼 삼항 연산자 양쪽에서 서로 다른 대입 연산자(+=, -=)를 각각 실행하는 방식이다. 동작은 하지만, "삼항 연산자로 조건에 따라 다른 부호의 값을 만들고, 그 값을 answer에 한 번만 더한다"는 쪽이 더 명확하다.

```cpp
#include <vector>
using namespace std;

int solution(vector<int> absolutes, vector<bool> signs) {
    int answer = 0;

    for (size_t i = 0; i < absolutes.size(); i++) {
        answer += signs[i] ? absolutes[i] : -absolutes[i];
    }

    return answer;
}
```

:::

</programmers-coding>

## 복사 생성자 / 이동 생성자

raw pointer 멤버를 다룰 때 복사 생성자와 이동 생성자가 잘 이해되지 않아서, 직접 코드를 짜보면서 개념을 정리했다.

### 왜 필요한가 - 얕은 복사의 문제

`char*` 멤버를 가진 `Book` 클래스를 직접 만들어봤다.

```cpp
class Book
{
    char *arr;

public:
    Book(const std::string &title)
    {
        arr = new char[title.size() + 1];
        std::strcpy(arr, title.c_str());
    }

    ~Book() { delete[] arr; }
};
```

여기에 복사 생성자를 따로 정의하지 않거나, 다음처럼 포인터 값만 그대로 복사하면(얕은 복사) 문제가 생긴다.

```cpp
// 복사 생성자를 정의하지 않았을 때 컴파일러가 자동으로 만들어주는 기본 복사 생성자와 같다.
Book(const Book &other) { arr = other.arr; }  // 얕은 복사
```

`arr = other.arr;`는 메모리를 새로 만드는 게 아니라 **주소값만** 그대로 복사한다. 그래서 `Book b2(b1);`을 하면 `b1.arr`와 `b2.arr`가 완전히 같은 메모리를 가리키게 된다 (변수는 2개, 메모리는 1개).

이 상태로 `main`이 끝나면 다음 순서로 진행된다.

1. `b2` 소멸자가 먼저 `delete[] arr;` → 메모리 해제
2. `b1` 소멸자가 이미 해제된 **같은 메모리**에 또 `delete[] arr;` → **이중 해제(double free)**

이중 해제는 undefined behavior라서 크래시가 나거나(가장 흔함), 아무 문제 없어 보이다가 나중에 알 수 없는 곳에서 터질 수도 있다.

### 깊은 복사로 해결

복사 생성자에서 새로 메모리를 할당하고 내용을 직접 복사해주면(깊은 복사) 두 객체가 완전히 독립적인 메모리를 갖게 된다.

```cpp
Book(const Book &other)
{
    arr = new char[std::strlen(other.arr) + 1];
    std::strcpy(arr, other.arr);
}
```

이렇게 하면 `b2`를 만든 뒤에 `b1`의 내용을 바꿔도 `b2`는 영향받지 않는다. `b2`가 복사된 시점의 상태를 그대로 "저장"해두는 셈이라, 게임의 **세이브 포인트**처럼 특정 시점의 독립적인 스냅샷을 보존하는 것으로 이해했다. 다만 이건 복사 생성자의 대표적인 효과 중 하나일 뿐이고, 실제로는 함수에 값으로 전달하거나(`void Foo(Book b)`), 컨테이너에 저장하거나(`vector<Book>`), 값으로 반환할 때도 자동으로 호출된다는 걸 알게됐다.

### 이동 생성자 - 언제 호출되는가

```cpp
Book(Book &&other)
{
    arr = other.arr;
    other.arr = nullptr;
}
```

이동 생성자는 원본의 메모리를 복사하지 않고 **그대로 가져오면서**, 원본의 포인터는 `nullptr`로 비워버린다. 그래서 나중에 원본이 소멸돼도 이미 넘겨준 메모리를 다시 delete하지 않는다.

중요한 건, 이동 생성자는 아무 때나 호출되는 게 아니라는 점이다. `Book b2(b1);`처럼 `b1`이 이름 있는 변수(lvalue)면 복사 생성자가 호출되고, 이동 생성자는 **rvalue**(임시 객체, 또는 `std::move`로 명시적으로 표시한 값)를 넘길 때만 호출된다.

```cpp
Book b4(std::move(b1));   // b1을 rvalue로 취급 -> 이동 생성자 호출
Book b5(Book("임시책"));   // 임시 객체 -> 이동 생성자 호출 (컴파일러가 생략할 수도 있음)

Book MakeBook() {
    Book temp("만든책");
    return temp;            // 지역 객체 반환 -> 이동 생성자 호출될 수 있음
}
```

### 왜 char\*가 이동의 "태초" 예시인가 - std::string과의 연결

이동이 성립하려면 조건이 하나 있다. **힙에 할당된 데이터를 가리키는 포인터**여야 한다는 것이다.

```cpp
class A { char arr[100]; };  // 고정 배열, 객체 안에 데이터가 그대로 박혀있음
class B { char* arr; };      // 힙 어딘가를 가리키는 주소값만 들고 있음
```

`A`의 `arr[100]`은 객체 내부에 물리적으로 박혀있는 데이터라서, "포인터만 훔쳐오고 원본을 비운다"는 트릭 자체가 불가능하다. 옮기려면 결국 100바이트를 전부 복사해야 한다. 반면 `B`의 `arr`는 그냥 숫자(주소값) 하나라서, 이 숫자만 다른 변수로 옮기고 원본을 `nullptr`로 바꾸면 실제 데이터는 한 바이트도 움직이지 않은 채로 소유권만 이전된다. `Book`의 `arr`가 `char*`였던 이유가 이거였고, 위에서 짠 이동 생성자가 바로 이 트릭이었다.

그리고 이 트릭은 `std::string`도 내부적으로 똑같이 쓴다. `std::string`은 (긴 문자열 기준) 힙에 할당한 `char*` 버퍼 + 길이 + 용량을 멤버로 들고 있는데, 이건 `Book::arr`랑 같은 구조다. `std::string`의 이동 생성자가 하는 일도 개념적으로 완전히 같다.

```cpp
// std::string의 이동 생성자가 (개념적으로) 하는 일
String(String&& other) {
    buffer = other.buffer;      // 내부 char* 포인터만 가져옴
    size = other.size;
    capacity = other.capacity;
    other.buffer = nullptr;     // 원본 비움
    other.size = 0;
}
```

`Book`에서 손으로 짠 것과 똑같은 트릭인데, `std::string`은 이 내부 `char*`를 `private`으로 감춰놨기 때문에(캡슐화) 우리가 직접 손댈 수 없고, 라이브러리가 이 트릭을 미리 구현해서 이동 생성자/이동 대입 연산자로 제공해주는 것뿐이다. `std::string s2 = std::move(s1);`이 문자열 길이와 무관하게 항상 빠른(O(1)) 이유도 이거다. 포인터 몇 개만 옮기지, 글자를 한 자도 복사하지 않기 때문이다. 반대로 복사 생성자는 항상 O(n)이다. 새 버퍼를 할당하고 모든 글자를 베껴야 한다.

결국 `char*`부터 직접 짜보면 "포인터를 훔치고 nullptr로 비운다"는 이동의 본질이 손에 잡히고, 그다음 `std::string`을 보면 "라이브러리가 우리가 짠 걸 캡슐화해서 감춰둔 것뿐이구나"로 자연스럽게 연결된다.

### 이동 후 원본을 계속 쓰면 터진다

`std::move(b1)`로 `b1`을 `b4`에 이동시킨 뒤, `b1.arr`는 `nullptr`이 된다. 이 상태에서 `b1`을 계속 쓰면 문제가 생긴다는 걸 직접 겪었다.

```cpp
Book b4(std::move(b1));
std::cout << b1.GetBookTitle() << std::endl;  // b1.arr가 nullptr
```

`GetBookTitle()`이 `nullptr`을 반환하고, 이를 `std::cout <<`에 넘기면 컴파일러는 이걸 C 스타일 문자열로 취급해 `\0`을 찾을 때까지 읽으려 한다. 시작 주소 자체가 `nullptr`이라 그 순간 크래시가 난다.

이 호출을 지워도 문제가 완전히 사라지지 않았는데, 소멸자 자체가 항상 `arr`를 출력하려고 시도했기 때문이다.

```cpp
~Book()
{
    std::cout << arr << "소멸자 호출\n";  // arr가 nullptr이면 여기서도 크래시
    delete[] arr;
}
```

`main`이 끝나며 이동된 `b1`도 결국 소멸되는데, 이때도 소멸자 안의 `std::cout << arr`가 실행돼서 똑같은 이유로 터진다. `nullptr` 체크를 넣어야 한다.

```cpp
~Book()
{
    if (arr) std::cout << arr << " 소멸자 호출\n";
    delete[] arr;  // delete[] nullptr은 안전해서 그냥 둬도 됨
}
```

C++에서 이동된(moved-from) 객체는 "유효하지만 값이 정해지지 않은 상태"로 취급하는 게 규칙이라, 이동 후 원본을 다시 쓰려면 재할당을 해줘야 한다는 걸 확실히 이해했다.

### 컴파일러가 자동으로 정하는 것 vs 아닌 것

헷갈렸던 부분을 정리하면 두 가지를 구분해야 한다.

- **"복사 생성자냐 이동 생성자냐"는 컴파일러가 자동으로 선택한다.** 인자가 lvalue인지 rvalue인지로 오버로드 결정을 하는 거라, 함수 오버로드 규칙과 동일하다.
- **"깊은 복사냐 얕은 복사냐"는 컴파일러가 판단하는 게 아니라, 복사 생성자 본문에 뭐가 적혀있느냐의 결과다.** 복사 생성자를 직접 안 만들면 컴파일러가 멤버 하나하나를 그대로 복사하는 기본 복사 생성자(memberwise copy)를 만들어준다. `char*` 같은 raw pointer 멤버는 이때 주소값만 복사되니 얕은 복사가 되는 거고, `std::string`이나 `std::vector` 같은 멤버는 그 타입 자체의 복사 생성자가 이미 깊은 복사를 하도록 구현돼 있어서 memberwise copy를 써도 자동으로 깊은 복사가 된다. 즉 얕은 복사 문제는 "그 자체로 복사 로직이 없는 raw 타입"을 직접 다룰 때만 생긴다.

### 복사는 포인터 멤버만 대상으로 하는 게 아니다

직접 복사 생성자를 작성하다 보니 "복사한다는 게 포인터로 만들어진 멤버만 복사하겠다는 뜻인가?"라는 오해가 생겼는데, 그 반대다. **복사는 객체의 모든 멤버를 대상으로 한다.** 다만 멤버 타입마다 "어떻게 복사해야 안전한지"가 다를 뿐이다.

```cpp
class Book
{
    char *arr;          // 힙 메모리를 "가리키는 주소"만 들고 있음
    int age;             // 값 자체를 직접 들고 있음
    std::string name;    // 값 자체를 직접 들고 있음 (내부 구현은 별개)
};
```

- `age`는 객체 안에 정수값 자체가 그대로 들어있다. `Book` 객체가 스택에 있든 힙에 있든(`new Book(...)`으로 만들었어도) `age`는 그 객체 메모리 블록 안에 인라인으로 박혀있다. 그래서 `age(other.age)`로 값을 복사하면 완전히 독립적인 정수 2개가 생기고, 공유될 여지 자체가 없다.
- `arr`는 다르다. 객체 안에 있는 건 "데이터 그 자체"가 아니라 데이터가 있는 힙 메모리의 **주소값**이다. `arr = other.arr;`를 하면 그 주소값(숫자)만 복사되니, 두 객체가 가리키는 대상은 하나가 된다.
- `std::string name`도 흥미로운 케이스인데, 내부적으로 긴 문자열이면 역시 힙 메모리를 쓴다(짧은 문자열은 SSO 최적화로 객체 안에 바로 저장되기도 함). 즉 원리상 `arr`와 같은 문제를 가질 수 있는데, `std::string` 클래스 자체가 **자기 복사 생성자 안에서 이미 깊은 복사를 하도록 구현**되어 있어서 `name(other.name)`이라고만 써도 알아서 새 힙 메모리를 할당하고 복사해준다. `char*`는 그냥 순수 주소값이라 "복사할 때 깊은 복사를 해야 한다"는 로직 자체가 없는 것뿐이다.

정리하면 "스택이라서 공유가 안 된다"보다는, **"값을 직접 들고 있거나 알아서 깊은 복사하는 타입은 그대로 복사해도 안전하고, 힙 주소만 들고 있는 raw pointer는 그대로 복사하면 주소만 공유된다"**가 더 정확한 설명이다.

그래서 raw pointer 멤버 때문에 복사 생성자를 직접 작성하게 되면, `arr`만 고치는 데 신경 쓰다가 `age`, `name`처럼 원래는 문제없었던 멤버들까지 초기화 리스트에서 빠뜨리기 쉽다. 직접 복사 생성자를 쓰는 순간 컴파일러는 memberwise copy를 포기하기 때문에, 언급하지 않은 멤버는 `int`면 초기화되지 않은 쓰레기값, 클래스 타입이면 기본 생성자로 초기화된 빈 값이 된다.

```cpp
Book(const Book &other) : age(other.age), name(other.name)
{
    arr = new char[std::strlen(other.arr) + 1];
    std::strcpy(arr, other.arr);
}
```

### 또 다른 예시 - Player의 int\* hp

같은 패턴을 `int* hp`로 한 번 더 짚어봤다.

```cpp
class Player {
    int* hp;

public:
    Player(int hp) : hp(new int(hp)) {}

    Player(const Player& other) {
        hp = other.hp;   // 얕은 복사
    }

    void SetHP(int num) { *hp = num; }
    int GetHP() { return *hp; }
};

int main() {
    Player p1(10);
    Player p2(p1);
    p1.SetHP(20);

    std::cout << p1.GetHP() << std::endl;  // 20
    std::cout << p2.GetHP() << std::endl;  // 20 (p2는 안 건드렸는데도 바뀜)
}
```

`hp = other.hp;`는 `other.hp`에 담긴 주소값을 그대로 복사하는 것뿐이라, `p1.hp`와 `p2.hp`가 같은 `int` 메모리 칸을 가리키게 된다. `SetHP`의 `*hp = num;`은 "hp가 가리키는 칸의 값을 바꿔라"라는 뜻이라, `p1`을 통해 바꿔도 같은 칸을 보는 `p2`의 값도 같이 바뀐다.

고치려면 새 메모리를 할당하고 **주소가 아니라 값**(`*other.hp`)을 복사해야 한다.

```cpp
Player(const Player& other) {
    hp = new int(*other.hp);  // 새 메모리 할당 + 값 복사
}
```

### 복사 생성자를 안 만들어도 기본으로 존재한다

클래스에 복사 생성자를 **직접 정의하지 않으면**, 컴파일러가 자동으로 기본 복사 생성자(암시적으로 정의된 복사 생성자, implicitly-defined copy constructor)를 만들어준다. 이건 앞서 정리한 것처럼 모든 멤버를 memberwise copy한다.

```cpp
class Player {
    int hp;
    std::string name;
    // 직접 안 만들면 컴파일러가 아래와 동일한 걸 자동 생성:
    // Player(const Player& other) : hp(other.hp), name(other.name) {}
};
```

단, 다음 중 하나라도 직접 정의하면 컴파일러가 기본 복사 생성자를 자동으로 만들어주지 않는다(또는 `= delete`로 막힘).

- 소멸자를 직접 정의한 경우
- 이동 생성자나 이동 대입 연산자를 직접 정의한 경우
- 멤버 중에 복사가 막혀있는 타입이 있는 경우 (예: `std::unique_ptr` 멤버)

그리고 `Book`, `Player`처럼 raw pointer 멤버가 있는 클래스는 기본 복사 생성자가 없는 게 아니라, **있긴 있는데 그게 얕은 복사라서 문제가 생기는 것**이다. "복사 생성자가 없다"가 아니라 "있긴 있는데 원하는 동작(깊은 복사)이 아니다"가 정확한 표현이다.

### 그럼 얕은 복사는 언제 쓰나

여기까지 보면 얕은 복사는 무조건 피해야 할 것처럼 보이는데, 그건 아니다. 판단 기준은 딱 하나다. **그 포인터가 가리키는 대상을 이 클래스가 "소유"하고 있는가.** 소유한다는 건 소멸자에서 그 포인터를 `delete`한다는 뜻이다.

```cpp
class Book {
    char* arr; // Book이 new로 만들고, 소멸자에서 delete하는 "소유" 포인터

public:
    ~Book() { delete[] arr; }
};
```

`Book`의 `arr`는 소유 포인터라서 얕은 복사하면 이중 해제로 터진다. 지금까지 계속 본 케이스가 이거다.

```cpp
class Skill {
    Player* target; // Skill이 만든 게 아니라, 이미 어딘가 존재하는 Player를 "가리키기만" 함

public:
    Skill(Player* t) : target(t) {}
    void Cast() { target->TakeDamage(10); }
    // 소멸자에서 delete target 안 함. target은 Skill 것이 아니니까.
};
```

반면 `target`은 **소유하지 않는 관찰용(non-owning) 포인터**다. `Skill`을 복사할 때 `target`도 주소값만 그대로 복사(얕은 복사)하는 게 오히려 원하는 동작이다. 복사된 `Skill`도 똑같은 `Player`를 타겟으로 삼아야 하기 때문이다. 여기서 깊은 복사를 하면(`Player`를 새로 복제해버리면) 완전히 잘못된 동작이 된다. 애초에 `Skill`이 사라진다고 그 타겟 `Player`가 같이 지워지면 안 되는 관계다.

정리하면 판단 기준은 이렇다.

- **소멸자에서 이 포인터를 delete하는가?** → 하면 소유 포인터 → 얕은 복사 금지 (깊은 복사, 또는 소유권을 명확히 하는 스마트 포인터가 필요)
- **소멸자에서 아무것도 안 하고 그냥 참조만 하는가?** → 비소유 포인터 → 얕은 복사가 정답

언리얼 엔진의 raw `AActor*` 포인터 대부분이 이 "비소유 참조" 패턴이다. 실제 액터의 생명주기는 GC가 관리하고, 여기저기 코드에서 그 액터를 가리키는 raw pointer들은 그냥 복사돼도 문제없다. 그 포인터를 들고 있는 쪽 중 누구도 그 액터를 delete할 책임이 없기 때문이다. 스마트 포인터에서 UObject를 raw pointer로 다루는 이유와 같은 원리다.

## this 포인터

`this`가 언제 필요하고 언제 생략 가능한지 헷갈려서 정리했다.

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

- 생성자 본문의 `hp = hp;`는 왼쪽/오른쪽 둘 다 "표현식" 자리라서 스코프 규칙이 그대로 적용된다. 함수 매개변수는 클래스 멤버보다 더 안쪽 스코프라 이름이 겹치면 매개변수가 멤버를 가려버린다(shadowing). 그래서 `hp = hp;`는 매개변수를 자기 자신에 대입하는 의미 없는 코드가 되고, 멤버는 손도 못 댄다. `this->hp`로 "멤버 쪽"이라고 명시해야 진짜로 멤버가 바뀐다.
- `SetHP`처럼 `*this`를 반환하면(`this`는 객체를 가리키는 포인터, `*this`는 그 객체 자체) 메서드 체이닝이 가능해진다. `m.SetHP(80)`이 `m` 자신(참조)을 반환하니 그 반환값에 바로 `.SetHP(100)`을 이어 호출할 수 있는 것이다.

### 초기화 리스트에서는 왜 this 없이도 되는가

```cpp
Monster(int hp) : hp(hp) {}
```

이건 `this`가 생략된 게 아니라, 애초에 애매할 자리가 아니다. 초기화 리스트를 두 부분으로 나눠보면 이렇다.

- **왼쪽 `hp`** (`(` 앞)는 "표현식"이 아니라 **"어떤 멤버를 초기화할 건지 지정하는 이름"**이다. 이 위치는 문법적으로 멤버/베이스 클래스 이름만 올 수 있는 특수한 자리라서, 매개변수가 있든 없든 상관없이 컴파일러가 무조건 클래스 멤버 목록에서 찾는다.
- **오른쪽 `hp`** (`(` 안)는 진짜 "표현식"이라 일반 스코프 규칙이 적용된다. 함수 매개변수가 더 안쪽 스코프라 멤버를 가리므로, 괄호 안의 `hp`는 매개변수를 가리킨다.

즉 왼쪽은 문법 구조상 멤버로 확정되고 오른쪽은 스코프 규칙상 매개변수로 확정되어 애초에 겹칠 여지가 없다. 반면 생성자 **본문**은 두 자리 다 "표현식"이라 스코프 규칙만 적용되고, 그 결과 매개변수가 멤버를 가려버려서 `this->`로 직접 구분해줘야 하는 것이다.

### 초기화 리스트 vs 본문 대입은 결과만 같아 보일 뿐 동작이 다르다

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

### const/참조 멤버는 초기화 리스트가 필수

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

정리하면, `int` 하나짜리 예제에서는 초기화 리스트와 본문 대입이 결과적으로 같아 보이지만, 일반적으로는 초기화 리스트가 "한 번에 만들기"고 본문 대입은 "일단 기본으로 만들고 나서 덮어쓰기"라 원시 타입이 아닌 멤버에서는 성능 차이가 나고, `const`/참조 멤버에서는 아예 필수다. 그래서 특별한 이유가 없으면 초기화 리스트를 기본으로 쓰는 습관을 들이는 게 좋다.
