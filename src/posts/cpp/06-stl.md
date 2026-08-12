---
date: 2026-08-10
category:
  - Cpp
order: 6
---

# STL

## 컨테이너 개요

STL(Standard Template Library)은 C++ 표준 라이브러리의 일부로, 컨테이너·알고리즘·반복자 템플릿 기반 구성 요소를 포함한다. STL을 활용하면 다양한 자료구조와 알고리즘을 직접 구현하지 않고도 사용할 수 있다.

컨테이너(Container)는 데이터를 저장하고 관리하기 위한 자료구조를 표준화해 놓은 것으로, C++ STL의 핵심 구성 요소다.

- 모든 컨테이너는 템플릿으로 구현되어 있어 다양한 타입의 데이터를 저장할 수 있다.
- 모든 컨테이너는 메모리 관리를 내부적으로 한다. 사용 시 메모리 해제를 고려하지 않아도 된다.
- 대부분 컨테이너는 반복자를 제공한다. 내부 구현을 몰라도 동일한 방식으로 컨테이너를 순회할 수 있다.

| 분류                       | 컨테이너                             | 설명                        |
| -------------------------- | ------------------------------------ | --------------------------- |
| 순차 컨테이너              | `vector`, `list`, `deque`            | 순서대로 원소 저장          |
| 연관 컨테이너              | `map`, `multimap`, `set`, `multiset` | 키(key) 기반으로 원소 저장  |
| 비순차 컨테이너(해시 기반) | `unordered_map`, `unordered_set`     | 해시 테이블 기반, 빠른 탐색 |

### 벡터

벡터는 배열과 매우 유사한 컨테이너다. 템플릿 클래스로 구현되어 특정 타입에 종속되지 않으며, 삽입되는 원소 개수에 따라 내부 배열의 크기가 자동으로 조정된다. 임의 접근(`array[2]` 배열 첨자 연산자)이 가능하다. 삽입/삭제는 맨 뒤에 하는 게 좋다 — 중간 삽입이나 삭제는 배열 복사가 필요하므로 비효율적이다.

```cpp
#include <vector>

vector<int> vec1; // 기본 생성 및 초기화 없이 선언
vector<int> vec2(5, 10); // 크기 5, 모든 원소가 10으로 초기화
vector<int> vec3 = {1, 2, 3, 4, 5}; // 리스트 초기화로 벡터 선언
vector<int> vec4(vec3);  // vec3의 복사본 생성, vec4 = vec3 → 대입

// 2차원 벡터 초기화
vector<vector<int>> vec2D(3, vector<int>(4, 7)); // 3x4 크기의 행렬 생성, 모든 원소가 7로 초기화

// 벡터 끝에 원소 추가
vector<int> vec5;
vec5.push_back(10);
vec5.push_back(20);
vec5.push_back(30);

for(int num : vec5) { // vec5의 크기만큼 반복문 수행
    cout << num << endl;
}

vec5.pop_back();
vec5.pop_back();
vec5.pop_back(); // 3번의 pop_back() 으로 vec5은 이제 빈 배열

// 배열의 사이즈
vector<int> vec6 = { 10, 20 ,30 };
cout << vec6.size() << endl; // 3 출력
vec6.push_back(40);
cout << vec6.size() << endl; // 4 출력
vec6.pop_back();
cout << vec6.size() << endl; // 3 출력

// 벡터의 특정 구간의 원소를 제거 함수
// 벡터의 성능을 낮추기때문에 되도록 사용하지 말아야한다.
vector<int> vec7 = { 10, 20, 30, 40, 50};
vec7.erase(vec.begin() + 1); // 20 삭제
vec7.erase(vec.begin() + 1, vec.begin() + 3); // 1번째부터 3번째 인덱스까지 삭제 → 30, 40 삭제 (이전 범위까지만 포함한다)
vec7.clear(); // 전부 삭제
```

### 순차 컨테이너 비교 — vector / list / deque

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

- `vector`: 메모리가 연속적으로 할당되어 인덱스 접근(`[]`)이 O(1)이다. 대신 중간·앞쪽 삽입/삭제는 뒤 원소들을 밀어야 해서 O(N)이 걸린다.
- `list`: 이중 연결 리스트. 임의 위치의 삽입/삭제가 O(1)이지만, 인덱스로 바로 접근할 수 없고 순회를 통해서만 원소에 도달할 수 있다.
- `deque`: 양쪽 끝에서의 삽입/삭제가 모두 O(1)이면서 인덱스 접근도 O(1)이다.

### 연관 컨테이너 — map / set

특정 키를 사용하여 값을 검색하는 기능을 제공하는 대표적인 연관 컨테이너다. 배열은 정수형 인덱스를 활용하여 특정 위치의 값을 빠르게 찾아주지만, 맵은 키를 활용해 값과 쌍으로 저장하고 검색한다.

**주요 특성**

- 키, 값 쌍은 `pair<const Key, Value>` 형태로 저장된다.
- 키 값을 기준으로 내부 데이터가 자동으로 정렬된다.
- 중복된 키 값을 허용하지 않는다.

```cpp
#include <iostream>
#include <map>
using namespace std;

map<int, string> studentMap;

studentMap[101] = "Alice";
studentMap.insert({104, "Echo"});
studentMap[103] = "Charlie";
studentMap.insert(make_pair(106, "Lee"));
studentMap[102] = "Bob";
studentMap.insert(make_pair(105, "Boki"));
// 맵은 키 순으로 오름차순 정렬된다. 101, 102, 103, 104, 105, 106

for (const auto& pair : studentMap) {
    cout << pair.first << pair.second << endl;
}

map<int, string> map12 = {
    {1, "Alice"},
    {2, "Charlie"},
    {3, "Bob"}
};

map12.size(); // 현재 크기 출력 → 3

int key = 2;
auto it = map12.find(key); // 있으면 해당 원소를 가리키는 반복자(iterator) 반환 → 포인터 같은 객체, 없으면 end() 반복자를 반환한다.

if(it != map12.end()) {
    cout << it->first << it->second << endl;
}

map12.erase(2); // 키가 2인 데이터를 삭제
map12.clear(); // 전부 삭제
```

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

- `map<Key, Value>`: 내부적으로 균형 이진 탐색 트리(주로 Red-Black Tree)로 구현되어 키 기준 오름차순 정렬을 유지한다. 같은 키는 하나만 존재할 수 있다.
- `multimap`: `map`과 동일하지만 같은 키를 여러 번 저장할 수 있다.
- `set<T>`: 값 자체를 키로 취급해 정렬된 상태로 저장하며, 중복을 허용하지 않는다.
- `multiset`: `set`과 동일하지만 같은 값을 중복해서 저장할 수 있다.
- 등급 기준표 같은 것은 `map<double, Grade, greater<double>>`로 선언해서, 기본 오름차순 대신 내림차순으로 정렬되도록 세 번째 템플릿 인자에 비교자(`greater<double>`)를 지정할 수 있다.

### 비순차 컨테이너 (해시 기반)

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

`unordered_map`/`unordered_set`은 해시 테이블로 구현되어 정렬을 유지하지 않는 대신, 탐색·삽입·삭제가 평균 O(1)로 `map`/`set`(O(log N))보다 빠르다. 해시 충돌이 많아지면 최악의 경우 O(N)까지 느려질 수 있으므로, 정렬이 필요하거나 최악의 경우 성능을 보장해야 한다면 `map`/`set`을 사용한다.

### pair / tuple

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

`pair`는 서로 다른 타입 두 개를 하나로 묶을 때 사용하며, `map`의 내부 원소 타입(`pair<const Key, Value>`)이기도 하다. `tuple`은 세 개 이상의 값을 묶을 때 사용한다. 구조체를 따로 정의하기 애매한 임시 데이터 묶음에 적합하다.

### 컨테이너 어댑터

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

`stack`(LIFO), `queue`(FIFO), `priority_queue`(우선순위 기반)는 새로운 자료구조가 아니라, `vector`/`deque` 같은 다른 컨테이너를 감싸서 제한된 인터페이스만 노출하는 어댑터다.

::: note 정리

- 순차 컨테이너(`vector`, `list`, `deque`)는 순서를 유지하며 원소를 저장하고, 인덱스 접근 방식과 삽입/삭제 성능이 서로 다르다.
- 연관 컨테이너(`map`, `multimap`, `set`, `multiset`)는 키 기준으로 자동 정렬되며, 중복 키/값 허용 여부로 나뉜다.
- 비순차 컨테이너(`unordered_map`, `unordered_set`)는 해시 기반으로 정렬 없이 평균 O(1) 탐색 속도를 제공한다.
- 정렬 순서를 바꾸고 싶으면 `map`/`set`/`priority_queue`의 템플릿 인자로 비교자(`greater<T>` 등)를 넘기면 된다.

:::

## 반복자 (iterator)

컨테이너(vector, map, set 등)에 저장된 원소를 순회하거나 접근할 수 있게 해주는 객체다. 배열에서 `int* p` 같은 포인터가 원소를 가리키는 것처럼, 반복자는 컨테이너의 원소를 가리키는 역할을 한다.

**반복자의 특징**

- 포인터처럼 동작: `*it`로 원소를 꺼내고, `it++`으로 다음 원소로 이동할 수 있다.
- 컨테이너마다 다르다: `vector<int>::iterator`는 `int*`와 거의 동일하게 동작하고, `map<int, string>::iterator`는 (key, value) 쌍을 가리킨다(`it->first`, `it->second`).
- `end()`: 컨테이너의 끝을 가리키는 특별한 반복자. 실제 원소를 가리키지 않고, "여기서 끝"이라는 표시다.

컨테이너는 데이터를 담는 그릇, 반복자는 컨테이너 안의 원소를 가리키는 포인터 같은 객체, 알고리즘(`sort`, `find`, `for_each` 등)은 반복자를 인자로 받아 컨테이너의 원소를 처리한다.

```cpp
std::vector<int> v = {10, 20, 30};
for (auto it = v.begin(); it != v.end(); ++it) {
    std::cout << *it << " "; // 10 20 30
}

std::map<int, std::string> m;
m[1] = "apple";
m[2] = "banana";

auto it = m.find(2);
if (it != m.end()) {
    std::cout << it->first << ": " << it->second << std::endl;
    // 출력: 2: banana
}
```

### 순방향 반복자

- 컨테이너의 앞에서 뒤로 진행한다.
- `begin()` → 첫 번째 원소를 가리킨다.
- `end()` → 마지막 원소 다음을 가리킨다. (실제 원소는 아니다)
- `++it`으로 다음 원소로 이동한다.

```cpp
std::vector<int> v = {1, 2, 3};
for (auto it = v.begin(); it != v.end(); ++it) {
    std::cout << *it << " "; // 출력: 1 2 3
}

std::string s = "ABC";
for (auto it = s.begin(); it != s.end(); ++it) {
    std::cout << *it << " ";
    // 출력: A B C
}
```

### 역방향 반복자

- 컨테이너의 뒤에서 앞으로 진행한다.
- `rbegin()` → 마지막 원소를 가리킨다.
- `rend()` → 첫 번째 원소 앞을 가리킨다.
- `++rit`으로 이전 원소로 이동한다.

```cpp
std::vector<int> v = {1, 2, 3};
for (auto rit = v.rbegin(); rit != v.rend(); ++rit) {
    std::cout << *rit << " "; // 출력: 3 2 1
}
```

순방향은 `begin()` → `end()`로 앞에서 뒤로, 역방향은 `rbegin()` → `rend()`로 뒤에서 앞으로 진행한다. 컨테이너마다 동일한 패턴으로 순방향, 역방향 반복자를 사용할 수 있고, 출력 순서만 반대가 된다.

## 알고리즘 (algorithm)

STL은 다양한 컨테이너와 독립적으로 동작하는 범용 알고리즘을 제공한다. 특정 원소 값을 찾거나 정렬을 하는 등의 기능을 STL에서 바로 사용할 수 있는데, 이것이 가능한 이유는 반복자 덕이다. 반복자는 컨테이너의 요소를 추상화하여 일관된 방식으로 접근할 수 있도록 도와준다.

### sort

컨테이너 내부의 데이터를 정렬하는 함수다. 기본 타입의 경우 사용자 정렬 함수가 없으면 오름차순으로 정렬된다.

`comp(a, b)`는 현재 컨테이너에서 첫 번째 인자 a가 앞에 있는 원소를 의미한다. `comp(a, b)`가 true이면 a와 b의 순서는 유지되고, false인 경우 a와 b의 순서를 바꾼다.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool compare(int a, int b) {
    return a > b;
}

int arr[] = {5, 2, 9, 1, 5, 6};
int size = sizeof(arr) / sizeof(arr[0]);

sort(arr, arr + size); // 오름차순 정렬
sort(arr, arr + size, compare); // 내림차순 정렬

auto it = find(arr, arr + size, 5); // 있으면 해당 원소를 가리키는 반복자 반환 → (it - arr), 없으면 end() 반복자 반환

vector<int> vec = {5, 2, 9, 1, 5, 6};

sort(vec.begin(), vec.end()); // 오름차순 정렬
sort(vec.begin(), vec.end(), compare); // 내림차순 정렬

auto it2 = find(vec.begin(), vec.end(), 9); // 있으면 해당 원소를 가리키는 반복자 반환 → (it - vec.begin()), 없으면 end() 반복자 반환

string str = "hello world";
auto it3 = find(str.begin(), str.end(), 'o'); // (it - str.begin())
```

여러 기준으로 클래스 타입 벡터를 정렬하는 예시도 있다.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Person {
private:
    string name;
    int age;

public:
    Person(string name, int age) : name(name), age(age) {}
    string getName() const { return name; }
    int getAge() const { return age; }
};

// 다중 기준 정렬 함수 (나이 오름차순 → 이름 오름차순)
bool compareByAgeAndName(const Person& a, const Person& b) {
    if (a.getAge() == b.getAge()) {
        return a.getName() < b.getName(); // 이름 오름차순
    }
    return a.getAge() < b.getAge(); // 나이 오름차순
}

int main() {
    vector<Person> people = {
        Person("Alice", 30),
        Person("Bob", 25),
        Person("Charlie", 35),
        Person("Alice", 25)
    };

    // 나이 → 이름 순으로 정렬
    sort(people.begin(), people.end(), compareByAgeAndName);

    for (const Person& person : people) {
        cout << person.getName() << " (" << person.getAge() << ")" << endl;
    }
    return 0;
}
```

### find_if / copy_if

`<algorithm>` 헤더의 함수로, 조건에 맞는 원소를 컨테이너에서 찾아준다는 점은 같지만 "하나만 찾을지" "전부 찾을지"에서 차이가 있다.

**find_if — 조건에 맞는 첫 원소 하나**

```cpp
auto it = find_if(recipes.begin(), recipes.end(),
    [&](const PotionRecipe& recipe) { return recipe.name == target; });

if (it == recipes.end()) {
    cout << "해당 레시피를 찾을 수 없습니다.\n";
} else {
    printRecipe(*it); // 찾은 원소는 iterator이므로 역참조(*it) 해서 사용
}
```

범위 `[begin, end)` 안에서 조건을 처음으로 만족하는 원소 하나의 위치(iterator)를 반환한다. 못 찾으면 `end()`를 반환하므로, 반환값을 `end()`와 비교해 존재 여부를 판단한다.

**copy_if — 조건에 맞는 원소 전부**

```cpp
vector<PotionRecipe> copy;
copy_if(recipes.begin(), recipes.end(), back_inserter(copy),
    [&](const PotionRecipe& recipe) {
        for (auto& ingredient : recipe.ingredients) {
            if (ingredient.name == target) return true;
        }
        return false;
    }
);

if (copy.size() > 0) {
    for (auto& recipe : copy) printRecipe(recipe);
} else {
    cout << "해당 재료를 사용하는 레시피를 찾을 수 없습니다.\n";
}
```

범위 안에서 조건을 만족하는 원소를 "전부" 골라 목적지 컨테이너로 복사한다. 목적지 자리에 `back_inserter(copy)`를 넘기면, 조건을 만족할 때마다 `copy`의 크기를 미리 정해두지 않아도 알아서 뒤에 `push_back`된다.

::: note 정리

- `find_if`는 조건을 만족하는 첫 원소 하나의 iterator를 반환하고, 결과가 유일하거나 하나만 있으면 충분할 때 사용한다.
- `copy_if`는 조건을 만족하는 원소를 전부 다른 컨테이너로 복사하며, 결과가 여러 개일 수 있을 때 사용한다.
- `copy_if`의 목적지에는 `back_inserter`를 넘겨서 컨테이너 크기를 미리 계산하지 않고도 안전하게 채워 넣을 수 있다.

:::

## 람다 (Lambda)

람다는 익명 함수(이름 없는 함수)다. C++11부터 도입된 기능으로 함수처럼 동작하는 코드를 간단하게 한 줄로 작성 가능하게 해준다.

```cpp
// 람다 기본 문법
[캡처](매개변수) -> 반환타입 { 함수 본문 }
```

- `[캡처]`: 외부 변수들을 람다 안에서 어떻게 가져올지 지정
  - `[ ]` → 아무것도 안 가져옴
  - `[&]` → 외부 변수를 참조로 가져옴
  - `[=]` → 외부 변수를 값으로 복사해서 가져옴
- `(매개변수)`: 일반 함수처럼 인자 받는 부분
- `-> 반환타입`: 반환 타입을 명시 (생략 가능, 컴파일러가 추론)
- `{ 함수 본문 }`: 실제 실행할 코드

```cpp
// [] 아무것도 캡처하지 않음
int x = 10;
auto f = []() { return 42; };
cout << f(); // 42 출력

// [=] 모든 외부 변수를 값 복사
int y = 20;
auto f2 = [=]() { return x + y; };
x = 40; // 원본 변경
cout << f2(); // 30 출력 (10+20, 캡처 시점 값)

// [&] 모든 외부 변수를 참조
auto f3 = [&]() { return x + y; };
x = 30; // 원본 변경
cout << f3(); // 50 출력 (30+20)

// [x] 특정 변수만 값 복사
auto f4 = [x]() { return x; };
x = 30;
cout << f4(); // 10 출력 (복사본 유지)

// [&x] 특정 변수만 참조
auto f5 = [&x]() { x += 5; return x; };
cout << f5(); // 15 출력 (원본 수정됨)
```

외부 변수를 참조로 받아올 때는 값을 수정할 수 있다(원본 수정). 외부 변수를 복사할 때는 `const`로 복사되기 때문에 값을 수정할 수 없으며, 값을 수정하려면 `mutable`을 붙여야 한다.

**STL 알고리즘에서 자주 쓰인다.** `std::sort`, `std::max_element` 같은 STL 알고리즘은 비교 기준 함수를 인자로 받는다. 람다를 쓰면 그 자리에서 바로 함수를 정의할 수 있어 깔끔하고 직관적이다. 복잡하거나 여러 곳에서 재사용할 로직은 외부 함수로 빼는 게 좋다.

```cpp
// 함수 버전
bool compareScore(const Student& a, const Student& b) {
  return a.score > b.score;
}
std::sort(students.begin(), students.end(), compareScore);
// 장점: 함수 이름이 명확해서 재사용 가능.
// 단점: 코드가 분리돼 있어서 정렬 로직을 바로 읽기 어렵고, 한 번만 쓰는 비교 함수라면 오히려 불필요하게 흩어져 보임.

// 람다 버전
std::sort(students.begin(), students.end(),
    [](const Student& a, const Student& b) {
        return a.score > b.score; // 점수 높은 순으로 정렬
    });
// 장점: 정렬 로직을 바로 그 자리에서 확인 가능
// 단점: 람다가 길어지면 오히려 가독성이 떨어질 수 있음.
```

## 기타 — optional, random

### std::optional

값이 "있을 수도, 없을 수도" 있는 상황을 표현하는 타입으로, 아이템이 인벤토리에 있는지 없는지 모르는 상태에서 조회할 때 사용했다.

```cpp
#include <optional>

std::optional<InventoryItem> PlayerInventory::getItem(const std::string& itemName) const {
    auto it = inventory.find(itemName);
    if(it != inventory.end()) {
        return it->second;
    } else {
        return std::nullopt;
    }
}
```

반환값을 그냥 `bool`(존재 여부)로 주거나 포인터로 줄 수도 있지만, `optional`을 쓰면 "값이 있으면 그 값 자체, 없으면 `nullopt`"를 하나의 타입으로 표현할 수 있어서 호출부에서 `if(item)`으로 존재 확인과 `item->effect`로 값 접근을 자연스럽게 이어갈 수 있다. 필드도 `std::optional<StatusType>`으로 선언해서, 있는 경우와 없는 경우(nullopt)를 하나의 타입으로 표현할 수 있게 했다. 별도의 `None` 값을 추가하지 않아도 되는 점이 장점이다.

::: note 정리

- `optional<T>`는 "T 타입 값이 있을 수도, 없을 수도 있음"을 표현하며, `bool`/포인터로 존재 여부만 따로 다루는 것보다 값과 존재 여부를 한 번에 다룰 수 있다.
- `has_value()`(또는 `if(opt)`)로 존재 여부를 확인하고, `value()`나 `->`/`*`로 내부 값에 접근한다.
- 값이 없을 때는 `std::nullopt`를 반환한다.

:::

### 난수 생성 (random)

C++11부터는 `rand()` 대신 `<random>` 헤더의 엔진(engine) + 분포(distribution) 조합으로 난수를 만든다.

```cpp
// 난수 생성 기본 문법
엔진 rng(시드);                  // 난수 생성기(엔진) 준비
분포 dist(최소값, 최대값);        // 엔진이 뽑은 값을 원하는 범위/형태로 매핑
타입 결과 = dist(rng);            // 엔진에서 뽑아 분포에 통과시켜 최종 값을 얻음
```

**rand() (예전 방식)**

```cpp
#include <cstdlib>
#include <ctime>

srand(time(nullptr)); // 시드 설정
int r = rand() % 3;   // 0~2 범위로 억지로 나머지 연산
```

내부 알고리즘이 단순해서 패턴이 반복되기 쉽고, `% n` 방식은 n이 `RAND_MAX`의 약수가 아니면 값의 분포가 균등하지 않다.

**mt19937 + uniform_int_distribution (현재 방식)**

```cpp
#include <random>
using namespace std;

static mt19937 rng(random_device{}());   // 엔진: 한 번만 생성해서 재사용
uniform_int_distribution<int> dist(0, 2); // 분포: 0~2 범위를 균등하게 매핑

int r = dist(rng); // 실제 난수 뽑기
```

- `random_device{}()`: OS가 제공하는 난수를 한 번 뽑아 엔진의 시드로 사용
- `mt19937`: 그 시드로 초기화되는 난수 생성 엔진(메르센 트위스터). `static`으로 선언해서 함수가 호출될 때마다 새로 만들지 않고 하나만 재사용한다. (매번 새로 만들면 짧은 시간 안에 같은 시드가 나와 값이 반복될 수 있음)
- `uniform_int_distribution<int>(0, 2)`: 엔진이 뽑은 난수를 0~2 정수 범위로 균등하게 매핑해주는 분포기
- `dist(rng)`: 엔진에서 값을 하나 뽑아 분포기를 통과시켜 실제로 사용할 난수를 얻는다.

::: note 정리

- 난수를 만들려면 값을 뽑아내는 "엔진"과, 그 값을 원하는 범위/형태로 바꿔주는 "분포"가 따로 필요하다.
- `rand() % n`은 분포가 고르지 않고 예측 가능성이 높아 지양하고, `<random>`의 엔진+분포 조합을 사용하는 것이 권장된다.
- 엔진은 생성 비용이 있으므로 함수 안에서 매번 새로 만들지 않고 `static`으로 한 번만 만들어 재사용한다.

:::

## 참고

camp-09.md, camp-11.md, camp-13.md, camp-14.md
