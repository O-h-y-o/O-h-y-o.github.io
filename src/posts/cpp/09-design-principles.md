---
date: 2026-08-10
category:
  - Cpp
order: 9
---

# 설계 원칙

## 객체지향적 설계

대부분의 라이브러리, 오픈소스는 객체지향적으로 설계되어 있다. 좋은 설계로 구현된 코드는 개발 시간을 단축할 수 있으며 기능 변경에 유연하게 대응할 수 있다.

## 응집도

클래스 또는 모듈 내부의 구성 요소들이 얼마나 밀접하게 관련되어 있는지를 나타낸다. 클래스 내부에 관련 없는 기능들이 포함되어 있으면 변경이 자주 발생하고, 확장하기도 쉽지 않다. 일반적으로 응집도가 높을수록 좋은 설계라고 평가된다. 응집도가 높은 경우는 서로 관련 있는 모듈들만 하나의 class에 있는 경우이다.

### 응집도가 낮은 코드

서로 다른 목적을 가진 함수가 하나의 클래스 안에 모여있어 유지 보수가 어렵다. 아래 예시에서 `UserManager`가 사용자 관리, 출력, 파일 저장, 로깅까지 모두 떠맡고 있어 응집도가 낮다. `saveToFile`의 파일 저장 형식을 수정해야 할 때, 데이터 구조를 바꿔야 하는 상황이 있을 수 있다. 그러면 단순히 `saveToFile`만 수정하면 되는 게 아니라, 다른 메서드들에 영향을 주는 부분들을 하나씩 확인해주어야 한다. 파일 저장 책임 때문에 데이터 구조를 바꿨는데 다른 책임들까지 영향을 받아서 불필요하게 수정 범위가 넓어지는 것이 응집도가 낮은 설계의 문제이다.

```cpp
#include <iostream>
#include <fstream>
#include <vector>
#include <string>
using namespace std;

class UserManager {
public:
    void addUser(string name) {
        users.push_back(name);
    }

    void printUsers() {
        for (auto& u : users) cout << u << endl;
    }

    void saveToFile(string filename) {
        ofstream file(filename);
        for (auto& u : users) file << u << endl;
        file.close();
    }

    void log(string message) {
        cout << "[LOG] " << message << endl;
    }

private:
    vector<string> users;
};

int main() {
    UserManager manager;
    manager.addUser("Alice");
    manager.addUser("Bob");

    manager.printUsers();
    manager.saveToFile("users.txt");
    manager.log("Users saved successfully");
}
```

### 응집도가 높은 코드

클래스를 목적에 따라 나누어 구현해, 기능 변경이 필요할 때 특정 class만 수정하면 된다. 관련된 class끼리 정보를 공유해 코드의 구조가 명확해진다. 아래 예시에서는 각 클래스가 하나의 책임만 담당하고 있다.

- `UserRepository` → 사용자 데이터 관리
- `UserPrinter` → 출력 담당
- `FileSaver` → 파일 저장 담당

```cpp
#include <iostream>
#include <fstream>
#include <vector>
#include <string>
using namespace std;

class UserRepository {
public:
    void addUser(string name) {
        users.push_back(name);
    }

    vector<string> getUsers() const {
        return users;
    }

private:
    vector<string> users;
};

class UserPrinter {
public:
    void print(const vector<string>& users) {
        for (auto& u : users) cout << u << endl;
    }
};

class FileSaver {
public:
    void save(const vector<string>& users, string filename) {
        ofstream file(filename);
        for (auto& u : users) file << u << endl;
        file.close();
    }
};

int main() {
    UserRepository repo;
    repo.addUser("Alice");
    repo.addUser("Bob");

    UserPrinter printer;
    printer.print(repo.getUsers());

    FileSaver saver;
    saver.save(repo.getUsers(), "users.txt");

    cout << "Users saved successfully" << endl;
}
```

## 결합도

모듈 또는 클래스 간의 의존성을 나타낸다. 일반적으로 결합도가 낮을수록 좋은 코드이다. 결합도가 높으면 각 모듈 간 의존성이 강해져 하나의 모듈이 변경될 때 다른 모듈도 영향을 받게 된다.

### 결합도가 높은 코드

저장 방식을 `Database`에서 `FileStorage`로 변경하고 싶을 때, `Database`에 파일 저장 기능을 구현해야 하고 `UserService`도 `FileStorage`로 수정해주어야 한다. 한쪽을 바꾸면 다른 쪽도 바꿔야 하는 상황이 자주 발생한다.

```cpp
#include <iostream>
#include <string>
using namespace std;

class Database {
public:
    void saveUser(string name) {
        cout << "Saving " << name << " to DB" << endl;
    }
};

class UserService {
public:
    UserService() {
        db = new Database(); // 직접 생성 → 강한 결합
    }

    void registerUser(string name) {
        db->saveUser(name);
    }

private:
    Database* db;
};

int main() {
    UserService service;
    service.registerUser("Alice");
}
```

### 결합도가 낮은 코드

저장 방식을 DB에서 파일로 바꾸고 싶을 때, `FileStorage` 클래스만 새로 구현하거나 수정하면 된다. `UserService`를 건드릴 필요 없이, 유저 생성 시 `FileStorage`만 주입하면 된다. `UserService`는 `IUserStorage` 인터페이스에만 의존하기 때문이다.

```cpp
#include <iostream>
#include <string>
using namespace std;

class IUserStorage {
public:
    virtual void saveUser(string name) = 0;
    virtual ~IUserStorage() {}
};

class Database : public IUserStorage {
public:
    void saveUser(string name) override {
        cout << "Saving " << name << " to DB" << endl;
    }
};

// class FileStorage : public IUserStorage {
// public:
//     void saveUser(string name) override {
//         cout << "Saving " << name << " to File" << endl;
//     }
// };

class UserService {
public:
    UserService(IUserStorage* storage) : storage(storage) {}

    void registerUser(string name) {
        storage->saveUser(name);
    }

private:
    IUserStorage* storage; // 인터페이스에 의존 → 낮은 결합
};

int main() {
    Database db;
    UserService service1(&db);
    service1.registerUser("Alice");
}
```

## SOLID 원칙

SOLID 원칙은 객체지향 설계의 5가지 핵심 지침으로, 코드의 유지보수성과 확장성을 높여준다. 각각은 단일 책임, 개방-폐쇄, 리스코프 치환, 인터페이스 분리, 의존 역전 원칙을 의미하며, 유지보수성 및 확장성 향상과 변경에 유연한 설계 제공이 주요 목적이다.

### S — Single Responsibility Principle (단일 책임 원칙)

1. 클래스는 오직 하나의 책임만 가져야 한다.
2. 변경 이유도 하나여야 한다.
3. 예시: `UserManager`는 사용자 관리만 담당, 파일 저장은 `FileSaver`가 담당한다.

```cpp
// 적용 코드
class UserRepository {
    void addUser(string name);
};

class FileSaver {
    void saveToFile(string data);
};

// 적용 안된 코드
class UserManager {
    void addUser(string name);
    void saveToFile(string data);
    void printUsers();
};
```

### O — Open/Closed Principle (개방-폐쇄 원칙)

1. 클래스는 확장에는 열려 있어야 하지만, 기존 코드 수정에는 닫혀 있어야 한다.
2. 새로운 기능을 추가할 때 기존 코드를 수정하지 않고 확장으로 구현한다.
3. 예시: `FileSaver`를 수정하지 않고 `JsonFileSaver` 클래스를 추가한다.

```cpp
// 적용 코드
class Shape { virtual double area() = 0; };
class Circle : public Shape { double area() override; };

// 적용 안된 코드
class Shape {
    string type;
    double area() {
        if (type == "Circle") return 3.14 * r * r;
        else if (type == "square") return s * s;
    }
};
```

### L — Liskov Substitution Principle (리스코프 치환 원칙)

1. 하위 클래스는 상위 클래스의 기능을 대체할 수 있어야 한다.
2. 프로그램은 상위 타입을 하위 타입으로 교체해도 정상 동작해야 한다.
3. 예시: `Shape` 대신 `Rectangle`, `Circle`을 넣어도 정상 동작해야 한다.

```cpp
// 적용 코드
class Bird { virtual void fly() = 0; };
class Sparrow : public Bird { void fly() override; };

// 적용 안된 코드
class Penguin : public Bird { void fly() override { throw "펭귄은 못 날아"; } };
```

### I — Interface Segregation Principle (인터페이스 분리 원칙)

1. 클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 한다.
2. 큰 인터페이스를 여러 개의 작은 인터페이스로 분리한다.
3. 예시: `Printer` 인터페이스를 `InkPrinter`, `LaserPrinter`로 나누어 필요한 기능만 구현한다.

```cpp
// 적용 코드
class Printer { virtual void print() = 0; };
class Scanner { virtual void scan() = 0; };

// 적용 안된 코드
class MultiFunctionDevice {
    virtual void print() = 0;
    virtual void scan() = 0;
    virtual void fax() = 0;
};
```

### D — Dependency Inversion Principle (의존 역전 원칙)

1. 고수준 모듈은 저수준 모듈에 의존하지 않고, 추상화에 의존해야 한다.
2. 구현체가 아니라 인터페이스에 의존하도록 설계한다.
3. 예시: `UserService`가 `Database` 대신 `IUserStorage` 인터페이스에 의존한다.

```cpp
// 적용 코드
class IUserStorage { virtual void save(string data) = 0; };
class Database : public IUserStorage { void save(string data) override; };
class UserService { UserService(IUserStorage* storage); void registerUser(string name); };

// 적용 안된 코드
class UserService { void registerUser(string name) { Database db; db.save(name); } };
```

## 코드 연습: 전략 패턴 적용 (도서관 대여 시스템)

요구사항: `Book` 구조체(title, author, stock), `BookProcessor` 추상 클래스(`virtual void process(vector<Book>&) = 0;`)를 두고, `Library` 클래스가 `vector<Book> books`와 `map<string, int> stockMap`을 관리하며 대여/출력/전략 위임(`processBooks(BookProcessor&)`)을 제공한다. `StockSorter`, `LowStockFilter`가 `BookProcessor`를 상속해 서로 다른 처리 전략을 구현한다.

책을 빌릴 때 재고가 더 이상 없으면 그 책을 배열에서 삭제시켰는데, 삭제 후 벡터 인덱스가 밀리면서 `stockMap`이 들고 있던 포인터가 엉뚱한 원소(혹은 소멸된 객체)를 가리키는 **댕글링 포인터** 문제가 발생했다. 그래서 books 아이템 삭제 후 포인터 맵(`stockMap`)을 다시 리빌딩했는데, 근본적으로는 vector + map 이원화를 없애고 map을 유일한 저장소로 쓰거나 스마트 포인터를 쓰는 방향이 더 안전할 것 같다는 회고를 남겼다.

```cpp
class Library {
private:
    vector<Book> books;
    map<string, Book*> stockMap;

    void removeBook(const string& title) {
        books.erase(
            remove_if(books.begin(), books.end(),
                [&](const auto& book) { return book.title == title; }),
            books.end()
        );
        rebuildStockMap();
    }

    void rebuildStockMap() {
        stockMap.clear();
        for (auto& book : books) {
            stockMap[book.title] = &book;
        }
    }

public:
    void processBooks(BookProcessor& processor) {
        processor.process(books);
    }
};

class StockSorter : public BookProcessor {
public:
    void process(vector<Book>& books) override {
        sort(books.begin(), books.end(), [](Book& a, Book& b) { return a.stock > b.stock; });
        for (const auto& book : books) {
            cout << "제목: " << book.title << ", 저자: " << book.author << ", 재고: " << book.stock << "\n";
        }
    }
};

class LowStockFilter : public BookProcessor {
private:
    int threshold;
public:
    explicit LowStockFilter(int threshold) : threshold(threshold) {};
    void process(vector<Book>& books) override {
        for (const auto& book : books) {
            if(book.stock <= threshold) cout << book.title << "\n";
        }
    }
};
```

## 참고

camp-10.md
