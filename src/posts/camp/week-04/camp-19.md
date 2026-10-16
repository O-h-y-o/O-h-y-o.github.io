---
date: 2026-07-23
category:
  - Camp
  - Unreal
order: 4
---

# 캠프 19일차

## Atani 퀴즈

<AtaniQuiz :questionIds="[55, 56, 57, 58, 59]" />

## 프로그래머스 코테 연습

<programmers-coding :test-id="12910">

::: tabs

@tab 반복문

반복문을 사용하여 간단하게 구현

```cpp
#include <vector>
#include <algorithm>

using namespace std;

vector<int> solution(vector<int> arr, int divisor) {
    vector<int> answer;

    for (int num : arr) {
        if (num % divisor == 0) answer.push_back(num);
    }

    if(answer.empty()) answer.push_back(-1);

    sort(answer.begin(), answer.end(), [](int a, int b) { return a < b; });

    return answer;
}
```

@tab copy_if

copy_if로 조건에 맞는 원소만 복사해 반복문을 사용하는 것 보다 더 표준 라이브러리 스타일에 맞는다.

```cpp
#include <vector>
#include <algorithm>

using namespace std;

vector<int> solution(vector<int> arr, int divisor) {
    vector<int> answer;

    copy_if(arr.begin(), arr.end(), back_inserter(answer),
           [divisor](int num) { return num % divisor == 0; });

    if(answer.empty()) answer.push_back(-1);

    sort(answer.begin(), answer.end(), [](int a, int b) { return a < b; });

    return answer;
}
```

:::

</programmers-coding>

## 메모리

new/delete 연산자에 대해서 복습하던 중, **new는 Heap 메모리에 동적으로 공간을 할당하고, 그 주소를 반환하는 연산자**이고, **delete는 new 연산자가 동적으로 할당한 메모리를 해제하는 연산자**라고만 알고 넘어갔었는데, 조금 더 깊게 생각해보기로 했다.

### new는 정확히 무슨 일을 하나

`int* p = new int(300);`을 단순히 보면 "포인터 p에 new가 반환한 int(300)의 주소를 초기화한다"로 끝난다. 조금 더 들어가 보면,

1. 힙 메모리에 int 하나 크기(4바이트)만큼의 공간이 생기고, 그 안에 300이 저장된다.
2. new는 그 공간의 주소를 반환하고, 이 주소가 포인터 p에 담긴다.

### delete를 호출하지 않으면?

int(300)을 다 쓰고 나면 힙 메모리에서 지워야 한다. 이걸 위한 게 `delete` 연산자다. `delete`를 호출하지 않으면 더 이상 쓰지 않는 메모리가 계속 점유된 채로 남고, 이게 쌓이고 쌓이면 프로그램이 느려지거나 메모리가 고갈된다. 이 현상을 `메모리 누수(Memory Leak)`라고 한다.

### delete 이후 포인터 p는? 스택 vs 힙

`delete p`로 int(300)을 안전하게 해제하면, p도 같이 사라져야 할 것 같지만 **p와 p가 가리키던 int(300)은 완전히 별개의 존재**다.

- p 자신은 스택 메모리에 있다. 함수가 호출되는 순간 그 안의 지역 변수와 매개변수는 모두 스택에 올라간다.
- 스택 메모리는 운영체제가 자동으로 관리한다. 그래서 함수가 종료되면 관련 메모리가 전부 자동으로 사라진다 → 프로그래머가 직접 컨트롤할 수 없는 영역이다.
- 반면 힙 메모리는 프로그래머가 직접 컨트롤하는 영역이다. 스택/힙이 나뉜 이유도 이 통제권 차이 때문이다.

컴파일러는 함수를 컴파일할 때 필요한 `스택 프레임` 크기를 미리 계산해 실행 파일에 기록해둔다. 함수가 실제로 호출되는 시점에 스택 포인터가 움직여 그 크기만큼 스택 메모리에 공간(`스택 프레임 공간`)을 확보하고, 그 안에 지역 변수와 매개변수가 자동으로 자리 잡는다.

포인터는 이 스택 프레임 안에 변수로 존재하지만, 그것이 가리키는 힙 공간은 코드가 실제로 실행될 때 운영체제에 별도로 요청해서 확보된다. 그래서 "함수가 끝나면 스택 프레임(포인터 변수 p)은 어차피 없어지니 신경 안 써도 되지 않나?" 싶을 수 있는데, 힙에 남아있는 메모리는 함수 종료와 무관하게 계속 살아있다. 그래서 함수가 끝나기 전에 반드시 `delete`로 정리해야 한다. 스택 메모리와 힙 메모리의 설계 차이 때문이다.

### 댕글링 포인터 (Dangling Pointer)

`delete p`를 호출한 뒤에도 p는 여전히 (이미 해제된) 그 주소값을 들고 있다. 이 상태에서 p를 한 번 더 delete하거나(double free), p를 역참조(dereference)하거나, p를 반환해서 다른 곳에서 쓰게 되면 그 순간 에러가 발생한다. 이렇게 **이미 해제된 메모리를 여전히 가리키고 있는 포인터**를 `댕글링 포인터(Dangling Pointer)`라고 한다.

그래서 delete 직후에는 `p = nullptr;`로 p 자체의 값을 비워주는 게 안전하다. 이렇게 하면 나중에 실수로 p를 다시 참조하거나 delete하더라도(`delete nullptr`은 아무 일도 안 하는 안전한 연산이다) 댕글링 포인터로 인한 에러가 발생하지 않는다.

### 어셈블리 코드 예시

```cpp
void foo(int x) {
    int a = 10;
    int b = 20;
    printf("%d\n", a + b + x);
}
```

위 코드를 컴파일러가 컴파일하면 다음의 어셈블리 코드가 나온다.

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

- push ebp / mov ebp, esp → 새로운 스택 프레임 시작.
- sub esp, 8 → 지역 변수 두 개(a, b) 공간 확보.
- a는 [ebp-4], b는 [ebp-8]에 저장됨.
- 매개변수 x는 [ebp+8] 위치에 있음 (호출 규약에 따라).
- 함수가 끝날 때 mov esp, ebp와 pop ebp로 스택을 원래 상태로 되돌림.

컴파일러가 스택 프레임 크기를 미리 계산해두고, 실행 시점에 그 크기만큼 한 번에 확보한 뒤, 지역 변수들을 오프셋으로 접근하는 것이다.

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

위와 같은 코드가 있다고 할때의 실행 흐름과 스택 프레임이다.

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

- 함수가 호출될 때마다 새로운 스택 프레임이 위에 쌓임.
- 각 프레임은 자기 지역 변수, 매개변수, 리턴 주소를 포함.
- 함수가 끝나면 해당 프레임이 스택에서 제거(pop) 되고, 리턴 주소로 돌아감.
- 그래서 콜 스택은 "쌓였다가 함수 종료 시 차례로 해제되는 구조"

스택은 함수 호출의 흐름을 그대로 반영하는 구조라서, 함수가 중첩될수록 스택 프레임이 위로 차곡차곡 쌓이고, 함수가 끝나면 위에서부터 차례로 사라진다.

## 스마트 포인터

스마트 포인터 역시도 **new/delete의 문제점으로 인해 생긴 스마트 포인터를 쓰면 new/delete를 직접 관리하지 않아 안전**, **unique_ptr, shared_ptr, weak_ptr이 있으며 객체 독점 소유, 공유, 참조카운트 안쌓는 공유...** 라고만 알고 넘어갔었다. 그래서 대강 사용법만 알고 넘어가니 실제로 textrpg에서 사용할 때, 잘 동작은 됐지만 '이게 끝인가? 이렇게 하는게 맞나..?' 라는 찝찝함이 남곤 했다.

### 왜 필요한가?

**RAII와 delete를 잊어버리는 문제**

위 메모리에서 본 것처럼, `new`로 할당한 메모리는 반드시 `delete`로 짝을 맞춰줘야 한다. 문제는 이게 **사람이 손으로 직접 챙겨야 하는 규칙**이라는 점이다.

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

직역하면 "자원 획득이 곧 초기화" - 이름만 보면 뭔 소린지 와닿지 않는데, 규칙 자체는 단순하다.

**"자원의 획득(생성자)과 해제(소멸자)를 객체의 생명주기에 묶어버려서, 자원 관리를 언어의 스코프 규칙에게 통째로 떠넘긴다."**

여기서 "자원"은 힙 메모리뿐만 아니라 **명시적으로 열고 닫아야 하는 모든 것**을 말한다. 힙에 할당한 메모리, 열어놓은 파일 핸들, 잠근 뮤텍스 락, 열어놓은 네트워크 소켓, DB 커넥션 등. 이들의 공통점은 "다 쓰고 나면 반드시 누군가 정리해줘야 하고, 안 하면 조용히 새어나간다"는 것이다.

**동작 원리는 세 단계다.**

1. 클래스의 **생성자**에서 자원을 획득한다 (메모리 할당, 파일 open, 락 lock 등).
2. 그 클래스의 **소멸자**에서 그 자원을 해제한다 (delete, 파일 close, 락 unlock 등).
3. 이 클래스의 인스턴스를 스택에 지역 변수로 만들어 쓴다. C++는 스택에 있는 지역 변수가 스코프를 벗어나는 순간 **반드시** 소멸자를 호출해준다는 걸 언어 차원에서 보장한다. 정상적으로 함수가 끝나든, 중간에 `return`으로 빠져나가든, `throw`로 예외가 터져서 스택이 풀리든(stack unwinding) 예외 없이 호출된다.

그래서 "이 자원을 언제 해제해야 하지?"를 사람이 코드 곳곳에서 챙기는 대신, "이 자원을 감싸는 클래스가 스코프를 벗어날 때"로 질문 자체를 바꿔버리는 것이다. 스코프를 벗어나는 시점은 컴파일러가 항상 정확히 알고 있으니, 해제를 빠뜨리는 게 원천적으로 불가능해진다.

**스마트 포인터는 RAII를 힙 메모리에 적용한 대표적인 예시다.** RAII 자체는 "힙 메모리"에만 한정된 개념이 아니라, 파일 핸들이나 락처럼 명시적으로 닫아줘야 하는 다른 자원에도 똑같이 적용되는 일반적인 설계 원칙인데, 그 얘기는 관련 개념(파일 입출력, 뮤텍스 등)을 배울 때 자세히 다루기로 하고 여기서는 넘어간다.

결국 RAII는 특정 기능이 아니라 **"자원 관리 책임을 사람의 기억력에서 객체의 생명주기로 옮기는 설계 원칙"**이고, unique_ptr/shared_ptr은 그 원칙을 "힙에 할당한 객체"라는 자원에 적용한 구현체인 셈이다.
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

복사를 막았다고 해서 "소유권을 다른 곳으로 넘겨야 하는 상황" 자체가 사라지는 건 아니다. 실제로 이런 상황이 계속 생긴다.

**1) 함수에서 만들어서 밖으로 돌려줄 때 (팩토리 패턴)**

```cpp
std::unique_ptr<Player> CreatePlayer() {
    std::unique_ptr<Player> p = std::make_unique<Player>();
    return p;  // 내부적으로 move, p의 소유권이 호출자에게 넘어감
}

auto myPlayer = CreatePlayer();  // myPlayer가 새로운 유일한 소유자
```

함수 안에서 만든 객체를 함수 밖에서 계속 쓰고 싶은데, 복사는 금지니까 소유권을 이동시켜서 넘겨주는 수밖에 없다.

**2) 컨테이너에 넣을 때**

```cpp
std::vector<std::unique_ptr<Enemy>> enemies;
auto e = std::make_unique<Enemy>();
enemies.push_back(std::move(e));  // e의 소유권이 vector 안으로 이동
```

`vector<unique_ptr<T>>`처럼 스마트 포인터를 컨테이너에 담는 건 흔한 패턴인데, 복사가 안 되니 push_back할 때도 move로 넣어야 한다.

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

아이템 하나의 소유자가 "바닥에 떨어진 상태"에서 "플레이어 인벤토리"로 바뀌는 것처럼, 프로그램이 돌아가는 동안 소유자 자체가 다른 변수나 객체로 바뀌어야 하는 경우가 자연스럽게 생긴다.

핵심은 **"소유자가 둘이 되는 것"(복사)은 위험해서 막았지만, "소유자가 하나인 채로 자리만 옮기는 것"(이동)은 전혀 위험하지 않다**는 것이다. 이동 후엔 원래 변수가 즉시 nullptr이 되므로 그 순간에도 소유자는 항상 정확히 하나뿐이다. 이동까지 막아버리면 unique_ptr은 그 함수/스코프 안에서만 쓰고 버려야 하는 반쪽짜리 도구가 되어, 반환하거나 컨테이너에 넣거나 다른 객체에 넘기는 흔한 패턴이 전부 불가능해진다.
:::

- `new`를 직접 쓰지 않고 `std::make_unique<T>(...)`로 만드는 게 권장된다. 예외 안전성 문제(생성 도중 예외가 나면 메모리가 샐 수 있는 경우)를 피할 수 있고, `new`라는 키워드가 코드에 드러나지 않아 "직접 관리하는 포인터가 없다"는 걸 눈으로 확인하기 쉽다.
- 함수 인자로 소유권 자체를 넘기고 싶다면 `unique_ptr<T>`를 값으로 받아야 한다(`std::move`로 넘겨야 함). 그냥 안에서 잠깐 쓰기만 할 거라면 `T*`나 `T&`로 raw 포인터/참조를 받는 게 낫다. 스마트 포인터를 매개변수 타입으로 쓰는 건 "소유권을 주고받겠다"는 신호이지, 단순 접근용이 아니다.

### shared_ptr - 참조 카운트로 공유

여러 곳에서 같은 객체를 같이 소유해야 하는 경우도 있다. 이때 쓰는 게 `shared_ptr`이다.

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

- `shared_ptr`은 내부에 실제 객체를 가리키는 포인터 하나와, **참조 카운트(control block)를 가리키는 포인터**를 하나 더 들고 있다. 복사될 때마다 카운트가 +1, 소멸될 때마다 -1 되고, 카운트가 0이 되는 순간 진짜 `delete`가 호출된다. "마지막까지 살아남은 소유자가 자원을 정리한다"는 개념이다.
- `unique_ptr`과 달리 복사가 자유롭다. 소유자가 여러 명이어도 되는 게 shared_ptr의 존재 이유이기 때문이다.
- 참조 카운트 증감 자체는 스레드에 안전하게(atomic 연산으로) 구현되어 있다. 다만 그건 "카운트가 꼬이지 않는다"는 보장일 뿐, **가리키는 객체 자체를 여러 스레드에서 동시에 읽고 쓰는 것까지 안전하게 해주는 건 아니다.** 객체 내부 데이터 접근은 여전히 별도의 동기화가 필요하다.
- `make_shared<T>(...)`를 쓰면 객체와 control block을 한 번의 메모리 할당으로 같이 만들어서 더 효율적이다. `shared_ptr<T> p(new T(...))`처럼 쓰면 `new`로 객체 할당 한 번, control block 할당이 또 한 번, 총 두 번의 힙 할당이 일어난다.
- unique_ptr보다 항상 무겁다(카운트 관리 비용, control block 메모리). 그래서 "정말로 여러 곳에서 공유해야 하는 게 맞는지" 먼저 따져보고, 아니라면 unique_ptr을 기본값으로 쓰는 게 낫다.

::: tip 실전에서는 언제 쓰나? 리소스 캐싱 예시

게임에서 흔한 상황: 같은 텍스처나 모델 데이터를 여러 오브젝트가 동시에 참조해야 하는데, "누가 마지막까지 쓰고 있는지"는 코드를 짜는 시점엔 알 수 없다. 이럴 때 shared_ptr이 딱 맞는다.

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

ResourceManager resMgr;

auto goblinSprite = resMgr.LoadTexture("goblin.png");
auto goblinBossSprite = resMgr.LoadTexture("goblin.png");
// 같은 파일 → 디스크에서 다시 로드하지 않고 캐시에 있던 shared_ptr을 복사
// 참조 카운트 3 (cache 안의 것 + goblinSprite + goblinBossSprite)
```

여기서 shared_ptr이 필요한 이유:

- 이 텍스처를 실제로 들고 쓰는 몬스터 오브젝트가 몇 개나 생길지, 언제 사라질지는 게임이 실행되기 전엔 알 수 없다.
- ResourceManager의 캐시도 이 텍스처를 참조하고 있고, 개별 몬스터들도 각자 참조하고 있다. "소유자는 얘 하나"라고 미리 정할 수 없는 구조다.
- 마지막 몬스터가 사라지고 캐시에서도 지워지는 순간 참조 카운트가 0이 되며 텍스처 메모리가 자동으로 해제된다. 누가 마지막으로 이 텍스처를 놓게 될지 미리 알 필요 없이, "카운트가 0이 되는 시점"이 곧 정리 시점이 된다.

이렇게 shared_ptr은 **소유 관계가 트리 구조로 딱 떨어지지 않고, 소유자의 수와 수명이 런타임에 결정되는 경우**에 쓴다. 반대로 위 unique_ptr 예시들처럼 "소유자가 명확히 하나"인 경우라면 굳이 shared_ptr을 쓸 필요가 없다. 참조 카운트 관리 비용만 더 들 뿐이다.
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

함수가 끝나서 지역 변수 `a`, `b`가 스코프를 벗어나도, a의 카운트는 b->prev가 아직 들고 있어서 1, b의 카운트는 a->next가 아직 들고 있어서 1이다. **둘 다 카운트가 0이 될 기회가 영영 오지 않는다.** 서로가 서로를 살려주는 셈이라 아무도 delete되지 않는 메모리 누수가 생긴다. 이게 `shared_ptr`의 대표적인 함정인 순환 참조(circular reference)다.

`weak_ptr`은 이 문제를 풀기 위한 포인터다. shared_ptr을 가리키긴 하지만 **참조 카운트를 올리지 않는다.** 즉 "나는 이 객체가 살아있는 동안엔 접근하고 싶지만, 내가 이 객체를 살려두는 이유가 되고 싶진 않다"는 관계를 표현한다.

```cpp
struct Node {
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev;   // 소유권을 갖지 않는 참조로 순환을 끊는다
};
```

weak_ptr은 객체를 직접 가리킬 수 없고(역참조 연산자가 없다), 대신 `lock()`을 호출해서 shared_ptr을 얻어야 한다. 이 시점에 원본 객체가 이미 delete되어 사라졌다면 `lock()`은 빈(null) shared_ptr을 돌려준다. 그래서 댕글링 포인터처럼 이미 없어진 메모리를 실수로 접근하는 사고를 막아준다.

```cpp
if (std::shared_ptr<Node> locked = weakNode.lock()) {
    // 아직 살아있음, 안전하게 사용 가능
} else {
    // 이미 소멸됨
}
```

### 정리 - 뭘 언제 쓰나

- **기본값은 unique_ptr.** "이 객체를 소유하는 건 명백히 나 하나"인 경우가 대부분이라, 특별한 이유가 없다면 unique_ptr부터 시작하는 게 맞다.
- **shared_ptr은 정말로 소유자가 여러 명이어야 할 때만.** "여러 곳에서 들고 있으면 편하니까"가 아니라 "이 객체의 수명이 특정 소유자 하나에 묶일 수 없는 구조"일 때 쓴다.
- **weak_ptr은 소유하지 않고 관찰만 하고 싶을 때, 또는 shared_ptr끼리의 순환 참조를 끊어야 할 때.** 부모→자식은 shared_ptr(소유), 자식→부모는 weak_ptr(비소유)로 방향을 나눠주는 식.
- 셋 다 `get()`으로 내부 raw pointer를 꺼낼 수 있지만, 그 raw pointer를 어딘가에 따로 저장해두고 계속 쓰는 건 스마트 포인터를 쓰는 의미를 스스로 무너뜨리는 것이다. `get()`은 "이 함수 호출 동안만 잠깐 raw API에 넘겨줄 때" 정도로만 쓰는 게 안전하다.

::: tip 언리얼 엔진에서는
언리얼의 `UObject` 계열(AActor, UActorComponent 등)은 std 스마트 포인터가 아니라 **언리얼 자체 가비지 컬렉터(GC)**가 수명을 관리한다. 그래서 UObject를 `std::shared_ptr`이나 `std::unique_ptr`로 감싸면 GC와 충돌해서 오히려 위험하다. UObject를 가리킬 땐 그냥 raw 포인터(`UPROPERTY()`로 GC에게 참조를 알려줌) 또는 `TWeakObjectPtr`를 쓰고, `std::unique_ptr`/`std::shared_ptr`은 UObject가 아닌 순수 C++ 클래스(예: 커스텀 게임 로직 클래스, 알고리즘용 자료구조 등)에만 쓰는 것이 원칙이다. 언리얼에는 별도로 `TSharedPtr`/`TWeakPtr`/`TUniquePtr`이라는 자체 스마트 포인터 세트도 있는데, 이건 non-UObject 타입(Slate 위젯 등)에서 std 대신 쓰라고 만들어진 것이다.
:::
