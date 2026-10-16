---
date: 2026-08-10
category:
  - Cpp
order: 8
---

# 예외 처리

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

## 전체 예제: 도서관 연체료 계산

id로 조회 시 존재하지 않으면 예외를 던지는 예제이다.

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

이 예제에서는 `LibraryManagement`를 추상 클래스로 두고 `Book`, `DVD`가 각자의 연체료 계산 방식을 구현하는 다형성 구조 위에, id가 존재하지 않는 경우만 커스텀 예외로 처리하는 방식을 보여준다. `unique_ptr`로 객체 소유권을 관리하고 있어, 예외가 발생해도 메모리 누수 없이 안전하게 종료된다.
