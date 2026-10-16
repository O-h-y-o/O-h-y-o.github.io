---
date: 2026-07-09
category:
  - Camp
  - Unreal
order: 6
---

# 캠프 10일차

## Atani 퀴즈

<AtaniQuiz :questionIds="[10,11,12,13,14]" />

## 프로그래머스 코테 연습

<programmers-coding :test-id="12954" >

::: tabs

@tab 풀이1

1부터 시작하는 반복문에서, x \_ i 를 하여 vector에 넣어주었다.
x = 2, n = 5라면, [2, 4, 6, 8, 10] 이 담기게 된다.
그런데 제출을 했더니 테스트 케이스 2개가 틀렸다.
무슨 문제가 있는거지? 싶었는데, x가 큰 수가 일때 `x * i` 에서 int 오버플로우가 발생해 테스트케이스를 통과하지 못한거다.
그래서 `x * i` 를 `long long` 타입으로 캐스팅하였다.

```cpp
#include <string>
#include <vector>

using namespace std;

vector<long long> solution(int x, int n) {
    vector<long long> answer;
    for(int i = 1; i <= n; i++) {
        answer.push_back(x * i);
        // answer.push_back((long long)x * i);

    }
    return answer;
}
```

@tab 풀이2

직관적으로, x 를 누적 덧셈 하는 구조이다.
문제의 취지와 좀 더 맞는 방식인 것 같다.

```cpp
vector<long long> solution(int x, int n) {
    vector<long long> answer;
    long long current = x;
    for (int i = 0; i < n; i++) {
        answer.push_back(current);
        current += x;
    }
    return answer;
}
```

:::

</programmers-coding>

## C++

### 객체지향적 설계

대부분 라이브러리, 오픈소스는 객체지향적으로 설계되어 있다.
좋은 설계로 구현된 코드는 개발 시간을 단축할 수 있으며 기능 변경에 유연하게 대응할 수 있다.

#### 응집도

클래스 또는 모듈 내부의 구성 요소들이 얼마나 밀접하게 관련되어 있는지를 나타낸다.
클래스 내부에 관련 없는 기능들이 포함되어 있으면 변경이 자주 발생하고, 확장하기도 쉽지 않다.
일반적으로 응집도가 높을수록 좋은 설계라고 평가된다. 응집도가 높은 경우는 서로 관련 있는 모듈들만 하나의 class 에 있는 경우이다.

**응집도 코드 구현**

<NaiveStep vertical :stepData="[{title: '특정 문자열을 받고 메시지를 출력'}, 
{title: '두 수의 합을 반환'}, 
{title: '특정 문자열을 받고 역으로 출력'},
{title: '두 수의 곱을 반환하는 기능 추가'},
{title: '특정 문자열을 받고 메시지를 출력하기 전 대문자로 변환'}]" />

::: tabs

@tab 응집도가 낮은 코드

서로 다른 목적을 가진 함수가 하나의 클래스 안에 모여있어 유지 보수가 어렵다.
코드 예시에서, UserManager가 사용자 관리, 출력, 파일 저장, 로깅까지 모두 떠맡고 있어 응집도가 낮다.
`saveToFile` 의 파일 저장 형식을 수정해야할때, `vector<string> users` 를 `vector<pair<string, int>>`로 바꿔야 하는 상황이 있을 수 있다.
그러면 단순히 `saveToFile` 만 수정하면 되는게 아니라, 다른 메서드들에 영향을 주는 부분들을 하나씩 확인해주어야한다.
파일 저장 책임 때문에 데이터 구조를 바꿨기 때문에, 다른 책임들까지 영향을 받아서 불필요하게 수정 범위가 넓어지는 것이 응집도가 낮은 설계의 문제이다.

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

@tab 응집도가 높은 코드

클래스를 목적에 따라 나누어 구현해, 기능 변경이 필요할 때 특정 class 만 수정하면 된다.
관련된 class 끼리 정보를 공유해 코드의 구조가 명확해진다.
코드 예시를 보면, 각 클래스가 하나의 책임만 담당하고 있다.

- UserRepository → 사용자 데이터 관리
- UserPrinter → 출력 담당
- FileSaver → 파일 저장 담당

응집도가 낮은 코드처럼 `이름과 나이`를 받는다고 수정한다 했을때, `이름과 나이`에 해당하는 책임만 수정하면 되기때문에 수정해야 할 범위가 깔끔하게 분리되어 관리가 쉬워진다.

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

:::

#### 결합도

모듈 또는 클래스 간의 의존성을 나타낸다.
일반적으로 결합도가 낮을수록 좋은 코드이다.
결합도가 높으면 각 모듈 간 의존성이 강해져 하나의 모듈이 변경될 때, 다른 모듈도 영향을 받게 된다.

::: tabs

@tab 결합도가 높은 코드

저장 방식을 Database 에서 FileStorage로 변경하고 싶을때, Database에 파일 저장 기능을 구현해야하고, UserService 도 FileStorage로 수정해주어야한다. 한 쪽을 바꾸면 다른 쪽도 바꿔야 하는 상황이 자주 발생

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

@tab 결합도가 낮은 코드

저장 방식을 DB에서 파일로 바꾸고 싶을때, FileStorage 클래스만 새로 구현하거나 수정하면 된다.
UserService를 건드릴 필요 없이, 유저 생성시 FileStorage만 주입하면 된다.
UserService는 IUserStorage 인터페이스에만 의존하기 때문이다.
결합도가 낮아져 유연하게 확장 가능하다.

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
    // FileStorage fs;

    UserService service1(&db);
    service1.registerUser("Alice");

    // UserService service2(&fs);
    // service2.registerUser("Bob");
}
```

:::

#### SOLID 원칙

SOLID 원칙은 객체지향 설계의 5가지 핵심 지침으로, 코드의 유지보수성과 확장성을 높여준다.
각각은 단일 책임, 개방-폐쇄, 리스코프 치환, 인터페이스 분리, 의존 역전 원칙을 의미한다.
유지보수성 및 확장성 향상과 변경에 유연한 설계 제공이 주요 목적이다.

<NaiveStep
vertical
:stepData="[
{
title: 'Single Responsibility Principle (단일 책임 원칙)', description: '1. 클래스는 오직 하나의 책임만 가져야 한다.\n3. 변경 이유도 하나여야 한다.\n3. 예시: UserManager는 사용자 관리만 담당, 파일 저장은 FileSaver가 담당', icon: 'S',
codeBlock: [{ title: '적용 코드', language: 'cpp', code: 'class UserRepository {\n void addUser(string name);\n};\n\nclass FileSaver {\n void saveToFile(string data);\n};' }, { title: '적용 안된 코드', language: 'cpp', code: `class UserManager {\n void addUser(string name);\n void saveToFile(string data);\n void printUsers();\n};` }]
},
{
title: 'Open/Closed Principle (개방-폐쇄 원칙)', description: '1. 클래스는 확장에는 열려 있어야 하지만, 기존 코드 수정에는 닫혀 있어야 한다.\n2. 새로운 기능을 추가할 때 기존 코드를 수정하지 않고 확장으로 구현\n3. 예시: FileSaver를 수정하지 않고 JsonFileSaver 클래스를 추가', icon: 'O',
codeBlock: [{ title: '적용 코드', language: 'cpp', code: 'class Shape { virtual double area() = 0; };\nclass Circle : public Shape { double area() override; };' }, { title: '적용 안된 코드', language: 'cpp', code: `class Shape {\n string type;\n double area() {\n if (type == 'Circle') return 3.14 * r * r;\n else if (type == 'square') return s * s;\n }\n};` }]
},
{
title: 'Liskov Substitution Principle (리스코프 치환 원칙)', description: '1. 하위 클래스는 상위 클래스의 기능을 대체할 수 있어야 한다.\n2. 프로그램은 상위 타입을 하위 타입으로 교체해도 정상 동작해야 한다.\n3. 예시: Shape 대신 Rectangle, Circle을 넣어도 정상 동작.', icon: 'L',
codeBlock: [{ title: '적용 코드', language: 'cpp', code: 'class Bird { virtual void fly() = 0; };\nclass Sparrow : public Bird { void fly() override; };' }, { title: '적용 안된 코드', language: 'cpp', code: `class Penguin : public Bird { void fly() override { throw '펭귄은 못 날아'; } };` }]
},
{
title: 'Interface Segregation Principle (인터페이스 분리 원칙)', description: '1. 클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 한다.\n2. 큰 인터페이스를 여러 개의 작은 인터페이스로 분리\n3. 예시: Printer 인터페이스를 InkPrinter, LaserPrinter로 나누어 필요한 기능만 구현', icon: 'I',
codeBlock: [{ title: '적용 코드', language: 'cpp', code: 'class Printer { virtual void print() = 0; };\nclass Scanner { virtual void scan() = 0; };' }, { title: '적용 안된 코드', language: 'cpp', code: 'class MultiFunctionDevice {\n virtual void print() = 0;\n virtual void scan() = 0;\n virtual void fax() = 0;\n};' }]
},
{
title: 'Dependency Inversion Principle (의존 역전 원칙)', description: '1. 고수준 모듈은 저수준 모듈에 의존하지 않고, 추상화에 의존해야 한다.\n2. 구현체가 아니라 인터페이스에 의존하도록 설계\n3. 예시: UserService가 Database 대신 IUserStorage 인터페이스에 의존', icon: 'D',
codeBlock: [{ title: '적용 코드', language: 'cpp', code: 'class IUserStorage { virtual void save(string data) = 0; };\nclass Database : public IUserStorage { void save(string data) override; };\nclass UserService { UserService(IUserStorage* storage); void registerUser(string name); };' }, { title: '적용 안된 코드', language: 'cpp', code: 'class UserService { void registerUser(string name) { Database db; db.save(name); } };' }]
},
]"
/>

### 코드 연습

::: tabs

@tab 연습

요구사항은 다음과 같다.

1. `Book` 구조체: `title`(string), `author`(string), `stock`(int, 재고 수량)
2. `BookProcessor` 추상 클래스: `virtual void process(vector<Book>&) = 0;`
3. Library 클래스

- `vector<Book> books`, `map<string, int> stockMap` (제목 → 재고) 보유
- 생성자에서 책 3~4권 초기화
- `void printBooks()` — 전체 목록 출력
- `bool rentBook(const string& title)` — 재고가 있으면 재고 1 감소 후 true, 없으면(또는 없는 책이면) false 반환하고 안내 출력
- `void processBooks(BookProcessor&)` — 전략 패턴으로 위임

4. `BookProcessor`를 상속하는 두 클래스 구현

- `StockSorter` — 재고 많은 순으로 정렬 후 출력
- `LowStockFilter(int threshold)` — 재고가 `threshold` 이하인 책만 출력

5. `rentBook`에서 존재하지 않는 책 제목이 들어오면 예외를 던지지 말고 `false + 메시지`로 처리 (방어적 코딩 연습)
6. `stockMap`과 `books`의 재고가 항상 동기화되도록 유지 (대여 시 둘 다 갱신)
7. 책의 재고가 부족할 경우 해당 책은 삭제 처리
8. `main`()에서: 목록 출력 → 없는 책 대여 시도 → 있는 책 대여 성공 → 재고순 정렬 출력 → 재고 2개 이하 필터 출력

책을 빌릴때 재고가 더 이상 없으면, 그 책은 배열에서 삭제시키려고 했다.
삭제를 하고 난 뒤, books[0](괴짜가족) 가 지워지면서 books[1](톰과제리)가 books[0] 자리로, books[2]는 [1]로 옮겨졌는데, stockMap["톰과제리"]는 여전히 &books[1] 이라는 주소를 가리키고 있지만, &books[1]에는 이제 짱구는못말려 데이터가 대신해있다.
마지막 원소를 가리키던 포인터는 &books[3] 에는 이제 데이터가 없기 때문에 소멸된 객체를 가리키는 **댕글링 포인터**가 되어버렸다.
그래서 books 의 아이템을 삭제하고 난 뒤 포인터 맵(stockMap)을 다시 리빌딩 해주었다.

당장은 이 방법이 괜찮지만, 나중에 books 를 또 건드리는 무언가가 나온다면 새로 추가할 때마다 rebuild 를 꼭 다시 써야하기 때문에 근본적으로 불안하다고 생각된다.
vector + map 이원화를 없애고 map을 유일한 저장소로 사용한다던지, 스마트 포인터를 사용해서 문제를 해결할 수 있을 것 같다.
내일 바꿔가면서 더 연습하자.

```cpp
#include <iostream>
#include <vector>
#include <map>
#include <algorithm>

using namespace std;

struct Book {
    string title;
    string author;
    int stock;
};

class BookProcessor {
public:
    virtual void process(vector<Book>&) = 0;
    virtual ~BookProcessor() = default;
};

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

        cout << title << " 책은 재고가 없어 삭제했다.\n";
    }

    void rebuildStockMap() {
        stockMap.clear();
        for (auto& book : books) {
            stockMap[book.title] = &book;
        }
    }

public:
    Library() {
        books = {
            {"괴짜가족", "저자1", 2},
            {"톰과제리", "저자2", 24},
            {"짱구는못말려", "저자3", 7},
            {"아따맘마", "저자4", 19},
        };

        for(auto& book : books) {
            stockMap[book.title] = &book;
        }
    }

    void printBooks() {
        for (const auto& book : books) {
            cout << "제목: " << book.title << ",  저자: " << book.author << ", 재고: " << book.stock << "\n";
        }
    }

    bool rentBook(const string& title) {
        auto it = stockMap.find(title);
        if(it != stockMap.end() && it->second->stock > 0) {
            cout << it->second->title << " 책의 남은 재고는 " << it->second->stock << "\n";
            it->second->stock--;
            cout << it->second->title << " 책을 빌렸다. 남은 재고는 " << it->second->stock << "\n";

            for(const auto& book : books) {
                if(book.title == title) {
                    cout << "books와 stockMap이 동기화가 잘 되었는지 확인 Books → " << book.title << " 남은 수량 → " << book.stock << "\n";
                }
            }

            if (it->second->stock == 0) {
                removeBook(title);
            }

            return true;
        } else {
            if (it == stockMap.end()) {
                cout << "존재하지 않는 책" << "\n";
            } else {
                cout << "재고가 부족" << "\n";
            }

            return false;
        }
    }

    void processBooks(BookProcessor& processor) {
        processor.process(books);
    }
};

bool compareBooks(Book& a, Book& b) {
    return a.stock > b.stock;
}

class StockSorter : public BookProcessor {
public:
    void process(vector<Book>& books) override {
        sort(books.begin(), books.end(), compareBooks);
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
            if(book.stock <= threshold) {
                cout << book.title << "\n";
            }
        }
    }
};

int main() {
    Library library;

    cout << "모든 책을 출력" << "\n";
    library.printBooks();

    cout << "책을 빌린다." << "\n";
    library.rentBook("없는책");

    cout << "책을 빌린다." << "\n";
    library.rentBook("괴짜가족");
    cout << "책을 빌린다." << "\n";
    library.rentBook("괴짜가족");
    cout << "책을 빌린다." << "\n";
    library.rentBook("괴짜가족");
    cout << "책을 빌린다." << "\n";
    library.rentBook("톰과제리");

    cout << "재고가 많은 순으로 정렬하고 출력." << "\n";
    StockSorter sorter;
    library.processBooks(sorter);

    cout << "재고가 2 이하인 책들을 출력" << "\n";
    LowStockFilter filter(2);
    library.processBooks(filter);

    return 0;
};
```

@tab VOD

**요구사항**

각 영화는 다음 정보를 포함 합니다.

- 제목(string 타입)
- 평점(double 타입)

구현해야 할 기능은 아래와 같습니다.

- 특정 평점 이상 영화 필터링
- 영화 목록 출력
- 영화 제목으로 검색
- 영화 평점 기준 정렬

```cpp
#include <iostream>
#include <map>
#include <vector>
#include <algorithm>
using namespace std;

struct Movie {
    string title;
    double rating;
};

class MovieProcessor {
public:
    virtual void process(vector<Movie>&) = 0;
    virtual ~MovieProcessor() = default;
};

class MovieManager {
private:
    vector<Movie> movies;
    map<string, double> movieMap;
public:
    MovieManager() {
        movies = {
            {"엘리자베스의 탄생일기", 9.2}
        };

        for (const auto& movie : movies) {
            movieMap[movie.title] = movie.rating;
        }
    }

    void printMovies() {
        for (const auto& movie : movies) {
            cout << movie.title << movie.rating;
        }
    }

    void findMovie(const string& title) {
        auto it = movieMap.find(title);
        if(it != movieMap.end()) {
            cout << it->first << it->second;
        }
    }

    void processMovies(MovieProcessor& processor) {
        processor.process(movies);
    }
};


bool compareMovies(Movie& a, Movie& b) {
    return a.rating > b.rating;
};

class RatingSorter : public MovieProcessor {
public:
    void process(vector<Movie>& movies) override {
        sort(movies.begin(), movies.end(), compareMovies);
        for (const auto& movie : movies) {
            cout << movie.title << movie.rating;
        }
    }
};

class RatingFilter : public MovieProcessor {
private:
    double minRating;

public:
    explicit RatingFilter(double minRating) : minRating(minRating) {};

    void process(vector<Movie>& movies) override {
        for (const auto& movie : movies) {
            if (movie.rating >= minRating) {
                cout << movie.title;
            }
        }
    }
};

int main() {
    MovieManager manager;

    manager.printMovies();
    manager.findMovie("12313");

    RatingSorter sorter;
    manager.processMovies(sorter);

    RatingFilter filter(9.3);
    manager.processMovies(filter);

    return 0;
}
```

:::
