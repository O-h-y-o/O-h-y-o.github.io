---
date: 2026-08-10
category:
  - Cpp
order: 2
---

# 포인터와 메모리

## 포인터 기초

### 포인터란

일반적인 변수가 특정한 "값"을 담는다면, 포인터는 값을 담는 대신 그 값이 저장된 "메모리 주소"를 담는다. 그렇다고 포인터가 변수가 아닌 것은 아니다 — 포인터도 변수이며, 다만 담고 있는 내용이 주소일 뿐이다.

변수는 메모리 공간의 이름이다. 이 메모리의 주소값을 알면 해당 공간을 직접 제어할 수 있다.

포인터를 쓰는 이유는 대략 이렇다.

- 함수에서 원본 수정 — 값을 복사하지 않고 주소를 넘겨서 원본을 직접 바꿀 수 있다.
- 효율적인 데이터 전달 — 큰 구조체/배열을 통째로 복사하지 않고 주소만 전달한다.
- 동적 메모리 관리 — `malloc`/`new`로 런타임에 메모리를 할당하고 포인터로 접근한다.
- 배열, 문자열 처리 — 배열과 문자열은 본질적으로 포인터와 연결되어 있다.

```cpp
int a = 10;   // 4바이트 크기의 변수
int b = a;    // 변수 a의 값을 b에 복사 (4바이트 비용 발생)
b = 20;       // b의 값만 변경
```

```cpp
const int SIZE = 1000000; // 1,000,000개의 정수 (약 4MB)
int arr1[SIZE];
int arr2[SIZE];

// 배열 복사 (매우 높은 복사 비용)
for (int i = 0; i < SIZE; i++) {
    arr2[i] = arr1[i];
}
```

일반 변수의 복사 비용은 크지 않지만 배열처럼 큰 데이터의 복사 비용은 매우 커질 수 있다. 배열은 `A = B`처럼 통째로 대입하는 것도 원래 불가능하다. "값을 복사하지 않고 효율적으로 접근할 수는 없을까"라는 고민에서 나온 것이 포인터다.

### 주소와 포인터의 기본

모든 변수는 메모리 어딘가에 저장되고, `&` 연산자로 그 주소를 꺼낼 수 있다.

```c
#include <stdio.h>

int main(void) {
    int x = 42;
    printf("x의 값:  %d\n", x);    // 42
    printf("x의 주소: %p\n", &x);  // 0x7ffd5e8a3b2c (실행마다 다름)
    return 0;
}

int x = 42;
int *p = &x;  // p는 x의 주소를 저장하는 포인터
```

```cpp
int a = 10;
int* p = &a; // 변수 a의 주소를 포인터 p에 저장

cout << "변수 a의 값: " << a << endl;             // 10
cout << "변수 a의 주소: " << &a << endl;          // 실행시마다 다름
cout << "포인터 p의 값(저장된 주소): " << p << endl; // 변수 a의 주소와 같다
```

| 표현 | 의미                           | 값                   |
| ---- | ------------------------------ | -------------------- |
| `x`  | 변수 그 자체                   | `42`                 |
| `&x` | x의 메모리 주소                | `0x7ffd...`          |
| `p`  | 포인터 변수 (주소를 담고 있음) | `0x7ffd...` (= `&x`) |
| `*p` | p가 가리키는 곳의 값 (역참조)  | `42` (= `x`)         |

### 선언과 초기화

`*`의 위치는 스타일 차이일 뿐이다. `int *p` / `int* p` / `int * p` 모두 동일하다. 다만 한 줄에 여러 변수를 선언할 때는 주의해야 한다.

```c
int *a, b;   // a는 int 포인터, b는 그냥 int다.
int *a, *b;  // a, b 둘 다 포인터
```

```c
int *a, b;   // → 정수형 포인터 a, 정수형 변수 b
int *c, *d;  // → 정수형 포인터 c, d
double *e;   // → 실수형 포인터 e
```

초기화되지 않은 포인터는 쓰레기 주소를 가진다. 역참조하면 정의되지 않은 동작(프로그램이 죽는 것 포함)이 발생한다.

```c
int *p;          // → 초기화되지 않아 위험하다.
int *p = NULL;   // → 아직 가리킬 곳이 없으면 NULL로 초기화해야 한다.
```

```c
int main(void) {
  int *p;   // → 포인터는 항상 NULL로 초기화해야 한다. 안 그러면 프로그램이 터질 수 있다.
  *p = 42;  // → 정의되지 않은 동작
  return 0;
}
```

### 주소 연산자(&)와 역참조 연산자(\*)

`&` (address-of) 는 변수의 주소를 꺼내고, `*` (역참조, dereference) 는 포인터가 가리키는 곳의 실제 값에 접근한다. 이 둘은 서로 반대 동작이다 — `*(&a)`는 `a`이고, `&(*p)`는 `p`다.

```c
int a = 10;
int *p = &a;   // 주소를 담는 p에 a의 주소를 저장

printf("%d\n", *p); // 역참조하면 원래의 값이 나온다.

*p = 25; // p가 가리키는 곳에 25를 저장한다.
```

`int *ptr`에서 `*`는 "포인터"라는 선언 표시이고, `*ptr = 20;`에서 `*`는 `ptr`이 가리키는 곳의 값에 접근하는 역참조 연산이다. 타입 뒤에 붙는 `*`는 선언, 변수 앞에 붙는 `*`는 역참조로 구분하면 된다.

```cpp
int x = 3;
char y = 'A';

int* ptr1 = &x;  // 정수형 변수 x의 주소 저장
char* ptr2 = &y; // 문자형 변수 y의 주소 저장

cout << "ptr1이 가리키는 값: " << *ptr1 << endl; // 3
cout << "ptr2가 가리키는 값: " << *ptr2 << endl; // A
```

포인터는 선언된 타입과 다른 타입의 변수를 가리킬 수 없다.

```cpp
int x = 3;
char y = 'A';

int* ptr = &x;
// ptr = &y; // 오류: char형 변수를 int* 포인터에 저장 불가능
```

**값 복사 vs 주소 공유** — 여러 포인터가 같은 변수를 가리키면, 그중 하나로 값을 바꿔도 나머지 모두에 반영된다.

```c
int score = 10;
int backup = score;    // 값만 복사
backup = 99;
printf("%d\n", score); // score는 변경되지 않음

int score2 = 10;
int *score_ptr = &score2; // 주소 공유. score_ptr은 score2를 가리킴.
*score_ptr = 99;
printf("%d\n", score2);   // 주소에 있던 값을 바꿔서 99가 된다.

int x = 10;
int *first  = &x;
int *second = &x;
int *third  = first;    // third도 x를 가리킴

*second = 50;
printf("%d %d %d %d\n", x, *first, *second, *third); // 50 50 50 50 — 전부 같은 곳
```

**포인터 문제풀이로 확인하는 핵심 개념**

```c
#include <stdio.h>

int main(void) {
    int x = 5;
    int *p = &x;

    printf("%d\n", *p); // → 5

    *p = 20;
    printf("%d\n", x);  // → 20

    x = 100;
    printf("%d\n", *p); // → 100

    return 0;
}
```

```c
#include <stdio.h>

int main(void) {
    int a = 10;
    int b = 20;
    int *p = &a;
    int *q = &b;

    printf("%d %d\n", *p, *q); // → 10, 20

    *p = *q;
    printf("%d %d\n", a, b); // → *p는 a인데 *q의 값으로 바꾸므로 20, 20

    p = q;
    *p = 99;
    printf("%d %d\n", a, b); // → p가 가리키는 주소 자체가 바뀌어 이제 a를 가리키지 않음. 20, 99

    return 0;
}
```

O/X 로 정리하면:

- `int *p = &x;`에서 `*p`와 `x`는 같은 메모리를 가리킨다. → O
- 포인터 변수의 크기는 가리키는 타입의 크기와 같다. → X, 포인터 크기는 시스템(32/64비트)에 따라 결정된다.
- `&`와 `*`는 서로 반대 동작이다. → O
- `int *a, *b;`는 a와 b 모두 int 포인터로 선언한다. → O
- 초기화하지 않은 포인터를 역참조해도 0이 나온다. → X, 쓰레기값을 가지며 역참조 시 정의되지 않은 동작이 발생한다.

## 배열과 포인터의 관계

배열은 변수의 기본적인 특성에 더해 다음 특징을 갖는다.

- 배열 이름은 배열의 시작 주소를 가지고 있다.
- 값을 저장할 수 있다.
- 인덱스를 통한 임의 접근이 가능한 이유는 배열의 메모리가 연속적으로 할당되기 때문이다.
- 배열 자체가 담고 있는 시작 주소는 변경할 수 없다.

배열과 포인터는 비슷해 보이지만 같은 것은 아니다. 배열 이름은 식이나 인자로 사용될 때 대부분 포인터로 암시적 형 변환되어, 배열의 첫 번째 원소 주소로 해석된다. 다만 배열 이름 자체가 담고 있는 주소는 상수라서 재대입하거나 이동시킬 수 없다는 점이 포인터와 다르다.

```c
int arr[5] = {10, 20, 30, 40, 50};
int *arr_ptr = arr;

// 비슷한 부분
printf("%d\n", arr[2]);        // 30
printf("%d\n", arr_ptr[2]);    // 30
printf("%d\n", *(arr+2));      // 30
printf("%d\n", *(arr_ptr+2));  // 30

// 다른 부분
sizeof(arr);        // 20 (int 4바이트 × 5개)
sizeof(arr_ptr);    // 8  (64비트 시스템 기준, 포인터 크기)

arr = arr_ptr;      // ❌ 컴파일 에러. 배열 이름은 대입 불가능.
arr_ptr = arr;      // ✅ 포인터는 다른 주소를 가리킬 수 있음.
arr++;              // ❌ 배열 이름은 이동 불가능.
arr_ptr++;          // ✅ 포인터는 이동 가능.
```

```cpp
int arr[5] = {10, 20, 30, 40, 50}; // 크기가 5인 배열 선언 및 초기화

cout << "arr[0]: " << arr[0] << endl;             // 10
cout << "배열의 시작 주소: " << arr << endl;
cout << "첫 번째 요소의 주소: " << &arr[0] << endl;
```

```cpp
int arr[3] = {1, 2, 3};
int *ptr = arr;  // 정상: 포인터 변수에 배열의 시작 주소 저장

// arr = ptr + 1; // 배열 이름은 주소 상수를 저장하므로 변경 불가!
```

`arr[k]`는 `*(arr+k)`와 동일하다.

### 포인터 연산

포인터는 주소값을 담기 때문에 산술 연산이 일반적인 수치 연산이 아닌 메모리 주소의 이동으로 해석된다. 포인터에 숫자를 더하면 가리키는 타입의 크기만큼 이동한다 — 이것이 포인터에 타입이 필요한 이유다.

```c
int nums[3] = {10, 20, 30};
int *int_ptr = nums;
// int_ptr + 1 → 1004 (int = 4바이트이므로)
// int_ptr + 2 → 1008

char str[] = "ABC";
char *char_ptr = str;
// char_ptr + 1 → 2001 (char = 1바이트이므로)

double darr[3] = {1.0, 2.0, 3.0};
double *dbl_ptr = darr;
// dbl_ptr + 1 → 3008 (double = 8바이트이므로)
```

`(*ptr) + 1`은 ptr이 가리키는 변수의 값을 1 증가시키는 것이고, `*(ptr + 1)`은 `ptr[1]`과 동일하다. 이 둘을 헷갈리지 않아야 한다.

### 포인터 배열과 배열 포인터

포인터 배열은 포인터를 원소로 갖는 배열이다. `int* ptrArr[4];`는 크기가 4이고 각 원소가 `int*`인 배열이다.

배열 포인터는 배열 전체를 가리키는 포인터다. 단일 변수가 아니라 배열 통째를 가리키며, 보통 다차원 배열을 제어할 때 많이 쓴다.

```cpp
// 포인터 배열: 포인터를 원소로 갖는 배열
int a = 10, b = 20, c = 30;
int* ptrArr[3] = { &a, &b, &c };

cout << "*ptrArr[0]: " << *ptrArr[0] << endl; // 10
```

`*ptrArr[1]`과 `*(ptrArr + 1)`은 같고, `(*ptr)[1]`과 `*(*ptr + 1)`은 같다.

```cpp
int x = 1, y = 2, z = 3;
int* ptrArr[3] = { &x, &y, &z }; // 포인터 배열 (각 원소가 int* 타입)

int arr[3] = { 10, 20, 30 };
int (*ptr)[3] = &arr; // 배열 포인터 (배열 전체를 가리킴)

cout << "(*ptr)[0]: " << (*ptr)[0] << endl; // 10
cout << "(*ptr)[1]: " << (*ptr)[1] << endl; // 20
```

```cpp
int arr[3] = {10, 20, 30};
int (*ptr)[3] = &arr; // 배열 포인터 선언

// 배열 포인터는 단일 요소를 직접 가리킬 수 없음
// ptr = arr; // 오류 발생: 배열의 첫 번째 요소 주소와 다름
```

### 포인터의 포인터 (이중 포인터)

```c
int val = 42;
int *val_ptr = &val;          // val_ptr은 val의 주소를 저장
int **val_ptr_ptr = &val_ptr; // val_ptr_ptr은 val_ptr의 주소를 저장
```

| 표현            | 의미                                       | 값             |
| --------------- | ------------------------------------------ | -------------- |
| `val`           | 정수 변수                                  | `42`           |
| `val_ptr`       | val을 가리키는 포인터                      | val의 주소     |
| `*val_ptr`      | val_ptr이 가리키는 곳의 값                 | `42`           |
| `val_ptr_ptr`   | val_ptr을 가리키는 포인터                  | val_ptr의 주소 |
| `*val_ptr_ptr`  | val_ptr_ptr이 가리키는 곳 = val_ptr        | val의 주소     |
| `**val_ptr_ptr` | *val_ptr_ptr이 가리키는 곳의 값 = *val_ptr | `42`           |

포인터의 포인터는 함수에서 포인터 자체를 바꾸고 싶을 때 사용한다. 포인터가 가리키는 "값"을 바꾸려면 포인터를 넘기고, 포인터가 가리키는 "대상"을 바꾸려면 포인터의 포인터를 넘긴다.

```cpp
void change_value(int *target) {
    *target = 999;
}

void change_target(int **target_ptr, int *new_addr) {
    *target_ptr = new_addr;
}

int main(void) {
    int a = 10, b = 20;
    int *current = &a;

    printf("%d\n", *current);       // 10 — a를 가리킴

    change_value(current);
    printf("%d\n", a);              // 999 — a의 값이 바뀜

    change_target(&current, &b);
    printf("%d\n", *current);       // 20 — 이제 b를 가리킴

    return 0;
}
```

### `&`는 언제 붙이나

원칙은 간단하다. 함수가 포인터를 요구하는데 넘기려는 것이 아직 포인터가 아니면 `&`를 붙인다.

```c
int num = 10;
int *num_ptr = &num;

scanf("%d", &num);      // num은 int → &를 붙여서 주소를 넘김
scanf("%d", num_ptr);   // num_ptr은 이미 주소 → & 안 붙임

char name[100];
scanf("%s", name);      // name은 배열 이름 = 이미 주소 → & 안 붙임
scanf("%s", &name[0]);  // 이것도 같은 의미
```

| 넘기려는 것    | 이미 주소인가? | `&` 필요?      |
| -------------- | -------------- | -------------- |
| `int num`      | 아니오 (값)    | `&num`         |
| `int *num_ptr` | 예 (주소)      | 그냥 `num_ptr` |
| `int arr[]`    | 예 (배열=주소) | 그냥 `arr`     |
| `char str[]`   | 예 (배열=주소) | 그냥 `str`     |

## 참조자 (Reference)

포인터를 사용하면 주소값을 직접 다뤄야 해서 복잡해지기 쉽다. 이 문제를 완화하기 위해 C++은 변수에 또 다른 이름을 부여하는 `레퍼런스` 문법을 도입했다. 레퍼런스는 일반 변수와 거의 동일하게 사용할 수 있지만 내부적으로는 해당 변수를 직접 가리키는 역할을 한다.

레퍼런스는 특정 변수에 대한 별명을 부여하는 것이다. 한번 연결하면 그 변수는 두 개의 이름을 갖는 것과 같다. 선언 방법은 데이터형 뒤에 `&`를 붙인다.

```cpp
int var = 10;
int& ref = var; // var의 레퍼런스 선언

cout << "var: " << var << endl; // 10
cout << "ref: " << ref << endl; // 10

ref = 20; // ref를 변경하면 var도 변경됨

cout << "var: " << var << endl; // 20
cout << "ref: " << ref << endl; // 20
```

```cpp
int& ref; // 레퍼런스는 선언과 동시에 초기화해야 함 → 오류
```

### 포인터와 레퍼런스의 차이점

1. **선언과 초기화 시점** — 포인터는 선언 후 대입 연산자로 가리킬 대상을 나중에 바꿀 수 있다. 레퍼런스는 선언과 동시에 초기화해야 하며, 이후 다른 대상에 재연결할 수 없다.
2. **NULL 가능 여부** — 레퍼런스는 항상 다른 변수와 연결돼 있어야 해서 NULL이 없다. 포인터는 유효한 대상이 없음을 나타내기 위해 NULL/`nullptr`을 가질 수 있다.
3. **간접 참조 문법** — 포인터는 값 접근에 `*`, 주소 획득에 `&`를 쓴다. 레퍼런스는 변수 자체의 별명이므로 일반 변수와 똑같이 다룬다.

```cpp
int a = 10, b = 20;

// 포인터는 선언 후 나중에 다른 변수를 가리킬 수 있음
int* ptr = &a;
ptr = &b;

// 레퍼런스는 선언과 동시에 초기화해야 함
int& ref = a;
// ref = &b; // 레퍼런스는 다른 변수에 재할당할 수 없음
```

```cpp
int x = 5;
int* ptr = &x;  // 포인터 선언
int& ref = x;   // 레퍼런스 선언

cout << "*ptr: " << *ptr << endl; // 5 (포인터를 통한 간접 참조)
cout << "ref: " << ref << endl;   // 5 (레퍼런스는 그냥 변수처럼 사용 가능)

*ptr = 10; // 포인터를 사용하여 값 변경
ref = 20;  // 레퍼런스로 값 변경
```

```cpp
int* ptr = nullptr;  // 포인터는 nullptr 가능
// int& ref = nullptr; // 레퍼런스는 NULL을 가질 수 없음
```

### const 레퍼런스

레퍼런스에 `const` 제약을 걸면 읽기 전용으로 사용할 수 있다. 값을 복사하지 않고도 기존 변수를 보호할 수 있어서, 큰 객체를 함수 인자로 넘길 때 특히 유용하다.

```cpp
int x = 100;
const int& cref = x; // x를 읽기 전용으로 참조

cout << "cref: " << cref << endl; // 100

// cref = 200; // 상수 레퍼런스는 값을 변경할 수 없음

x = 200; // 원본 변수 x는 변경 가능
cout << "x 변경 후 cref: " << cref << endl; // 200
```

```cpp
const int& cref; // 레퍼런스는 반드시 초기화해야 함 → 오류
```

## 변수의 스코프/수명과 스택·힙 메모리

### 변수의 범위(Scope)와 수명(Lifetime)

```c
#include <stdio.h>

int global = 100;  // 전역 변수

void demo(void) {
    int local = 10;       // 지역 변수
    static int count = 0; // 정적 변수
    count++;
    printf("count = %d\n", count);
}

int main(void) {
    demo();  // count = 1
    demo();  // count = 2
    demo();  // count = 3
    // printf("%d", local); // local은 demo 안에서만 존재하므로 에러
    return 0;
}
```

- 전역 변수 — 어디서든 접근 가능, 프로그램 종료까지 유지된다.
- 지역 변수 — 선언된 블록(함수) 안에서만 존재한다.
- 정적 변수(static) — 함수 안에서만 보이지만, 함수가 종료돼도 값이 초기화되지 않고 유지된다.

### 스택과 힙

컴퓨터에서의 자원은 곧 Memory를 의미하고, Memory는 유한한 자원이라 관리가 필요하다. 일반 변수 대부분은 스택 메모리 공간을 차지하며, 스택 메모리의 가장 큰 특징은 변수의 생존 주기가 끝나면 할당됐던 메모리가 자동으로 회수된다는 것이다.

**스택을 쓰는 경우**

- 짧은 생명주기 — 함수 안에서만 쓰고 함수가 끝나면 자동으로 없어져도 되는 객체.
- 간단한 객체 — 크기가 작고 관리가 쉬운 경우.
- 자동 메모리 관리 — 소멸자를 자동으로 호출해주므로 `delete` 같은 수동 관리가 필요 없다.

```cpp
void foo() {
    Dog myDog; // 스택에 객체 생성
    myDog.makeSound();
} // foo 끝나면 myDog 자동 소멸
```

**힙을 쓰는 경우**

- 긴 생명주기 — 함수가 끝나고도 계속 살아있어야 하는 객체.
- 동적 크기 — 런타임에 크기를 결정해야 하는 경우(배열, 큰 데이터 구조).
- 공유 객체 — 여러 함수/클래스에서 같은 객체를 가리켜야 할 때.
- 수동 관리 필요 — `new`로 만들고 반드시 `delete`로 해제해야 한다.

```cpp
Dog* myDog = new Dog(); // 힙에 객체 생성
// new는 주소를 반환하므로 포인터로 받아야 한다.
myDog->makeSound();
// 다른 함수에서도 myDog을 계속 사용 가능
delete myDog; // 직접 소멸
```

`p` 자신은 스택 메모리에 있다. 함수가 호출되는 순간 그 안의 지역 변수와 매개변수는 모두 스택에 올라간다. 스택 메모리는 운영체제가 자동으로 관리하기 때문에 함수가 종료되면 관련 메모리가 전부 자동으로 사라져, 프로그래머가 직접 컨트롤할 수 없는 영역이다. 반면 힙 메모리는 프로그래머가 직접 컨트롤하는 영역이며, 스택/힙이 나뉜 이유도 이 통제권 차이 때문이다.

### 스택 프레임의 구조 (어셈블리로 보기)

컴파일러는 함수를 컴파일할 때 필요한 `스택 프레임` 크기를 미리 계산해 실행 파일에 기록해둔다. 함수가 실제로 호출되는 시점에 스택 포인터가 움직여 그 크기만큼 스택 메모리에 공간을 확보하고, 그 안에 지역 변수와 매개변수가 자동으로 자리 잡는다.

포인터는 이 스택 프레임 안에 변수로 존재하지만, 그것이 가리키는 힙 공간은 코드가 실제로 실행될 때 운영체제에 별도로 요청해서 확보된다. 힙에 남아있는 메모리는 함수 종료와 무관하게 계속 살아있기 때문에, 함수가 끝나기 전에 반드시 `delete`로 정리해야 한다.

```cpp
void foo(int x) {
    int a = 10;
    int b = 20;
    printf("%d\n", a + b + x);
}
```

위 코드를 컴파일하면 다음과 같은 어셈블리 코드가 나온다.

```asm
foo:
    push   ebp            ; 이전 프레임 포인터 저장
    mov    ebp, esp       ; 현재 스택 프레임 시작점 설정
    sub    esp, 8         ; 지역 변수 공간 확보 (a, b)

    mov    DWORD PTR [ebp-4], 10   ; a = 10
    mov    DWORD PTR [ebp-8], 20   ; b = 20

    mov    eax, DWORD PTR [ebp-4]  ; eax = a
    add    eax, DWORD PTR [ebp-8]  ; eax += b
    add    eax, DWORD PTR [ebp+8]  ; eax += x (매개변수는 ebp+8)

    ; printf 호출 준비 (생략)

    mov    esp, ebp       ; 스택 포인터 복구
    pop    ebp            ; 이전 프레임 포인터 복구
    ret
```

- `push ebp` / `mov ebp, esp` → 새로운 스택 프레임 시작.
- `sub esp, 8` → 지역 변수 두 개(a, b) 공간 확보.
- a는 `[ebp-4]`, b는 `[ebp-8]`에 저장됨.
- 매개변수 x는 `[ebp+8]` 위치에 있음(호출 규약에 따라).
- 함수가 끝날 때 `mov esp, ebp`와 `pop ebp`로 스택을 원래 상태로 되돌림.

컴파일러가 스택 프레임 크기를 미리 계산해두고, 실행 시점에 그 크기만큼 한 번에 확보한 뒤 지역 변수들을 오프셋으로 접근하는 것이다.

### 함수 호출이 중첩될 때의 콜 스택 구조

```cpp
void bar(int y) {
    int b = y * 2;
    printf("b = %d\n", b);
}

void foo(int x) {
    int a = x + 1;
    bar(a);
}

int main() {
    int m = 5;
    foo(m);
    return 0;
}
```

```
// main 함수 호출 시점
[스택]
───────────────
main 스택 프레임
  - 지역변수 m
  - 리턴 주소
───────────────
```

```
// foo 함수 호출 시점
[스택]
───────────────
foo 스택 프레임
  - 지역변수 a
  - 매개변수 x (m 값 전달)
  - 리턴 주소
───────────────
main 스택 프레임
  - 지역변수 m
  - 리턴 주소
───────────────
```

```
// bar 함수 호출 시점
[스택]
───────────────
bar 스택 프레임
  - 지역변수 b
  - 매개변수 y (a 값 전달)
  - 리턴 주소
───────────────
foo 스택 프레임
  - 지역변수 a
  - 매개변수 x
  - 리턴 주소
───────────────
main 스택 프레임
  - 지역변수 m
  - 리턴 주소
───────────────
```

함수가 호출될 때마다 새로운 스택 프레임이 위에 쌓인다. 각 프레임은 자기 지역 변수, 매개변수, 리턴 주소를 포함한다. 함수가 끝나면 해당 프레임이 스택에서 제거(pop)되고 리턴 주소로 돌아간다. 그래서 콜 스택은 "쌓였다가 함수 종료 시 차례로 해제되는 구조"다. 함수가 중첩될수록 스택 프레임이 위로 차곡차곡 쌓이고, 함수가 끝나면 위에서부터 차례로 사라진다.

### 재귀 함수와 스택 오버플로우

재귀 함수에서 종료 조건을 빠뜨리거나 잘못 쓰면 무한 호출이 되고, 무한 호출은 스택 메모리를 꽉 채워 스택 오버플로우를 일으킨다.

```c
// ❌ 종료 조건 없음 → 스택 오버플로우
int factorial_bad(int n) {
    return n * factorial_bad(n - 1);  // n이 0이 되어도 계속 호출
}

// ❌ 종료 조건이 도달 불가능
int factorial_wrong(int n) {
    if (n == 0) return 1;
    return n * factorial_wrong(n + 1);  // n이 계속 커짐!
}

// ✅ 올바른 종료 조건
int factorial(int n) {
    if (n <= 1) return 1;              // base case
    return n * factorial(n - 1);       // n이 줄어들면서 base case에 도달
}
```

## 동적 메모리 할당 (new/delete)

`new`는 힙 메모리에 동적으로 공간을 할당하고 그 주소를 반환하는 연산자이고, `delete`는 `new`가 동적으로 할당한 메모리를 해제하는 연산자다.

**new는 정확히 무슨 일을 하나**

`int* p = new int(300);`을 단순히 보면 "포인터 p에 new가 반환한 int(300)의 주소를 초기화한다"로 끝나지만, 조금 더 들어가 보면 다음과 같다.

1. 힙 메모리에 int 하나 크기(4바이트)만큼의 공간이 생기고, 그 안에 300이 저장된다.
2. new는 그 공간의 주소를 반환하고, 이 주소가 포인터 p에 담긴다.

**delete를 호출하지 않으면?**

다 쓴 메모리는 힙에서 지워야 하고, 이를 위한 것이 `delete` 연산자다. `delete`를 호출하지 않으면 더 이상 쓰지 않는 메모리가 계속 점유된 채로 남고, 이게 쌓이면 프로그램이 느려지거나 메모리가 고갈된다. 이 현상을 **메모리 누수(Memory Leak)**라고 한다.

```cpp
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

**delete 이후 포인터 p는? 스택 vs 힙**

`delete p`로 메모리를 안전하게 해제하면 p도 같이 사라져야 할 것 같지만, **p와 p가 가리키던 메모리는 완전히 별개의 존재**다. p 자신은 스택 메모리에 있어 함수가 끝나면 자동으로 사라지지만, p가 가리키던 힙 공간은 함수 종료와 무관하게 프로그래머가 직접 `delete`로 정리해줘야 한다.

## 댕글링 포인터 (Dangling Pointer)

`delete p`를 호출한 뒤에도 p는 여전히(이미 해제된) 그 주소값을 들고 있다. 이 상태에서 p를 한 번 더 delete하거나(double free), p를 역참조하거나, p를 반환해서 다른 곳에서 쓰게 되면 그 순간 문제가 생긴다. 이렇게 **이미 해제된 메모리를 여전히 가리키고 있는 포인터**를 댕글링 포인터라고 한다. 접근하면 예측 불가능한 동작이 발생하며 프로그램 크래시, 잘못된 값, 보안 취약점으로 이어질 수 있다.

**댕글링 포인터가 생기는 상황**

```cpp
// delete 후 재참조
int* p = new int(10);
delete p;       // 메모리 해제
cout << *p;     // 이미 해제된 메모리를 참조 → Dangling Pointer
```

```cpp
// 스택 변수 주소를 함수 밖에서 사용할 때
int* foo() {
    int x = 42;   // 스택에 생성
    return &x;    // 함수 끝나면 x는 소멸 → Dangling Pointer
}

int* p = foo();
cout << *p;      // 불가
```

```cpp
// double free (중복 해제)
int* p = new int(10);
delete p;
delete p;        // 이미 해제된 메모리를 또 해제 → Dangling Pointer
```

C 스타일로도 같은 문제가 발생한다. 지역 변수는 함수의 스택 프레임에 살아 있다가, 함수가 끝나면 스택 프레임이 날아가면서 같이 사라진다.

```c
int* dangerous(void) {
    int local = 42;
    return &local;  // local은 지역변수로 함수가 끝나면 사라진다.
    // 함수가 끝나도 사라지지 않으려면 static 변수를 쓰거나, 호출자가 공간을 마련하고 포인터를 넘겨야 한다.
}

int main(void) {
    int *result = dangerous();
    printf("%d\n", *result);  // result가 받은건 이미 사라진 local의 주소 → 쓰레기 값이나 에러
    return 0;
}
```

**예방 방법**

1. delete 후에는 포인터를 `nullptr`로 초기화한다.

```cpp
delete p;
p = nullptr; // 안전하게 초기화
// 이후 실수로 p를 다시 delete해도(delete nullptr은 아무 일도 안 하는 안전한 연산이다) 문제가 없다.
```

2. 함수에서 스택 변수의 주소를 반환하지 않는다.
3. 스마트 포인터(`std::unique_ptr`, `std::shared_ptr`)를 사용해 자동으로 메모리를 관리한다.

## 얕은 복사 vs 깊은 복사

얕은 복사와 깊은 복사는 객체를 복사할 때 메모리를 어떻게 다루느냐의 차이다.

### 얕은 복사(shallow copy)

객체의 값(특히 포인터 값)만 그대로 복사해서, 원본과 복사본이 같은 메모리 주소를 가리키게 된다. 하나를 수정하면 다른 하나도 영향을 받고, 둘 다 소멸 시점에 delete를 하면 이중 해제(double free) 에러가 발생할 수 있다.

```cpp
class Dog {
public:
    int* age;
    Dog(int a) { age = new int(a); }
    ~Dog() { delete age; }
};

int main() {
    Dog d1(5);
    Dog d2 = d1; // 얕은 복사 (기본 복사 생성자)
    cout << *d1.age << ", " << *d2.age << endl; // 둘 다 같은 age 메모리를 가리켜 위험하다.
}
```

`char*` 멤버를 가진 `Book` 클래스로 좀 더 자세히 보면, 복사 생성자를 따로 정의하지 않으면 컴파일러가 멤버 하나하나를 그대로 복사하는 기본 복사 생성자(memberwise copy)를 만들어준다.

```cpp
class Book
{
    char *arr;

public:
    Book(const std::string &title)
    {
        arr = new char[title.size() + 1];
        std::strcpy(arr, title.c_str());
    }

    ~Book() { delete[] arr; }
};

// 복사 생성자를 정의하지 않았을 때 컴파일러가 자동으로 만들어주는 것과 같다.
Book(const Book &other) { arr = other.arr; } // 얕은 복사
```

`arr = other.arr;`는 메모리를 새로 만드는 게 아니라 **주소값만** 그대로 복사한다. `Book b2(b1);`을 하면 `b1.arr`와 `b2.arr`가 완전히 같은 메모리를 가리키게 된다(변수는 2개, 메모리는 1개). 이 상태로 `main`이 끝나면 `b2` 소멸자가 먼저 `delete[] arr;`로 메모리를 해제하고, `b1` 소멸자가 이미 해제된 같은 메모리를 또 `delete[] arr;` → **이중 해제(double free)**가 발생한다. 이중 해제는 undefined behavior라서 크래시가 나거나(가장 흔함), 아무 문제 없어 보이다가 나중에 알 수 없는 곳에서 터질 수도 있다.

### 깊은 복사(deep copy)로 해결

객체가 가진 실제 데이터까지 새로 복사해서 독립적인 메모리를 만든다. 원본과 복사본이 서로 다른 메모리를 가지므로 안전하며, 복사 생성자를 직접 구현해서 사용한다.

```cpp
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

```cpp
Book(const Book &other)
{
    arr = new char[std::strlen(other.arr) + 1];
    std::strcpy(arr, other.arr);
}
```

이렇게 하면 `b2`를 만든 뒤 `b1`의 내용을 바꿔도 `b2`는 영향받지 않는다. 이건 복사 생성자의 대표적인 효과 중 하나일 뿐이고, 실제로는 함수에 값으로 전달하거나(`void Foo(Book b)`), 컨테이너에 저장하거나(`vector<Book>`), 값으로 반환할 때도 복사 생성자가 자동으로 호출된다.

`Player`의 `int* hp` 예시로도 같은 문제를 볼 수 있다.

```cpp
class Player {
    int* hp;

public:
    Player(int hp) : hp(new int(hp)) {}

    Player(const Player& other) {
        hp = other.hp;   // 얕은 복사
    }

    void SetHP(int num) { *hp = num; }
    int GetHP() { return *hp; }
};

int main() {
    Player p1(10);
    Player p2(p1);
    p1.SetHP(20);

    std::cout << p1.GetHP() << std::endl;  // 20
    std::cout << p2.GetHP() << std::endl;  // 20 (p2는 안 건드렸는데도 바뀜)
}
```

`hp = other.hp;`는 주소값을 그대로 복사할 뿐이라 `p1.hp`와 `p2.hp`가 같은 `int` 칸을 가리키게 된다. 고치려면 새 메모리를 할당하고 주소가 아니라 값(`*other.hp`)을 복사해야 한다.

```cpp
Player(const Player& other) {
    hp = new int(*other.hp);  // 새 메모리 할당 + 값 복사
}
```

### 복사는 포인터 멤버만의 문제가 아니다

복사는 객체의 모든 멤버를 대상으로 하지만, 멤버 타입마다 "어떻게 복사해야 안전한지"가 다르다.

```cpp
class Book
{
    char *arr;          // 힙 메모리를 "가리키는 주소"만 들고 있음
    int age;             // 값 자체를 직접 들고 있음
    std::string name;    // 값 자체를 직접 들고 있음 (내부 구현은 별개)
};
```

- `age`는 객체 안에 정수값 자체가 그대로 들어있어서, `age(other.age)`로 값을 복사하면 완전히 독립적인 정수 2개가 생기고 공유될 여지가 없다.
- `arr`는 다르다. `arr = other.arr;`를 하면 그 주소값(숫자)만 복사되니 두 객체가 가리키는 대상은 하나가 된다.
- `std::string name`도 내부적으로 긴 문자열이면 힙 메모리를 쓴다(짧은 문자열은 SSO 최적화로 객체 안에 바로 저장되기도 함). 원리상 `arr`와 같은 문제를 가질 수 있지만, `std::string`은 자기 복사 생성자 안에서 이미 깊은 복사를 하도록 구현되어 있어서 `name(other.name)`이라고만 써도 알아서 새 힙 메모리를 할당하고 복사해준다.

정리하면 "스택이라서 공유가 안 된다"보다는, **"값을 직접 들고 있거나 알아서 깊은 복사하는 타입은 그대로 복사해도 안전하고, 힙 주소만 들고 있는 raw pointer는 그대로 복사하면 주소만 공유된다"**가 더 정확한 설명이다.

raw pointer 멤버 때문에 복사 생성자를 직접 작성하게 되면, `arr`만 고치는 데 신경 쓰다가 `age`, `name`처럼 원래 문제없던 멤버들까지 초기화 리스트에서 빠뜨리기 쉽다. 직접 복사 생성자를 쓰는 순간 컴파일러는 memberwise copy를 포기하기 때문에, 언급하지 않은 멤버는 `int`면 초기화되지 않은 쓰레기값, 클래스 타입이면 기본 생성자로 초기화된 빈 값이 된다.

```cpp
Book(const Book &other) : age(other.age), name(other.name)
{
    arr = new char[std::strlen(other.arr) + 1];
    std::strcpy(arr, other.arr);
}
```

### 얕은 복사는 언제 정답인가

판단 기준은 딱 하나다. **그 포인터가 가리키는 대상을 이 클래스가 "소유"하고 있는가.** 소유한다는 건 소멸자에서 그 포인터를 `delete`한다는 뜻이다.

```cpp
class Book {
    char* arr; // Book이 new로 만들고, 소멸자에서 delete하는 "소유" 포인터

public:
    ~Book() { delete[] arr; }
};
```

`Book`의 `arr`는 소유 포인터라서 얕은 복사하면 이중 해제로 터진다. 반면 다음 `target`은 소유하지 않는 관찰용(non-owning) 포인터다.

```cpp
class Skill {
    Player* target; // Skill이 만든 게 아니라, 이미 어딘가 존재하는 Player를 "가리키기만" 함

public:
    Skill(Player* t) : target(t) {}
    void Cast() { target->TakeDamage(10); }
    // 소멸자에서 delete target 안 함. target은 Skill 것이 아니니까.
};
```

`Skill`을 복사할 때 `target`도 주소값만 그대로 복사(얕은 복사)하는 게 오히려 원하는 동작이다. 정리하면:

- 소멸자에서 이 포인터를 delete하는가? → 하면 소유 포인터 → 얕은 복사 금지(깊은 복사, 또는 소유권을 명확히 하는 스마트 포인터가 필요).
- 소멸자에서 아무것도 안 하고 그냥 참조만 하는가? → 비소유 포인터 → 얕은 복사가 정답.

## 이동 생성자와 이동 시맨틱스

### 이동 생성자는 언제 호출되는가

```cpp
Book(Book &&other)
{
    arr = other.arr;
    other.arr = nullptr;
}
```

이동 생성자는 원본의 메모리를 복사하지 않고 **그대로 가져오면서**, 원본의 포인터는 `nullptr`로 비워버린다. 그래서 나중에 원본이 소멸돼도 이미 넘겨준 메모리를 다시 delete하지 않는다.

이동 생성자는 아무 때나 호출되지 않는다. `Book b2(b1);`처럼 `b1`이 이름 있는 변수(lvalue)면 복사 생성자가 호출되고, 이동 생성자는 **rvalue**(임시 객체, 또는 `std::move`로 명시적으로 표시한 값)를 넘길 때만 호출된다.

```cpp
Book b4(std::move(b1));   // b1을 rvalue로 취급 -> 이동 생성자 호출
Book b5(Book("임시책"));   // 임시 객체 -> 이동 생성자 호출 (컴파일러가 생략할 수도 있음)

Book MakeBook() {
    Book temp("만든책");
    return temp;            // 지역 객체 반환 -> 이동 생성자 호출될 수 있음
}
```

### 왜 char\*가 이동의 "태초" 예시인가 - std::string과의 연결

이동이 성립하려면 조건이 하나 있다. **힙에 할당된 데이터를 가리키는 포인터**여야 한다는 것이다.

```cpp
class A { char arr[100]; };  // 고정 배열, 객체 안에 데이터가 그대로 박혀있음
class B { char* arr; };      // 힙 어딘가를 가리키는 주소값만 들고 있음
```

`A`의 `arr[100]`은 객체 내부에 물리적으로 박혀있는 데이터라서, "포인터만 훔쳐오고 원본을 비운다"는 트릭 자체가 불가능하다. 옮기려면 결국 100바이트를 전부 복사해야 한다. 반면 `B`의 `arr`는 그냥 숫자(주소값) 하나라서, 이 숫자만 다른 변수로 옮기고 원본을 `nullptr`로 바꾸면 실제 데이터는 한 바이트도 움직이지 않은 채로 소유권만 이전된다.

이 트릭은 `std::string`도 내부적으로 똑같이 쓴다.

```cpp
// std::string의 이동 생성자가 (개념적으로) 하는 일
String(String&& other) {
    buffer = other.buffer;      // 내부 char* 포인터만 가져옴
    size = other.size;
    capacity = other.capacity;
    other.buffer = nullptr;     // 원본 비움
    other.size = 0;
}
```

`std::string s2 = std::move(s1);`이 문자열 길이와 무관하게 항상 빠른(O(1)) 이유도 이거다. 포인터 몇 개만 옮기지, 글자를 한 자도 복사하지 않기 때문이다. 반대로 복사 생성자는 항상 O(n)이다 — 새 버퍼를 할당하고 모든 글자를 베껴야 한다.

### 이동 후 원본을 계속 쓰면 터진다

```cpp
Book b4(std::move(b1));
std::cout << b1.GetBookTitle() << std::endl;  // b1.arr가 nullptr
```

`GetBookTitle()`이 `nullptr`을 반환하고 이를 `std::cout <<`에 넘기면, 컴파일러는 이걸 C 스타일 문자열로 취급해 `\0`을 찾을 때까지 읽으려 한다. 시작 주소 자체가 `nullptr`이라 그 순간 크래시가 난다. 소멸자가 항상 `arr`를 출력하려고 시도하면 소멸 시점에도 같은 문제가 생긴다.

```cpp
~Book()
{
    if (arr) std::cout << arr << " 소멸자 호출\n";
    delete[] arr;  // delete[] nullptr은 안전해서 그냥 둬도 됨
}
```

C++에서 이동된(moved-from) 객체는 "유효하지만 값이 정해지지 않은 상태"로 취급하는 게 규칙이라, 이동 후 원본을 다시 쓰려면 재할당을 해줘야 한다.

### 컴파일러가 자동으로 정하는 것 vs 아닌 것

- **"복사 생성자냐 이동 생성자냐"는 컴파일러가 자동으로 선택한다.** 인자가 lvalue인지 rvalue인지로 오버로드 결정을 하는 것이라, 함수 오버로드 규칙과 동일하다.
- **"깊은 복사냐 얕은 복사냐"는 컴파일러가 판단하는 게 아니라, 복사 생성자 본문에 뭐가 적혀있느냐의 결과다.** 복사 생성자를 직접 안 만들면 컴파일러가 memberwise copy를 만들어준다. `char*` 같은 raw pointer 멤버는 이때 주소값만 복사되니 얕은 복사가 되고, `std::string`이나 `std::vector` 같은 멤버는 그 타입 자체의 복사 생성자가 이미 깊은 복사를 하도록 구현돼 있어서 memberwise copy를 써도 자동으로 깊은 복사가 된다.

## 스마트 포인터

### 왜 필요한가 - RAII와 delete를 잊어버리는 문제

`new`로 할당한 메모리는 반드시 `delete`로 짝을 맞춰줘야 한다. 문제는 이게 **사람이 손으로 직접 챙겨야 하는 규칙**이라는 점이다.

```cpp
void Foo() {
    Player* p = new Player();

    if (p->GetHP() <= 0) {
        return;          // 플레이어가 죽으면 함수가 끝나는데 여기서 delete 안 함 → 메모리 누수 발생
    }

    p->Attack();
    // 정상 흐름에서도 return / throw로 중간에 빠져나가면 아래 delete는 실행되지 않을 수 있다.
    delete p;
}
```

함수 중간에 `return`, `throw`, `break` 등으로 빠져나가는 경로가 하나라도 있으면 그 경로에서는 `delete`가 실행되지 않는다. 경로가 늘어날수록 실수로 빠뜨릴 확률도 늘어난다.

스마트 포인터는 이 문제를 **RAII(Resource Acquisition Is Initialization)** 패턴으로 해결한다. "자원 해제를 사람이 기억하는 대신, 객체의 소멸자(destructor)에게 맡긴다"는 아이디어다. 스마트 포인터는 내부에 raw pointer를 들고 있는 작은 클래스일 뿐이고, 그 클래스의 소멸자 안에서 `delete`를 대신 호출해준다. 그래서 스마트 포인터 변수가 스코프를 벗어나는 순간(정상 흐름이든, 중간 return이든, 예외로 인한 스택 풀림이든) **스택 메모리에 있는 지역 변수가 자동으로 정리되는 것과 똑같은 타이밍에** 소멸자가 호출되고, 그 안에서 힙 메모리도 함께 정리된다. 즉 힙 자원의 수명을 스택 변수의 수명에 묶어버리는 것이다.

::: tip RAII (Resource Acquisition Is Initialization)란

직역하면 "자원 획득이 곧 초기화" - 규칙 자체는 단순하다.

**"자원의 획득(생성자)과 해제(소멸자)를 객체의 생명주기에 묶어버려서, 자원 관리를 언어의 스코프 규칙에게 통째로 떠넘긴다."**

여기서 "자원"은 힙 메모리뿐만 아니라 명시적으로 열고 닫아야 하는 모든 것을 말한다. 힙에 할당한 메모리, 열어놓은 파일 핸들, 잠근 뮤텍스 락, 열어놓은 네트워크 소켓, DB 커넥션 등. 이들의 공통점은 "다 쓰고 나면 반드시 누군가 정리해줘야 하고, 안 하면 조용히 새어나간다"는 것이다.

동작 원리는 세 단계다.

1. 클래스의 **생성자**에서 자원을 획득한다(메모리 할당, 파일 open, 락 lock 등).
2. 그 클래스의 **소멸자**에서 그 자원을 해제한다(delete, 파일 close, 락 unlock 등).
3. 이 클래스의 인스턴스를 스택에 지역 변수로 만들어 쓴다. C++는 스택에 있는 지역 변수가 스코프를 벗어나는 순간 반드시 소멸자를 호출해준다는 걸 언어 차원에서 보장한다. 정상적으로 함수가 끝나든, 중간에 `return`으로 빠져나가든, `throw`로 예외가 터져서 스택이 풀리든(stack unwinding) 예외 없이 호출된다.

그래서 "이 자원을 언제 해제해야 하지?"를 사람이 코드 곳곳에서 챙기는 대신, "이 자원을 감싸는 클래스가 스코프를 벗어날 때"로 질문 자체를 바꿔버리는 것이다. 스코프를 벗어나는 시점은 컴파일러가 항상 정확히 알고 있으니, 해제를 빠뜨리는 게 원천적으로 불가능해진다.

스마트 포인터는 RAII를 힙 메모리에 적용한 대표적인 예시다. 결국 RAII는 특정 기능이 아니라 **"자원 관리 책임을 사람의 기억력에서 객체의 생명주기로 옮기는 설계 원칙"**이고, unique_ptr/shared_ptr은 그 원칙을 "힙에 할당한 객체"라는 자원에 적용한 구현체인 셈이다.
:::

### unique_ptr - 단독 소유

`unique_ptr`은 "이 객체의 소유자는 오직 나 하나뿐이다"를 코드로 강제하는 스마트 포인터다.

```cpp
#include <memory>

std::unique_ptr<Player> p = std::make_unique<Player>();
p->Attack();
// p가 스코프를 벗어나는 순간 소멸자에서 delete가 호출된다
```

- **복사가 금지되어 있다.** `unique_ptr<Player> p2 = p;`는 컴파일 에러다. 소유자가 둘이 되는 걸 애초에 막아버린 것이다. 소유자가 둘이면 둘 중 누가 delete를 책임질지 애매해지고, 결국 둘 다 delete하면 이중 해제(double free) 버그가 난다.
- **이동(move)은 가능하다.** `std::unique_ptr<Player> p2 = std::move(p);`를 하면 소유권이 p에서 p2로 완전히 넘어가고, 넘긴 쪽 p는 nullptr이 된다. "소유자가 바뀌는 것"과 "소유자가 늘어나는 것"은 다른 문제라서, 이동은 막을 이유가 없다.

::: tip 그런데 왜 굳이 이동을 하는가

복사를 막았다고 해서 "소유권을 다른 곳으로 넘겨야 하는 상황" 자체가 사라지는 건 아니다.

**1) 함수에서 만들어서 밖으로 돌려줄 때 (팩토리 패턴)**

```cpp
std::unique_ptr<Player> CreatePlayer() {
    std::unique_ptr<Player> p = std::make_unique<Player>();
    return p;  // 내부적으로 move, p의 소유권이 호출자에게 넘어감
}

auto myPlayer = CreatePlayer();  // myPlayer가 새로운 유일한 소유자
```

**2) 컨테이너에 넣을 때**

```cpp
std::vector<std::unique_ptr<Enemy>> enemies;
auto e = std::make_unique<Enemy>();
enemies.push_back(std::move(e));  // e의 소유권이 vector 안으로 이동
```

**3) 소유자를 다른 객체로 갈아탈 때**

```cpp
class Inventory {
    std::unique_ptr<Item> heldItem;
public:
    void Equip(std::unique_ptr<Item> item) {
        heldItem = std::move(item);  // 아이템 소유권이 이 Inventory로 넘어옴
    }
};
```

핵심은 **"소유자가 둘이 되는 것"(복사)은 위험해서 막았지만, "소유자가 하나인 채로 자리만 옮기는 것"(이동)은 전혀 위험하지 않다**는 것이다. 이동 후엔 원래 변수가 즉시 nullptr이 되므로 그 순간에도 소유자는 항상 정확히 하나뿐이다.
:::

`new`를 직접 쓰지 않고 `std::make_unique<T>(...)`로 만드는 게 권장된다. 예외 안전성 문제를 피할 수 있고, `new`라는 키워드가 코드에 드러나지 않아 "직접 관리하는 포인터가 없다"는 걸 눈으로 확인하기 쉽다. 함수 인자로 소유권 자체를 넘기고 싶다면 `unique_ptr<T>`를 값으로 받아야 한다(`std::move`로 넘겨야 함). 그냥 안에서 잠깐 쓰기만 할 거라면 `T*`나 `T&`로 raw 포인터/참조를 받는 게 낫다.

### shared_ptr - 참조 카운트로 공유

```cpp
std::shared_ptr<Player> p1 = std::make_shared<Player>();
{
    std::shared_ptr<Player> p2 = p1;   // 복사 가능 → 참조 카운트 2
    std::cout << p1.use_count() << "\n"; // 2
}
// p2가 스코프를 벗어나며 카운트가 1로 감소 (객체는 아직 살아있음)

std::cout << p1.use_count() << "\n"; // 1
// p1도 스코프를 벗어나면 카운트가 0이 되고, 그 시점에 delete가 호출된다
```

- `shared_ptr`은 내부에 실제 객체를 가리키는 포인터 하나와, **참조 카운트(control block)를 가리키는 포인터**를 하나 더 들고 있다. 복사될 때마다 카운트가 +1, 소멸될 때마다 -1 되고, 카운트가 0이 되는 순간 진짜 `delete`가 호출된다.
- `unique_ptr`과 달리 복사가 자유롭다.
- 참조 카운트 증감 자체는 스레드에 안전하게(atomic 연산으로) 구현되어 있다. 다만 그건 "카운트가 꼬이지 않는다"는 보장일 뿐, **가리키는 객체 자체를 여러 스레드에서 동시에 읽고 쓰는 것까지 안전하게 해주는 건 아니다.**
- `make_shared<T>(...)`를 쓰면 객체와 control block을 한 번의 메모리 할당으로 같이 만들어서 더 효율적이다. `shared_ptr<T> p(new T(...))`처럼 쓰면 두 번의 힙 할당이 일어난다.
- unique_ptr보다 항상 무겁다(카운트 관리 비용, control block 메모리).

::: tip 실전에서는 언제 쓰나? 리소스 캐싱 예시

```cpp
class ResourceManager {
    std::unordered_map<std::string, std::shared_ptr<Texture>> cache;
public:
    std::shared_ptr<Texture> LoadTexture(const std::string& path) {
        auto it = cache.find(path);
        if (it != cache.end()) {
            return it->second;  // 이미 로드됐으면 복사만 (참조 카운트 +1, 디스크 재로딩 없음)
        }
        auto tex = std::make_shared<Texture>(path);
        cache[path] = tex;
        return tex;
    }
};
```

이렇게 shared_ptr은 **소유 관계가 트리 구조로 딱 떨어지지 않고, 소유자의 수와 수명이 런타임에 결정되는 경우**에 쓴다.
:::

### weak_ptr - 소유하지 않고 관찰만 하기, 그리고 순환 참조 문제

shared_ptr끼리 서로를 참조하면 문제가 생긴다.

```cpp
struct Node {
    std::shared_ptr<Node> next;
    std::shared_ptr<Node> prev;
};

auto a = std::make_shared<Node>();
auto b = std::make_shared<Node>();
a->next = b;   // b의 참조 카운트 +1
b->prev = a;   // a의 참조 카운트 +1
```

함수가 끝나서 지역 변수 `a`, `b`가 스코프를 벗어나도, a의 카운트는 `b->prev`가 아직 들고 있어서 1, b의 카운트는 `a->next`가 아직 들고 있어서 1이다. **둘 다 카운트가 0이 될 기회가 영영 오지 않는다.** 서로가 서로를 살려주는 셈이라 아무도 delete되지 않는 메모리 누수가 생긴다. 이게 `shared_ptr`의 대표적인 함정인 순환 참조(circular reference)다.

`weak_ptr`은 이 문제를 풀기 위한 포인터다. shared_ptr을 가리키긴 하지만 **참조 카운트를 올리지 않는다.**

```cpp
struct Node {
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev;   // 소유권을 갖지 않는 참조로 순환을 끊는다
};
```

weak_ptr은 객체를 직접 가리킬 수 없고(역참조 연산자가 없다), 대신 `lock()`을 호출해서 shared_ptr을 얻어야 한다. 이 시점에 원본 객체가 이미 delete되어 사라졌다면 `lock()`은 빈(null) shared_ptr을 돌려준다.

```cpp
if (std::shared_ptr<Node> locked = weakNode.lock()) {
    // 아직 살아있음, 안전하게 사용 가능
} else {
    // 이미 소멸됨
}
```

### 정리 - 뭘 언제 쓰나

- **기본값은 unique_ptr.** "이 객체를 소유하는 건 명백히 나 하나"인 경우가 대부분이라, 특별한 이유가 없다면 unique_ptr부터 시작하는 게 맞다.
- **shared_ptr은 정말로 소유자가 여러 명이어야 할 때만.**
- **weak_ptr은 소유하지 않고 관찰만 하고 싶을 때, 또는 shared_ptr끼리의 순환 참조를 끊어야 할 때.** 부모→자식은 shared_ptr(소유), 자식→부모는 weak_ptr(비소유)로 방향을 나눠주는 식.
- 셋 다 `get()`으로 내부 raw pointer를 꺼낼 수 있지만, 그 raw pointer를 어딘가에 따로 저장해두고 계속 쓰는 건 스마트 포인터를 쓰는 의미를 스스로 무너뜨리는 것이다.

### 실전 예시 - unique_ptr로 소유권 구조 설계하기

텍스트 RPG를 만들면서 `Player`가 `PlayerStatus&`/`PlayerInventory&`처럼 참조로 멤버를 들고, 각 Job 생성자에서 외부에서 만든 객체를 주입받는 구조를 쓴 적이 있었다. 참조로 멤버를 들고 있으면 그 객체의 생명주기를 `Player` 바깥에서 책임져야 한다. 즉 `Player`를 만들기 전에 `PlayerStatus`/`PlayerInventory`를 별도로 만들어서 넘겨줘야 했다.

이걸 참조 대신 `Player`가 `std::unique_ptr<PlayerStatus>`, `std::unique_ptr<PlayerInventory>`, `std::unique_ptr<PlayerEnhancement>`를 멤버로 직접 소유하도록 바꾸면, `Player`가 생성될 때 `std::make_unique<PlayerStatus>()`로 직접 만들고 `Player`가 소멸할 때 자동으로 함께 정리되어 생명주기가 명확해진다. Job 생성자도 이름만 받도록 단순해졌다.

```cpp
// Player.h — 참조 대신 unique_ptr로 소유, include 대신 전방 선언만 남김
class Monster;
class PlayerStatus;
class PlayerEnhancement;
class PlayerInventory;
class Potion;

class Player {
protected:
    const std::string playerName;
    std::unique_ptr<PlayerStatus> playerStatus;
    std::unique_ptr<PlayerEnhancement> playerEnhancement;
    std::unique_ptr<PlayerInventory> playerInventory;
    std::unique_ptr<Potion> potion;
    JobType job;
    int level;
    int exp;

public:
    Player(const std::string playerName, JobType job);
    virtual ~Player();
    // ...
};
```

참조 대신 소유로 바꾸면서 좋았던 점은 `Player`를 만드는 쪽이 더 이상 `PlayerStatus`, `PlayerInventory`를 미리 만들어서 넘겨줄 필요가 없다는 것이다. 다만 `unique_ptr` 멤버를 헤더에서 그대로 include 하면 순환 참조(`Player.h` ↔ `PlayerStatus.h`)가 생기기 쉬워서, 헤더는 전방 선언만 두고 실제 정의가 필요한 cpp에서만 include 하도록 신경 써야 했다.

::: note 정리

참조(`&`) 멤버는 대상 객체를 바깥에서 만들어 주입해야 하고, 재대입이 불가능하다. 소유(`unique_ptr`)는 대상 객체의 생성/소멸을 멤버 스스로 책임진다.

:::
