---
date: 2026-08-10
category:
  - Cpp
order: 4
---

# 상속과 다형성

## 상속 기초

C++의 class는 C언어의 struct를 확장하여 객체 지향적 특성을 추가한 개념이다. 상속 대상이 되는 클래스를 기본 클래스(부모 클래스)라고 부르고, 상속받는 클래스를 파생 클래스(자식 클래스)라고 부른다. 자식 클래스보다 부모 클래스가 먼저 정의되고 초기화되어, 자식 클래스의 생성자는 부모 클래스의 생성자를 호출할 수 있다.

### 생성자와 초기화 순서

멤버 초기화 리스트는 생성자 본문 실행 전에 수행되며, 멤버 변수들을 원하는 값으로 초기화할 수 있다.

```cpp
class A {
    int x;
public:
    A(int val) : x(val) { } // 멤버 초기화 리스트
};
```

상속 시 초기화 순서는 다음과 같다.

- 자식 클래스 객체를 만들면 부모 클래스 생성자가 먼저 호출된다.
- 그다음 자식 클래스의 멤버 초기화 리스트와 생성자가 실행된다.

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

접근 지정자는 상속 구조에서도 그대로 적용된다.

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

## 소멸자와 상속

소멸자는 객체가 수명을 다했을 때 자동으로 호출되는 특별한 함수로, 객체가 죽을 때 마지막으로 실행되는 정리(clean-up) 코드다. C++은 메모리 관리가 자동이 아니라서 `new`로 할당한 메모리를 반드시 `delete`로 해제해야 하며, 소멸자를 잘 활용하면 객체가 사라질 때 자동으로 정리되어 메모리 누수를 막을 수 있다.

**호출 순서**는 생성자와 정확히 반대다.

- 생성자: 부모 → 자식 순서
- 소멸자: 자식 → 부모 순서

부모가 먼저 태어나고, 자식이 먼저 죽는 구조다.

### 다형성과 virtual 소멸자

부모 클래스 포인터로 자식 객체를 가리킬 때, 소멸자가 `virtual`이 아니면 부모 소멸자만 호출된다. 이 경우 자식 클래스에서 할당한 리소스가 정리되지 않아 메모리 누수가 발생할 수 있다.

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

`virtual`은 C++에서 다형성(polymorphism)을 지원하기 위해 쓰이는 키워드다. 어떤 함수(특히 소멸자)를 `virtual`로 선언하면, 실체 객체 타입에 맞는 함수가 호출된다. 부모 클래스 포인터로 자식 객체를 가리킬 때, 부모 함수 대신 자식 함수가 실행되도록 보장해준다.

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

상속 구조에서 부모 클래스의 소멸자는 반드시 `virtual`로 선언하는 게 안전한 습관이다. 자식 클래스가 별도로 관리하는 리소스가 없다면 소멸자를 직접 정의하지 않아도 된다. 부모의 소멸자가 `virtual`이면, 컴파일러가 자동 생성하는 자식 소멸자도 자동으로 virtual이 되어 `unique_ptr<Base>`로 관리해도 안전하게 소멸된다.

## 다형성과 virtual 함수 / 오버라이딩

`다형성(polymorphism)`은 "하나의 이름이 여러 형태로 동작할 수 있는 능력"을 의미한다. 크게 컴파일 시점(정적) 다형성과 실행 시점(동적) 다형성으로 나뉘며, 같은 함수나 연산자가 상황에 따라 다르게 동작하거나 부모 클래스 포인터로 자식 클래스 객체를 다룰 수 있게 해준다. (컴파일 시점 다형성인 함수/연산자 오버로딩과 템플릿은 별도 문서에서 다룬다.)

**다형성이 중요한 이유**

- 코드 재사용성: 같은 인터페이스로 다양한 객체를 처리 가능
- 유연성: 새로운 클래스 추가 시 기존 코드 수정 없이 확장 가능
- 가독성: 연산자 오버로딩으로 직관적인 코드 작성 가능
- 객체지향 프로그래밍의 핵심: 캡슐화, 상속, 추상화와 함께 OOP의 4대 기둥 중 하나

### 실행 시 다형성 (Run-Time Polymorphism)

가상 함수(Virtual Function)를 쓰면, 부모 클래스 포인터로 자식 클래스 객체를 가리킬 때 실제 객체 타입에 따라 함수가 실행된다.

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
// 소멸자가 virtual 로 선언되어 있어서, Dog의 소멸자가 먼저 호출되고 그 다음 Animal 의 소멸자가 호출된다.
```

## 순수 가상 함수와 추상 클래스

함수 선언 뒤에 `= 0`을 붙이면 순수 가상 함수가 된다. 부모 클래스에는 구현이 전혀 없어 이 함수는 반드시 자식 클래스에서 구현해야 한다는 뜻이다. 이런 부모 클래스는 추상 클래스(Abstract class)가 된다. 추상 클래스는 객체를 직접 만들 수 없고(인스턴스를 만들 수 없고), 반드시 상속받은 자식 클래스에서 구현해야 한다.

순수 가상 함수가 하나라도 있으면 추상 클래스가 되지만, 다른 함수들은 일반 함수로 남겨도 되고 꼭 순수 가상 함수로 만들 필요는 없다. 추상 클래스는 "이 클래스를 상속받는 애들은 반드시 이 기능을 제공해야 한다"라는 규약을 강제하는 인터페이스 역할을 한다. 이는 팀 프로젝트에서 공통 규칙을 강제할 때 유용하며, 기본 동작(일반 함수)도 함께 제공할 수 있다.

```cpp
#include <iostream>
using namespace std;

class Animal {
public:
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
    Animal* myAnimal; // 포인터만 선언 (객체 없음) → 메모리에는 올라간다. → 가리키는 객체가 없으므로 인스턴스화 X
    Dog myDog; // Dog 객체가 스택 메모리에 생성 → 생성자가 호출되고 객체가 스택 프레임 안에 자리잡는다. (인스턴스화)
    Cat myCat; // Cat 객체가 스택 메모리에 생성

    myAnimal = &myDog; // 포인터가 스택에 있는 myDog 객체를 가리킨다.
    myAnimal->makeSound();  // Dog의 makeSound() 호출
    // → 를 쓰는 이유는 myAnimal 이 객체포인터 이기 때문이다. 객체였으면 . 연산자를 통해 접근한다. 객체 포인터는 → 연산자로 접근한다.

    myAnimal = &myCat; // 포인터가 스택에 있는 myCat 객체를 가리킨다.
    myAnimal->makeSound();  // Cat의 makeSound() 호출
    // 스택은 자동으로 소멸된다.

    return 0;
}
```

추상 클래스는 하나 이상의 순수 가상 함수를 가진 클래스로, 함수 선언 뒤에 `= 0`을 붙이며 이 클래스 자체로는 인스턴스를 만들 수 없고 반드시 파생 클래스에서 오버라이드해야 한다.

```cpp
class LibraryManagement {
public:
    virtual ~LibraryManagement() = default;
    virtual int calcdayFee(int day) const = 0; // 순수 가상 함수
    virtual string getType() const = 0;
};

class Book : public LibraryManagement {
public:
    int calcdayFee(int day) const override { return day * 100; }
    string getType() const override { return "Book"; }
};

class DVD : public LibraryManagement {
public:
    int calcdayFee(int day) const override { return min(day * 300, 3000); }
    string getType() const override { return "DVD"; }
};
```

이렇게 설계하면 종류별로 계산 공식이 달라도(단순 곱셈이 아니라 상한이 있거나, 아예 다른 방식이어도) 새로운 파생 클래스만 추가하면 되고 기존 코드는 건드릴 필요가 없다. 반대로 부모 클래스에 파라미터(`dayFee`, `maximumFee` 등)로 계산 방식 차이를 흡수시키려 하면, 종류마다 실제로 필요한 멤버가 다른데도 하나의 클래스로 억지로 묶게 되어 초기화 누락 같은 버그가 생기기 쉽다.

자식 클래스(`Book`, `DVD`)가 별도로 관리하는 리소스가 없다면 소멸자를 직접 정의하지 않아도 된다. 부모의 소멸자가 `virtual`이면, 컴파일러가 자동 생성하는 자식 소멸자도 자동으로 virtual이 되어 `unique_ptr<LibraryManagement>`로 관리해도 안전하게 소멸된다.

### 실전 예시 — 추상 클래스 기반 설계

텍스트 RPG 프로젝트에서 `Player`(추상 클래스)로 모든 직업의 공통 동작을 정의한 예시다.

- `attack(Monster*)`: 직업마다 다르게 구현해야 하는 순수 가상 함수
- `takeDamage(int, string)`: 받은 데미지에서 방어력을 뺀 값(최소 1)만큼 HP 감소
- `Warrior`/`Mage`/`Thief`/`Archor`: `Player`를 상속받아 전직 시 각각 HP/MP/공격력/방어력을 30 증가시키고, `attack()`에서 직업별 대사와 함께 공격력만큼 몬스터에게 데미지를 줌

`Monster`(추상 클래스) / `Slime`는 `Player`와 대칭 구조로, `MonsterInfo`(이름·HP·공격력·방어력·드랍 아이템)를 들고 `attack(Player*)`과 `takeDamage(int)`를 제공한다. `GameManagement`는 `enterDungeon(Player*, Monster*)`에서 플레이어 HP와 몬스터 HP가 모두 0보다 큰 동안 턴을 번갈아가며 `attack()`을 호출하는 전투 루프를 담당한다.

```cpp
// Player.h / Warrior.h, cpp — 추상 클래스와 직업 구현
class Player {
protected:
    HeroStatus& heroStatus;
    HeroItem& heroItem;
    JobType job;
    int level;

public:
    Player(HeroStatus& hs, HeroItem& hi, JobType job) : heroStatus(hs), heroItem(hi), job(job), level(1) {};
    virtual ~Player() {};

    virtual void attack(Monster* monster) = 0;
    void takeDamage(int damage, string monsterName);
};

class Warrior : public Player {
public:
    Warrior(HeroStatus& hs, HeroItem& hi);
    void attack(Monster* monster) override;
};

Warrior::Warrior(HeroStatus& hs, HeroItem& hi) : Player(hs, hi, JobType::Warrior) {
    cout << "* 전사로 전직하였습니다. (HP + 30)\n";
    StatModifier plusHP{plus<int>(), 30};
    heroStatus.controlHeroStatus(StatusType::HP, plusHP);
}

void Warrior::attack(Monster* monster) {
    cout << "* 검을 휘두른다!\n";
    monster->takeDamage(heroStatus.getStat().ap);
}
```

```cpp
// GameManagement.cpp — 턴제 전투 루프
void GameManagement::enterDungeon(Player* player, Monster* monster) {
    while(player->getPlayerStatus().getStat().hp > 0 && monster->getHP() > 0) {
        cout << "--- 플레이어 턴 ---\n";
        player->attack(monster);

        if(monster->getHP() > 0) {
            cout << "--- 몬스터 턴 ---\n";
            monster->attack(player);
        }
    }
}
```

`Player`/`Monster`를 각각 추상 클래스로 두고 `attack()`을 순수 가상 함수로 선언해, 직업·몬스터 종류가 늘어나도 `GameManagement`의 전투 루프 코드는 수정할 필요가 없게 만들었다.

## 리스코프 치환 원칙 (LSP)

부모가 행동(규약)을 정했을 때, 자식은 다른 행동을 할 수는 있다 → 다형성 자체는 성립한다. 하지만 이는 잘못된 설계로서, 다형성의 의미를 깨뜨려 객체지향 설계 원칙을 위반하는 문제다. 부모의 `sound()`를 사용하는 곳에서 자식 타입을 넣어도 프로그램의 의미가 깨지지 않아야 한다는 원칙을, 객체지향 설계에서 `Liskov Substitution Principle (리스코프 치환 원칙)`라고 한다.

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

## 참고

camp-08.md, camp-09.md, camp-12.md, camp-w-03.md
