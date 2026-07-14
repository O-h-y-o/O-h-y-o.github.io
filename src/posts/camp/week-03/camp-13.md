---
date: 2026-07-14
category:
  - Camp
  - Unreal
order: 4
---

# 캠프 13일차

## Atani 퀴즈

<AtaniQuiz :questionIds="[25, 26, 27, 28, 29]" />

## 프로그래머스 코테 연습

<programmers-coding :test-id="12934">

::: tabs

@tab 반복문

```cpp
long long solution(long long n) {
    for (long long i = 1; i * i <= n; i++) {
        if (i * i == n) {
            return (i + 1) * (i + 1);
        }
    }
    return -1;
}
```

@tab sqrt()

```cpp
#include <cmath>

long long solution(long long n) {
    long long root = (long long) sqrt(n);
    if (root * root == n) {
        return (root + 1) * (root + 1);
    }
    return -1;
}

```

:::

</programmers-coding>

## C++

### 코드 연습

#### 던전 탈출 텍스트 RPG (이어서)

**어제 대비 변경/추가된 것**

- 이름 정리
  - `HeroStatus`→`PlayerStatus`, `HeroItem`→`PlayerInventory`, `HeroEnhancement`→`PlayerEnhancement`로 리네이밍
  - `PlayerEnhancement`는 `GameManagement`를 상속하던 구조에서 참조로 들고 있는 구조로 변경 (상속 대신 조합)
- 어제 미완성이었던 던전 전투 루프를 실제 게임 흐름에 연결
  - `GameManagement`에 `showMainMenu`/`ControlMainMenu`/`dungeon()`을 추가해 메인 메뉴(던전 입장 / 인벤토리 확인 / 포션 제작소 입장 / 게임 종료)에서 던전 진입까지 이어지도록 함
- 몬스터 종류 확장
  - `Goblin`, `Wolf`를 `Slime`과 같은 구조로 추가하고, `MonsterInfo`에 각 몬스터의 드랍 아이템 정보를 `SLIME_INFO`/`GOBLIN_INFO`/`WOLF_INFO` 상수로 정리. 던전 입장 시 `<random>`(`mt19937`)으로 셋 중 하나를 랜덤 선택
- `Monster`에 `getDropItem()`을 추가해 처치 시 드랍 아이템 이름·가격을 반환하도록 하고, `Player::obtainItem()`으로 그 아이템을 인벤토리에 저장
- 포션 제작소(`AlchemyWorkshop`) 모듈 생성
  - `PotionRecipe.h`: 포션 이름과 필요 재료(`Ingredients`) 목록을 담은 레시피 데이터
  - `WorkshopManagement`: 전체 레시피 보기 / 이름으로 검색(`find_if`) / 재료로 검색(`copy_if`) 기능 제공

```cpp
// GameManagement.cpp — 던전 입장
void GameManagement::dungeon() {
    unique_ptr<Monster> monster;
    static mt19937 rng(random_device{}());
    uniform_int_distribution<int> dist(0, 2);
    int r = dist(rng);
    switch (r) {
        case 0: monster = make_unique<Goblin>(GOBLIN_INFO); break;
        case 1: monster = make_unique<Slime>(SLIME_INFO); break;
        case 2: monster = make_unique<Wolf>(WOLF_INFO); break;
    }

    while(player->getPlayerStatus().getStatus().hp > 0 && monster->getHP() > 0) {
        player->attack(monster.get());
        if(monster->getHP() > 0) monster->attack(player);
    }

    if(player->getPlayerStatus().getStatus().hp > 0) {
        pair<string, int> monsterItem = monster->getDropItem();
        player->obtainItem({monsterItem.first, 1, 0, monsterItem.second});
    } else {
        gameEnd();
    }
}
```

```cpp
// WorkshopManagement.cpp — 레시피 이름/재료 검색
void WorkshopManagement::searchRecipeByIngredient(string target) {
    vector<PotionRecipe> copy;
    copy_if(recipes.begin(), recipes.end(), back_inserter(copy),
        [&](const PotionRecipe& recipe) {
            for(auto& ingredient : recipe.ingredients) {
                if(ingredient.name == target) return true;
            }
            return false;
        }
    );

    if(copy.size() > 0) {
        for(auto& recipe : copy) printRecipe(recipe);
    } else {
        cout << "\n해당 재료를 사용하는 레시피를 찾을 수 없습니다.\n\n";
    }
}
```

- 확장성에 투자한 설계가 실제로 효과를 보기 시작한 느낌이 조금씩 들었던 날인 것 같 다!!
- 다만 `Item`/`Potion` 쪽은 아직 손을 못 대서 빈 파일로만 남아있다.(머리아파서 오늘은 그만) 인벤토리가 `map<string, InventoryItem>` 기반 데이터 구조로만 동작 중이라 `Item::use()` 다형성과 어떻게 연결할지는 고민해봐야겠다.

### 난수 생성 (random)

C++11부터는 `rand()` 대신 `<random>` 헤더의 엔진(engine) + 분포(distribution) 조합으로 난수를 만든다.
던전 입장 시 몬스터 셋 중 하나를 고르는 데 사용했다.

```cpp
// 난수 생성 기본 문법
엔진 rng(시드);                  // 난수 생성기(엔진) 준비
분포 dist(최소값, 최대값);        // 엔진이 뽑은 값을 원하는 범위/형태로 매핑
타입 결과 = dist(rng);            // 엔진에서 뽑아 분포에 통과시켜 최종 값을 얻음
```

::: tabs

@tab rand() (예전 방식)

```cpp
#include <cstdlib>
#include <ctime>

srand(time(nullptr)); // 시드 설정
int r = rand() % 3;   // 0~2 범위로 억지로 나머지 연산
```

- 내부 알고리즘이 단순해서 패턴이 반복되기 쉽고, `% n` 방식은 n이 `RAND_MAX`의 약수가 아니면 값의 분포가 균등하지 않다.

@tab mt19937 + uniform_int_distribution (현재 방식)

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

:::

::: note 정리

- 난수를 만들려면 값을 뽑아내는 "엔진"과, 그 값을 원하는 범위/형태로 바꿔주는 "분포"가 따로 필요하다.
- `rand() % n`은 분포가 고르지 않고 예측 가능성이 높아 지양하고, `<random>`의 엔진+분포 조합을 사용하는 것이 권장된다.
- 엔진은 생성 비용이 있으므로 함수 안에서 매번 새로 만들지 않고 `static`으로 한 번만 만들어 재사용한다.

:::

### find_if / copy_if

`<algorithm>` 헤더의 함수로, 조건에 맞는 원소를 컨테이너에서 찾아준다는 점은 같지만 "하나만 찾을지" "전부 찾을지"에서 차이가 있다.
포션 제작소의 레시피 검색 기능(이름으로 검색 / 재료로 검색)에 각각 사용했다.

::: tabs

@tab find_if

조건에 맞는 첫 원소 하나

```cpp
auto it = find_if(recipes.begin(), recipes.end(),
    [&](const PotionRecipe& recipe) { return recipe.name == target; });

if (it == recipes.end()) {
    cout << "해당 레시피를 찾을 수 없습니다.\n";
} else {
    printRecipe(*it); // 찾은 원소는 iterator이므로 역참조(*it) 해서 사용
}
```

- 범위 `[begin, end)` 안에서 조건을 처음으로 만족하는 원소 하나의 위치(iterator)를 반환한다.
- 못 찾으면 `end()`를 반환하므로, 반환값을 `end()`와 비교해 존재 여부를 판단한다.
- 레시피 이름은 유일하다고 가정할 수 있어 "하나만" 찾으면 되는 `find_if`가 적합하다.

@tab copy_if

조건에 맞는 원소 전부

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

- 범위 안에서 조건을 만족하는 원소를 "전부" 골라 목적지 컨테이너로 복사한다.
- 목적지 자리에 `back_inserter(copy)`를 넘기면, 조건을 만족할 때마다 `copy`의 크기를 미리 정해두지 않아도 알아서 뒤에 `push_back`된다.
- 하나의 재료가 여러 레시피에 쓰일 수 있으므로, 결과가 여러 개일 수 있는 이 검색에는 `find_if`가 아니라 `copy_if`가 필요하다.

:::

::: note 정리

- `find_if`는 조건을 만족하는 첫 원소 하나의 iterator를 반환하고, 결과가 유일하거나 하나만 있으면 충분할 때 사용한다.
- `copy_if`는 조건을 만족하는 원소를 전부 다른 컨테이너로 복사하며, 결과가 여러 개일 수 있을 때 사용한다.
- `copy_if`의 목적지에는 `back_inserter`를 넘겨서 컨테이너 크기를 미리 계산하지 않고도 안전하게 채워 넣을 수 있다.

:::
