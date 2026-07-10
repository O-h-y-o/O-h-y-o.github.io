---
date: 2026-07-10
category:
  - Camp
  - Unreal
order: 1
---

# 캠프 11일차

## Atani 퀴즈

<AtaniQuiz :questionIds="[15, 16, 17, 18, 19]" />

## 프로그래머스 코테 연습

<programmers-coding :test-id="12932" >

::: tabs

@tab while 반복 나눗셈

```cpp
#include <vector>
using namespace std;

vector<int> solution(long long n) {
    vector<int> answer;
    while (n > 0) {
        answer.push_back(n % 10);
        n /= 10;
    }
    if (answer.empty()) answer.push_back(0);
    return answer;
}
```

@tab for 로그 기반 길이 계산

```cpp
#include <cmath>
#include <string>
#include <vector>

using namespace std;

vector<int> solution(long long n) {
    vector<int> answer;
    int length = (n == 0) ? 1 : (int)log10(abs(n)) + 1;

    for (int i = 0; i < length; i++) {
        int insertNum = n % 10;
        answer.push_back(insertNum);
        n /= 10;
    }
    return answer;
}
```

@tab 문자열 변환

```cpp
#include <string>
#include <vector>
using namespace std;

vector<int> solution(long long n) {
    string s = to_string(n);
    vector<int> answer;
    for (int i = s.size() - 1; i >= 0; i--) {
        answer.push_back(s[i] - '0');
    }
    return answer;
}
```

:::

</programmers-coding>

## C++

### 코드 연습

#### 학생 성적 관리 프로그램

콘솔에서 여러 학생의 이름과 점수(0~100)를 입력받아 관리하는 프로그램을 작성

**요구사항**

<NaiveStep vertical :stepData="[
{title: '학생 수 입력', description: '사용자가 학생 수를 먼저 입력하면, 그 수만큼 이름과 점수를 입력받는다.'},
{title: '결과 출력', description: '입력이 끝나면 다음 정보를 출력한다.\n- 전체 평균 점수\n- 최고 점수를 받은 학생의 이름과 점수\n- 최저 점수를 받은 학생의 이름과 점수'},
{title: '등급 매기기', description: '각 학생의 점수를 기준으로 등급을 매겨 함께 출력한다. (90점 이상 A, 80점 이상 B, 70점 이상 C, 60점 이상 D, 그 미만 F)'},
{title: '순위 정렬', description: '점수가 높은 순서대로 정렬해서 순위와 함께 다시 출력한다.'},
{title: '입력값 검증', description: '만약 0~100 범위를 벗어난 점수가 입력되면 다시 입력받도록 처리한다.'},
]" />

::: tabs

@tab 기본 구현

**역할 정리**

- `enum class Grade`: 학생의 등급(A~F)을 나타내는 열거형
- `struct Student`: 학생 한 명의 정보(이름, 점수, 등급)를 담는 데이터 구조체
- `struct HighLow`: 최고점 학생과 최저점 학생을 함께 담아 반환하기 위한 구조체
- `gradeToString(Grade grade)`: `Grade` enum 값을 화면에 출력할 문자열("A", "B" 등)로 변환
- `class ScoreManagement`: 학생 목록을 관리하며 입력, 출력, 통계 계산, 정렬까지 모두 책임지는 클래스
  - `ScoreManagement(int studentNum)` (생성자): 입력받은 학생 수만큼 `students` 벡터 크기를 미리 할당
  - `inputStudentScore(Student& student)`: 점수 하나를 입력받아 0~100 범위를 벗어나면 재입력을 요구하는 유효성 검사 담당
  - `inputStudents()`: 모든 학생에 대해 이름을 입력받고 `inputStudentScore()`를 호출해 점수까지 입력받음
  - `printStudents(bool rank)`: 학생 목록을 출력. `rank`가 true면 순위(등수)를 함께 표시
  - `getAverageScore()`: 전체 학생 점수의 평균을 계산해 반환
  - `getHighLowStudent()`: `max_element`/`min_element`로 최고점·최저점 학생을 찾아 `HighLow`로 묶어 반환
  - `setStudentsGrade()`: 각 학생의 점수를 기준으로 등급(A~F)을 판정해 `grade` 필드에 설정
  - `setSortHigher()`: 점수 내림차순으로 `students` 벡터를 정렬
- `main()`: 학생 수를 입력받아 `ScoreManagement` 객체를 생성하고, 입력 → 평균/최고/최저 출력 → 등급 매기기 → 정렬 후 출력까지 전체 흐름을 순서대로 호출

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

enum class Grade {
    A, B, C, D, F
};

struct Student {
    string name;
    double score;
    Grade grade;
};

struct HighLow {
    Student highest;
    Student lowest;
};

string gradeToString(Grade grade) {
    switch (grade) {
        case Grade::A: return "A";
        case Grade::B: return "B";
        case Grade::C: return "C";
        case Grade::D: return "D";
        case Grade::F: return "F";
    }
    return "?";
}

class ScoreManagement {
private:
    int studentNum;
    vector<Student> students;

public:
    explicit ScoreManagement(int studentNum) : studentNum(studentNum) {
        students.resize(studentNum);
    };

    void inputStudentScore(Student& student) {
        double score;
        while (true) {
            cin >> score;
            if (score < 0 || score > 100) {
                cout << "점수 범위 벗어남. 다시 입력\n";
            } else {
                student.score = score;
                break;
            }
        }
    }

    void inputStudents() {
        for (auto& student : students) {
            cout << "학생의 이름과 점수를 입력\n";
            cin >> student.name;
            inputStudentScore(student);
        }
    }

    void printStudents(bool rank) {
        int count = 1;
        for (auto& student : students) {
            if(rank) {
                cout << count << "등 → ";
            }
            cout << "이름: " << student.name << ", 성적: " << student.score << ", 등급: " << gradeToString(student.grade) << "\n";
            count++;
        }
    }

    double getAverageScore() {
        double scoreSum = 0;
        for(auto& student : students) {
            scoreSum += student.score;
        }

        return scoreSum / students.size();
    }

    HighLow getHighLowStudent() {
        HighLow result;
        result.highest = *max_element(students.begin(), students.end(),
            [](const auto& a, const auto& b) { return a.score < b.score; });

        result.lowest = *min_element(students.begin(), students.end(),
            [](const auto& a, const auto& b) { return a.score < b.score; });

        return result;
    }

    void setStudentsGrade() {
        for (auto& student : students) {
            if (student.score >= 90) student.grade = Grade::A;
            else if (student.score >= 80) student.grade = Grade::B;
            else if (student.score >= 70) student.grade = Grade::C;
            else if (student.score >= 60) student.grade = Grade::D;
            else student.grade = Grade::F;
        }
    }

    void setSortHigher () {
        sort(students.begin(), students.end(),
            [](Student& a, Student& b) { return a.score > b.score; });
    }
};


int main() {
    cout << "학생 수를 입력하시오\n";
    int studentNum;
    cin >> studentNum;

    ScoreManagement sm(studentNum);
    sm.inputStudents();

    cout << "전체 학생의 평균 점수 → " << sm.getAverageScore() << "\n";

    auto [highest, lowest] = sm.getHighLowStudent();

    cout << "최고 점수를 받은 학생의 이름과 점수: " << highest.name << " " << highest.score << "\n";
    cout << "최저 점수를 받은 학생의 이름과 점수: " << lowest.name << " " << lowest.score << "\n";

    cout << "성적을 등급으로 매김\n";
    sm.setStudentsGrade();
    sm.printStudents(false);

    cout << "성적 높은순 정렬\n";
    sm.setSortHigher();
    sm.printStudents(true);

    return 0;
};
```

@tab 개선

`studentNum`은 생성자에서 resize에 한 번 쓰이고 이후로는 사용되는 곳이 없다.
따라서 `studentNum`을 입력받아서 멤버에 저장하고 있는 것은 "필요한 상태만 최소로 유지" 하는 캡슐화 원칙을 위배하는 것이라 제거했다.

`ScoreManagement` 클래스는 `학생 성적을 관리하는 책임`이 있는 클래스이다.
여기에 콘솔에 입/출력하는 책임이 섞여있어서 SOLID 원칙 중 SRP(단일 책임 원칙)을 위반하며 응집도 역시 낮아진다.
`ScoreManagement` 와 `StudentIO` 로 분리시켜 입/출력 책임을 옮겼다.

`cin/cout`을 직접 쓰는 것도 I/O 스트림에 강하게 결합되어 있다.
이는 OCP(개방-폐쇄 원칙)와 DIP(의존성 역전 원칙) 위반이다.
입출력 방식을 바꿀때 메서드를 수정해야 하고, 상위 모듈(클래스)이 콘솔 입출력 이라는 구체 구현에 직접 의존하고 있기 때문이다.
스트림을 매개변수로 주입받는 형태로 바꾸어서 입출력 방식을 바꿀때 기존 메서드를 수정하지 않게 하였다. → 추상화(istream, osteram)에 의존하게 변경
예시 - `std::ofstream fout("students.txt")` 파일을 받아서 데이터를 넣으려할때, cout 대신 fout 을 넣어주면 된다.

`setStudentGrade()` 에서, 등급을 정하는 경계값이 하드 코딩 되어있어서 등급 기준을 바꾸거나 A+ A- 같은 세분화가 추가된다면 메서드 내부를 수정해야한다. 이는 OCP(개방-폐쇄 원칙)에 위반될 수 있어서 등급 기준표를 `Map` 컨테이너로 `GRADE_MAP`을 추가하였다. `GRADE_MAP`은 변경될 수 없게 `static const` 멤버로 넣었다.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
using namespace std;

enum class Grade {
    A_PLUS, A, B, C, D, F,
};

struct Student {
    string name;
    double score;
    Grade grade;
};

struct HighLow {
    Student highest;
    Student lowest;
};

string gradeToString(Grade grade) {
    switch (grade) {
        case Grade::A_PLUS: return "A+";
        case Grade::A: return "A";
        case Grade::B: return "B";
        case Grade::C: return "C";
        case Grade::D: return "D";
        case Grade::F: return "F";
    }
    return "?";
}

class ScoreManagement {
private:
    vector<Student> students;

    static inline const map<double, Grade, greater<double>> GRADE_MAP = {
        {95, Grade::A_PLUS},
        {90, Grade::A},
        {80, Grade::B},
        {70, Grade::C},
        {60, Grade::D},
        {0,  Grade::F}
    };
public:
    explicit ScoreManagement(int studentNum) {
        students.resize(studentNum);
    };

    double getAverageScore() {
        double scoreSum = 0;
        for(auto& student : students) {
            scoreSum += student.score;
        }

        return scoreSum / students.size();
    }

    HighLow getHighLowStudent() {
        HighLow result;
        result.highest = *max_element(students.begin(), students.end(),
            [](const auto& a, const auto& b) { return a.score < b.score; });

        result.lowest = *min_element(students.begin(), students.end(),
            [](const auto& a, const auto& b) { return a.score < b.score; });

        return result;
    }

    void setStudentsGrade() {
        for (auto& student : students) {
            for (auto& [thresold, grade] : GRADE_MAP) {
                if (student.score >= thresold) {
                    student.grade = grade;
                    break;
                }
            }
        }
    }

    void setSortHigher () {
        sort(students.begin(), students.end(),
            [](Student& a, Student& b) { return a.score > b.score; });
    }

    vector<Student>& getStudents() {
        return students;
    }
};

class StudentIO {
private:
    ScoreManagement& sm;

public:
    explicit StudentIO(ScoreManagement& sm) : sm(sm) {};

    void inputStudentScore(Student& student, istream& in) {
        double score;
        while (true) {
            in >> score;
            if (score < 0 || score > 100) {
                cout << "점수 범위 벗어남. 다시 입력\n";
            } else {
                student.score = score;
                break;
            }
        }
    }

    void inputStudents(istream& in, ostream& out) {
        for (auto& student : sm.getStudents()) {
            out << "학생의 이름과 점수를 입력\n";
            in >> student.name;
            inputStudentScore(student, in);
        }
    }

    void printStudents(ostream& out, bool rank) {
        int count = 1;
        for (auto& student : sm.getStudents()) {
            if(rank) {
                out << count << "등 → ";
            }
            out << "이름: " << student.name << ", 성적: " << student.score << ", 등급: " << gradeToString(student.grade) << "\n";
            count++;
        }
    }
};

int main() {
    cout << "학생 수를 입력하시오\n";
    int studentNum;
    cin >> studentNum;

    ScoreManagement sm(studentNum);

    StudentIO sio(sm);
    sio.inputStudents(cin, cout);

    cout << "전체 학생의 평균 점수 → " << sm.getAverageScore() << "\n";

    auto [highest, lowest] = sm.getHighLowStudent();

    cout << "최고 점수를 받은 학생의 이름과 점수: " << highest.name << " " << highest.score << "\n";
    cout << "최저 점수를 받은 학생의 이름과 점수: " << lowest.name << " " << lowest.score << "\n";

    cout << "성적을 등급으로 매김\n";
    sm.setStudentsGrade();
    // std::ofstream fout("students.txt"); → fout 을 넣어도 정상 동작
    sio.printStudents(cout, false);

    cout << "성적 높은순 정렬\n";
    sm.setSortHigher();
    sio.printStudents(cout, true);

    return 0;
};
```

:::

### Lambda

람다는 익명 함수(이름 없는 함수)이다.
C++11부터 도입된 기능으로 함수처럼 동작하는 코드를 간단하게 한 줄로 작성 가능하게 해준다.

```cpp
// 람다 기본 문법
[캡처](매개변수) -> 반환타입 { 함수 본문 }
```

- `[캡처]`: 외부 변수들을 람다 안에서 어떻게 가져올지 지정
  - `[ ]` → 아무것도 안 가져옴
  - `[&]` → 외부 변수를 참조로 가져옴
  - `[=]` → 외부 변수를 값으로 복사해서 가져옴
- (매개변수): 일반 함수처럼 인자 받는 부분
- -> 반환타입: 반환 타입을 명시 (생략 가능, 컴파일러가 추론)
- { 함수 본문 }: 실제 실행할 코드

::: tabs

@tab []

아무것도 캡처하지 않음

```cpp
int x = 10;
auto f = []() { return 42; };
// 외부 변수 x는 접근 불가
cout << f(); // 42 출력
```

@tab [=]

모든 외부 변수를 값 복사

```cpp
int x = 10, y = 20;
auto f = [=]() { return x + y; };
// x, y를 값 복사해서 캡처
x = 40; // 원본 변경
cout << f(); // 30 출력 (10+20)

```

@tab [&]

모든 외부 변수를 참조

```cpp
int x = 10, y = 20;
auto f = [&]() { return x + y; };
// x, y를 참조로 캡처
x = 30; // 원본 변경
cout << f(); // 50 출력 (30+20)
```

@tab [x]

특정 변수만 값 복사

```cpp
int x = 10, y = 20;
auto f = [x]() { return x; };
// x만 값 복사
x = 30; // 원본 변경
cout << f(); // 10 출력 (복사본 유지)
```

@tab [&x]

특정 변수만 참조

```cpp
int x = 10, y = 20;
auto f = [&x]() { x += 5; return x; };
// x만 참조
cout << f(); // 15 출력 (원본 수정됨)
```

@tab [=, &y] / [&, x]

혼합 캡처

```cpp
int x = 10, y = 20;

// f1: 기본은 값 복사, y만 참조
auto f1 = [=, &y]() { return x + (++y); };
cout << f1(); // 실행 → x=10(복사본), y=20→21(원본) → 결과 31

// f2: 기본은 참조, x만 값 복사
auto f2 = [&, x]() { return x + (++y); };
cout << f2(); // 실행 → x=10(복사본), y=21→22(원본) → 결과 32

// f3: 기본은 참조, y만 값 복사
auto f3 = [&, y]() mutable { return x + (++y); };
cout << f3(); // 실행 → x=10(참조 원본), y=22(복사본)→23 → 결과 33

// f4: 기본은 참조, y만 값 복사
auto f4 = [&, y]() mutable { return x + (++y); };
cout << f3(); // 실행 → x=10(참조 원본), y=22(복사본)→23 → 결과 33
```

:::

- 외부 변수를 참조로 받아올 때는 값을 수정할 수 있다 → 원본 수정
- 외부 변수를 복사할때는 `const` 로 복사되기 때문에 값을 수정할 수 없다.
  - 값을 수정하려면 `mutable` 을 붙여야한다.

**STL 알고리즘에서 자주 쓰인다**

`std::sort`, `std::max_element` 같은 STL 알고리즘은 비교 기준 함수를 인자로 받는다.
람다를 쓰면 그 자리에서 바로 함수를 정의할 수 있어 깔끔하고 직관적이다.
복잡하거나 여러 곳에서 재사용할 로직은 외부 함수로 빼는게 좋다.

```cpp
// 함수 버전
bool compareScore(const Student& a, const Student& b) {
  return a.score > b.score
}

std::sort(students.begin(), students.end(), compareScore());
// 장점: 함수 이름이 명확해서 재사용 가능.
// 단점: 코드가 분리돼 있어서 정렬 로직을 바로 읽기 어렵고, 한 번만 쓰는 비교 함수라면 오히려 불필요하게 흩어져 보임.


// 람다 버전
std::sort(students.begin(), students.end(),
    [](const Student& a, const Student& b) {
        return a.score > b.score; // 점수 높은 순으로 정렬
    });
// 장점: 정렬 로직을 바로 그 자리에서 확인 가능 → “정렬 기준이 점수”라는 게 코드 흐름에 녹아 있음.
// 단점: 람다가 길어지면 오히려 가독성이 떨어질 수 있음. (특히 복잡한 조건식일 때)
```

### struct

구조체(struct)는 서로 관련 있는 여러 데이터(멤버 변수)를 하나의 타입으로 묶어서 다루기 위한 사용자 정의 타입이다.
C++ 에서는 class 와 거의 동일하게 동작하며, 유일한 차이는 멤버/상속의 기본 접근 제어자이다.

```cpp
// struct 기본 문법
struct 구조체이름 {
    타입 멤버변수1;
    타입 멤버변수2;
    반환타입 멤버함수(매개변수) { ... }
};
```

<naive-provider>
  <n-steps vertical>
    <n-step title="C: 데이터만 묶는 용도로 사용, 함수·생성자 불가" />
    <n-step title="C++: 멤버 함수, 생성자, 접근 제어자, 상속까지 모두 지원" />
    <n-step title="struct vs class: 기본 접근 제어자만 다를 뿐 기능은 동일" />
  </n-steps>
</naive-provider>

::: tabs

@tab struct vs class

구조체와 클래스는 기능적으로 동일하지만 기본 접근 제어자가 다르다.

```cpp
struct Point {
    int x; // 기본 public
    int y;
};

class PointClass {
    int x; // 기본 private
    int y;
};

Point p;
p.x = 10; // OK: struct 멤버는 기본 public

PointClass pc;
pc.x = 10; // 컴파일 에러: private 멤버 접근 불가
```

- struct 멤버/상속의 기본 접근 지정자는 `public`
- class 멤버/상속의 기본 접근 지정자는 `private`
- 관례적으로 데이터 위주(POD, Plain Old Data)의 단순한 구조에는 struct를, 캡슐화와 동작(메서드)이 중요한 경우에는 class를 사용

@tab 초기화 방법

```cpp
struct Student {
    string name;
    double score;
};

// 1. 집합 초기화 (Aggregate Initialization)
Student s1 = { "Alice", 95.5 };

// 2. 멤버 이름을 지정하는 지정 초기화 (C++20)
Student s2 = { .name = "Bob", .score = 88.0 };

// 3. 생성자를 직접 정의해서 초기화
struct Point {
    int x, y;
    Point(int x, int y) : x(x), y(y) {}
};
Point p(1, 2);
```

- 생성자, 가상 함수, `private` 멤버가 없는 struct는 "집합체(Aggregate)"로 취급되어 `{}` 를 이용한 초기화가 가능하다.
- 생성자를 직접 정의하면 더 이상 집합체가 아니게 되어, 반드시 생성자를 통해서만 초기화해야 한다.

@tab 중첩 구조체

```cpp
struct Address {
    string city;
    string street;
};

struct Student {
    string name;
    Address address; // 구조체 안에 다른 구조체를 멤버로 포함 가능
};

Student s;
s.name = "Alice";
s.address.city = "Seoul";
s.address.street = "Gangnam";
```

- 구조체는 멤버로 다른 구조체(혹은 클래스)를 포함할 수 있다.
- 아래 학생 성적 관리 프로그램에서 사용한 `HighLow` 구조체도 `Student` 를 멤버로 포함하는 중첩 구조체이다.

:::

- struct는 C++에서 class와 동일하게 멤버 함수, 생성자, 상속, 접근 제어자를 모두 사용할 수 있다.
- struct와 class의 차이는 딱 하나, 접근 제어자의 기본값뿐이다. (struct → `public`, class → `private`)
- 관례적으로 데이터를 담는 용도로 단순하게 쓸 때는 struct, 캡슐화와 책임이 있는 객체에는 class를 사용한다.

### const / static const

`const`는 값이 변경되지 않음을 컴파일러에게 보장하는 키워드이고, `static`은 변수의 저장 기간(lifetime)과 공유 범위를 제어하는 키워드이다.
학생 성적 관리 프로그램의 등급 기준표(`GRADE_MAP`)를 `static const`로 선언한 이유를 이해하려면, 두 키워드를 각각 알아야 한다.

<NaiveStep vertical :stepData="[
{title: 'const: 값 / 포인터 / 멤버 함수가 무언가를 변경하지 않음을 보장'},
{title: 'static (지역 변수): 함수 호출이 끝나도 값을 유지'},
{title: 'static (멤버 변수): 모든 인스턴스가 공유하는 단 하나의 값'},
{title: 'static const: 모든 인스턴스가 공유하며 변경되지 않는 값'},
]" />

#### const

::: tabs

@tab const 변수

```cpp
const int MAX_SCORE = 100;
MAX_SCORE = 90; // 컴파일 에러: const 변수는 재할당 불가
```

- 선언과 동시에 초기화해야 하며, 이후 값을 변경할 수 없다.
- 매직 넘버 대신 의미 있는 이름을 붙여 가독성과 유지보수성을 높일 때 사용한다.

@tab const 포인터 / 참조

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

- `const`의 위치에 따라 "무엇이 상수인지"가 달라진다. (포인터가 가리키는 값 vs 포인터 자체)
- 함수 매개변수를 `const&`로 받으면 복사 비용 없이 원본을 안전하게 읽기 전용으로 넘길 수 있다.

@tab const 멤버 함수

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

- 멤버 함수 뒤에 `const`를 붙이면 해당 함수 안에서 멤버 변수를 수정할 수 없다.
- "이 함수는 객체 상태를 조회만 한다"는 의도를 컴파일러가 강제해준다.
- const 객체는 const 멤버 함수만 호출할 수 있다.

:::

#### static

::: tabs

@tab 지역 변수의 static

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

- 일반 지역 변수는 함수가 끝나면 소멸되지만, `static` 지역 변수는 프로그램 종료까지 값이 유지된다.
- 초기화 구문은 최초 호출 시 단 한 번만 실행된다.

@tab 클래스의 static 멤버

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

- `static` 멤버 변수는 객체마다 따로 갖는 게 아니라, 클래스 전체가 공유하는 단 하나의 변수이다.
- 인스턴스 없이도 `클래스이름::멤버` 형태로 접근할 수 있다.
- C++17부터는 `inline static`을 사용하면 클래스 정의 안에서 바로 초기화할 수 있다.

:::

#### static const / static inline const

`static`과 `const`를 함께 쓰면 "클래스 전체가 공유하는, 변경되지 않는 값"을 만들 수 있다.
개선된 학생 성적 관리 프로그램에서 등급 기준표를 아래처럼 선언한 이유가 여기에 있다.

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
- `inline`: C++17부터 지원되며, 클래스 정의 안에서 바로 초기화할 수 있게 해준다. (`inline`이 없다면 `.cpp` 파일에 별도로 `const map<...> ScoreManagement::GRADE_MAP = {...};` 같은 정의가 필요하다.)

::: note 정리

- `const`는 "이 값/포인터/함수는 무언가를 변경하지 않는다"는 약속을 컴파일러가 강제하도록 만든다.
- `static`은 변수의 생명주기를 프로그램 종료 시점까지 늘리거나(지역 변수), 클래스의 모든 인스턴스가 공유하는 값(멤버 변수)으로 만든다.
- `static const`는 두 특성을 합쳐 "모든 인스턴스가 공유하며 변경되지 않는 값"을 표현하며, 등급 기준표처럼 객체마다 달라질 필요 없는 상수 데이터를 클래스 멤버로 둘 때 적합하다.

:::

### 컨테이너

컨테이너(Container)는 데이터를 저장하고 관리하기 위한 자료구조를 표준화해 놓은 것으로, C++ STL(Standard Template Library)의 핵심 구성 요소이다.
직접 배열이나 연결 리스트를 구현하지 않아도, 목적에 맞는 컨테이너를 선택해서 쓰면 된다. 크게 아래 세 가지로 나뉜다.

| 분류                       | 컨테이너                             | 설명                        |
| -------------------------- | ------------------------------------ | --------------------------- |
| 순차 컨테이너              | `vector`, `list`, `deque`            | 순서대로 원소 저장          |
| 연관 컨테이너              | `map`, `multimap`, `set`, `multiset` | 키(key) 기반으로 원소 저장  |
| 비순차 컨테이너(해시 기반) | `unordered_map`, `unordered_set`     | 해시 테이블 기반, 빠른 탐색 |

::: tabs

@tab 순차 컨테이너

```cpp
#include <vector>
#include <list>
#include <deque>
using namespace std;

vector<int> v = {1, 2, 3};
v.push_back(4); // 끝에 추가, 인덱스 접근 O(1)
v[0] = 10;

list<int> l = {1, 2, 3};
l.push_front(0); // 앞에 추가 O(1), 인덱스 접근은 불가(순차 접근만 가능)

deque<int> dq = {1, 2, 3};
dq.push_front(0); // 앞/뒤 모두 O(1) 추가 가능, 인덱스 접근도 O(1)
dq.push_back(4);
```

- `vector`: 메모리가 연속적으로 할당되어 인덱스 접근(`[]`)이 O(1)이다. 대신 중간·앞쪽 삽입/삭제는 뒤 원소들을 밀어야 해서 O(N)이 걸린다. 학생 성적 관리 프로그램에서 `vector<Student> students`로 사용했다.
- `list`: 이중 연결 리스트. 임의 위치의 삽입/삭제가 O(1)이지만, 인덱스로 바로 접근할 수 없고 순회를 통해서만 원소에 도달할 수 있다.
- `deque`: 양쪽 끝에서의 삽입/삭제가 모두 O(1)이면서 인덱스 접근도 O(1)이다. 앞쪽 삽입이 잦은 큐 형태의 자료에 `vector`보다 적합하다.

@tab 연관 컨테이너

```cpp
#include <map>
#include <set>
using namespace std;

map<string, int> ages;
ages["Alice"] = 20;
ages["Bob"] = 22;
for (auto& [name, age] : ages) {
    cout << name << ": " << age << "\n"; // 키(이름) 기준 오름차순으로 자동 정렬되어 순회됨
}

multimap<string, int> scoresByName;
scoresByName.insert({"Alice", 90});
scoresByName.insert({"Alice", 85}); // 같은 키를 중복 저장 가능

set<int> scores = {90, 70, 85};
scores.insert(100);
scores.count(85); // 존재하면 1, 없으면 0

multiset<int> duplicateScores = {90, 90, 85}; // 중복 값 저장 가능
```

- `map<Key, Value>`: 키-값 쌍을 저장하며, 내부적으로 균형 이진 탐색 트리(주로 Red-Black Tree)로 구현되어 키 기준 오름차순 정렬을 유지한다. 같은 키는 하나만 존재할 수 있다.
- `multimap`: `map`과 동일하지만 같은 키를 여러 번 저장할 수 있다. (예: 동명이인 학생의 점수를 모두 보관)
- `set<T>`: 값 자체를 키로 취급해 정렬된 상태로 저장하며, 중복을 허용하지 않는다.
- `multiset`: `set`과 동일하지만 같은 값을 중복해서 저장할 수 있다.
- 학생 성적 관리 프로그램의 등급 기준표 `GRADE_MAP`은 `map<double, Grade, greater<double>>`로 선언해서, 기본 오름차순 대신 점수가 높은 순서로 정렬되도록 세 번째 템플릿 인자에 비교자(`greater<double>`)를 지정했다.

@tab 비순차 컨테이너 (해시 기반)

```cpp
#include <unordered_map>
#include <unordered_set>
using namespace std;

unordered_map<string, int> ages;
ages["Alice"] = 20;
ages["Bob"] = 22;
// 순회 순서가 삽입 순서/정렬 순서와 무관 (해시 버킷 순서)

unordered_set<int> scores = {90, 70, 85};
scores.count(85); // 평균 O(1)로 탐색
```

- `unordered_map`/`unordered_set`은 해시 테이블로 구현되어 정렬을 유지하지 않는 대신, 탐색·삽입·삭제가 평균 O(1)로 `map`/`set`(O(log N))보다 빠르다.
- 정렬된 순서로 순회할 필요 없이 탐색 속도만 중요한 경우(예: "이미 나온 이름인지 빠르게 확인")에 적합하다.
- 해시 충돌이 많아지면 최악의 경우 O(N)까지 느려질 수 있으므로, 정렬이 필요하거나 최악의 경우 성능을 보장해야 한다면 `map`/`set`을 사용한다.

@tab pair / tuple

```cpp
#include <utility>
#include <tuple>
using namespace std;

pair<string, int> p = {"Alice", 90};
cout << p.first << " " << p.second;

auto [name, score] = p; // 구조적 바인딩으로 분해

tuple<string, int, char> t = {"Bob", 85, 'B'};
cout << get<0>(t) << " " << get<1>(t) << " " << get<2>(t);
```

- `pair`는 서로 다른 타입 두 개를 하나로 묶을 때 사용하며, `map`의 내부 원소 타입(`pair<const Key, Value>`)이기도 하다.
- `tuple`은 세 개 이상의 값을 묶을 때 사용한다. 구조체를 따로 정의하기 애매한 임시 데이터 묶음에 적합하다.
- 학생 성적 관리 프로그램에서 최고점/최저점을 함께 반환하기 위해 `HighLow`라는 구조체를 직접 만들었는데, 필드가 두 개뿐이고 재사용할 곳이 없다면 `pair<Student, Student>`로도 대체할 수 있다.

@tab 컨테이너 어댑터

```cpp
#include <stack>
#include <queue>
using namespace std;

stack<int> st;
st.push(1); st.push(2);
st.top(); // 2 (가장 나중에 넣은 값)
st.pop();

queue<int> q;
q.push(1); q.push(2);
q.front(); // 1 (가장 먼저 넣은 값)
q.pop();

priority_queue<int> pq; // 기본은 최대 힙
pq.push(3); pq.push(1); pq.push(2);
pq.top(); // 3 (가장 큰 값)
```

- `stack`(LIFO), `queue`(FIFO), `priority_queue`(우선순위 기반)는 새로운 자료구조가 아니라, `vector`/`deque` 같은 다른 컨테이너를 감싸서 제한된 인터페이스만 노출하는 어댑터이다.
- 예를 들어 학생들의 점수를 정렬 상태로 유지하며 하나씩 꺼내 쓰고 싶다면, `sort` 대신 `priority_queue<Student, vector<Student>, Comp>`를 활용할 수도 있다.

:::

::: note

- 순차 컨테이너(`vector`, `list`, `deque`)는 순서를 유지하며 원소를 저장하고, 인덱스 접근 방식과 삽입/삭제 성능이 서로 다르다.
- 연관 컨테이너(`map`, `multimap`, `set`, `multiset`)는 키 기준으로 자동 정렬되며, 중복 키/값 허용 여부로 나뉜다.
- 비순차 컨테이너(`unordered_map`, `unordered_set`)는 해시 기반으로 정렬 없이 평균 O(1) 탐색 속도를 제공한다.
- `pair`/`tuple`은 컨테이너는 아니지만 여러 값을 하나로 묶을 때 함께 자주 쓰이고, `stack`/`queue`/`priority_queue`는 다른 컨테이너를 감싸는 어댑터이다.
- 정렬 순서를 바꾸고 싶으면 `map`/`set`/`priority_queue`의 템플릿 인자로 비교자(`greater<T>` 등)를 넘기면 된다. (`GRADE_MAP`에서 이미 사용한 방식)

:::
