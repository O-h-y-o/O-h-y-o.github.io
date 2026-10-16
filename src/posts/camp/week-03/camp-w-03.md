---
date: [2026-07-11, 2026-07-12]
category:
  - Camp
  - Unreal
order: 2
---

# 캠프 3주차 주말

## 연습 문제

요구사항

1. 책과 DVD는 제목(title)과 고유 id를 가진다.
2. 연체료 계산 방식은 항목 종류에 따라 다르게 동작해야 한다.
   - 책: 하루 연체당 100원
   - DVD: 하루 연체당 300원, 단 최대 3000원을 넘지 않음
3. 새로운 항목 종류가 추가되더라도(예: 잡지) 기존 코드를 수정하지 않고 확장 가능한 구조여야 한다.
4. 도서관은 여러 항목을 보관하고 있으며, id로 특정 항목을 찾아 연체일수를 주면 연체료를 계산해줄 수 있어야 한다.
5. 존재하지 않는 id로 조회하면 프로그램이 죽지 않고, 적절한 예외를 던져서 호출부에서 처리할 수 있어야 한다.
6. 보관 중인 모든 항목을 출력할 수 있어야 하며, 출력 시 항목의 실제 타입(책인지 DVD인지)이 구분되어야 한다.
7. main()에서 여러 항목을 등록하고, 존재하는 id/존재하지 않는 id 둘 다로 연체료 조회를 시도해서 예외 처리가 잘 되는지 확인한다.

```cpp
#include <iostream>
#include <map>
#include <memory>
#include <exception>
#include <string>
using namespace std;

class LibraryManagement {
private:
    static inline int nextId = 0;
    const int id;
    string title;

public:
    explicit LibraryManagement(string title) : id(nextId++), title(title) {}
    virtual ~LibraryManagement() = default;

    int getId() const { return id; }
    string getTitle() const { return title; }

    virtual int calcdayFee(int day) const = 0;
    virtual string getType() const = 0;
};

class Book : public LibraryManagement {
private:
    static constexpr int dayFee = 100;

public:
    explicit Book(string title) : LibraryManagement(title) {}

    int calcdayFee(int day) const override {
        return day * dayFee;
    }

    string getType() const override { return "Book"; }
};

class DVD : public LibraryManagement {
private:
    static constexpr int dayFee = 300;
    static constexpr int maximumFee = 3000;

public:
    explicit DVD(string title) : LibraryManagement(title) {}

    int calcdayFee(int day) const override {
        int lateFee = day * dayFee;
        return min(lateFee, maximumFee);
    }

    string getType() const override { return "DVD"; }
};

class ItemNotFoundException : public exception {
private:
    string message;

public:
    explicit ItemNotFoundException(int id)
        : message("존재하지 않는 id: " + to_string(id)) {}

    const char* what() const noexcept override {
        return message.c_str();
    }
};

class ItemNotFoundException : public exception {
private:
    string message;

public:
    explicit ItemNotFoundException(int id) : message("123"  + to_string(id)) {}
};

void printLateFee(const map<int, unique_ptr<LibraryManagement>>& library, int id, int day) {
    try {
        auto it = library.find(id);
        if (it == library.end()) {
            throw ItemNotFoundException(id);
        }

        int lateFee = it->second->calcdayFee(day);
        cout << "id " << id << " 연체료는 " << lateFee << "\n";
    } catch (const ItemNotFoundException& e) {
        cout << e.what() << "\n";
    }
}

int main() {
    map<int, unique_ptr<LibraryManagement>> library;

    auto book = make_unique<Book>("book");
    auto dvd = make_unique<DVD>("dvd");

    int bookId = book->getId();
    int dvdId = dvd->getId();

    library[bookId] = move(book);
    library[dvdId] = move(dvd);

    cout << "존재하는 id 조회 (book)\n";
    printLateFee(library, bookId, 5);

    cout << "존재하는 id 조회 (dvd, 상한 초과)\n";
    printLateFee(library, dvdId, 20);

    cout << "존재하지 않는 id 조회\n";
    printLateFee(library, 9999, 5);

    cout << "보관 중인 모든 항목\n";
    for (auto& [id, obj] : library) {
        cout << "[" << obj->getType() << "] " << obj->getTitle() << "\n";
    }
}
```

## constexpr

`const` 는 실제 프로그램이 실행 되는 런타임 단계에서 값이 정해진다.
`constexpr`은 `const`처럼 상수를 정의할때 사용되지만, 컴파일 시점에 값이 확정될 수 있을 때 사용 가능하다.
C++ Core Guidelines 에 따르면 "컴파일 타임에 값을 알 수 있으면 `constexpr`, 그게 안 되면 `const`" 순서로 고려하는 것이 좋다.

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

## 순수 가상 함수와 다형성

추상 클래스는 하나 이상의 `순수 가상 함수`(pure virtual function)를 가진 클래스이다. 함수 선언 뒤에 `= 0`을 붙이며, 이 클래스 자체로는 인스턴스를 만들 수 없고 반드시 파생 클래스에서 오버라이드해야 한다.

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

## 커스텀 예외

`std::exception`을 상속받아 나만의 예외 타입을 만들 수 있다. `what()`을 `override`해서 에러 메시지를 반환하도록 구현한다.

```cpp
class ItemNotFoundException : public exception {
private:
    string message;
public:
    explicit ItemNotFoundException(int id)
        : message("존재하지 않는 id: " + to_string(id)) {}

    const char* what() const noexcept override {
        return message.c_str();
    }
};
```

호출부에서는 `try`/`catch`로 감싸서 처리한다.

```cpp
try {
    auto it = library.find(id);
    if (it == library.end()) {
        throw ItemNotFoundException(id);
    }
    // ...
} catch (const ItemNotFoundException& e) {
    cout << e.what() << "\n";
}
```

값을 못 찾았을 때 단순히 메시지만 출력하고 넘어가는 대신 예외를 던지면, 에러 발생 지점과 처리 지점을 분리할 수 있고 호출부에서 실패 케이스를 명시적으로 처리하도록 강제할 수 있다.
