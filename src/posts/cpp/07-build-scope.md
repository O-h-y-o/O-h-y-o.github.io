---
date: 2026-08-10
category:
  - Cpp
order: 7
---

# 빌드와 스코프

## 스코프와 수명

```c
#include <stdio.h>

int global = 100;  // 전역 변수

void demo(void) {
    int local = 10;  // 지역 변수
    static int count = 0; // 정적 변수
    count++;
    printf("count = %d\n", count);
}

int main(void) {
    demo();  // count = 1
    demo();  // count = 2
    demo();  // count = 3
    // printf("%d", local);  // local변수는 demo 안에서만 존재하기 때문에 에러가 발생한다.
    return 0;
}
```

- 전역 변수: 어디서든 접근 가능, 프로그램 종료까지 유지
- 지역 변수: 해당 함수(선언된 블록) 안에서만 존재
- 정적 변수(static): 함수 안에서만 보이지만 값이 바뀌고 함수가 종료되어도 초기화되지 않고 유지됨

## 헤더가드와 전방 선언

### 헤더가드

헤더 파일에는 class를 정의하고, 소스 파일에는 세부 구현을 한다. class를 헤더 파일에 정의할 때 가장 중요한 것은 class가 중복 선언되지 않도록 하는 것이다. 헤더 파일을 여러 파일에서 사용하다 보면 class가 여러 번 정의될 수 있는데, 이를 방지하기 위해 `#ifndef` (if not define) 구문을 활용한다.

- `#ifndef OOO`: OOO이 정의되어 있지 않은 경우에만 다음 코드를 수행하라는 의미
- `#define OOO`: `#ifndef`일 때 딱 한 번만 수행됨
- `#endif`: `#ifndef`가 끝났다는 것을 알리기 위해 사용

헤더가드가 필요한 이유는 프로젝트에서 수십, 수백 개의 헤더가 서로 얽혀서 include되는데 중복 포함이 아주 쉽게 발생하기 때문이다. 헤더가드가 없으면 에러가 계속 터져서 유지보수가 힘들어진다. 헤더가드는 중복 포함을 방지하는 핵심 개념이라 매우 중요한 기본기다.

```cpp
// Person.h
#ifndef Person_H_ // 매크로가 정의되지 않았을 때만 다음 코드 실행
#define Person_H_ // 매크로를 정의해서 이후 중복 포함을 막음
class Person {
  public:
    void introduce() {}
}
#endif // 조건 끝
```

```cpp
// person.cpp
#include "Person.h"
#include "Person.h" // 두 번 포함해도 문제 X

int main() {
  Person p;
  p.introduce();
  return 0;
}
```

실무에서는 `#ifndef` 방식보다 간단한 `#pragma once`를 더 많이 사용한다.

```cpp
// Person.h (#pragma once 방식)
#pragma once // #ifndef 보다 간단하게 사용

class Person {
public:
    void introduce() {}
};
```

### 전방 선언

`Player`가 `PlayerStatus&`처럼 참조로 멤버를 들고 있던 구조에서는 그 객체의 생명주기를 `Player` 바깥에서 책임져야 했다. `std::unique_ptr<PlayerStatus>`로 바꾸면 `Player`가 생성될 때 `std::make_unique<PlayerStatus>()`로 직접 만들고, `Player`가 소멸할 때 자동으로 함께 정리되어 생명주기가 명확해진다.

이때 헤더 파일에서 `unique_ptr<PlayerStatus>`를 멤버로 선언하려면 `PlayerStatus`의 완전한 정의까지는 필요 없고, 타입의 존재만 알려주는 전방 선언(`class PlayerStatus;`)이면 충분하다. 완전한 정의(멤버 접근, `sizeof` 등)가 필요한 시점, 즉 실제로 `->`나 `.`으로 멤버를 쓰는 cpp 파일에서만 `#include`하면 된다.

```cpp
// Player.h — 참조 대신 unique_ptr로 소유, include 대신 전방 선언만 남김
class Monster;
class PlayerStatus;
class PlayerEnhancement;
class PlayerInventory;
class Potion;

class Player {
protected:
    const std::string playerName;
    std::unique_ptr<PlayerStatus> playerStatus;
    std::unique_ptr<PlayerEnhancement> playerEnhancement;
    std::unique_ptr<PlayerInventory> playerInventory;
    std::unique_ptr<Potion> potion;
    JobType job;
    int level;
    int exp;

public:
    Player(const std::string playerName, JobType job);
    virtual ~Player();
    // ...
};
```

::: note 정리

- 참조(`&`) 멤버는 대상 객체를 바깥에서 만들어 주입해야 하고, 재대입이 불가능하다. 소유(`unique_ptr`)는 대상 객체의 생성/소멸을 멤버 스스로 책임진다.
- 헤더에 실제 정의가 필요 없는 타입(포인터/참조/`unique_ptr` 멤버 선언)은 전방 선언으로 충분하며, 이렇게 하면 헤더 간 순환 include를 피하고 컴파일 의존성도 줄일 수 있다.
- 전방 선언만 있는 타입은 멤버 접근이나 `sizeof`가 필요한 지점(주로 `.cpp`)에서 반드시 완전한 정의를 include해야 한다.

:::

## const / static / constexpr

`const`는 값이 변경되지 않음을 컴파일러에게 보장하는 키워드이고, `static`은 변수의 저장 기간(lifetime)과 공유 범위를 제어하는 키워드다.

- const: 값 / 포인터 / 멤버 함수가 무언가를 변경하지 않음을 보장
- static (지역 변수): 함수 호출이 끝나도 값을 유지
- static (멤버 변수): 모든 인스턴스가 공유하는 단 하나의 값
- static const: 모든 인스턴스가 공유하며 변경되지 않는 값

### const

**const 변수**

```cpp
const int MAX_SCORE = 100;
MAX_SCORE = 90; // 컴파일 에러: const 변수는 재할당 불가
```

선언과 동시에 초기화해야 하며, 이후 값을 변경할 수 없다. 매직 넘버 대신 의미 있는 이름을 붙여 가독성과 유지보수성을 높일 때 사용한다.

**const 포인터 / 참조**

```cpp
int x = 10, y = 20;

const int* p1 = &x;       // 포인터가 가리키는 값이 const → *p1 = 20 불가, p1 = &y 는 가능
int* const p2 = &x;       // 포인터 자체가 const → p2 = &y 불가, *p2 = 20 은 가능
const int* const p3 = &x; // 둘 다 const

void printScore(const Student& student) {
    // student.score = 100; // 컴파일 에러: const 참조는 수정 불가
    cout << student.name << student.score;
}
```

`const`의 위치에 따라 "무엇이 상수인지"가 달라진다(포인터가 가리키는 값 vs 포인터 자체). 함수 매개변수를 `const&`로 받으면 복사 비용 없이 원본을 안전하게 읽기 전용으로 넘길 수 있다.

**const 멤버 함수**

```cpp
class ScoreManagement {
public:
    double getAverageScore() const { // 멤버 변수를 수정하지 않음을 보장
        double sum = 0;
        for (auto& s : students) sum += s.score;
        return sum / students.size();
    }

private:
    vector<Student> students;
};
```

멤버 함수 뒤에 `const`를 붙이면 해당 함수 안에서 멤버 변수를 수정할 수 없다. "이 함수는 객체 상태를 조회만 한다"는 의도를 컴파일러가 강제해준다. const 객체는 const 멤버 함수만 호출할 수 있다.

### static

**지역 변수의 static**

```cpp
void callCount() {
    static int count = 0; // 최초 1회만 초기화, 함수 종료 후에도 값 유지
    count++;
    cout << count << "\n";
}

callCount(); // 1
callCount(); // 2
callCount(); // 3
```

일반 지역 변수는 함수가 끝나면 소멸되지만, `static` 지역 변수는 프로그램 종료까지 값이 유지된다. 초기화 구문은 최초 호출 시 단 한 번만 실행된다.

**클래스의 static 멤버**

```cpp
class Counter {
public:
    static int totalCount; // 선언
    Counter() { totalCount++; }
};

int Counter::totalCount = 0; // 클래스 외부에서 정의 및 초기화 (C++17 이전)

Counter a, b, c;
cout << Counter::totalCount; // 3
```

::: note 정리

- `static` 멤버 변수는 객체마다 따로 갖는 게 아니라, 클래스 전체가 공유하는 단 하나의 변수다.
- 인스턴스 없이도 `클래스이름::멤버` 형태로 접근할 수 있다.
- C++17부터는 `inline static`을 사용하면 클래스 정의 안에서 바로 초기화할 수 있다.

:::

### static const / static inline const

`static`과 `const`를 함께 쓰면 "클래스 전체가 공유하는, 변경되지 않는 값"을 만들 수 있다.

```cpp
class ScoreManagement {
private:
    static inline const map<double, Grade, greater<double>> GRADE_MAP = {
        {95, Grade::A_PLUS},
        {90, Grade::A},
        {80, Grade::B},
        {70, Grade::C},
        {60, Grade::D},
        {0,  Grade::F}
    };
    // ...
};
```

- `static`: 등급 기준표는 학생 목록(객체)마다 달라질 이유가 없으므로, 인스턴스마다 복사본을 만들지 않고 클래스 전체가 하나만 공유한다.
- `const`: 등급 기준은 프로그램 실행 중에 바뀌면 안 되는 값이므로, 실수로 수정되는 것을 컴파일 타임에 막는다.
- `inline`: C++17부터 지원되며, 클래스 정의 안에서 바로 초기화할 수 있게 해준다. (`inline`이 없다면 `.cpp` 파일에 별도로 정의가 필요하다.)

::: note 정리

- `const`는 "이 값/포인터/함수는 무언가를 변경하지 않는다"는 약속을 컴파일러가 강제하도록 만든다.
- `static`은 변수의 생명주기를 프로그램 종료 시점까지 늘리거나(지역 변수), 클래스의 모든 인스턴스가 공유하는 값(멤버 변수)으로 만든다.
- `static const`는 두 특성을 합쳐 "모든 인스턴스가 공유하며 변경되지 않는 값"을 표현하며, 등급 기준표처럼 객체마다 달라질 필요 없는 상수 데이터를 클래스 멤버로 둘 때 적합하다.

:::

### constexpr

`const`는 실제 프로그램이 실행되는 런타임 단계에서 값이 정해진다. `constexpr`은 `const`처럼 상수를 정의할 때 사용되지만, 컴파일 시점에 값이 확정될 수 있을 때 사용 가능하다. C++ Core Guidelines에 따르면 "컴파일 타임에 값을 알 수 있으면 `constexpr`, 그게 안 되면 `const`" 순서로 고려하는 것이 좋다.

```cpp
class Book {
private:
    static constexpr int dayFee = 100; // 모든 Book 인스턴스가 공유하는 컴파일 타임 상수
public:
    int calcdayFee(int day) const { return day * dayFee; }
};
```

`static`을 함께 쓴 이유는 이 값이 인스턴스마다 달라질 필요가 없는, 클래스 전체가 공유하는 값이기 때문이다. 인스턴스별 멤버로 두면 객체마다 불필요하게 메모리를 차지하고, "바뀔 수도 있는 값"처럼 보이게 된다.

`constexpr`을 못 쓰는 경우도 있다. 값이 런타임에만 정해지는 경우(사용자 입력, 파일에서 읽은 값, 함수 인자 등)는 `constexpr`로 선언할 수 없고 `const`만 가능하다.

```cpp
void f(int userInput) {
    const int x = userInput;      // OK
    // constexpr int y = userInput; // 컴파일 에러 - 컴파일 타임에 값을 모름
}
```

## extern, 컴파일-링크 과정, ODR

### extern과 linkage

```cpp
// Before — MonsterInfo.h
const MonsterInfo SLIME_INFO = {"슬라임", 100, 20, 10, 30, DropItemType::DROP_ITEM_SLIME};

// After — MonsterInfo.h (선언만)
extern const MonsterInfo SLIME_INFO;

// After — MonsterInfo.cpp (정의는 여기 딱 한 번)
const MonsterInfo SLIME_INFO = {"슬라임", 100, 20, 10, 30, DropItemType::DROP_ITEM_SLIME, "슬라임이 엉겨붙습니다."};
```

**왜 헤더에 바로 정의하면 안 되는가.** C++에서 전역 `const` 변수는 기본적으로 internal linkage를 가진다. 그래서 `const MonsterInfo SLIME_INFO = {...}`를 헤더에 그대로 써도 링커 에러(중복 정의)는 안 난다. 대신 이 헤더를 include하는 `.cpp` 파일마다 각자 별도의 사본이 만들어진다. `GameManagement.cpp`가 보는 `SLIME_INFO`와 `MonsterInfo.cpp`가 보는 `SLIME_INFO`가 이름만 같을 뿐 실제로는 메모리상 다른 객체가 되는 것이다. 값만 읽는 동안은 당장 문제가 없지만, 데이터가 하나라는 보장이 없고 include하는 파일 수만큼 복사본이 쌓인다.

::: tip linkage(연결 속성)

`linkage`는 같은 이름이 서로 다른 번역 단위(translation unit, 대략 `.cpp` 파일 하나가 컴파일되는 단위)에서 같은 실체를 가리키는지를 결정하는 속성이다.

- **external linkage**: 이 이름은 프로그램 전체에서 하나의 실체를 가리킨다. 다른 `.cpp`에서도 `extern` 선언으로 같은 대상을 참조할 수 있다. 일반 함수, `extern` 변수, 클래스의 정적 멤버 등이 기본적으로 이 속성을 가진다.
- **internal linkage**: 이 이름은 자신이 정의된 파일(번역 단위) 안에서만 유효하다. 다른 `.cpp`에서 같은 이름을 써도 완전히 다른 실체다. 전역 `const`/`constexpr` 변수, `static` 전역 변수/함수, 익명 네임스페이스 안의 모든 것이 기본적으로 이 속성을 가진다.
- **no linkage**: 함수 내부의 지역 변수처럼 다른 파일은커녕 함수 밖에서도 그 이름 자체를 알 수 없는 경우.

헤더에 그대로 쓴 `const MonsterInfo SLIME_INFO = {...}`는 internal linkage라서 include한 `.cpp`마다 이름은 같지만 서로 다른 객체가 각각 만들어진다. 여기에 `extern`을 붙이면 external linkage로 바뀌어서, "이 이름의 실체는 프로그램 전체에 단 하나"라는 게 보장되고 그 실체를 `.cpp`에 딱 한 번만 정의해주면 된다.

:::

`extern`은 "이 이름을 가진 객체가 어딘가에 (단 하나) 정의되어 있다"는 걸 컴파일러에게 알려주는 **선언**이다. 실제 메모리를 할당하는 **정의**는 `extern` 없이 값을 채워서 딱 한 파일(`MonsterInfo.cpp`)에만 둔다. 이렇게 하면 헤더를 몇 군데서 include하든 실체는 하나뿐이고, 모든 `.cpp`가 링크 단계에서 같은 주소를 가리키게 된다.

**static은 반대 방향이다.** `extern`이 "이건 외부에 있는 하나의 실체를 가리킨다"(external linkage)라면, `static`(전역/네임스페이스 범위에서)은 "이건 이 파일 안에서만 존재한다"(internal linkage)는 선언이다. 이 파일에서만 쓰는 헬퍼 함수는 익명 네임스페이스(`namespace { ... }`)로 감싸서 사실상 `static`과 같은 효과(다른 `.cpp`의 동일한 이름과 충돌하지 않음)를 낼 수 있다. 반대로 헤더에 선언 없이 `.cpp`에만 있는 함수는 기본이 external linkage라, 나중에 다른 파일에 같은 이름의 전역 함수가 생기면 충돌할 수 있다 — 이런 "이 파일 전용" 함수들은 `static`이나 익명 네임스페이스로 명시해주는 게 안전하다.

### .h와 .cpp, ODR

헤더(`.h`)는 "이런 타입/함수/변수가 존재한다"는 **선언**만 모아두고, 실제 내용(함수 몸통, 변수 초기값)인 **정의**는 `.cpp` 한 곳에만 둔다는 원칙(One Definition Rule, ODR)이다. 헤더는 여러 `.cpp`에서 몇 번이고 include될 수 있지만, 정의는 프로그램 전체에서 딱 한 번만 있어야 한다. 그래서,

- 클래스/함수 시그니처, `extern` 변수 선언 → `.h`
- 실제 로직, 변수 초기값 → `.cpp`

로 나누는 것이고, 이렇게 짝지어진 `.h`/`.cpp`는 사실상 하나의 컴포넌트를 "외부에 보여줄 것"과 "내부 구현"으로 나눠 놓은 것에 가깝다. 헤더에 필요한 타입은 전방 선언만 두고 실제 include는 `.cpp`에서 하는 것도 같은 맥락이다. 헤더는 "필요한 만큼만" 알려주고, 진짜 구현은 `.cpp`가 책임진다.

::: note 정리

- 전역 `const` 변수/객체를 헤더에 바로 정의하면 include할 때마다 별도 사본이 생긴다(internal linkage). 실체를 하나로 유지하려면 헤더엔 `extern` 선언만, 정의는 `.cpp` 한 곳에.
- `static`(또는 익명 네임스페이스)은 그 반대다. 이 파일 밖으로 이름이 노출되지 않게 막아서, 다른 `.cpp`의 같은 이름과 충돌하지 않도록 한다.
- `.h`는 "무엇이 있는지"(선언), `.cpp`는 "어떻게 동작하는지"(정의)를 담당한다. 하나의 이름은 선언은 여러 번 가능하지만 정의는 프로그램 전체에서 단 한 번(ODR)이어야 한다.

:::
