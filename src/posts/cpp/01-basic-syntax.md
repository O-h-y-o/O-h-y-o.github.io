---
date: 2026-08-10
category:
  - Cpp
order: 1
---

# 기초 문법

## 코딩과 컴파일

코딩이란 컴퓨터가 이해 가능한 명령서를 작성하는 과정이다. 사람이 이해하기 위한 것이 아니라 컴퓨터가 해석할 수 있게 작성해야 한다.

반도체는 켜진 상태(1)와 꺼진 상태(0), 2가지 상태로 모든 것을 표현한다. 컴퓨터는 2진법만 이해할 수 있기 때문에 명령서는 2진법으로 작성되어야 한다.

옛날에는 기계어로 코드를 작성하다가 이후 `어셈블리어`가 나왔다. 숫자가 아닌 문자이기에 사람에게 좀 더 친숙한 언어이며, 기계어와 어셈블리어는 일대일 대응 관계를 가진다.

C, C++, Java 등 사람에 가까운 언어를 `High-level Language`(고급언어)라고 하며, 반대는 Low-Level 언어이다. 프로그래머가 고급 언어로 작성한 코드를 `소스코드`라고 하고, 이를 컴퓨터가 읽을 수 있는 기계어로 번역하는 과정을 `컴파일`, 번역기를 `컴파일러`라고 한다.

`main()` 함수는 프로그래밍의 시작점(진입점)이다.

## 자료형과 변수

`unsigned`는 음수를 포기하고 양수의 데이터 범위를 두 배로 늘려 표현한다. `signed`는 양수와 음수를 모두 표현할 수 있다.

```c
#include <stdio.h> // stdio.h 에 있는 기능들을 해당 프로젝트(파일)에서 사용하겠다.

int main(void) {
  int Num = 21; // int 정수자료형, Num 변수, = 값
  unsigned int Num2 = -21; // unsigned는 양수만 저장이 가능한데 음수를 저장하면 오버플로우가 발생한다.
  double PI = 3.141592; // double 실수자료형

  printf("Num = %d\n", Num); // 21
  printf("Num2 = %u\n", Num2); // 4294967275 -> unsigned 최대값
  printf("PI = %f\n", PI); // 3.141592

  return 0;
}
```

C++에서는 `string`, `bool` 등 표준 라이브러리 자료형과 `const`를 함께 쓴다.

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

## 연산자 (Operator)

`5 + 2`가 있을 때, 5와 2는 `피연산자`이고 `+`는 `연산자`이다.

### 산술 연산자

덧셈, 뺄셈, 곱셈, 나눗셈, 나머지 연산이 있다. 나눗셈은 몫을 구하는 연산자이고, 나머지 연산자는 나눗셈의 나머지를 구하는 연산자이다.

int 자료형끼리의 나눗셈은 결과도 int이고, float 자료형끼리의 나눗셈은 결과도 float임에 주의해야 한다. C언어에서는 float 자료형의 나머지 연산은 불가능하다.

```cpp
int a = 10, b = 5;
float x = 15.5, y = 4.2;

// 산술 연산
a + b; a - b; a * b; a / b; a % b;
```

### 복합 대입 연산자

산술 연산과 대입 연산이 함께 계산되는 연산자다.

```cpp
a += 3; a -= 2; a *= 2; a /= 2;
```

### 관계 연산자

```cpp
a == b; a != b; a > b; a < b; a >= b; a <= b;
```

### 증감 연산자

증가/감소의 줄임말이다. `++Num`처럼 전위 증가인 경우 먼저 값을 1 증가시킨 뒤 그 증가된 값을 사용한다. `Num++`처럼 후위 증가인 경우 먼저 현재 값을 사용한 뒤 그 다음에 값을 증가시킨다.

```cpp
int a = 5;
int b = a++;  // 후위 증가: b에 먼저 a를 대입한 후 a 증가
int c = ++a;  // 전위 증가: a를 먼저 증가시킨 후 c에 대입
```

### 논리 연산자

0 이외의 모든 값은 true로 평가된다. 피연산자를 참/거짓으로 변환한 뒤 논리 연산을 수행하며, 계산된 결과값도 참/거짓이다.

- And (`&&`) — 두 조건이 모두 참일 때 true
- OR (`||`) — 두 조건 중 하나라도 참일 때 true
- NOT (`!`) — 조건을 반대로 뒤집는다
- XOR (`^`) — 둘 중 하나만 True일 때 true

**Short-circuit**: `&&`와 `||`는 앞 조건만 보고 뒤 조건을 생략할 수 있다.

```
(x != 0) && (10/x > 1) → x가 0이면 뒤 계산을 아예 안 해서 에러 방지
```

### 삼항 연산자

피연산자로 세 개의 항을 갖는 연산자이며, 조건문 if-else의 대용으로 사용 가능하다.

::: note 절차지향 언어
C언어는 절차지향 언어이다. 실행 순서가 아주 중요한 언어이다.
:::

### signed / unsigned

```cpp
int signedVar = -10;      // 일반 int (signed), 음수 가능
unsigned int unsignedVar = 10; // unsigned int, 음수 불가능 → unsigned는 일반형에서 양수 *2 만큼의 값 범위
```

## 조건문

if-else 문은 중첩해서 사용할 수 있다.

```c
if (조건식)
{
    명령어1;
    명령어2;

    if(조건식3) // 중첩 if문
    {
        명령어5;
    }
    else
    {
        명령어6;
    }
}
else if (조건식2)
{
    명령어3;
}
else
{
    명령어4;
}
```

switch-case는 if-else로도 구현 가능하지만 가독성이 조금 더 좋다.

```c
switch(변수)
{
    case 값1:
        명령어1;
        break;

    case 값2: // 또는
    case 값3:
        명령어2;
        break;

    default:
        명령어3;
        break;
}
```

### 잘 작성된 조건문 vs 과도하게 복잡한 조건문

잘 작성된 조건문은 한눈에 보기에도 깔끔하다. 잘 작성되지 못한 조건문은 필요 이상으로 depth가 계속 깊어진다. depth가 3개 이상이면 사람들이 일반적으로 이해하기 힘들어하므로, 이런 경우 더 잘 구현할 수 없을지 고민해보아야 한다.

```cpp
// 잘 작성된 조건문
if (op == '+') {
    cout << "Result: " << num1 + num2 << endl;
}
else if (op == '-') {
    cout << "Result: " << num1 - num2 << endl;
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
```

```cpp
// 과도하게 복잡한 조건문 (depth가 깊어짐)
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
                // ...
            } else {
                cout << "Invalid operator." << endl;
            }
        }
    }
}
```

## 반복문

while, for, do-while(잘 안 씀) 세 가지 형태가 있다.

```c
while (조건식)
{
    명령어1;
}
```

```c
for (초기식; 조건식; 증감식)
{
    명령어1;
}
```

```c
do
{
    명령어1;
}
while (조건문1);
```

### 무한 반복문

for보다는 while문으로 구현되는 경우가 많다. 종료 조건이 없거나 조건이 항상 참인 상태로 반복문이 계속 실행되는 구조이다. 무한으로 반복하는 것은 위험하다. 프로그램이 멈추지 않아 강제 종료해야 하는 상황이 발생하므로 항상 `break`가 함께 쓰여야 한다.

### continue

반복문에서 `continue` 구문을 만나면 해당 회차는 건너뛰고 다음 회차를 진행한다.

### 이중 반복문

```c
for (초기식; 조건식; 증감식)
{
    for (초기식; 조건식; 증감식)
    {
        명령어1;
    }
}
```

for 반복문 예제:

```cpp
int sum = 0;
for (int i = 1; i <= 10; i++) { // 초기화: i = 1, 종료 조건: i <= 10, 사후 동작: i++
    sum += i;
}
// Sum: 55
```

```cpp
for (int i = 5; i >= 1; i--) {
    cout << i << " ";
}
// 출력값: 5 4 3 2 1
```

```cpp
for (int i = 1; i <= 20; i++) {
    if (i % 3 == 0) {
        cout << i << " ";
    }
}
// 출력값: 3 6 9 12 15 18
```

```cpp
// 오른쪽 정렬 삼각별 (이중 반복문)
int n = 5;
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i; j++) cout << " ";
    for (int j = 1; j <= i; j++) cout << "*";
    cout << endl;
}
//     *
//    **
//   ***
//  ****
// *****
```

while 반복문 예제:

```cpp
int number;
cout << "Enter numbers (negative number to stop): ";
cin >> number;

while (number >= 0) {
    cout << "You entered: " << number << endl;
    cin >> number;
}
cout << "Program terminated." << endl;
```

```cpp
// 게임 루프 예시
srand(time(0));
int secretNumber = rand() % 100 + 1;
int guess;
cin >> guess;

while (guess != secretNumber) {
    if (guess < secretNumber) cout << "Too low! Try again: ";
    else cout << "Too high! Try again: ";
    cin >> guess;
}
cout << "Congratulations! You guessed the number!" << endl;
```

## 배열

배열의 크기 구하기:

```c
int arr[10]; // 배열의 크기가 10칸
int n = sizeof(arr) / sizeof(arr[0]); // 10칸
```

2차원 배열:

```c
int grid[2][3] = {
    {1, 2, 3}, // index → 00, 01, 02
    {4, 5, 6}  // index → 10, 11, 12
};
```

C++에서 배열 선언과 초기화:

```cpp
// 선언과 동시에 초기화
int arr1[3] = {1, 2, 3};

// 선언 후 개별 원소 초기화
int arr2[3];
arr2[0] = 10; arr2[1] = 20; arr2[2] = 30;
```

배열은 통째로 대입할 수 없고, 개별 원소를 순회하며 복사해야 한다.

```cpp
// 개별 원소를 복사하는 것은 가능
for (int i = 0; i < 3; i++) {
    arr2[i] = arr1[i];
}
// 배열 통째로 대입 (불가능)
// arr2 = arr1;  // 컴파일 오류 발생
```

범위를 벗어난 접근은 정의되지 않은 동작(UB)이다.

```cpp
int arr[4] = {10, 20, 30, 40};
// 범위를 벗어난 접근 (에러 발생 가능)
// cout << arr[4] << endl;  // 정의되지 않은 동작 (UB, 오류 가능)
```

## 문자열

C에서 문자열은 널 종료 문자 배열이다.

```c
char name[] = "Claude"; // {'C', 'l', 'a', 'u', 'd', 'e', '\0'}
```

## 함수

특정 작업을 수행하는 코드 블록을 의미한다. 정의해두면 필요할 때마다 호출해서 재사용할 수 있다.

함수를 사용하는 이유:

- 재사용성 — 같은 로직을 반복 작성할 필요가 없다.
- 가독성 — 코드를 의미 단위로 쪼개서 읽기 쉬워진다.
- 유지보수 — 수정이 필요하면 함수 하나만 고치면 된다.
- 추상화 — 내부 구현을 몰라도 `이름`만 보고 쓸 수 있다.

`printf()`, `scanf()`, `strlen()` 모두 함수이다.

### 선언과 정의

```c
int add(int a, int b);   // 선언 (프로토타입) — 세미콜론으로 끝남

int add(int a, int b) {  // 정의 — 실제 코드가 있음
    return a + b;
}
```

C언어의 컴파일러는 위에서 아래로 한 줄씩 읽는데, 정의가 되기 전에 호출되면 컴파일러가 알 수 없기 때문에 에러가 발생한다.

```c
int main(void) {
    printf("%d\n", add(3, 5));  // 에러
    return 0;
}

int add(int a, int b) {
    return a + b;
}
```

이를 해결하는 두 가지 방법:

```c
// 첫번째 방법
int add(int a, int b); // 선언만 해주면 된다.

int main(void) {
    printf("%d\n", add(3, 5));
    return 0;
}

int add(int a, int b) {
    return a + b;
}

---------------
// 두번째 방법
int add(int a, int b) {
    return a + b;
}

int main(void) {
    printf("%d\n", add(3, 5));  // add 함수보다 뒤에 작성한다.
    return 0;
}
```

함수가 적을 때는 두 번째 방법이 편하지만, 함수가 늘어남에 따라 순서를 맞추기 힘들어지므로 선언은 헤더 파일(.h)에, 정의는 소스 파일(.c)에 분리하는 것이 표준이다.

### 매개변수와 인자

- 매개변수(parameter): 함수를 정의할 때 선언하는 변수 (형식 매개변수)
- 인자(argument): 함수를 호출할 때 실제로 넘기는 값 (실인자)

```c
int square(int n) { // n은 매개변수
  return n * n;
}

int main(void) {
  int result = square(7); // 7은 인자
  return 0;
}
```

매개변수가 없다면 `void`를 명시적으로 두어야 한다. 인자 개수를 체크하지 않겠다는 의미가 아니라 "인자 없음"의 정확한 표현이다.

```cpp
// 1) 반환 타입 void — "이 함수는 값을 돌려주지 않는다"
void greet(const char *name) {
    printf("안녕, %s!\n", name);
}

// 2) 매개변수 void — "이 함수는 인자를 받지 않는다"
int get_zero(void) {
    return 0;
}

// 3) void 포인터 — "어떤 타입이든 가리킬 수 있는 범용 포인터"
void *generic_ptr;
```

빈 괄호 `()`와 `(void)`는 다르다.

```c
int func1();       // 아무거나 넘겨도 컴파일은 가능
int func2(void);  // 인자를 받지 않겠다.

func1(1, 2, 3);    // 컴파일은 가능
func2(1, 2, 3);   // 컴파일 에러 발생
```

인자가 없는 함수를 선언할 때는 항상 `(void)`를 쓰는 것이 좋다. 컴파일 에러로 어디서 실수가 있었는지 확인할 수 있기 때문이다.

### 반환값

`return`은 두 가지 역할을 동시에 한다. 값을 돌려주는 것, 그리고 함수 실행을 즉시 종료하는 것이다.

```c
int abs_value(int n) {
  if (n < 0) {
    return -n; // 종료
  }
  return n; // n >= 0 이면 대기
}
```

```c
int check_age(int age) {
    if (age < 0) {
        return -1;    // age가 0미만으로 값이 들어왔다면 여기서 함수는 종료되고 -1이 반환된다.
    }
    if (age >= 18) { // age가 18이상으로 값이 들어왔다면 여기서 함수는 종료되고 1이 반환된다.
        return 1;
    }
    return 0;   // 둘 모두 해당되지 않으면 (age가 0이상 18미만일때) 함수는 종료되고 0이 반환된다.
}
```

`return`을 만나는 순간 그 다음(아래) 코드는 실행되지 않고 함수는 그대로 종료된다. 그래서 `else`가 없어도 논리적으로 문제가 없다.

반환할 것이 없으면 `void`를 쓴다. 반환 타입이 `void`가 아닌 함수에서 `return`을 쓰지 않으면 `미정의 동작`(undefined behavior)이다. 쓰레기 값이 반환되거나 컴파일러가 경고를 보낸다.

```cpp
// 잘못된 함수 정의
void incorrectFunction() {
    return 42; // 오류 발생: void 함수는 값을 반환할 수 없음
}
```

### 재귀 함수 (Recursion)

함수가 자기 자신을 호출하는 것이며 반드시 종료 조건(base case)이 있어야 한다.

```c
int factorial(int n) {
    if (n <= 1) return 1;        // base case
    return n * factorial(n - 1); // recursive case
}

// factorial(4)
// → 4 * factorial(3)
// → 4 * 3 * factorial(2)
// → 4 * 3 * 2 * factorial(1)
// → 4 * 3 * 2 * 1
// → 24
```

재귀의 장단점:

- 장점: 수학적 정의를 그대로 코드로 옮길 수 있어 직관적이다.
- 단점: 호출마다 스택 프레임이 쌓여 메모리 사용이 증가하고, 깊이가 깊으면 `스택 오버플로우` 발생 가능하다.

실무에서는 성능이 중요한 경우 재귀를 반복문으로 바꾸는 것이 일반적이다.

### 배열을 함수에 전달하기

```c
void print_size(int arr[]) {
    printf("함수 안 sizeof: %lu\n", sizeof(arr));  // 8 — {1, 2, 3, 4, 5}가 오는게 아닌 포인터 크기
}

int main(void) {
    int nums[5] = {1, 2, 3, 4, 5};
    printf("함수 밖 sizeof: %lu\n", sizeof(nums));  // 4 * 5 = 20 — 배열 전체 크기
    print_size(nums);
    return 0;
}
```

배열을 넘길 때는 항상 크기를 별도 매개변수로 같이 넘기는 것이 관례다.

```c
void process(int arr[]) {

}

// 위는 배열의 크기를 모르지만 밑은 size까지 같이 받아서 배열의 크기를 알 수 있다.

void process(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
}
```

매개변수에서 `int arr[]`과 `int *arr`은 완전히 동일하다. 컴파일러가 `int arr[]`을 `int *arr`로 변환한다.

### 함수 호출 순서와 평가 순서

함수의 인자가 여러 개일 때, 어떤 인자가 먼저 평가되는지는 정해져 있지 않다.

```c
int count = 0;

int next(void) {
    count++;
    return count;
}

int main(void) {
    printf("%d %d %d\n", next(), next(), next());
    // 1 2 3 이 나올까? 3 2 1 이 나올까?
    // → 정답: 모른다. 컴파일러마다 다르다!
    return 0;
}
```

이것은 미정의 동작이 아니라 `미명시 동작(unspecified behavior)`이다. 프로그램이 깨지진 않지만 결과가 컴파일러에 따라 달라질 수 있으므로 이런 코드는 피해야 한다.

```c
int a = next();  // 순서가 명확
int b = next();
int c = next();
printf("%d %d %d\n", a, b, c);  // 항상 1 2 3

// → 이 코드처럼 명시적으로 작성해줘야한다.
```

### 값 전달 vs 포인터/참조 전달

```cpp
// 함수: 값 전달 (Call by Value)
void modifyValue(int x) {
    x = 100;  // 함수 내부에서 값 변경
}
// 값 전달 후 num: 50 (원본 안바뀜)
```

```cpp
// 함수: 포인터를 사용한 값 변경
void modifyValue(int* ptr) {
    *ptr = 100;
}
// 포인터 전달 후 num: 100
```

```cpp
// 함수: 참조를 사용한 값 변경
void modifyValueByReference(int& x) {
    x = 200;
}
// 참조 전달 후 num: 200
```

## C++로 넘어가기

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

### 입력 (cin / getline)

```cpp
string name;
cout << "이름을 입력하세요: ";
getline(cin, name); // cin과의 차이는, cin은 공백이 있을때 공백 앞까지만 들어가고, getline은 공백이 있어도 모두 받는다.

int age;
cout << "나이를 입력하세요: ";
cin >> age;
```

## 코딩테스트 연습 예제

기초 문법을 활용한 실전 예제이다.

배열/문자열을 활용해 패턴 문자열 만들기:

```cpp
#include <string>

using namespace std;

string solution(int n) {
    string answer = "";
    for (int i = 1; i <= n; i ++) {
        if(i % 2 == 1) {
            answer += "수";
        } else {
            answer += "박";
        }
    }
    return answer;
}
```

배열을 이용해 if문 없이 인덱스로 처리하면 더 간결하다.

```cpp
#include <string>

using namespace std;

string solution(int n) {
    string answer = "";
    string pattern[2] = {"수", "박"};
    for (int i = 0; i < n; i++) {
        answer += pattern[i % 2];
    }
    return answer;
}
```

`vector`를 활용한 반복문 예제:

```cpp
#include <vector>

using namespace std;

int solution(vector<int> a, vector<int> b) {
    int answer = 0;

    for (int i = 0; i < a.size(); i++) {
        answer += a[i]*b[i];
    }

    return answer;
}
```

이중 반복문으로 약수 개수를 세는 예제. 시간 복잡도는 O(n²)가 된다.

```cpp
#include <string>

using namespace std;

int solution(int left, int right)
{
    int answer = 0;

    for (int i = left; i <= right; i++)
    {
        int divisorCount = 0;

        for (int j = 1; j <= i; j++)
        {
            if (i % j == 0)
            {
                divisorCount++;
            }
        }

        if (divisorCount % 2 == 0)
        {
            answer += i;
        }
        else
        {
            answer -= i;
        }

    }

    return answer;
}
```

`어떤 수의 약수 개수가 홀수이면 그 수는 완전제곱수이다.` 약수는 보통 (a, b) 쌍으로 짝지어지는데(a×b=i), a == b인 경우, 즉 i가 완전제곱수일 때만 짝이 안 맞고 하나 남아서 홀수 개가 된다. 예: 16의 약수는 1,2,4,8,16 → 4=4로 짝이 안 지어져서 5개(홀수). 그 수의 제곱근을 서로 곱하였을 때 그 수가 나온다면 이것은 완전제곱수(약수 개수가 홀수)이다. `cmath` 라이브러리를 활용하면 이중 반복문 없이 O(n)으로 해결할 수 있다.

```cpp
#include <cmath>

using namespace std;

int solution(int left, int right)
{
    int answer = 0;

    for (int i = left; i <= right; i++)
    {
        int sg = static_cast<int>(sqrt(i));

        if (sg * sg == i)
        {
            answer -= i;
        }
        else
        {
            answer += i;
        }
    }

    return answer;
}
```

## 참고

camp-01.md, camp-02.md, camp-03.md, camp-04.md, camp-05.md, camp-07.md, camp-25.md, camp-26.md, camp-27.md
