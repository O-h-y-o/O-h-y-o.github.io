---
date: 2026-07-07
category:
  - Camp
  - Unreal
order: 4
---

# 캠프 8일차

## Atani 퀴즈

<AtaniQuiz :questionIds="[0, 1, 2, 3, 4]" />

## 프로그래머스 코딩테스트 연습

<ProgrammersCoding :test-id="12928">

::: tabs

@tab 풀이1

입력받은 n 에서 `n % i = 0` 을 통해 약수인지 판별해준다.
n을 i로 나누었을때 나머지가 0이 아니라면 약수가 아니다.
반복문으로 n 이하의 값에서 약수를 모두 찾아서, 약수면 answer에 더해주었다.

```cpp
int solution(int n) {
    int answer = 0;

    for (int i = 1; i <= n; i++) {
        if(n % i == 0) {
            answer += i;
        };
    };

    return answer;
}
```

@tab 풀이2

풀이1은 n 이하의 모든 수를 반복해야 하기 때문에 성능면에서 비효율적이게 된다.
약수는 항상 짝으로 존재하기 때문에, 작은 수 i를 찾으면 큰 수 `n / i` 도 자동으로 약수임을 알 수 있다.
n이 20이라고 했을때, `i <= n` 은 20번의 반복을 하게 되는데, 조건식을 `i * i <= n` 로 변경하면 `1, 2, 3, 4` 총 4번으로 줄어들어 효율이 좋아진다.

```cpp
int solution(int n) {
    int answer = 0;
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            answer += i;
            if (i != n / i) answer += n / i;
        }
    }
    return answer;
}

```

@tab 풀이3

c++에서 vector는 처음보고, 해당 문제에서 이 문제풀이는 필요하진 않지만, 몇 가지 이점이 있다고해서 가지고 왔다.

1. 약수 목록을 직접 확인하고 싶을 때
   - 문제에서 “약수들을 출력하라” 같은 요구가 있을 때
   - 벡터에 저장해두면 cout으로 바로 찍을 수 있음
2. 약수들을 다른 계산에 활용할 때
   - 단순히 합만 구하는 게 아니라, 약수들의 개수, 최대/최소, 특정 조건에 맞는 약수 등을 찾을 때
   - 벡터에 모아두면 재활용 가능
3. 디버깅이나 학습용
   - 처음 배우는 단계에서는 “약수가 제대로 구해졌는지” 눈으로 확인하기 위해 벡터에 담아두는 게 직관적

```cpp

#include <vector>
using namespace std;

int solution(int n) {
    vector<int> divisors;

    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            divisors.push_back(i);
            if (i != n / i) {
                divisors.push_back(n / i);
            }
        }
    }

    int answer = 0;
    for (int d : divisors) {
        answer += d;
    }
    return answer;
}


```

:::

</ProgrammersCoding >

## C++

### Class

유지보수에 용이한 코드를 만들기 위해 C++ 에서는 [객체 지향 프로그래밍(OOP)](#oop)을 한다.
C++ 에서 클래스는 객체 지향 프로그래밍의 핵심 개념으로, 속성(데이터)과 행동을 하나로 묶어 표현하는 툴이라고 할 수 있다.
클래스는 객체를 만들기 위한 `설계도`이다. 객체가 가져야 할 속성과 행동을 정의해 놓은 틀이다.
클래스 자체는 실체가 아니고, 클래스를 기반으로 객체가 생성되어야 프로그램 안에서 실제로 동작한다.
자동차로 비유하면, 자동차는 바퀴 4개, 엔진 1개, 핸들 1개를 가진다 라는 `속성`과 빠르게 달릴 수 있고, 천천히 갈 수도 있고, 멈출 수도 있다. 라는 `행동`이 정의된 설계가 있을 것이고, 이러한`설계도(클래스)`를 가지고 만들어진 자동차를 `객체` 라고 한다.

#### 멤버 함수, 멤버 변수

`멤버 함수`
행동(동작)은 멤버 함수로 정의한다. 보통 멤버 함수는 외부에서도 접근하게 하는 경우가 많다.

`멤버 변수`
세부 데이터는 멤버 변수로 관리한다. 멤버 함수에서 필요한 정보나 클래스 자체에서 내부 연산 시 필요한 정보를 멤버 변수로 관리한다.
보통 멤버 변수는 외부에서 접근하지 못하게 하는 경우가 많다.

필요한 동작만 공개하고, 세부 데이터는 숨기는 방식이 데이터 보호와 재사용성을 높여 유지보수가 쉬워진다. 이를 `캡슐화` 라고 하며 객체 지향 프로그래밍의 핵심 원칙 중 하나이다.

#### 접근 제어

클래스의 멤버 함수나 멤버 변수에 접근할 때는 객체 뒤에 멤버 접근 연산자 `.`를 사용한다.
C++의 접근 지정자는 `public`, `private`, `protected` 가 있다.
접근 지정자를 명시하지 않으면 `private`로 설정된다.

##### public

- 모든 코드에서 접근 가능
- 클래스의 인터페이스 역할을 담당
- 예시: 외부에서 호출할 수 있는 메서드

##### protected

- 같은 클래스와 파생 클래스(상속받은)에서만 접근 가능
- 외부에서는 접근 불가
- 예시: 상속 구조에서 자식 클래스가 부모의 내부 기능을 활용할 때 사용

##### private

- 같은 클래스 내부와 friend 함수/클래스에서만 접근 가능
- 외부 및 파생 클래스에서는 접근 불가
- 예시: 내부 데이터(멤버 변수)를 보호하기 위해 사용

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

#### getter, setter

`private` 멤버의 변수를 제어하기 위해서는 `getter`와 `setter`가 있다.
멤버 변수를 바꿀때 `setter`를 사용하고, 값을 가져올 때 `getter`를 사용한다.
변수를 직접 제어하지 않고 데이터를 안전하게 다룰 수 있다.

#### 생성자

객체를 생성할 때 마다 한 번씩 자동으로 호출되는 특별한 멤버 함수이다.
보통 생성자는 필요한 멤버 변수를 초기화하거나 객체가 동작할 준비를 하기 위해 사용한다.
생성자는 반환형을 명시하지 않으며, class 이름과 동일한 이름을 가진 함수로 정의된다.
정의된 class 를 변수로 선언하면 메모리에 올라간 객체가 된다. 이를 인스턴스화 라고 한다.
객체가 생성될 때 멤버 변수를 포함해 필요한 정보들이 메모리에 올라간다. 이 작업이 완료되면 생성자가 호출된다.

::: tabs

@tab 정의

```cpp
// 클래스 정의
class Person {
private:
    string name;   // 멤버 변수 (속성)
    int age;

public:
    // 멤버 함수 (행동)
    void introduce() {
        cout << "이름: " << name << ", 나이: " << age  << endl;
    }

    // Getter
    int getName() { return name; }

    int getAge() { return age; }

    // Setter
    void setName(string newName) {
        name = newName;
    }

    void setAge(int newAge) {
        if (newAge > 0) age = newAge;
    }
};
```

@tab 구현 및 기본 생성자

```cpp
// 클래스 정의
class Person {
private:
    string name;   // 멤버 변수 (속성)
    int age;

public:
    // 멤버 함수 (행동)
    void introduce() {
        cout << "이름: " << name << ", 나이: " << age  << endl;
    }

    // Getter
    int getName() { return name; }

    int getAge() { return age; }

    // Setter
    void setName(string newName) {
        name = newName;
    }

    void setAge(int newAge) {
        if (newAge > 0) age = newAge;
    }

};

// 구현 단계
int main() {
  // 객체 생성 (생성자)
  // public에 생성자가 없어도 기본적으로 생성을 해준다.
  Person p1;

  // 접근제어 + 멤버 변수는 private라 직접 접근 불가 → Setter 로 값 설정
  p1.setName('형래');
  p1.setAge(30);

  // 멤버 함수 호출
  p1.introduce();

  // Getter로 값 가져오기
  cout << "나이만 따로 출력: " << p1.getAge() << endl;

  return 0;
}
```

@tab 매개변수 생성자

```cpp
// 클래스 정의
class Person {
private:
    string name;   // 멤버 변수 (속성)
    int age;

public:
    // 기본 매개변수가 있는 생성자
    // 선언만 하고 정의하지 않으면 에러 발생
    Person(string n = "김형래"; int a = 29) {
      name = n;
      age = a;
    }

    // 멤버 함수 (행동)
    void introduce() {
        cout << "이름: " << name << ", 나이: " << age  << endl;
    }

    // Getter
    int getName() { return name; }

    int getAge() { return age; }

    // Setter
    void setName(string newName) {
        name = newName;
    }

    void setAge(int newAge) {
        if (newAge > 0) age = newAge;
    }
};

// 구현 단계
int main() {
  // 생성자의 기본값을 사용해 객체 생성
  Person p1;
  // 생성자에 값을 지정하여 객체 생성
  Person p2('형래', 30);
  // 만약 생성자에 기본값이 없는데, 인자를 충분히 넘겨주지 않으면 에러가 발생한다.

  // 접근제어 + 멤버 변수는 private라 직접 접근 불가 → Setter 로 값 설정
  p1.setName('킴형래');
  p1.setAge(32);

  // 멤버 함수 호출
  p1.introduce();

  // Getter로 값 가져오기
  cout << "나이만 따로 출력: " << p1.getAge() << endl;

  return 0;
}
```

:::

::: tip

- 꼭 모든 멤버 변수를 private 로 해야 하는 것은 아니지만, 정보 은닉을 위해 기본적으로 private 에 두어야한다.

- 멤버 함수도 항상 public 일 필요는 없다. 클래스 내부에서만 사용되는 보조 함수는 private 로 둘 수 있다.

- 외부에서 멤버 변수에 접근해야 할 경우, `getter`와 `setter` 함수를 만들어 안전하게 접근하도록 한다.

:::

#### 코드 나누기

헤더 파일에 class 를 정의한다.
소스 파일에 세부 구현을 한다.

class를 헤더 파일에 정의할 때 가장 중요한 것은 class 가 중복 선언되지 않도록 하는 것이다.
헤더 파일을 여러 파일에서 사용하다 보면 class가 여러 번 정의될 수 있다.
이를 방지하기 위해 `#ifndef` (if not define) 라는 구문을 활용한다.

##### 헤더가드

`#ifndef OOO`

- OOO이 정의되어 있지 않은 경우에만 다음 코드를 수행하라는 의미이다.

`#define OOO`

- `#ifndef` 일 때 딱 한 번만 수행된다.

`#endif`

- `#ifndef` 가 끝났다는 것을 알리기 위해 사용한다.

헤더가드가 필요한 이유는 프로젝트에서 수십, 수백 개의 헤더가 서로 얽혀서 include 되는데, 중복 포함이 아주 쉽게 발생한다.
헤더 가드가 없으면 에러가 계속 터져서 유지보수가 힘들어진다.
헤더 가드는 중복 포함을 방지하는 핵심 개념이라서 매우 중요한 기본기이다.

실무에서는 `#ifndef` 방식 보다 간단한 `#pragma once` 를 더 많이 사용한다고 한다.

::: tabs

@tab #ifndef

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

@tab #pragma once

```cpp
// Person.h
#pragma once // #ifndef 보다 간단하게 사용

class Person {
public:
    void introduce() {}
};
```

:::

### 객체 지향 프로그래밍 {#oop}

C++의 class 는 C언어의 struct 를 확장하여 객체 지향적 특성을 추가한 개념이다.

`객체 지향 프로그래밍`은 영어로 `Object-Oriented Programming`, 줄여서 `OOP` 라고 한다.
프로그램을 객체(Object)라는 단위로 나누어 설계하고 구현하는 방법이다.
쉽게 표현하면, 현실 세계의 사물과 개념을 프로그램 속 객체로 표현하고, 이 객체들이 서로 협력해서 문제를 해결하는 방식으로 데이터 + 행동을 하나로 묶어 재사용성과 유지보수를 높이는 프로그래밍 패러다임이다.

::: tip 객체

`객체`는 클래스 라는 설계도로부터 만들어진 구체적인 실체(메모리에 올라간 상태)이다.
데이터(속성)와 그 데이터를 다루는 행동(메서드)을 함께 가진 독립적인 존재로 생각할 수 있다.
예를 들어 '자동차' 라는 완성품은 바퀴, 엔진, 핸들, 창문 등과 같은 여러 부품들로 구성된다.
이때 각각의 부품도 `객체`이며, 자동차 역시도 `객체`이다.
자동차는 여러 객체를 포함하는 `상위 객체`이며, 부품들은 `하위 객체` 라고 한다.
이런 관계를 객체 지향 프로그래밍에서는 `구성` 이라고 한다.

:::

#### 상속

상속 대상이 클래스를 기본클래스, 부모클래스 라고 부른다.
상속받는 클래스를 파생클래스, 자식클래스 라고 부른다.

자식 클래스보다 부모 클래스가 먼저 정의되고 초기화 되어 자식 클래스의 생성자는 부모 클래스의 생성자를 호출할 수 있다.

##### 생성자와 초기화 순서

멤버 초기화 리스트

- 생성자 본문 실행 전에 수행된다.
- 멤버 변수들을 원하는 값으로 초기화 할 수 있다.

```cpp
class A {
    int x;
public:
    A(int val) : x(val) { } // 멤버 초기화 리스트
};
```

상속 시 초기화 순서

- 자식 클래스 객체를 만들면 부모 클래스 생성자가 먼저 호출됩니다.
- 그 다음에 자식 클래스의 멤버 초기화 리스트와 생성자가 실행됩니다.

```cpp
class Parent {
public:
    Parent() { std::cout << "Parent 생성자\n"; }
};

class Child : public Parent {
public:
    Child() { std::cout << "Child 생성자\n"; }
};

int main() {
    Child c;
    // Parent 생성자 출력 후 Child 생성자 출력
}
```

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
```

#### 소멸자

소멸자는 객체가 수명을 다했을때 자동으로 호출되는 특별한 함수이다. 객체가 죽을 때 마지막으로 실행되는 정리(clean-up) 코드이다.

C++은 메모리 관리가 자동이 아니라서, `new` 로 할당한 메모리를 반드시 `delete` 로 해제해야 한다.
소멸자를 잘 활용하면 객체가 사라질 때 자동으로 정리되므로 메모리 누수(memory leak)를 막을 수 있게 된다.
특히 상속 구조에서 부모 클래스의 소멸자가 `virtual` 이 아니면, 자식 클래스의 소멸자가 제대로 호출되지 않아 리소스가 누수될 수 있다.

##### 소멸자 특징

- 클래스 이름 앞에 `~` 를 붙여서 정의한다.

```cpp
class MyClass {
public:
    ~MyClass() {
        std::cout << "소멸자 호출!" << std::endl;
    }
};
```

- 객체가 스코프를 벗어나거나 `delete` 로 메모리를 해제할 때 자동으로 실행된다.
- 주로 동적 메모리 해제, 파일 닫기, 리소스 반환 같은 정리 작업을 담당한다.

##### 상속과 소멸자의 관계

**호출 순서**

- 생성자: 부모 → 자식 순서
- 소멸자: 자식 → 부모 순서

부모가 먼저 태어나고, 자식이 먼저 죽는 구조이다.

**다형성과 `virtual` 소멸자**

- 부모 클래스 포인터로 자식 객체를 가리킬 때, 소멸자가 `virtual` 이 아니면 부모 소멸자만 호출된다.
- 자식 클래스에서 할당한 리소스가 정리되지 않아 메모리 누수가 발생할 수 있다.
- 상속 구조에서 부모 클래스으 ㅣ소멸자는 반드시 `virtual` 로 선언하는게 안전한 습관이다.

```cpp
class Parent {
public:
    virtual ~Parent() { std::cout << "Parent 소멸자\n"; }
};

class Child : public Parent {
public:
    ~Child() { std::cout << "Child 소멸자\n"; }
};

int main() {
    Parent* p = new Child();
    delete p; // 자식 → 부모 순서로 소멸자 호출
    // 'Child 소멸자' 출력 후 'Parent 소멸자' 출력
}
```

소멸자는 상속과 직접적으로 연결돼 있고, 특히 다형성 상황에서 `virtual` 소멸자를 쓰는게 매우 중요하다.

:::info virtual

`virtual`은 C++에서 다형성(polymorphism)을 지원하기 위해 쓰이는 키워드이다.

- 어떤 함수(특히 소멸자)를 `virtual`로 선언하면, 실체 객체 타입에 맞는 함수가 호출된다.
- 부모 클래스 포인터로 자식 객체를 가리킬 때, 부모 함수 대신 자식 함수가 실행되도록 보장해준다.

```cpp
class Parent {
public:
    ~Parent() { std::cout << "Parent 소멸자\n"; }
};

class Child : public Parent {
public:
    ~Child() { std::cout << "Child 소멸자\n"; }
};

int main() {
    Parent* p = new Child();
    delete p; // 부모 포인터로 자식 객체 삭제
    // 이 경우 Child 소멸자가 호출되지 않아 자식 클래스가 가진 리소스가 정리되지 않는다. → 메모리 누수 발생 가능
    // ~Parent 앞에 virtual 을 추가해 자식 클래스의 소멸자가 먼저 호출되도록 한다.
}
```

:::
