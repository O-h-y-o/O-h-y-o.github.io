---
date: 2026-08-10
category:
  - Cpp
order: 5
---

# 오버로딩과 템플릿

## 컴파일 시 다형성 개요

다형성(polymorphism)은 컴파일 시점(정적)과 실행 시점(동적) 다형성으로 나뉜다. 실행 시점 다형성(가상 함수 등)은 상속과 함께 다루고, 여기서는 컴파일 시점 다형성인 함수 오버로딩과 연산자 오버로딩, 그리고 이를 확장하는 템플릿을 정리한다.

- 함수 오버로딩(Function Overloading): 같은 이름의 함수가 매개변수 타입/개수에 따라 다르게 동작한다.
- 연산자 오버로딩(Operator Overloading): 사용자 정의 타입에 대해 `+`, `-`, `==` 같은 연산자를 새롭게 정의할 수 있다.

```cpp
class Calculator {
public:
    int add(int a, int b) { return a + b; } // 정수가 들어오면 정수 덧셈
    double add(double a, double b) { return a + b; } // 실수가 들어오면 실수 덧셈
};
```

## 함수 오버로딩

C++에서는 특정 규칙만 지키면 동일한 이름의 함수로 여러 개를 정의할 수 있다. C++은 함수 이름과 매개변수 타입 정보를 함께 사용해 구분하기 때문이다. 함수 이름 구분을 위해 내부적으로 고유한 이름을 부여하는 것을 네임 맹글링(Name Mangling)이라고 한다. 함수 오버로딩이 적용되려면 이름이 같아도 각 함수가 명확히 구분되어야 하며, 매개변수의 타입이 다르거나 개수가 다른 경우에 오버로딩이 가능하다. 함수의 반환형만으로는 오버로딩이 성립하지 않는다.

### 오버로딩이 안되는 경우

타입 변환이 가능한 매개변수로 인해 두 개 이상의 오버로딩된 함수가 호출 후보가 되는 경우:

```cpp
void print(double a) {
    cout << "double: " << a << endl;
}

void print(long a) {
    cout << "long: " << a << endl;
}
// print(10) 인 경우, long, double 모두 들어갈 수 있음
```

디폴트 매개변수로 인해 함수 호출 형태가 중복되는 경우:

```cpp
void display(int a, int b = 5) {
    cout << a << ", " << b << endl;
}

void display(int a) {
    cout << a << endl;
}
// int b = 5 라는 디폴트 값이 있어서 어디에 들어가도 상관없음
```

매개변수의 타입만 포인터와 배열로 다른 경우(배열은 포인터 취급도 되기 때문에 둘 다 들어갈 수 있음):

```cpp
void print(int* arr) {
    cout << "포인터 호출됨" << endl;
}

void print(int arr[]) {
    cout << "배열 호출됨" << endl;
}
```

함수의 반환 타입만 다른 경우(반환 타입만 달라 어떤 것을 호출할지 판단 불가):

```cpp
int getValue() {
    return 10;
}

double getValue() {
    return 3.14;
}
```

### 오버로딩 결정 순서

컴파일러는 최대한 변환할 수 있는 함수를 찾으려고 노력하며, 명확한 우선순위 규칙에 따라 호출할 함수를 결정한다.

1. 정확한 매칭
2. 타입 승격 변환
3. 표준 타입 변환
4. 사용자 정의 타입 변환

**1. 정확한 매개변수 타입 일치** — 호출 인자 타입과 매개변수 타입이 정확히 일치하는 경우.

```cpp
void print(int a) {
    cout << "정확한 타입(int) 호출됨" << endl;
}

void print(double a) {
    cout << "double 타입 호출됨" << endl;
}

print(10); // 정확한 타입 int 일치
```

**2. 타입 승격 변환** — 값이 손실되지 않는 방향으로 변환하는 것을 승격이라고 한다. (`char`/`short` → `int`, `float` → `double`, `bool` → `int`)

```cpp
void print(int a) {
    cout << "int 타입 호출됨" << endl;
}

void print(char a) {
    cout << "char 타입 호출됨" << endl;
}

short s = 10;
print(s); // short 타입이 없기 때문에 int로 승격 변환
```

**3. 표준 타입 변환** — 승격보다는 조금 더 광범위하다. 값 손실이 발생할 수 있다. (`int` → `double`, `double` → `int`, `double` → `float`)

**4. 사용자 정의 타입 변환** — 클래스 타입의 변환 함수나 생성자 등을 통해 이뤄지는 변환.

```cpp
class MyNumber {
public:
    operator int() const { return 42; } // 연산자 오버로딩 → int 타입으로 변환한다. → 42를 반환한다.
};

void print(int a) {
    cout << "int 타입 호출됨, 값: " << a << endl;
}

void print(double a) {
    cout << "double 타입 호출됨, 값: " << a << endl;
}

MyNumber num;
print(num); // 클래스 타입이 int로 변환
```

## 연산자 오버로딩

연산자(`+`, `-`, `*`, `==`, `<<` 등)를 직접 만든 클래스에서도 쓸 수 있게 만드는 기능이다. 먼저 복소수(`Complex`)로 `+`를 오버로딩해봤다.

```cpp
class Complex { // 클래스(사용자 정의 자료형) 생성
//  복소수(Complex number)를 표현하기 위한 설계도, 복소수는 실수부(real)와 허수부(imag) 두 개의 값으로 이루어져 있다.

    double real, imag; // 클래스 안에 있는 멤버 변수
public:
    Complex(double r=0, double i=0): real(r), imag(i) {}
    // 객체를 만들 때 자동으로 호출되는 생성자(Constructor)
    // r=0, i=0 → 기본 값을 지정하였기 때문에 인자가 없으면 (0, 0) 복소수가 만들어진다.
    // : real(r), imag(i) → 멤버 초기화 리스트, 전달받은 값을 real, imag 에 넣는다.

    Complex operator+(const Complex& other) {
        return Complex(real + other.real, imag + other.imag);
    }
    // 연산자 오버로딩, + 연산자를 Complex 끼리 더할 수 있도록 정의
    // const Complex& other → 다른 복소수 객체를 참조로 받는다.
    // 함수 안에서는 real + other.real, imag + other.imag 를 계산해서 새로운 Complex 객체를 반환한다.
};

int main() {
    Complex c1(1.0, 2.0); // 실수부 1.0, 허수부 2.0
    Complex c2(3.0, 4.0); // 실수부 3.0, 허수부 4.0

    Complex result = c1 + c2; // operator+ 호출됨
    // result는 (1+3, 2+4) = (4, 6)
    // c1 + c2 를 하면 두 복소수의 실수부끼리, 허수부끼리 더한 새로운 복소수가 나온다.
}
```

2차원 벡터(`Vector2D`)로도 좀 더 다양한 연산자를 연습해봤다.

```cpp
class Vector2D
{
  private:
    float x, y;

  public:
    Vector2D(float x = 0.0f, float y = 0.0f) : x(x), y(y) {}
    float GetX() const { return x; }
    float GetY() const { return y; }

    Vector2D operator+(const Vector2D &other) const
    {
        return Vector2D(x + other.x, y + other.y);
    }

    Vector2D operator*(float scalar) const
    {
        return Vector2D(x * scalar, y * scalar);
    }

    Vector2D &operator+=(const Vector2D &other)
    {
        x += other.x;
        y += other.y;
        return *this;
    }

    bool operator==(const Vector2D &other) const
    {
        return x == other.x && y == other.y;
    }
};
```

`+`, `-`, `*(스칼라)`, `==`처럼 **왼쪽 피연산자가 항상 이 클래스 자기 자신인 연산**은 멤버 함수로 자연스럽게 만들 수 있다.

### 멤버로 못 만드는 연산자는 전역 함수로

```cpp
// std::cout << vector; 를 지원하려면
std::ostream &operator<<(std::ostream &os, const Vector2D &v)
{
    os << "(" << v.GetX() << ", " << v.GetY() << ")";
    return os;
}

// 2.0f * vector; 처럼 스칼라가 왼쪽에 오는 경우
Vector2D operator*(float scalar, const Vector2D &v) { return v * scalar; }
```

`operator<<`를 멤버 함수로 만들면 왼쪽 피연산자가 무조건 `Vector2D`여야 하는데, `std::cout << vector;`는 왼쪽 피연산자가 `std::ostream`(`cout`)이라 순서가 안 맞는다. `2.0f * vector`도 마찬가지로 `float`에는 멤버 함수를 추가할 수 없다. 이런 "왼쪽 피연산자가 이 클래스가 아닌 경우"는 클래스 밖의 전역(비멤버) 함수로 정의해야 한다. 이때 `private` 멤버에 접근해야 한다면 클래스 안에 `friend` 선언이 필요하지만, `GetX()`/`GetY()`가 `public`이면 그걸 통해 접근하면 되므로 `friend` 없이도 된다.

## 함수 템플릿

C++의 템플릿은 STL의 기반이자 제네릭 프로그래밍을 가능하게 하는 핵심 기능으로, 함수나 클래스를 특정 타입에 의존하지 않고 작성할 수 있게 해주며 컴파일 시점에 실제 타입별 코드로 `인스턴스화`된다. 코드 재사용성과 타입 안전성을 동시에 확보하는 강력한 도구다.

::: tip 제네릭 프로그래밍
제네릭 프로그래밍(Generic Programming)은 특정 타입에 의존하지 않고, 다양한 타입에 대해 동작할 수 있는 일반화된 코드 작성 기법을 의미한다.
:::

**기본 개념**

- 정의: 타입을 매개변수로 받아서 일반화된 함수나 클래스를 작성하는 문법
- 작동 방식: 컴파일러가 호출 시점에 구체적인 타입을 대입해 실제 함수를 생성 → 인스턴스화
- 목적: 같은 로직을 여러 타입에 대해 반복 작성하지 않고, 한 번의 정의로 다양한 타입을 지원

**장점**: 코드 재사용성 극대화, 타입 안정성 확보, 컴파일 시 최적화로 런타임 오버헤드 없음.

**단점**: 컴파일 시간 증가, 에러 메시지가 복잡하고 이해하기 어려움, 지나치게 복잡한 템플릿은 가독성 저하.

```cpp
template <typename T>
T minimum(const T& a, const T& b) {
    return (a < b) ? a : b;
}

int main() {
    int x = minimum(3, 5);       // int 버전 생성
    double y = minimum(2.1, 3.4); // double 버전 생성
    // 여기서 호출 시점에 T 가 int, double 로 대체된다.
}
```

또 다른 예시로, `Max` 함수 템플릿을 만들어봤다.

```cpp
template <typename T>
T Max(T a, T b)
{
    return (a > b) ? a : b;
}

Max(3, 7);        // T = int로 자동 추론
Max(3.5, 1.2);     // T = double로 자동 추론
Max<int>(3, 7);    // 타입을 명시적으로 지정도 가능
```

`typename T`는 "T라는 이름의 타입 자리를 하나 만든다"는 뜻이고, 실제 호출 시점에 넘긴 인자의 타입을 보고 컴파일러가 `T`를 채워 넣는다(템플릿 인자 추론). `int`용, `double`용 함수를 따로 작성할 필요가 없다.

### 템플릿 특수화

특정 타입에 대해 일반 템플릿 로직이 안 맞을 때, 그 타입 전용 버전을 따로 정의할 수 있다.

```cpp
template<> class Box<bool> {
    bool value;
public:
    Box(bool v) : value(v) {}
    std::string get() const { return value ? "true" : "false"; }
};
```

```cpp
// Vector2D는 operator>가 없어서 위 일반 템플릿을 그대로 못 씀
template <>
Vector2D Max<Vector2D>(Vector2D a, Vector2D b)
{
    float lenA = a.GetX() * a.GetX() + a.GetY() * a.GetY();
    float lenB = b.GetX() * b.GetX() + b.GetY() * b.GetY();
    return (lenA > lenB) ? a : b;  // 길이(크기)가 더 큰 벡터를 반환
}
```

### 비형식 매개변수와 가변 템플릿

타입이 아닌 값을 매개변수로 받을 수도 있다.

```cpp
template<int N>
class Array {
    int data[N];
};
Array<10> arr; // 크기가 10인 배열
```

매개변수 개수를 제한 없이 받는 가변 템플릿도 있다.

```cpp
template<typename... Args>
void printAll(Args... args) {
    (std::cout << ... << args) << std::endl;
}
```

## 클래스 템플릿

`Box<T>`는 타입에 따라 다른 클래스 버전이 생성된다. STL의 `vector<T>`, `map<K,V>` 등이 모두 클래스 템플릿 기반이다.

```cpp
template <typename T>
class Box {
    T value;
public:
    Box(T v) : value(v) {}
    T get() const { return value; }
};

Box<int> b1(10);
Box<std::string> b2("Hello");
```

함수뿐 아니라 클래스 전체도 템플릿으로 만들 수 있다. 앞서 Rule of Five 연습에서 만든 `IntArray`를 `int` 전용에서 아무 타입 `T`로 일반화하면 다음과 같다.

```cpp
template <typename T>
class Array
{
  private:
    T *arr;
    int size;

  public:
    Array(int size) : arr(new T[size]), size(size) {}
    ~Array() { delete[] arr; }

    Array(const Array &other) : arr(new T[other.size]), size(other.size)
    {
        for (int i = 0; i < size; i++) arr[i] = other.arr[i];
    }

    // 복사 대입, 이동 생성자, 이동 대입도 동일한 구조로 T만 바뀐 채 그대로 작성

    T &operator[](int index) { return arr[index]; }
};

Array<int> intArr(3);
intArr[0] = 10;

Array<std::string> strArr(2);   // 같은 클래스 하나가 완전히 다른 타입에도 그대로 재사용됨
strArr[0] = "안녕";
```

`Array<int>`, `Array<std::string>`처럼 같은 코드 한 벌이 서로 다른 타입에 대해 각각 별도로 컴파일되어(템플릿 인스턴스화) 동작한다. `std::vector<T>`가 표준 라이브러리 내부에서 정확히 이런 구조로 만들어져 있다고 생각하면 된다.
