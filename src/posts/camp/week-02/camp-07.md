---
date: 2026-07-06
category:
  - Camp
  - Unreal
order: 3
---

# 캠프 7일차

## C++

### Hello World

```cpp
#include <iostream> // i는 input, o는 output
// cpp에서 제공하는 헤더파일은 <> 를 통해 불러오고, 사용자 정의 헤더 파일은 "" 를 통해 불러온다.

using namespace std;

int main() { // cpp이 시작되면 main을 제일 먼저 찾고 실행한다. (시작점/진입점)
    cout << "Hello, World!" << endl; // using namespace std; 가 없으면 std::cout 이런식으로 작성해야한다.
    // cout → console output
    // endl → end line (개행 - 한 줄 띄기)
    return 0;
}
```

### 변수

::: tabs

@tab 변수 선언

```cpp
#include <iostream>
#include <string> //string 헤더를 추가, c++에서 편하게 쓰라고 만들어줌
using namespace std;

int main() {
    // 정수형 변수 선언
    int age = 25;  // 초기값 25
    int year;      // 초기값 없음

    // 실수형 변수 선언
    float pi = 3.14f;
    double largeDecimal = 12345.6789;

    // 문자형 변수 선언
    char grade = 'A';

    // 문자열 변수 (C++ 표준 라이브러리 사용)
    string name = "John";

    // 불리언 변수
    bool isStudent = true;

    cout << "Age: " << age << endl;
    cout << "Year: " << year << " (uninitialized, may contain garbage value)" << endl;
    cout << "Pi: " << pi << endl;
    cout << "Large Decimal: " << largeDecimal << endl;
    cout << "Grade: " << grade << endl;
    cout << "Name: " << name << endl;
    cout << "Is Student: " << (isStudent ? "true" : "false") << endl;

    // const - 상수 선언 → Read only가 된다. 수정 불가능.
    const double gravity = 9.8;  // 중력 가속도
    cout << "Gravity: " << gravity << endl;

    return 0;
}
```

@tab 변수 연산

```cpp
#include <iostream>
using namespace std;

int main() {
    // 변수 선언 및 초기화
    int a = 10, b = 5;
    float x = 15.5, y = 4.2;

    // 산술 연산
    cout << "산술 연산:" << endl;
    cout << "a + b = " << a + b << endl; // 덧셈 → 15
    cout << "a - b = " << a - b << endl; // 뺄셈 → 5
    cout << "a * b = " << a * b << endl; // 곱셈 → 50
    cout << "a / b = " << a / b << endl; // 나눗셈 → 2
    cout << "a % b = " << a % b << endl; // 나머지 → 0

    // 대입 연산
    cout << "\n대입 연산:" << endl;
    a += 3;  // a = a + 3 → 13
    cout << "a += 3 -> a = " << a << endl;
    a -= 2;  // a = a - 2 → 11
    cout << "a -= 2 -> a = " << a << endl;
    a *= 2;  // a = a * 2 → 22
    cout << "a *= 2 -> a = " << a << endl;
    a /= 2;  // a = a / 2 → 11
    cout << "a /= 2 -> a = " << a << endl;

    // 관계 연산
    cout << "\n관계 연산:" << endl;
    cout << "a == b: " << (a == b) << endl; // 같음 → false
    cout << "a != b: " << (a != b) << endl; // 다름 → true
    cout << "a > b: " << (a > b) << endl;   // 큼 → true
    cout << "a < b: " << (a < b) << endl;   // 작음 → false
    cout << "a >= b: " << (a >= b) << endl; // 크거나 같음 → true
    cout << "a <= b: " << (a <= b) << endl; // 작거나 같음 → false

    return 0;
}
```

@tab 변수 입력

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // 변수 선언
    string name;
    int age;
    float height;

    // 문자열 입력
    cout << "이름을 입력하세요: ";
    getline(cin, name); // cin과의 차이는, cin은 공백이 있을때 공백 앞까지만 들어가고, getline은 공백이 있어도 모두 받는다.

    // 정수 입력
    cout << "나이를 입력하세요: ";
    cin >> age;

    // 실수 입력
    cout << "키를 입력하세요 (cm): ";
    cin >> height;

    // 출력으로 확인
    cout << "\n입력한 정보:" << endl;
    cout << "이름: " << name << endl;
    cout << "나이: " << age << endl;
    cout << "키: " << height << " cm" << endl;

    return 0;
}
```

@tab 대입, 비교

```cpp
#include <iostream>

using namespace std;

int main() {
    int a = 5;   // 변수 a에 5를 대입
    int b = 5;   // 변수 b에 5를 대입

    // 대입 연산 (값을 변경)
    a = 10; // a의 값을 10으로 변경

    // 비교 연산 (참/거짓 결과 반환)
    bool isEqual = (a == b); // a와 b가 같은지 비교

    // 출력
    cout << "a = " << a << ", b = " << b << endl;
    cout << "a == b: " << isEqual << endl; // 비교 결과 출력

    return 0;
}
```

@tab 전위, 후위

```cpp
#include <iostream>

using namespace std;

int main() {
    int a = 5;
    int b = a++;  // 후위 증가: b에 먼저 a를 대입한 후 a 증가
    int c = ++a;  // 전위 증가: a를 먼저 증가시킨 후 c에 대입

    cout << "후위 증가 (b = a++):" << endl;
    cout << "b = " << b << ", a = " << a << endl; // b = 5, a = 7

    cout << "전위 증가 (c = ++a):" << endl;
    cout << "c = " << c << ", a = " << a << endl; // c = 7, a = 7

    return 0;
}
```

@tab unsigned

```cpp
#include <iostream>

using namespace std;

int main() {
    int signedVar = -10;      // 일반 int (signed), 음수 가능
    unsigned int unsignedVar = 10; // unsigned int, 음수 불가능 → unsigned는 일반형에서 양수 *2 만큼의 값 범위

    cout << "signed int: " << signedVar << endl;
    cout << "unsigned int: " << unsignedVar << endl;

    return 0;
}
```

@tab 함수

```cpp
#include <iostream>

using namespace std;

int main()
{
    // 입력 받은 숫자를 저장 할 2개의 변수를 선언
    int firstNum = 0;
    int secondNum = 0;

    // 변수에 2개의 값을 담음
    // 입력을 받고 있다는 것을 알리기 위한 텍스트도 같이 출력
    cout << "첫 번째 수 입력 : ";
    cin >> firstNum;

    cout << "두 번째 수 입력 : ";
    cin >> secondNum;

    // 더한 결과값 출력
    cout << "더한 결과는 : " << firstNum + secondNum << endl;

    return 0;
}
```

:::

### 배열

::: tabs

@tab 선언

```cpp
#include <iostream>
using namespace std;

int main() {
    // 선언과 동시에 초기화
    int arr1[3] = {1, 2, 3};

    // 선언 후 개별 원소 초기화
    int arr2[3];
    arr2[0] = 10;
    arr2[1] = 20;
    arr2[2] = 30;

    // 배열 출력
    cout << "arr1: " << arr1[0] << ", " << arr1[1] << ", " << arr1[2] << endl; // → arr1: 1, 2, 3
    cout << "arr2: " << arr2[0] << ", " << arr2[1] << ", " << arr2[2] << endl; // → arr2: 10, 20, 30

    return 0;
}
```

@tab 복사, 대입

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr1[3] = {1, 2, 3};
    int arr2[3];

    // 개별 원소를 복사하는 것은 가능
    for (int i = 0; i < 3; i++) {
        arr2[i] = arr1[i];
    }

    // 배열 통째로 대입 (불가능, 주석 처리)
    // arr2 = arr1;  // 컴파일 오류 발생

    // 복사된 배열 출력
    cout << "arr2: " << arr2[0] << ", " << arr2[1] << ", " << arr2[2] << endl; // arr2: 1, 2, 3

    return 0;
}
```

@tab 임의 접근

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[4] = {10, 20, 30, 40};

    // 배열 원소에 임의 접근하여 출력
    cout << "첫 번째 원소: " << arr[0] << endl; // 첫 번째 원소: 10
    cout << "두 번째 원소: " << arr[1] << endl; // 두 번째 원소: 20
    cout << "세 번째 원소: " << arr[2] << endl; // 세 번째 원소: 30
    cout << "네 번째 원소: " << arr[3] << endl; // 네 번째 원소: 40

    // 범위를 벗어난 접근 (에러 발생 가능)
    // cout << arr[4] << endl;  // 정의되지 않은 동작 (UB, 오류 가능)

    return 0;
}
```

@tab 입출력

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[3]; // 크기 3의 배열 선언

    // 각 원소에 대해 개별적으로 입력 받기
    cout << "첫 번째 정수를 입력하세요: "; // 첫 번째 정수를 입력하세요: 10
    cin >> arr[0];

    cout << "두 번째 정수를 입력하세요: "; // 두 번째 정수를 입력하세요: 20
    cin >> arr[1];

    cout << "세 번째 정수를 입력하세요: "; // 세 번째 정수를 입력하세요: 30
    cin >> arr[2];

    // 각 원소 개별 출력
    cout << "입력한 값: " << arr[0] << ", " << arr[1] << ", " << arr[2] << endl; // 입력한 값: 10, 20, 30

    return 0;
}
```

@tab 총점 및 평균

```cpp
#include <iostream>

using namespace std;

int main()
{
    double score[5];

    cout <<"1 번째 학생 점수를 입력해주세요 : ";
    cin >> score[0];

    cout <<"2 번째 학생 점수를 입력해주세요 : ";
    cin >> score[1];

    cout <<"3 번째 학생 점수를 입력해주세요 : ";
    cin >> score[2];

    cout <<"4 번째 학생 점수를 입력해주세요 : ";
    cin >> score[3];

    cout <<"5 번째 학생 점수를 입력해주세요 : ";
    cin >> score[4];

    double tot = score[0] + score[1] + score[2] + score[3] + score[4];
    double avg = tot / 5;

    cout << "총점 : " << tot << endl;
    cout << "평균 : " << avg << endl;

    return 0;
}
```

:::

### 반복을 줄이는 함수

::: tabs

@tab 기본 함수 정의와 호출

```cpp
#include <iostream>
using namespace std;

// 두 정수를 더하는 함수
int add(int a, int b) {
    return a + b; // 결과 반환
}

int main() {
    int result = add(3, 7);
    cout << "3 + 7 = " << result << endl; // 출력: 3 + 7 = 10
    return 0;
}
```

@tab 반환값 없는 함수(void)

```cpp
#include <iostream>
using namespace std;

// 메시지를 출력하는 함수 (반환 없음)
void printMessage() {
    cout << "Hello, Function!" << endl;
}

int main() {
    printMessage(); // 함수 호출 → Hello, Function!
    return 0;
}
```

@tab 잘못된 함수

```cpp
#include <iostream>
using namespace std;

// 잘못된 함수 정의
void incorrectFunction() {
    return 42; // 오류 발생: void 함수는 값을 반환할 수 없음
}

int main() {
    incorrectFunction(); // → error: return-statement with a value, in function returning 'void'
    return 0;
}
```

:::

### 값의 변화

::: tabs

@tab 일반 변수

```cpp
#include <iostream>
using namespace std;

// 함수: 값 전달 (Call by Value)
void modifyValue(int x) {
    x = 100;  // 함수 내부에서 값 변경
}

int main() {
    int num = 50;
    modifyValue(num); // 값 전달 (복사됨)

    cout << "값 전달 후 num: " << num << endl;
    // 출력: 값 전달 후 num: 50
    return 0;
}
```

@tab 주소 전달-변수

```cpp
#include <iostream>
using namespace std;

// 함수: 포인터를 사용한 값 변경
void modifyValue(int* ptr) {
    *ptr = 100;  // 포인터가 가리키는 변수의 값을 변경
}

int main() {
    int num = 50;
    modifyValue(&num); // num의 주소 전달

    cout << "포인터 전달 후 num: " << num << endl;
    // 출력: 포인터 전달 후 num: 100
    return 0;
}
```

@tab 주소 전달-배열

```cpp
#include <iostream>
using namespace std;

// 함수: 포인터를 사용한 값 변경
void modeifyArr(char* ptr) {
    ptr[0] = 'X';  // 포인터가 가리키는 변수의 값을 변경
}

int main() {
    char str[4] = {'A', 'B', 'C', 'D'};
    modeifyArr(str); // num의 주소 전달

    cout << "포인터 전달 후 str[0] = " << str[0] << endl;
    // 출력: 포인터 전달 후 str[0] = X
    return 0;
}
```

@tab 참조자

```cpp
#include <iostream>
using namespace std;

// 함수: 참조를 사용한 값 변경
void modifyValueByReference(int& x) {
    x = 200;  // 참조를 사용하여 원본 값 변경
}

int main() {
    int num = 50;
    modifyValueByReference(num); // 참조 전달

    cout << "참조 전달 후 num: " << num << endl;
    // 출력: 참조 전달 후 num: 200
    return 0;
}
```

:::

### 기타 함수 예제

::: tabs

@tab 원의 넓이 계산

```cpp
#include <iostream>
using namespace std;

/**
 * @brief 반지름을 입력받아 원의 넓이를 계산하는 함수
 * @param radius 원의 반지름
 * @return double 원의 넓이
 */
double calculateCircleArea(double radius) {
    return 3.14 * radius * radius;
}

int main() {
    double radius = 5.0;
    cout << "원의 넓이: " << calculateCircleArea(radius) << endl;
    return 0;
}
```

@tab 평균 계산

```cpp
#include <iostream>
using namespace std;

/**
 * @brief 4개의 점수를 입력받아 평균 점수를 계산하는 함수
 * @param score1 첫 번째 점수
 * @param score2 두 번째 점수
 * @param score3 세 번째 점수
 * @param score4 네 번째 점수
 * @return int 평균 점수 (소수점 제외)
 */
int calculateAverage(int score1, int score2, int score3, int score4) {
    int sum = score1 + score2 + score3 + score4;
    return sum / 4; // 정수 나눗셈으로 소수점 없이 계산
}

int main() {
    int score1 = 80, score2 = 90, score3 = 85, score4 = 70;
    cout << "평균 점수: " << calculateAverage(score1, score2, score3, score4) << endl;
    return 0;
}
```

@tab 이름 형식 변환

```cpp
#include <iostream>
#include <string>
using namespace std;

/**
 * @brief 이름과 성을 입력받아 "성 이름" 형식으로 변환하는 함수
 * @param firstName 이름
 * @param lastName 성
 * @return string 변환된 이름
 */
string formatName(string firstName, string lastName) {
    return lastName + " " + firstName; // 문자열 결합
}

int main() {
    string firstName = "철수";
    string lastName = "김";
    cout << "이름 형식 변환: " << formatName(firstName, lastName) << endl;
    return 0;
}
```

@tab 점수 출력

```cpp
#include <iostream>
using namespace std;

/**
 * @brief 네 개의 점수를 받아 합계를 계산하고 출력하는 함수
 * @param score1 첫 번째 점수
 * @param score2 두 번째 점수
 * @param score3 세 번째 점수
 * @param score4 네 번째 점수
 */
void printTotalScore(int score1, int score2, int score3, int score4) {
    int total = score1 + score2 + score3 + score4; // 점수 합계 계산
    cout << "점수 합계: " << total << endl;
}

int main() {
    printTotalScore(80, 90, 85, 70); // 합계 출력
    return 0;
}
```

:::

### 조건문

::: tabs

@tab 단순 if문

```cpp
#include <iostream>
using namespace std;

int main() {
    int age;

    cout << "Enter your age: ";
    cin >> age;

    // if 문: 조건이 true일 때만 실행
    if (age >= 18) {
        cout << "You are eligible to vote." << endl;
    }

    // 조건이 false인 경우 아무것도 실행안됨
    cout << "Program finished." << endl;

    return 0;
}
```

@tab if / else

```cpp
#include <iostream>
using namespace std;

int main() {
    int number;

    cout << "Enter a number: ";
    cin >> number;

    // if/else 문: 조건이 true일 때와 false일 때 다른 작업을 수행
    if (number % 2 == 0) { // 입력값이 짝수인지 확인
        cout << "The number is even." << endl;
    } else { // 위 조건이 false라면 (즉, 홀수라면) 실행
        cout << "The number is odd." << endl;
    }

    cout << "Program finished." << endl;

    return 0;
}
```

@tab if / else if / else

```cpp
#include <iostream>
using namespace std;

int main() {
    int score;

    cout << "Enter your score (0-100): ";
    cin >> score;

    if (score >= 90) { // 90 이상인 경우
        cout << "Grade: A" << endl;
    } else if (score >= 80) { // 80 이상 90 미만인 경우
        cout << "Grade: B" << endl;
    } else if (score >= 70) { // 70 이상 80 미만인 경우
        cout << "Grade: C" << endl;
    } else if (score >= 60) { // 60 이상 70 미만인 경우
        cout << "Grade: D" << endl;
    } else { // 60 미만인 경우
        cout << "Grade: F" << endl;
    }

    cout << "Program finished." << endl;

    return 0;
}
```

@tab 성적 등급 나누기

```cpp
#include <iostream>
using namespace std;

int main() {
    int score;

    cout << "Enter your score: ";
    cin >> score;

    // 조건: 0 <= score <= 100
    if (score >= 0 && score <= 100) {
        if (score >= 90) {
            cout << "Grade: A\n";
        } else if (score >= 80) {
            cout << "Grade: B\n";
        } else if (score >= 70) {
            cout << "Grade: C\n";
        } else if (score >= 60) {
            cout << "Grade: D\n";
        } else {
            cout << "Grade: F\n";
        }
    } else {
        cout << "Invalid score. Please enter a value between 0 and 100.\n";
    }

    return 0;
}
```

@tab 날씨, 온도에 따른 외출 여부

```cpp
#include <iostream>
using namespace std;

int main() {
    string weather;
    int temperature;

    cout << "Enter weather (sunny/rainy): ";
    cin >> weather;
    cout << "Enter temperature: ";
    cin >> temperature;

    // 조건: 맑은 날씨(sunny)이고 온도가 20도 이상일 때 외출
    if (weather == "sunny" && temperature >= 20) {
        cout << "It's a nice day to go out!\n";
    }
    // 조건: 비가 오거나 너무 추운 날씨
    else if (weather == "rainy" || temperature < 10) {
        cout << "Better stay indoors.\n";
    }
    // 나머지 경우
    else {
        cout << "You can go out, but dress appropriately.\n";
    }

    return 0;
}
```

:::

### 잘 작성된 조건문과 아닌 조건문

::: tabs

@tab 잘 작성된 조건문

잘 작성된 조건문의 경우 한 눈에 보기에도 깔끔하다.

```cpp
#include <iostream>
using namespace std;

int main() {
    char op;
    double num1, num2;

    cout << "Enter first number: ";
    cin >> num1;
    cout << "Enter an operator (+, -, *, /): ";
    cin >> op;
    cout << "Enter second number: ";
    cin >> num2;

    if (op == '+') {
        cout << "Result: " << num1 + num2 << endl;
    }
    else if (op == '-') {
        cout << "Result: " << num1 - num2 << endl;
    }
    else if (op == '*') {
        cout << "Result: " << num1 * num2 << endl;
    }
    else if (op == '/') {
        if (num2 == 0) {
            cout << "Division by zero is not allowed." << endl;
        } else {
            cout << "Result: " << num1 / num2 << endl;
        }
    }
    else {
        cout << "Invalid operator." << endl;
    }

    return 0;
}
```

@tab 과도하게 복잡한 조건문

잘 작성되지 못한 조건문은 필요 이상으로 depth가 계속 깊어진다. 깊어지는 코드는 한번 의심해보아야한다.
depth가 3개 이상이면 사람들이 일반적으로 이해하기 힘들어한다. 이런 경우에는 내가 조금 더 잘 구현할 수 없을까 고민해보아야 한다.

```cpp
#include <iostream>
using namespace std;

int main() {
    char op;
    double num1, num2;

    cout << "Enter first number: ";
    cin >> num1;
    cout << "Enter an operator (+, -, *, /): ";
    cin >> op;
    cout << "Enter second number: ";
    cin >> num2;

    if (op == '+') {
        cout << "Result: " << num1 + num2 << endl;
    } else {
        if (op == '-') {
            cout << "Result: " << num1 - num2 << endl;
        } else {
            if (op == '*') {
                cout << "Result: " << num1 * num2 << endl;
            } else {
                if (op == '/') {
                    if (num2 == 0) {
                        cout << "Division by zero is not allowed." << endl;
                    } else {
                        cout << "Result: " << num1 / num2 << endl;
                    }
                } else {
                    cout << "Invalid operator." << endl;
                }
            }
        }
    }

    return 0;
}
```

:::

### 반복문

#### for

::: tabs

@tab 1부터 10까지 합

```cpp
#include <iostream>
using namespace std;

int main() {
    int sum = 0; // 합을 저장할 변수 초기화
    for (int i = 1; i <= 10; i++) { // 초기화: i = 1
                                    // 종료 조건: i <= 10
                                    // 사후 동작: i++
        sum += i; // 실제 동작: sum에 i를 더함
    }
    cout << "Sum: " << sum << endl; // Sum: 55
    return 0;
}
```

@tab 5부터 1까지 출력

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 5; i >= 1; i--) { // 초기화: i = 5
                                   // 종료 조건: i >= 1
                                   // 사후 동작: i--
        cout << i << " "; // 실제 동작: i를 출력
    }
    cout << endl;
    // 출력값: 5 4 3 2 1
    return 0;
}

```

@tab 1부터 20까지 3의 배수 출력

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 20; i++) { // 초기화: i = 1
                                    // 종료 조건: i <= 20
                                    // 사후 동작: i++
        if (i % 3 == 0) { // 조건: i가 3의 배수인지 확인
            cout << i << " "; // 3의 배수일 때 i를 출력
        }
    }
    cout << endl;
    // 출력값: 3 6 9 12 15 18
    return 0;
}
```

@tab 오른쪽 정렬 삼각별

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 5; // 삼각형의 높이
    for (int i = 1; i <= n; i++) { // 초기화: i = 1
                                   // 종료 조건: i <= n
                                   // 사후 조건: i++
        for (int j = 1; j <= n - i; j++) { // 초기화: j = 1
                                           // 종료 조건: j <= n - i
                                           // 사후 동작: j++
            cout << " "; // 실제 동작: 공백 출력
        }
        for (int j = 1; j <= i; j++) { // 초기화: j = 1
                                       // 종료 조건: j <= i
                                       // 사후 조건: j++
            cout << "*"; // 실제 동작: 별 출력
        }
        cout << endl;
    }
    //     *
    //    **
    //   ***
    //  ****
    // *****
    return 0;
}
```

:::

#### while

::: tabs

@tab 사용자 입력 종료

```cpp
#include <iostream>
using namespace std;

int main() {
    int number; // 사용자 입력값을 저장할 변수

    cout << "Enter numbers (negative number to stop): ";
    cin >> number; // 초기 동작: 첫 번째 입력 받기

    while (number >= 0) { // 종료 조건: 입력값이 음수가 아니면 반복
        cout << "You entered: " << number << endl; // 실제 동작: 입력값 출력
        cin >> number; // 사후 동작: 다음 입력 받기
    }

    cout << "Program terminated." << endl;
    // Enter numbers (negative number to stop): 5
    // You entered: 5
    // 10
    // You entered: 10
    // -1
    // Program terminated.
    return 0;
}
```

@tab 게임 루프

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0)); // 랜덤 시드 초기화
    int secretNumber = rand() % 100 + 1; // 1부터 100 사이의 랜덤 숫자
    int guess;

    cout << "Guess the number (1 to 100): ";
    cin >> guess; // 초기 동작: 첫 번째 추측 입력 받기

    while (guess != secretNumber) { // 종료 조건: 추측이 정답과 다를 경우 반복
        if (guess < secretNumber) {
            cout << "Too low! Try again: ";
        } else {
            cout << "Too high! Try again: ";
        }
        cin >> guess; // 사후 동작: 새로운 추측 입력 받기
    }

    cout << "Congratulations! You guessed the number!" << endl;
    // 출력 예시:
    // Guess the number (1 to 100): 50
    // Too low! Try again: 75
    // Too high! Try again: 60
    // Congratulations! You guessed the number!
    return 0;
}

```

@tab

:::

### 포인터

일반적인 변수들이 특정한 값을 담았다면, 포인터는 값을 담는 대신 변수의 주소를 담는다.
그렇다고 포인터가 변수가 아닌것은 아니다. 포인터도 변수이다.
변수는 메모리 공간의 이름이다. 이 메모리의 주소값을 알면 해당 공간을 직접 제어할 수 있다.

::: tabs

@tab 기본 변수

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;   // 4바이트 크기의 변수
    int b = a;    // 변수 a의 값을 b에 복사 (4바이트 비용 발생)

    cout << "a: " << a << ", b: " << b << endl;

    b = 20; // b의 값만 변경

    cout << "변경 후 a: " << a << ", b: " << b << endl;

    return 0;
}
```

@tab 배열

```cpp
#include <iostream>
using namespace std;

int main() {
const int SIZE = 1000000; // 1,000,000개의 정수 (약 4MB)
int arr1[SIZE];
int arr2[SIZE];

    // 배열 복사 (매우 높은 복사 비용)
    for (int i = 0; i < SIZE; i++) {
        arr2[i] = arr1[i];
    }

    cout << "배열 복사 완료" << endl;

    return 0;

}
```

:::

일반 변수의 경우 값의 복사 비용이 크지 않지만, 배열의 경우 복사 비용이 엄청 커질 수 있기 때문에 배열은 A = B 처럼 일반적으로 복사가 불가능하다.
이처럼, '효율적으로 접근할 수 없을까' 에 대해서 고안되어 나온 것이 `포인터`이다. 포인터는 int* a; 처럼 *(Asterisk, 에스테르크)를 써서 정의해준다.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int* p = &a; // 변수 a의 주소를 포인터 p에 저장

    cout << "변수 a의 값: " << a << endl; // 10
    cout << "변수 a의 주소: " << &a << endl; // 실행시마다 다름
    cout << "포인터 p의 값(저장된 주소): " << p << endl; // 변수 a의 주소와 같다.

    return 0;
}
```

#### 포인터 변수 구성 요소

::: tabs

@tab 배열 접근

배열 이름은 배열의 시작주소를 담는다.

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[3] = {10, 20, 30};
    int* p = arr; // 배열의 시작 주소를 포인터에 저장

    cout << "p가 가리키는 값: " << *p << endl; // 10
    cout << "p+1이 가리키는 값: " << *(p + 1) << endl; // 20
    cout << "p+2이 가리키는 값: " << *(p + 2) << endl; // 30

    return 0;
}
```

@tab 포인터 변수의 타입과 크기

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 3;
    char y = 'A';

    int* ptr1 = &x;  // 정수형 변수 x의 주소 저장
    char* ptr2 = &y; // 문자형 변수 y의 주소 저장

    cout << "ptr1이 가리키는 값: " << *ptr1 << endl; // 3
    cout << "ptr2가 가리키는 값: " << *ptr2 << endl; // A

    return 0;
}
```

@tab 주소 확인

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 3;
    char y = 'A';

    int* ptr1 = &x;
    char* ptr2 = &y;

    cout << "x의 주소: " << &x << ", ptr1: " << ptr1 << endl; // x의 주소: 000000F7772FF8A4, ptr1: 000000F7772FF8A4
    cout << "y의 주소: " << (void*)&y << ", ptr2: " << (void*)ptr2 << endl; // y의 주소: 000000F7772FF8A0, ptr2: 000000F7772FF8A0

    return 0;
}
```

@@@tab 포인터 연산과 데이터 크기

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 3;
    char y = 'A';

    int* ptr1 = &x;
    char* ptr2 = &y;

    cout << "ptr1: " << ptr1 << ", ptr1 + 1: " << ptr1 + 1 << endl; // ptr1: 00000079012FFA24, ptr1 + 1: 00000079012FFA28
    cout << "ptr2: " << ptr2 << ", ptr2 + 1: " << ptr2 + 1 << endl; // ptr2: 00000079012FFA20, ptr2 + 1: 00000079012FFA21

    return 0;
}
```

@tab 포인터를 이용한 값 읽기

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int* p = &a; // 변수 a의 주소를 저장

    cout << "포인터 p가 가리키는 값: " << *p << endl; // 10

    return 0;
}
```

@tab 포인터를 이용한 값 변경

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int* p = &a; // a의 주소 저장

    cout << "변경 전 a: " << a << endl; // 10

    *p = 20; // 포인터를 이용하여 값 변경

    cout << "변경 후 a: " << a << endl; // 20

    return 0;
}
```

:::

#### 포인터 역참조

포인터를 활용하려면 해당 주소에 있는 실제 값을 읽고 수정할 수 있어야한다.
포인터는 주소를 다루는 특성 때문에 산술 연산 역시 주소를 제어하는 방식으로 동작한다.
이를 위해 역참조 연산자 `*`(에스테르크)를 사용한다.

::: tabs

@tab 포인터와 변수의 관계

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 3;    // 정수형 변수 x 선언
    int* ptr = &x; // 포인터 ptr에 x의 주소 저장

    cout << "x의 값: " << x << endl; // 3
    cout << "x의 주소: " << &x << endl; // 00000004D0CFFCA0
    cout << "ptr의 값(저장된 주소): " << ptr << endl; // 00000004D0CFFCA0
    cout << "*ptr이 가리키는 값: " << *ptr << endl; // 3

    return 0;
}
```

@tab 다른 타입

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 3;
    char y = 'A';

    int* ptr = &x; // 정상적인 포인터 할당
    // ptr = &y; // 오류 발생: char형 변수를 int* 포인터에 저장 불가능

    return 0;
}
```

@tab 올바른 타입

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 3;
    char y = 'A';

    int* intPtr = &x; // 정수형 포인터
    char* charPtr = &y; // 문자형 포인터

    cout << "*intPtr: " << *intPtr << endl; // 3
    cout << "*charPtr: " << *charPtr << endl; // A

    return 0;
}
```

@tab 포인터 연산

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 3;
    char y = 'A';

    int* ptr1 = &x;
    char* ptr2 = &y;

    cout << "ptr1: " << ptr1 << ", ptr1 + 1: " << ptr1 + 1 << endl; // int형이라 4바이트 커짐
    cout << "ptr2: " << (void*)ptr2 << ", ptr2 + 1: " << (void*)(ptr2 + 1) << endl; // char형이라 1바이트 커짐

    return 0;
}
```

@tab 잘못된 접근

```cpp
#include <iostream>
using namespace std;

int main() {
    int* p; // 초기화되지 않은 포인터

    // *p = 10;  // 실행 시 오류 발생 가능: 메모리 접근 오류

    return 0;
}

```

:::

#### 배열과 포인터

배열은 변수의 기본적인 특성 + 다음의 특징이 있다.

- 배열 이름은 배열의 시작 주소를 가지고 있다.
- 값을 저장할 수 있다.
- 인덱스를 통한 임의 접근이 가능한 이유는 배열의 메모리가 연속적으로 할당되기 때문이다.
- 임의 접근이 가능하려면 배열 이름에 저장된, 배열의 시작 주소를 알아야한다.
- 배열 자체가 담고 있는 시작 주소를 변경할 수 없다.

`arr[k] = *(arr+k)` arr[k] 는 \*(arr+k) 와 동일하다.

배열과 포인터는 동일해보이지만, 배열의 이름은 사용될 때 대부분 포인터로 암시적 형 변환되어 동작한다.
in arr[4]; 가 있을때 arr 는 배열 전체를 의미한다. 식이나 인자로 사용될때는 int\* 형으로 변환되어 배열의 첫 번째 원소 주소로 해석된다.

:::tabs

@tab 배열의 기본 개념과 인덱스 접근

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50}; // 크기가 5인 배열 선언 및 초기화

    // 배열 요소 접근 (인덱스를 이용한 접근)
    cout << "arr[0]: " << arr[0] << endl; // 10
    cout << "arr[2]: " << arr[2] << endl; // 30
    cout << "arr[4]: " << arr[4] << endl; // 50

    // 배열의 시작 주소 확인
    cout << "배열의 시작 주소: " << arr << endl;
    cout << "첫 번째 요소의 주소: " << &arr[0] << endl;

    return 0;
}
```

@tab 포인터를 이용한 배열 접근

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[3] = {100, 200, 300};
    int *ptr = arr; // 배열 이름은 배열의 시작 주소를 가리킴

    cout << "*ptr: " << *ptr << endl;     // 100 (arr[0] 값)
    cout << "*(ptr+1): " << *(ptr+1) << endl; // 200 (arr[1] 값)
    cout << "*(ptr+2): " << *(ptr+2) << endl; // 300 (arr[2] 값)

    return 0;
}
```

@tab 배열 이름을 변경할 수 없는 이유

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[3] = {1, 2, 3};
    int *ptr = arr;  // 정상: 포인터 변수에 배열의 시작 주소 저장

    // arr 자체를 변경하려고 시도 (컴파일 오류 발생)
    // arr = ptr + 1; // 배열 이름은 주소 상수를 저장하므로 변경 불가!

    cout << "배열 시작 주소: " << arr << endl;
    cout << "포인터 값: " << ptr << endl;

    return 0;
}
```

:::

#### 포인터 배열과 배열 포인터

포인터 배열은 포인터를 원소로 갖는 배열이다.
int* ptrArr[4]; 는 크기가 4이고 각 원소가 int*인 배열이다.

배열 포인터는 배열 전체를 가리키는 포인터이다.
단일 변수가 아닌 배열을 통째로 가리키는 변수다.
보통 다차우너 배열을 제어할 때 많이 사용한다.

::: tabs

@tab

```cpp
#include <iostream>
using namespace std;

// 포인터 배열: 포인터를 원소로 갖는 배열
int main() {
    int a = 10, b = 20, c = 30;
    int* ptrArr[3] = { &a, &b, &c }; // 포인터 배열 선언 및 초기화

    // 포인터 배열을 이용하여 값 출력
    cout << "*ptrArr[0]: " << *ptrArr[0] << endl; // 10
    cout << "*ptrArr[1]: " << *ptrArr[1] << endl; // 20
    cout << "*ptrArr[2]: " << *ptrArr[2] << endl; // 30

    return 0;
}
```

@tab 포인터 배열 vs 배열 포인터

\*ptrArr[1] 과 \*(ptrArr + 1)은 같다.
(\*ptr)[1] 과 \*(\*ptr + 1) 은 같다.

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 1, y = 2, z = 3;
    int* ptrArr[3] = { &x, &y, &z }; // 포인터 배열 (각 원소가 int* 타입)

    int arr[3] = { 10, 20, 30 };
    int (*ptr)[3] = &arr; // 배열 포인터 (배열 전체를 가리킴)

    // 포인터 배열을 통한 접근
    cout << "*ptrArr[0]: " << *ptrArr[0] << endl; // 1
    cout << "*ptrArr[1]: " << *ptrArr[1] << endl; // 2
    cout << "*ptrArr[2]: " << *ptrArr[2] << endl; // 3

    // 배열 포인터를 통한 접근
    cout << "(*ptr)[0]: " << (*ptr)[0] << endl; // 10
    cout << "(*ptr)[1]: " << (*ptr)[1] << endl; // 20
    cout << "(*ptr)[2]: " << (*ptr)[2] << endl; // 30

    return 0;
}
```

@tab 잘못된 예시

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[3] = {10, 20, 30};
    int (*ptr)[3] = &arr; // 배열 포인터 선언

    // 배열 포인터는 단일 요소를 직접 가리킬 수 없음
    // ptr = arr; // 오류 발생: 배열의 첫 번째 요소 주소와 다름

    return 0;
}
```

:::

#### 포인터 연산

포인터는 주소값을 담기 때문에 산술 연산 시 일반적인 수치 연산이 아닌 메모리 주소의 이동으로 해석된다.
포인터의 타입에 따라, 해당 타입 변수의 크기만큼 담고 있는 주소를 증가시킨다.

ptr + 1 을 실행하면 ptr이 가리키는 주소에서 한 단위 메모리 주소가 이동한다.
한 단위는 포인터 자료형 크기에 따라 결정된다.
int형 ptr이 20일때, ptr + 1 은 24가 된다. double 형이라면 ptr + 1은 28이 된다.

(*ptr) + 1 을 실행하면 ptr이 가리키는 변수의 값을 1 증가시킨다.
ptr이 가리키는 주소의 값이 10이라면, (*ptr + 1) 은 11이 된다.

\*(ptr + 1)은 ptr[1] 과 동일하다.
ptr이 가리키는 주소에서 +1 만큼 한 주소의 값이 출력된다.

### 레퍼런스

포인터를 사용하면 주소값을 직접 다루어야 하기 때문에 복잡해질 수 있다.
이 문제를 완화하기 위해 C++ 에서는 변수에 또 다른 이름을 부여하는 `레퍼런스` 문법을 도입했다.
레퍼런스는 일반 변수와 거의 동일하게 사용할 수 있다.
내부적으로는 해당 변수를 직접 가리키는 역할을 한다.

레퍼런스는 특정 변수에 대한 별명을 부여하는 것이다.
특정 변수의 레퍼런스를 연결하면, 이후로는 그 변수가 두 개의 이름을 갖는것과 같다.
선언 방법은 데이터형 뒤에 `&` 를 붙인다.
int& ref = var; 처럼 사용하며 ref의 값이 변경될 시 var의 값도 변경된다.

::: tabs

@tab 기본적인 레퍼런스

```cpp
#include <iostream>
using namespace std;

int main() {
    int var = 10;
    int& ref = var; // var의 레퍼런스 선언

    cout << "초기 값:" << endl;
    cout << "var: " << var << endl; // 10
    cout << "ref: " << ref << endl; // 10

    ref = 20; // ref를 변경하면 var도 변경됨

    cout << "ref 값을 변경한 후:" << endl;
    cout << "var: " << var << endl; // 20
    cout << "ref: " << ref << endl; // 20

    return 0;
}
```

@tab 잘못된 레퍼런스

```cpp
#include <iostream>
using namespace std;

int main() {
    int& ref; // 레퍼런스는 선언과 동시에 초기화해야 함

    return 0;
}
```

:::

#### 포인터와 레퍼런스의 차이점

포인터와 레퍼런스는 다른 변수를 제어한다는 점에서 유사하지만, 몇 가지 중요한 차이가 있다.

1. 선언과 초기화 시점이 다르다.
   - 포인터는 선언 후, 나중에 대입연산자를 통해 가리킬 대상을 변경할 수 있다.
   - 레퍼런스는 선언과 동시에 초기화해야 하며, 초기화 이후에는 다른 대상에 재연결 할 수 없다.
2. 레퍼런스는 항상 다른 변수와 연결되어 있어야 하기 때문에 NULL 이라는게 없다.
   - 포인터는 유효한 대상이 없음을 나타내기 위해 NULL 혹은 nullptr 을 가질 수 있다.
3. 간접 참조 문법의 유무
   - 포인터는 주소값을 담으므로 접근할 때는 \* 연산을 사용하고 주소를 가져올 때는 & 연산을 사용한다.
   - 레퍼런스는 변수 자체의 별명이므로 일반 변수와 연산하는 방법이 동일하다.

::: tabs

@tab 선언 및 초기화 차이

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;

    // 포인터는 선언 후 나중에 다른 변수를 가리킬 수 있음
    int* ptr = &a; // 포인터 선언 및 초기화
    ptr = &b; // 포인터가 다른 변수를 가리킬 수 있음

    // 레퍼런스는 선언과 동시에 초기화해야 함
    int& ref = a;
    // ref = &b; // 레퍼런스는 다른 변수에 재할당할 수 없음

    cout << "포인터 사용:" << endl;
    cout << "*ptr: " << *ptr << endl; // 20 (포인터가 b를 가리키고 있음)

    cout << "레퍼런스 사용:" << endl;
    cout << "ref: " << ref << endl; // 10 (a를 가리키고 있음)

    return 0;
}
```

@tab nullptr 가능성 여부의 차이

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 42;
    int* ptr = nullptr; // 포인터는 nullptr이 가능
    ptr = &a; // 이후에 a를 가리키도록 설정 가능

    // int& ref; // 레퍼런스는 반드시 선언과 동시에 초기화해야 함
    int& ref = a; // 올바른 선언 방식

    cout << "포인터 사용:" << endl;
    cout << "ptr이 가리키는 값: " << *ptr << endl; // 42

    cout << "레퍼런스 사용:" << endl;
    cout << "ref: " << ref << endl; // 42

    return 0;
}
```

@tab 간접 참조 문법 차이

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int* ptr = &x;  // 포인터 선언
    int& ref = x;   // 레퍼런스 선언

    cout << "포인터 접근 방법:" << endl;
    cout << "x: " << x << endl;       // 5
    cout << "*ptr: " << *ptr << endl; // 5 (포인터를 통한 간접 참조)
    cout << "ptr: " << ptr << endl;   // x의 주소값

    cout << "레퍼런스 접근 방법:" << endl;
    cout << "ref: " << ref << endl;   // 5 (레퍼런스는 그냥 변수처럼 사용 가능)

    *ptr = 10; // 포인터를 사용하여 값 변경
    cout << "포인터로 변경 후 x: " << x << endl; // 10

    ref = 20; // 레퍼런스로 값 변경
    cout << "레퍼런스로 변경 후 x: " << x << endl; // 20

    return 0;
}
```

@tab 잘못된 레퍼런스 사용

```cpp
#include <iostream>
using namespace std;

int main() {
    int* ptr = nullptr; // 포인터는 nullptr 가능
    // int& ref = nullptr; // 레퍼런스는 NULL을 가질 수 없음

    return 0;
}
```

:::

#### 상수 레퍼런스

레퍼런스에 상수 제약을 걸어서 읽기 전용으로 사용할 수 있다.
상수 레퍼런스를 사용하면 값을 복사하지 않고도 기존 변수를 보호할 수 있다.

::: tabs

@tab 상수 레퍼런스의 기본 개념

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 100;
    const int& cref = x; // x를 읽기 전용으로 참조

    cout << "cref: " << cref << endl; // 100

    // cref = 200; // 상수 레퍼런스는 값을 변경할 수 없음

    x = 200; // 원본 변수 x는 변경 가능
    cout << "x 변경 후 cref: " << cref << endl; // 200

    return 0;
}
```

@tab 상수 레퍼런스를 잘못 사용하는 경우

```cpp
#include <iostream>
using namespace std;

int main() {
    const int& cref; // 레퍼런스는 반드시 초기화해야 함

    return 0;
}
```

:::
