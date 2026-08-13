---
date: 2026-08-10
category:
  - Cpp
order: 10
---

# OOP 4대 원칙

## 객체 지향 프로그래밍이란

C++의 `class`는 C언어의 `struct`를 확장하여 객체 지향적 특성을 추가한 개념이다.

`객체 지향 프로그래밍`은 영어로 `Object-Oriented Programming`, 줄여서 `OOP`라고 한다. 프로그램을 객체(Object)라는 단위로 나누어 설계하고 구현하는 방법이다. 쉽게 표현하면, 현실 세계의 사물과 개념을 프로그램 속 객체로 표현하고, 이 객체들이 서로 협력해서 문제를 해결하는 방식으로 데이터 + 행동을 하나로 묶어 재사용성과 유지보수를 높이는 프로그래밍 패러다임이다.

::: tip 객체
`객체`는 클래스라는 설계도로부터 만들어진 구체적인 실체(메모리에 올라간 상태)이다. 데이터(속성)와 그 데이터를 다루는 행동(메서드)을 함께 가진 독립적인 존재로 생각할 수 있다.

예를 들어 '자동차'라는 완성품은 바퀴, 엔진, 핸들, 창문 등과 같은 여러 부품들로 구성된다. 이때 각각의 부품도 `객체`이며, 자동차 역시도 `객체`이다. 자동차는 여러 객체를 포함하는 `상위 객체`이며, 부품들은 `하위 객체`라고 한다. 이런 관계를 객체 지향 프로그래밍에서는 `구성`이라고 한다.
:::

### 다형성과 OOP의 4대 특성

`다형성(polymorphism)`은 `하나의 이름이 여러 형태로 동작할 수 있는 능력`을 의미한다.

**다형성이 중요한 이유**

- 코드 재사용성: 같은 인터페이스로 다양한 객체를 처리 가능
- 유연성: 새로운 클래스 추가 시 기존 코드 수정 없이 확장 가능
- 가독성: 연산자 오버로딩으로 직관적인 코드 작성 가능
- 객체지향 프로그래밍의 핵심: 캡슐화, 상속, 추상화와 함께 OOP의 4대 기둥 중 하나

캡슐화(데이터/행동을 하나로 묶고 세부 구현을 숨김), 상속(부모 클래스의 특성을 자식 클래스가 물려받음), 다형성(하나의 인터페이스가 여러 형태로 동작), 추상화(공통 특성만 추출해 인터페이스로 규약화)가 OOP를 구성하는 4대 특성이다. class/접근제어/생성자/소멸자는 캡슐화, 상속/virtual은 상속, 함수·연산자 오버로딩/가상 함수는 다형성, 추상 클래스/순수 가상 함수는 추상화에 각각 대응한다.

아래에서는 각 원칙을 "어떤 코드가 부족한가"를 직접 찾고 고치는 방식으로 하나씩 확인한다.

## 캡슐화 (Encapsulation)

시작 코드는 `damage`, `durability`가 `public`이라 외부에서 아무 값이나 대입할 수 있었다(`sword.durability = -9999;`처럼). 캡슐화는 **클래스 내부 데이터를 외부가 함부로 건드리지 못하게 막고, 값의 유효성은 클래스 스스로 책임지는 것**이다.

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

## 상속 (Inheritance)

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

## 다형성 (Polymorphism)

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

## 추상화 (Abstraction)

`Animal`은 그 자체로 존재해선 안 되는 개념이다("동물"이라는 것 자체는 구체적인 실체가 아니다). 이걸 강제하려면 **순수 가상 함수(pure virtual function, `= 0`)**를 쓴다.

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

| 키워드                        | 역할                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `virtual` (일반, 몸체 있음)   | 다형성 활성화 — 실제 타입에 맞는 함수가 런타임에 선택됨                       |
| `virtual ... = 0` (순수 가상) | 추상화 — 구현 없이 규약만 강제, 클래스를 추상 클래스로 만듦 (인스턴스화 불가) |
| `override`                    | 오버라이드 실수 방지용 컴파일 타임 체크. 개념 자체와는 무관하고 안전장치일 뿐 |

`virtual`이라는 하나의 키워드가 몸체가 있으면 다형성의 토대가 되고, `= 0`이 붙으면 추상화의 토대가 된다. `Move()`가 `Animal`에서 `= 0`으로 정의된 건 추상화 쪽이고, 그걸 `Dog`/`Bird`가 구현한 뒤 `Animal*`로 호출하는 순간(`animal->Move()`)이 다형성이 실제로 발현되는 지점이다. 둘은 협력 관계지 딱 나눠지는 게 아니다.

또 하나 주의할 점: **소멸자를 순수 가상으로 만들 필요는 없다.** `virtual ~Animal() = 0;`처럼 쓰면 컴파일은 되지만, 소멸자는 자식→부모로 항상 체인 호출되기 때문에 본문이 없으면 **링크 에러**가 난다(`undefined reference`). 추상 클래스를 만드는 목적은 이미 `Move()`, `Attack()`을 순수 가상으로 만들면서 달성됐으므로, 소멸자는 그냥 `virtual ~Animal() {}`로 충분하다.
:::
