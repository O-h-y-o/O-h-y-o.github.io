---
date: 2026-07-08
category:
  - Camp
  - Unreal
order: 5
---

# 캠프 9일차

## Atani 퀴즈

<AtaniQuiz :questionIds="[5, 6, 7, 8, 9]" />

## 프로그래머스 코테 연습

<programmers-coding :test-id="87389">

::: tabs

@tab 풀이

n을 x로 나눈 값이 1인 값 하나만 찾으면 된다.
반복문을 돌면서 `n % x == 1` 을 만족하는 x를 찾으면 바로 반환하여 함수를 종료한다.

```cpp
int solution(int n) {
    for(int x = 2; x < n; x++) {
        if(n % x == 1) return x;
    }
}
```

:::

</programmers-coding>

## C++

### 다형성

`다형성(polymorphism)`은 `하나의 이름이 여러 형태로 동작할 수 있는 능력`을 의미한다.
크게 컴파일 시점(정적)과 실행 시점(동적) 다향성으로 나뉜다.
같은 함수나 연산자가 상황에 따라 다르게 동작하거나, 부모 클래스 포인터로 자식 클래스 객체를 다룰 수 있게 해준다.

**다형성이 중요한 이유**

- 코드 재사용성: 같은 인터페이스로 다양한 객체를 처리 가능
- 유연성: 새로운 클래스 추가 시 기존 코드 수정 없이 확장 가능
- 가독성: 연산자 오버로딩으로 직관적인 코드 작성 가능
- 객체지향 프로그래밍의 핵심: 캡슐화, 상속, 추상화와 함께 OOP의 4대 기둥 중 하나

#### 다형성의 두 가지 유형

1. 컴파일 시 다형성 (Compile-Time Polymorphism)

- 함수 오버로딩 (Function Overloading)
  같은 이름의 함수가 매개변수 타입/개수에 따라 다르게 동작한다.

```cpp
class Calculator {
public:
    int add(int a, int b) { return a + b; } // 정수가 들어오면 정수 덧셈
    double add(double a, double b) { return a + b; } // 실수가 들어오면 실수 덧셈
};
```

- 연산자 오버로딩 (Operator Overloading)
  사용자 정의 타입에 대해 `+`, `-`, `==` 같은 연산자를 새롭게 정의할 수 있다.

```cpp
class Complex { // 클래스(사용자 정의 자료형) 생성
//  복소수(Complex number)를 표현하기 위한 설계도, 복소수는 실수부(real)와 허수부(imag) 두 개의 값으로 이루어져 있다.

    double real, imag; // 클래스 안에 있는 멤버 변수
public:
    Complex(double r=0, double i=0): real(r), imag(i) {}
    // 객체를 만들 때 자동으로 호출되는 생성자(Constructor)
    // r=0, i=0 → 기본 값을 지정하였기 때문에 인자가 없으면 (0, 0) 복소수가 만들어진다.
    // : real(r), imag(i) → 멤버 초기화 리스트, 전달받은 값을 real, imag 에 넣는다.

    Complex operator+(const Complex& other) {
        return Complex(real + other.real, imag + other.imag);
    }
    // 연산자 오버로딩, + 연산자를 Complex 끼리 더할 수 있도록 정의
    // const Complex& other → 다른 복소수 객체를 참조로 받는다.
    // 함수 안에서는 real + other.real, imag + other.imag 를 계산해서 새로운 Complex 객체를 반환한다.
};

int main() {
    Complex c1(1.0, 2.0); // 실수부 1.0, 허수부 2.0
    Complex c2(3.0, 4.0); // 실수부 3.0, 허수부 4.0

    Complex result = c1 + c2; // operator+ 호출됨
    // result는 (1+3, 2+4) = (4, 6)
    // c1 + c2 를 하면 두 복소수의 실수부끼리, 허수부끼리 더한 새로운 복소수가 나온다.
}
```

2. 실행 시 다형성 (Run-Time Polymorphism)

- 가상 함수 (Virtual Function)
  부모 클래스 포인터로 자식 클래스 객체를 가리킬 때, 실제 객체 타입에 따라 함수가 실행된다.

```cpp
class Animal { // 부모 클래스 Animal
public:
    virtual void sound() { cout << "Some sound\n"; } // 가상 함수, 부모 포인터로 자식 객체를 가리킬 때, 실제 객체 타입에 맞는 함수가 실행되도록 한다.
    virtual ~Animal() {} // 가상 소멸자, 부모 포인터로 자식 객체를 delete 할 때, 자식의 소멸자가 올바르게 호출되도록 보장한다.
};

class Dog : public Animal { // 부모 클래스 Animal을 상속받은 자식 클래스 Dog
public:
    void sound() override { cout << "Bark\n"; } // 부모의 sound() 를 재정의(오버라이드).
    // override 키워드는 컴파일러에게 '부모의 가상 함수와 정확히 일치하는 함수' 임을 알려준다.
};

Animal* a = new Dog(); // 부모 클래스 타입의 포인터 선언, Dog 객체를 동적 할당
// 부모 포인터로 자식 객체를 가리키는 상황, 다형성의 핵심

a->sound(); // a 는 Animal* 타입이지만 실제로는 Dog 객체를 가리킨다.
// sound() 는 가상 함수이기 때문에, 부모의 sound() 가 아닌 자식의 Dog::sound 가 호출된다.

delete a; // a 가 가리키는 객체를 메모리에서 해제
// 소멸자가 virtual 로 선언되어 있어서, Dog의 소멸자가 먼저 호출되고 그 다움 Animal 의 소멸자가 호출된다.
```

#### 순수 가상 함수

`= 0` 을 붙이면 순수 가상 함수가 된다.

부모 클래스에는 구현이 전혀 없어 이 함수는 반드시 자식 클래스에서 구현해야 한다 라는 뜻이다.
이런 부모 클래스는 추상 클래스(Abstract class)가 된다.
추상 클래스는 객체를 직접 만들 수 없고, 반드시 상속받은 자식 클래스에서 구현해야 한다.
순수 가상 함수가 하나라도 있으면 추상 클래스가 되지만, 다른 함수들은 일반 함수로 남겨도 되고, 꼭 순수 가상 함수로 만들 필요는 없다.
추상 클래스는 `이 클래스를 상속받는 애들은 반드시 이 기능을 제공해야 한다` 라는 규약을 강제하는 `인터페이스 역할`을 한다.
이는 팀 프로젝트에서 공통 규칙을 강제할 때 유용하다. → 모든 동물은 반드시 makeSound() 를 가져야 한다는 규칙을 코드 차원에서 보장할 수 있다.
기본 동작(일반 함수)도 함께 제공할 수 있다.

```cpp
#include <iostream>
using namespace std;

class Animal {
public:
    // 가상 함수
    // virtual void makeSound() {
    //     cout << "Animal makes a sound." << endl;
    // }

    virtual void makeSound() = 0; // 순수 가상 함수
};

class Dog : public Animal {
public:
    void makeSound() {
        cout << "Dog barks: Woof! Woof!" << endl; // 부모가 추상 클래스라 반드시 정의
    }
};

class Cat : public Animal {
public:
    void makeSound() {
        cout << "Cat meows: Meow! Meow!" << endl; // 부모가 추상 클래스라 반드시 정의
    }
};

int main() {
    // Animal* myAnimal = new Dog(); → 힙에 Dog 객체 생성, 부모 클래스 포인터로 Dog 객체를 가리킨다. 힙은 delete를 해야 삭제된다.
    Animal* myAnimal; // 포인터만 선언 (객체 없음) → 메모리에는 올라간다. → 가리키는 객체가 없으므로 인스턴스화 X
    Dog myDog; // Dog 객체가 스택 메모리에 생성 → 생성자가 호출되고 객체가 스택 프레임 안에 자리잡는다. (인스턴스화)
    Cat myCat; // Cat 객체가 스택 메모리에 생성

    myAnimal = &myDog; // 포인터가 스택에 있는 myDog 객체를 가리킨다.
    myAnimal->makeSound();  // Dog의 makeSound() 호출
    // → 를 쓰는 이유는 myAnimal 이 객체포인터 이기 때문이다. 객체였으면 . 연산자를 통해 접근한다. 객체 포인터는 → 연산자로 접근한다.
    // 이미 인스턴스화 된 myDog 객체의 주소를 포인터에 저장하는 동작이기에 새로운 인스턴스를 만든건 아니다.

    myAnimal = &myCat; // 포인터가 스택에 있는 myCat 객체를 가리킨다.
    myAnimal->makeSound();  // Cat의 makeSound() 호출
    // 스택은 자동으로 소멸된다.

    return 0;
}
```

#### 잘못된 설계

부모가 행동(규약)을 정했을 때, 자식은 다른 행동을 할 수는 있다. → 다형성 자체는 성립
하지만 이는 잘못된 설계로서 다형성의 의미를 깨뜨려 객체지향 설계 원칙을 위반하는 문제이다.
부모의 sound()를 사용하는 곳에서, 자식 타입을 넣어도 프로그램의 의미가 깨지지 않아야 한다는 원칙이다.
이를 객체지향 설계에서 `Liskov Substitution Principle (리스코프 치환 원칙)` 라고 한다.

```cpp
#include <iostream>
using namespace std;

class Animal {
public:
    virtual void sound() = 0; // 모든 동물은 반드시 소리를 내야 한다는 규약
};

class Dog : public Animal {
public:
    void sound() override {
        // 규약은 "소리를 내라"인데, 전혀 다른 행동을 넣음 → 설계 원칙 위반, 다형성은 성립하지만 의미가 깨짐
        cout << "Dog digs a hole instead of barking!" << endl;
    }
};

int main() {
    Animal* a = new Dog();
    a->sound(); // "Dog digs a hole instead of barking!"
    delete a;
}
```

### 자원 관리

컴퓨터 에서의 자원은 Memory 를 의미한다.
Memory는 유한한 자원이기 때문에 관리가 필요하다.
일반 변수들은 대부분 스택 메모리 공간을 차지한다.
스택 메모리의 가장 큰 특징은, 변수의 생존 주기가 끝나면 선언 시 할당되었던 메모리가 자동으로 회수된다.

#### 스택과 힙

**스택을 쓰는 경우**

- 짧은 생명주기: 함수 안에서만 쓰고 함수가 끝나면 자동으로 없어져도 되는 객체
- 간단한 객체: 크기가 작고 관리가 쉬운 경우
- 자동 메모리 관라: 소멸자를 자동으로 호출해주므로 delete 같은 수동 관리가 필요 없다.

```cpp
void foo() {
    Dog myDog; // 스택에 객체 생성 (인스턴스화)
    myDog.makeSound();
} // foo 끝나면 myDog 자동 소멸
```

**힙을 쓰는 경우**

- 긴 생명주기: 함수가 끝나고 계속 살아있어야 하는 객체
- 동적 크기: 런타임에 크기를 결정해야 하는 경우 (배열, 큰 데이터 구조)
- 공유 객체: 여러 함수나 클래스에서 같은 객체를 가리켜야 할 때
- 수동 관리 필요: `new` 로 만들고 반드시 `delete` 로 해제해야 한다.

```cpp
Dog* myDog = new Dog(); // 힙에 객체 생성 (new Dog → 인스턴스화)
// new 는 주소를 반환하기 때문에 포인터로 반환된 주소값을 받아주어야한다.
// heap은 동적으로 메모리를 할당한다.
myDog->makeSound();
// 다른 함수에서도 myDog을 계속 사용 가능
delete myDog; // 직접 소멸
```

#### Dangling Pointer

더 이상 유효하지 않은 메모리를 가리키고 있는 포인터를 뜻한다.
Dangling Pointer는 이미 해제된 메모리를 가리키므로, 접근하면 예측 불가능한 동작이 발생한다.
프로그램이 크래시하거나, 잘못된 값이 나오거나, 보안 취약점으로 이어질 수 있다.

::: tabs

Dangling Pointer 가 생기는 상황

@tab delete 후 재참조

```cpp
int* p = new int(10);
delete p;       // 메모리 해제
cout << *p;     // 이미 해제된 메모리를 참조 → Dangling Pointer
```

@tab 스택 변수 주소를 함수 밖에서 사용할 때

```cpp
int* foo() {
    int x = 42;   // 스택에 생성
    return &x;    // 함수 끝나면 x는 소멸 → Dangling Pointer
}

int* p = foo();
cout << *p;      // 불가
```

@tab double free (중복해제)

```cpp
int* p = new int(10);
delete p;
delete p;        // 이미 해제된 메모리를 또 해제 → Dangling Pointer
```

:::

**예방 방법**

1. delete 후에는 포인터를 nullptr 로 초기화

```cpp
delete p;
p = nullptr; // 안전하게 초기화
```

2. 함수에서 스택 변수 주소를 반환하지 않기
3. 스마트 포인터(std::unique_ptr, std::shared_ptr) 사용 → 자동으로 메모리 관리

#### Memory Leak

Memory Leak(메모리 누수)는 프로그램이 힙 메모리에 `new`로 공간을 할당했는데, 그걸 끝까지 `delete` 로 해제하지 않고 잃어버려서 다시 접근할 수 없는 상태가 되는 것을 의미한다.
결국 프로그램이 점점 더 많은 메모리를 차지하게 되고, 이는 성능 저하나 크래시로 이어질 수 있다.

```cpp
#include <iostream>
using namespace std;

class Dog {
public:
    Dog() { cout << "Dog created" << endl; }
    ~Dog() { cout << "Dog destroyed" << endl; }
};

int main() {
    Dog* d = new Dog(); // 힙에 Dog 객체 생성
    // delete d;        // 해야 하는데 안 함 → Memory Leak 발생
}
```

```cpp
int main() {
    int* arr = new int[100]; // 힙에 배열 생성
    // delete[] arr;         // 해제를 안 하고 함수 종료
    return 0;                // arr 포인터는 사라지지만 메모리는 남음 → 더 이상 이 메모리를 찾을 수 없음
}
```

#### 스마트 포인터

스마트 포인터는 C++에서 메모리 관리 자동화를 위해 제공되는 클래스 템플릿이다.
직접 `new / delete`를 쓰지 않아도, 객체의 생명주기를 자동으로 관리해줘서 메모리 누수나 dangling pointer 문제를 크게 줄여준다.

::: tabs

@tab std::unique_ptr

- 하나의 포인터만 객체를 소유할 수 있다. (소유권 독점)
- 복사 불가능, 이동만 가능
- 객체가 더 이상 필요 없을 때 자동으로 delete

```cpp
#include <memory>
#include <iostream>
using namespace std;

class Dog {
public:
    Dog() { cout << "Dog created" << endl; }
    ~Dog() { cout << "Dog destroyed" << endl; }
    void bark() { cout << "Woof!" << endl; }
};

int main() {
    unique_ptr<Dog> d = make_unique<Dog>(); // new Dog() 대신
    d->bark();
    // main 끝나면 자동으로 delete 호출
}
```

@tab std::shared_ptr

- 여러 스마트 포인터가 같은 객체를 공유할 수 있다.
- 참조 카운트를 관리 → 마지막 포인터가 사라질 때 객체 자동 삭제
- 복사 가능

```cpp
#include <memory>
#include <iostream>
using namespace std;

class Dog {
public:
    Dog() { cout << "Dog created" << endl; }
    ~Dog() { cout << "Dog destroyed" << endl; }
};

int main() {
    shared_ptr<Dog> d1 = make_shared<Dog>();
    {
        shared_ptr<Dog> d2 = d1; // 같은 Dog 공유
        cout << "Dog is shared" << endl;
    } // d2 소멸 → 참조 카운트 감소
    // d1이 남아있으므로 아직 살아있음
} // d1 소멸 → 참조 카운트 0 → delete 자동 호출
```

@tab std::weak_ptr

- `shared_ptr`과 함께 쓰인다.
- 참조 카운트에는 포함되지 않는다. → 객체 소유하지 않고 `약한 참조`만 유지 (소유권 없음)
- 객체가 이미 소멸되었는지 확인할 때 사용한다.

```cpp
#include <memory>
#include <iostream>
using namespace std;

class Dog {
public:
    Dog() { cout << "Dog created" << endl; }
    ~Dog() { cout << "Dog destroyed" << endl; }
};

int main() {
    shared_ptr<Dog> d1 = make_shared<Dog>();
    weak_ptr<Dog> w = d1; // 약한 참조
    if (auto s = w.lock()) { // 객체 살아있으면 shared_ptr을 반환하여 s는 shared_ptr로 승격, 죽었으면 nullptr 반환
        cout << "Dog is alive" << endl;
    }
}
```

:::

#### 복사

얕은 복사와 깊은 복사는 객체를 복사할 때 메모리를 어떻게 다루느냐의 차이이다.

##### 얕은 복사

- 객체의 값(특히 포인터 값)만 그대로 복사
- 원본과 복사본이 같은 메모리 주소를 가리키게 됨
- 하나를 수정하면 다른 하나도 영향을 받음
- 원본과 복사본이 같은 자원을 공유하다가, 둘 다 소멸 시점에 delete 를 하면 double free 에러가 발생할 수 있다.

```cpp
#include <iostream>
using namespace std;

class Dog {
public:
    int* age;
    Dog(int a) { age = new int(a); }
    ~Dog() { delete age; }
};

int main() {
    Dog d1(5);
    Dog d2 = d1; // 얕은 복사 (기본 복사 생성자)
    cout << *d1.age << ", " << *d2.age << endl; // 둘 다 같은 age 메모리 가리켜 위험하다.
}
```

##### 깊은 복사

- 객체가 가진 실제 데이터까지 새로 복사해서 독립적인 메모리를 만든다.
- 원본과 복사본이 서로 다른 메모리를 가지므로 안전
- 복사 생성자를 직접 구현해서 사용

```cpp
#include <iostream>
using namespace std;

class Dog {
public:
    int* age;
    Dog(int a) { age = new int(a); }
    Dog(const Dog& other) { // 깊은 복사 생성자
        age = new int(*other.age);
    }
    ~Dog() { delete age; }
};

int main() {
    Dog d1(5);
    Dog d2 = d1; // 깊은 복사
    *d2.age = 10;
    cout << *d1.age << endl; // 5 (원본은 그대로)
    cout << *d2.age << endl; // 10 (복사본은 독립적)
}
```

#### 언리얼 엔진의 메모리 관리

언리얼 엔진은 `UObject` 기반 오브젝트를 자동으로 관리하기 위해 자체 가비지 컬렉션 시스템을 사용한다.
개발자가 직접 `delete` 를 호출하지 않아도 메모리 정리를 수행한다.
최신 버전에서는 점진적 GC와 병렬 GC 같은 최적화 기능을 제공해 게임 플레이 중 프레임 드랍을 줄이고 안정적인 메모리 관리를 지원한다.

::: info 메모리 관리 개요

UObject 기반 관리

- 언리얼 엔진에서 대부분의 게임 오브젝트(액터, 컴포넌트, 애셋)는 UObject를 상속받는다.
- 엔진의 가비지 컬렉터가 이들을 추적하고, 더 이상 참조되지 않으면 자동으로 소멸시킨다.
- 일반 C++ 객체(new / delete)는 엔진이 관리하지 않으므로 개발자가 직접 해제해야 한다.

레퍼런스 추적 방식

- `UPROPERTY` 매크로로 선언된 포인터는 가비지 컬렉션이 추적 가능하다.
- 원시 포인터를 쓰면 GC가 인식하지 못해 메모리 누수나 잘못된 참조 위험이 발생한다.
- 최신 UE에서는 `TObjectPtr` 을 권장해 GC와 안전하게 연동한다.

:::

##### 가비지 컬렉션

프로그래밍 언어와 엔진에서 더 이상 사용되지 않는 메모리를 자동으로 찾아내고 해제하는 메모리 관리 기법이다.
new로 메모리를 할당하면, 그 메모리는 프로그램이 직접 delete 를 호출하기 전까지 계속 남아있다.
어떤 객체가 더 이상 참조되지 않으면 사실상 쓸모없는 메모리가 된다.
GC는 이런 도달 불가능한 객체를 찾아내 메모리를 해제시켜 준다.
개발자가 직접 delete 를 하지 않아도 엔진이나 런타임이 알아서 청소해주는 시스템이다.

**일반적인 GC 동작 방식**

1. 루트 집합(Root Set) 찾기
   - 현재 실행 중인 스레드, 전역 변수, 스택 변수 같은 `시작점`을 루트로 삼는다.
2. 도달 가능성 분석
   - 루트에서 따라갈 수 있는 모든 객체를 `살아있는 객체`로 표시
3. 청소
   - 표시되지 않은 객체는 더 이상 접근할 수 없으므로 메모리에서 해제

:::info Mark and Sweep 알고리즘

Mark and Sweep 알고리즘은 GC의 가장 기본적인 방식 중 하나이다.

Mark 단계

- GC가 루트 집합에서 시작해서 현재 접근 가능한 모든 객체를 따라가며 살아있는 객체에 표시
  루트 집합은 스레드, 전역 변수, 스택 변수, UPROPERTY로 선언된 포인터 같은 것들
- 이 객체는 아직 쓰이고 있다 라는 표시를 붙이는 과정이다.

Sweep 단계

- 표시되지 않은 객체는 죽은 객체로 간주하여 GC가 이들을 메모리에서 해제(sweep)해서 공간을 반환해준다.
- 동시에 표시된 객체는 그대로 유지한다.

:::

**장점**

- 개발자가 직접 delete를 안해도 돼 메모리 누수 방지에 유리
- Dangling Pointer 같은 위험이 줄어든다.

**단점**

- GC가 실행될 때 잠시 프로그램이 멈출 수 있다.
- 성능에 영향을 줄 수 있어, 게임 엔진 같은 실시간 시스템에는 최적화가 중요하다.

**언리얼 엔진에서의 GC**

- 언리얼은 UObject 기반 오브젝트를 GC로 관리한다.
- UPROPERTY 로 선언된 포인터는 GC가 추적해서 필요 없을 때 자동으로 해제한다.
- 개발자가 직접 delete 를 호출하지 않고, 엔진이 주기적으로 GC를 돌려서 메모리를 정리해준다.

#### 리플렉션 시스템

리플렉션 시스템은 언리얼 엔진에서 객체와 클래스 정보를 런타임에 동적으로 조회하고 활용할 수 있게 해주는 메타데이터 시스템이다.
코드에 정의된 클래스와 속성을 엔진이 스스로 이해하고 다룰 수 있도록 하는 장치다.

일반적인 C++은 컴파일 시점에 타입이 결정돼서 런타임에 이 객체가 어떤 클래스인지, 어떤 변수와 함수가 있는지를 알기가 어렵다.
언리얼은 에디터, 블루프린트, 네트워크 복제, 직렬화(저장/로드) 같은 기능을 위해 런타임에 클래스 정보를 알아야한다.
리플렉션 시스템을 도입해서, 엔진이 객체의 구조를 스스로 탐색할 수 있게 만든 것이다.

**동작 방식**

1. UCLASS / USTRUCT / UENUM / UPROPERTY / UFUNCTION / GENERATED_BODY() 매크로

클래스, 구조체, 열거형, 변수, 함수에 메타데이터를 붙인다.

```cpp
UCLASS()
class AMyActor : public AActor {
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 Health;

    UFUNCTION(BlueprintCallable)
    void TakeDamage(int32 Amount);
};
// 엔진이 Health와 TakeDamage 를 인식해서 블루프린트나 에디터에서 노출 가능하다.
```

2. 리플렉션 데이터 생성

- 빌드 시 Unreal Header Tool(UHT)이 코드를 분석해서 메타데이터를 생성한다.
- 엔진은 이 정보를 통해 런타임에 클래스 구조를 탐색할 수 있다.

3. 런타임 활용

- 블루프린트에서 변수/함수 노출
- 직렬화(저장/로드)
- 네트워크 복제
- 에디터에서 속성 편집 가능

**장점**

- 블루프린트 연동: C++ 코드를 블루프린트에서 바로 사용 가능
- 직렬화 지원: 저장/로드 시 자동으로 변수 값 처리
- 네트워크 복제: 멀티플레이에서 변수 자동 동기화
- 에디터 친화적: 디자이너가 에디터에서 변수와 함수를 쉽게 다룸

### 함수 오버로딩

C++에서는 특정 규칙만 지키면 동일한 이름의 함수로 여러 개를 정의할 수 있다.
C++은 함수 이름과 매개변수 타입 정보를 함께 사용해 구분하기 때문이다.
함수 이름 구분을 위해 내부적으로 고유한 이름을 부여하는 것을 네임 맹글링(Name Mangling)이라고 한다.
함수 오버로딩이 적용되려면 이름이 같아도 각 함수가 명확히 구분되어야 한다.
매개변수의 타입이 다르거나, 개수가 다른 경우에 오버로딩이 가능하다.
함수의 반환형만으로는 오버로딩이 성립하지 않는다.

#### 오버로딩 안되는 경우

::: tabs

@tab 경우1

타입 변환이 가능한 매개변수로 인해 두 개 이상의 오버로딩된 함수가 호출 후보가 되는 경우

```cpp
void print(double a) {
    cout << "double: " << a << endl;
}

void print(long a) {
    cout << "long: " << a << endl;
}
// print(10) 인 경우, long, double 모두 들어갈 수 있음
```

@tab 경우2

디폴트 매개변수로 인해 함수 호출 형태가 중복되는 경우

```cpp
void display(int a, int b = 5) {
    cout << a << ", " << b << endl;
}

void display(int a) {
    cout << a << endl;
}
// int b = 5 라는 디폴트 값이 있어서 어디에 들어가도 상관없음
```

@tab 경우3

매개변수의 타입만 포인터와 배열로 다른 경우

```cpp
void print(int* arr) {
    cout << "포인터 호출됨" << endl;
}

void print(int arr[]) {
    cout << "배열 호출됨" << endl;
}
// 배열은 포인터 취급도 되기때문에 둘다 들어갈 수 있음
```

@tab 경우4

함수의 반환 타입만 다른 경우

```cpp
int getValue() {
    return 10;
}

double getValue() {
    return 3.14;
}
// 반환 타입만 달라 어떤걸 해야할지 판단불가
```

:::

#### 오버로딩 순서

컴파일러는 최대한 변환할 수 있는 함수를 찾으려고 노력한다.
C++ 에서는 명확한 우선순위 규칙에 따라 호출할 함수를 결정한다.

<naive-provider>
  <n-steps>
    <n-step
      title="정확한 매칭"
    />
    <n-step
      title="타입 승격 변환"
    />
    <n-step
      title="표준 타입 변환"
    />
    <n-step
      title="사용자 정의 타입 변환"
    />
  </n-steps>
</naive-provider>

::: tabs

@tab 순서1

**정확한 매개변수 타입 일치**

호출 인자 타입과 매개변수 타입이 정확히 일치하는 경우

```cpp
void print(int a) {
    cout << "정확한 타입(int) 호출됨" << endl;
}

void print(double a) {
    cout << "double 타입 호출됨" << endl;
}

print(10); // 정확한 타입 int 일치
```

@tab 순서2

**타입 승격 변환**

값이 손실되지 않는 방향으로 변환하는 것을 승격이라고 한다.

char or short → int
float → double
bool → int

```cpp
void print(int a) {
    cout << "int 타입 호출됨" << endl;
}

void print(char a) {
    cout << "char 타입 호출됨" << endl;
}

short s = 10;
print(s); // short 타입이 없기 때문에 int로 승격 변환
```

@tab 순서3

**표준 타입 변환**

승격보다는 조금 더 광범위하다. 값 손실이 발생할 수 있다.

int → double
double → int
double → float

```cpp
void print(int a) {
    cout << "int 버전 호출됨: " << a << endl;
}

void print(string a) {
    cout << "string 버전 호출됨: " << a << endl;
}
```

@tab 순서4

**사용자 정의 타입 변환**

클래스 타입의 변환 함수나 생성자 등을 통해 이뤄지는 변환

```cpp
class MyNumber {
public:
    operator int() const { return 42; } // 연산자 오버로딩 → int 타입으로 변환한다. → 42를 반환한다.
};

void print(int a) {
    cout << "int 타입 호출됨, 값: " << a << endl;
}

void print(double a) {
    cout << "double 타입 호출됨, 값: " << a << endl;
}

MyNumber num;
print(num); // 클래스 타입이 int로 변환
```

:::

### 템플릿

C++의 템플릿은 `STL`의 기반이자 `제네릭 프로그래밍`을 가능하게 하는 핵심 기능으로, 함수나 클래스를 특정 타입에 의존하지 않고 작성할 수 있게 해주며 컴파일 시점에 실제 타입별 코드로 `인스턴스화` 된다.
코드 재사용성과 타입 안전성을 동시에 확보하는 강력한 도구이다.

::: tip 제네릭 프로그래밍
제네릭 프로그래밍(Generic Programming)은 특정 타입에 의존하지 않고, 다양한 타입에 대해 동작할 수 있는 일반화된 코드 작성 기법을 의미한다.
:::

**기본 개념**

- 정의: 타입을 매개변수로 받아서 일반화된 함수나 클래스를 작성하는 문법
- 작동 방식: 컴파일러가 호출 시점에 구체적인 타입을 대입해 실제 함수를 생성 → 인스턴스화
- 목적: 같은 로직을 여러 타입에 대해 반복 작성하지 않고, 한 번의 정의로 다양한 타입을 지원

**장점**

- 코드 재사용성 극대화
- 타입 안정성 확보
- 컴파일 시 최적화 → 런타임 오버헤드 없음

**단점**

- 컴파일 시간 증가
- 에러 메시지가 복잡하고 이해하기 어렵다.
- 지나치게 복잡한 템플릿은 가독성이 저하된다.

::: tabs

@tab 함수 템플릿

```cpp
template <typename T>
T minimum(const T& a, const T& b) {
    return (a < b) ? a : b;
}

int main() {
    int x = minimum(3, 5);       // int 버전 생성
    double y = minimum(2.1, 3.4); // double 버전 생성
    // 여기서 호출 시점에 T 가 int, double 로 대체된다.
}
```

@tab 클래스 템플릿

`Box<T>`는 타입에 따라 다른 클래스 버전이 생성된다.
STL의 `vector<T>`, `map<K,V>` 등이 모두 클래스 템플릿 기반이다.

```cpp
template <typename T>
class Box {
    T value;
public:
    Box(T v) : value(v) {}
    T get() const { return value; }
};

Box<int> b1(10);
Box<std::string> b2("Hello");
```

@tab 템플릿 특수화

특정 타입에 대해 다른 구현 제공 가능

```cpp
template<> class Box<bool> {
    bool value;
public:
    Box(bool v) : value(v) {}
    std::string get() const { return value ? "true" : "false"; }
};
```

@tab 비형식 매개변수

타입이 아닌 값을 매개변수로 받을 수 있다.

```cpp
template<int N>
class Array {
    int data[N];
};
Array<10> arr; // 크기가 10인 배열
```

@tab 가변 템플릿

매개변수 개수를 제한 없이 받을 수 있다.

```cpp
template<typename... Args>
void printAll(Args... args) {
    (std::cout << ... << args) << std::endl;
}
```

:::

### STL

STL(Standard Template Library)은 C++ 표준 라이브러리의 일부로, `컨테이너, 알고리즘, 반복자` 템플릿 기반 구성 요소를 포함한다.
STL을 활용하면 다양한 자료구조와 알고리즘을 직접 구현하지 않고도 사용할 수 있다.

#### 컨테이너

데이터를 담는 자료구조 이다.

모든 컨테이너는 템플릿으로 구현되어 있어 다양한 타입의 데이터를 저장할 수 있다.
모든 컨테이너는 메모리 관리를 내부적으로 한다. 사용 시 메모리 해제를 고려하지 않아도 된다.
대부분 컨테이너는 반복자를 제공한다. 내부 구현을 몰라도 동일한 방식으로 컨테이너를 순회할 수 있다.

##### 벡터

벡터는 배열과 매우 유사한 컨테이너이다.

- 템플릿 클래스로 구현되어 특정 타입에 종속되지 않는다.
- 삽입되는 원소 개수에 따라 내부 배열의 크기가 자동으로 조정된다.
- 임의 접근이 가능하다. → array[2] 배열 첨자 연산자를 통해 접근
- 삽입/삭제는 맨 뒤에 하는게 좋다. 중간 삽입이나 삭제는 배열 복사가 필요하므로 비효율적이다.

```cpp
#include <vector>

vector<int> vec1; // 기본 생성 및 초기화 없이 선언
vector<int> vec2(5, 10); // 크기 5, 모든 원소가 10으로 초기화
vector<int> vec3 = {1, 2, 3, 4, 5}; // 리스트 초기화로 벡터 선언
vector<int> vec4(vec3);  // vec3의 복사본 생성, vec4 = vec3 → 대입

// 2차원 벡터 초기화
vector<vector<int>> vec2D(3, vector<int>(4, 7)); // 3x4 크기의 행렬 생성, 모든 원소가 7로 초기화

// 벡터 끝에 원소 추가
vector<int> vec5;
vec5.push_back(10);
vec5.push_back(20);
vec5.push_back(30);

for(int num : vec5) { // vec5의 크기만큼 반복문 수행
    cout << num << endl;
}

vec5.pop_back();
vec5.pop_back();
vec5.pop_back(); // 3번의 pop_back() 으로 vec5은 이제 빈 배열

// 배열의 사이즈
vector<int> vec6 = { 10, 20 ,30 };
cout << vec6.size() << endl; // 3 출력
vec6.push_back(40);
cout << vec6.size() << endl; // 4 출력
vec6.pop_back();
cout << vec6.size() << endl; // 3 출력

// 벡터의 특정 구간의 원소를 제거 함수
// 벡터의 성능을 낮추기때문에 되도록 사용하지 말아야한다.
vector<int> vec7 = { 10, 20, 30, 40, 50};
vec7.erase(vec.begin() + 1); // 20 삭제
vec7.erase(vec.begin() + 1, vec.begin() + 3); // 1번째부터 3번째 인덱스까지 삭제 → 30, 40 삭제 (이전 범위까지만 포함한다)
vec7.clear(); // 전부 삭제
```

#### 맵

특정 키를 사용하여 값을 검색하는 기능을 제공하는 대표적인 연관 컨테이너이다.
배열은 정수형 인덱스를 활용하여 특정 위치의 값을 빠르게 찾아주지만, 맵은 키를 활용해 값과 쌍으로 저장하고 검색한다.

**주요 특성**

- 키, 값 쌍은 pari<const Key, Value> 형태로 저장된다.
- 키 값을 기준으로 내부 데이터가 자동으로 정렬된다.
- 중복된 키 값을 허용하지 않는다.

맵을 선언할 때는 키-값 쌍을 저장하기 위해 키 타입과 값 타입 두 가지를 지정해야 한다.
두 타입은 동일할 수도 있고, 서로 다를 수도 있으며 키 타입은 비교 연산이 가능해야 한다.

```cpp
#include <iostream>
#include <map>
using namespace std;

map<int, string> studentMap;

studentMap[101] = "Alice";
studentMap.insert({104, "Echo"});
studentMap[103] = "Charlie";
studentMap.insert(make_pair(106, "Lee"));
studentMap[102] = "Bob";
studentMap.insert(make_pair(105, "Boki"));
// 맵은 키 순으로 오름차순 정렬된다. 101, 102, 103, 104, 105, 106

for (const auto& pair : studentMap) {
    cout << pair.first << pair.second << endl;
}

map<int, string> map12 = {
    {1, "Alice"},
    {2, "Charlie"},
    {3, "Bob"}
};

map12.size(); // 현재 크기 출력 → 3

int key = 2;
auto it = map12.find(key); // 있으면 해당 원소를 가리키는 반복자(iterator) 반환 → 포인터 같은 객체, 없으면 end() 반복자를 반환한다.

if(it != map12.end()) {
    cout << it->first << it->second << endl;
} else {
    ...
}

map12.erase(2); // 키가 2인 데이터를 삭제
map12.clear(); // 전부 삭제

```

#### 알고리즘

STL은 다양한 컨테이너와 독립적으로 동작하는 범용 알고리즘을 제공한다.
특정 원소 값을 찾거나, 정렬을 하는 등의 기능을 STL에서 바로 사용할 수 있다.
이것이 가능한 이유는 반복자 덕이다.
반복자는 컨테이너의 요소를 추상화하여 일관된 방식으로 접근할 수 있도록 도와준다.

##### sort

컨테이너 내부의 데이터를 정렬하는 함수이다.
기본 타입의 경우 사용자 정렬 함수가 없으면 오름차순으로 정렬된다.

**`comp(a, b)`**
현재 컨테이너에서 첫 번째 인자 a가 앞에 있는 원소를 의미한다.
`comp(a, b)`가 true 이면 a와 b의 순서는 유지된다.
만약 false인 경우 a와 b의 순서를 바꾼다.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool compare(int a, int b) {
    return a > b;
}

int arr[] = {5, 2, 9, 1, 5, 6};
int size = sizeof(arr) / sizeof(arr[0]);

sort(arr, arr + size); // 오름차순 정렬
sort(arr, arr + size, compare); // 내림차순 정렬

auto it = find(arr, arr + size, 5); // // 있으면 해당 원소를 가리키는 반복자 반환 → (it - arr), 없으면 end() 반복자 반환

vector<int> vec = {5, 2, 9, 1, 5, 6};

sort(vec.begin(), vec.end()); // 오름차순 정렬
sort(vec.begin(), vec.end(), compare); // 내림차순 정렬

auto it2 = find(vec.begin(), vec.end(), 9); // 있으면 해당 원소를 가리키는 반복자 반환 → (it - vec.begin()), 없으면 end() 반복자 반환

string str = "hello world";

auto it3 = find(str.begin(), str.end(), 'o'); // (it - str.begin())

```

```cpp
// class 타입 벡터를 정렬하는 예시
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Person {
private:
    string name;
    int age;

public:
    Person(string name, int age) : name(name), age(age) {}

    string getName() const { return name; }
    int getAge() const { return age; }
};

// 다중 기준 정렬 함수 (나이 오름차순 → 이름 오름차순)
bool compareByAgeAndName(const Person& a, const Person& b) {
    if (a.getAge() == b.getAge()) {
        return a.getName() < b.getName(); // 이름 오름차순
    }
    return a.getAge() < b.getAge(); // 나이 오름차순
}

int main() {
    vector<Person> people = {
        Person("Alice", 30),
        Person("Bob", 25),
        Person("Charlie", 35),
        Person("Alice", 25)
    };

    // 나이 → 이름 순으로 정렬
    sort(people.begin(), people.end(), compareByAgeAndName);

    // 결과 출력
    for (const Person& person : people) {
        cout << person.getName() << " (" << person.getAge() << ")" << endl;
    }
    return 0;
}

```

#### 반복자

컨테이너(vector, map, set 등)에 저장된 원소를 순회하거나 접근할 수 있게 해주는 객체이다.
배열에서 `int* p` 같은 포인터가 원소를 가리키는 것 처럼, 반복자는 컨테이너의 원소를 가리키는 역할을 한다.

**반복자의 특징**

- 포인터처럼 동작: `*it` 로 원소를 꺼내고, `it++` 으로 다음 원소로 이동할 수 있다.
- 컨테이너마다 다르다
  - `vector<int>::iterator` → `int*` 와 거의 동일하게 동작한다.
  - `map<int, string>::iterator` → (key, value) 쌍을 가리킨다. (it->first, it->second)
- end(): 컨테이너의 끝을 가리키는 특별한 반복자. 실제 원소를 가리키지 않고, `여기서 끝` 이라는 표시다.

<naive-provider>
  <n-steps>
    <n-step
      title="컨테이너"
      description="데이터를 담는 그릇"
    />
    <n-step
      title="반복자"
      description="컨테이너 안의 원소를 가리키는 포인터 같은 객체"
    />
    <n-step
      title="알고리즘"
      description="sort, find, for_each 등 이러한 함수들은 반복자를 인자로 받아 컨테이너의 원소를 처리"
    />
  </n-steps>
</naive-provider>

```cpp
std::vector<int> v = {10, 20, 30};
for (auto it = v.begin(); it != v.end(); ++it) {
    std::cout << *it << " "; // 10 20 30
}

std::map<int, std::string> m;
m[1] = "apple";
m[2] = "banana";

auto it = m.find(2);
if (it != m.end()) {
    std::cout << it->first << ": " << it->second << std::endl;
    // 출력: 2: banana
}
```

##### 순방향 반복자

- 컨테이너의 앞에서 뒤로 진행한다.
- begin() → 첫 번째 원소를 가리킨다.
- end() → 마지막 원소 다음을 가리킨다. (실제 원소는 아니다)
- `++it` 으로 다음 원소로 이동한다.

```cpp
// 벡터
std::vector<int> v = {1, 2, 3};
for (auto it = v.begin(); it != v.end(); ++it) {
    std::cout << *it << " "; // 출력: 1 2 3
}

// 맵
std::map<int, std::string> m;
m[1] = "apple";
m[2] = "banana";
m[3] = "cherry";

for (auto it = m.begin(); it != m.end(); ++it) {
    std::cout << it->first << ": " << it->second << " ";
    // 출력: 1: apple 2: banana 3: cherry
}

// string
std::string s = "ABC";

for (auto it = s.begin(); it != s.end(); ++it) {
    std::cout << *it << " ";
    // 출력: A B C
}
```

##### 역방향 반복자

- 컨테이너의 뒤에서 앞으로 진행
- `rbegin()` → 마지막 원소를 가리킴
- `rend()` → 첫 번째 원소 앞을 가리킴
- `++rit`으로 이전 원소로 이동

```cpp
// 벡터
std::vector<int> v = {1, 2, 3};
for (auto rit = v.rbegin(); rit != v.rend(); ++rit) {
    std::cout << *rit << " "; // 출력: 3 2 1
}

// 맵
std::map<int, std::string> m;
m[1] = "apple";
m[2] = "banana";
m[3] = "cherry";

for (auto rit = m.rbegin(); rit != m.rend(); ++rit) {
    std::cout << rit->first << ": " << rit->second << " ";
    // 출력: 3: cherry 2: banana 1: apple
}

// string
std::string s = "ABC";

for (auto rit = s.rbegin(); rit != s.rend(); ++rit) {
    std::cout << *rit << " ";
    // 출력: C B A
}
```

순방향: begin() → end() → 앞에서 뒤로
역방향: rbegin() → rend() → 뒤에서 앞으로

컨테이너 마다 동일한 패턴으로 순방향, 역방향 반복자를 사용할 수 있고, 출력 순서만 반대가 된다.
