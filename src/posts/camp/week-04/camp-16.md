---
date: 2026-07-20
category:
  - Camp
  - Unreal
order: 1
---

# 캠프 16일차

## Atani 퀴즈

<AtaniQuiz :questionIds="[40, 41, 42, 43, 44]" />

## 프로그래머스 코테 연습

<programmers-coding :test-id="12912">

::: tabs

@tab 등차수열(swap)

일정한 차이를 가진 수들의 합을 빠르게 계산하는 수학 공식인 등차수열로 간단하게 풀 수 있다.
a와 b의 대소관계가 정해져 있지 않기 때문에 `swap()` 을 이용하여 대소를 구분해준다.

```cpp
#include <string>
#include <vector>

using namespace std;

long long solution(int a, int b) {
    long long answer = 0;

    if (a > b) swap(a, b);

    answer = (long long)(b - a + 1) * (a + b) / 2;

    return answer;
}
```

@tab 등차수열(min,max)

min() 과 max() 를 이용해 대소를 구분해준다.

```cpp
#include <string>
#include <vector>

using namespace std;

long long solution(int a, int b) {
    long long answer = 0;

    int start = min(a, b);
    int end = max(a, b);

    answer = (long long)(end - start + 1) * (start + end) / 2;

    return answer;
}
```

@tab 반복문

반복문으로도 간단하게 풀이할 수 있지만 큰 수가 들어올 경우 비효율적이다.

```cpp
#include <string>
#include <vector>

using namespace std;

long long solution(int a, int b) {
    long long answer = 0;

    if (a > b) swap(a, b);

    for (int i = a; i <= b; i++) {
        answer += i;
    }

    return answer;
}
```

:::

</programmers-coding>

## C++

### 던전 탈출 텍스트 RPG

- CMake + Ninja 빌드 환경 추가
  - 지금까지 MSBuild/cl.exe를 직접 호출해서 빌드했는데, VSCode와 Visual Studio에서 빌드 설정이 따로 놀았다. CMakeLists.txt를 추가해 CMake 기반으로 전환하고 `.vscode/tasks.json`, `c_cpp_properties.json`도 CMake+Ninja 조합에 맞게 정리해서 여러 환경에서 같은 빌드 설정을 공유하도록 했다.
- Monster 다형성 제거, 데이터 기반으로 전환
  - 지금까지 `Goblin`/`Slime`/`Wolf`가 각각 `Monster`를 상속받아 `attack()`을 오버라이드하고 있었는데, 실제로는 출력 메시지만 다르고 로직(`player.takeDamage(ap)`)은 완전히 동일했다. `MonsterInfo`에 `attackMessage` 필드를 추가하고 `Monster::attack()`을 하나로 합쳐서, 서브클래스 3개(`Goblin`, `Slime`, `Wolf`)를 통째로 삭제했다.
  - 몬스터를 새로 추가할 때마다 클래스를 만들 필요 없이 `MonsterInfo` 데이터 한 줄만 추가하면 되도록 바뀌면서, 던전 2단계(오크, 홉고블린, 다이어울프) / 3단계(오우거, 트롤, 와이번) 몬스터를 데이터로만 추가했다.
- 포션 레시피 재료를 그룹 단위 매칭으로 변경
  - 기존 `PotionRecipe`는 `{"허브", 1}`처럼 재료 이름을 정확히 문자열로 매칭했는데, 실제 아이템 체계(몬스터 드롭템)와 안 맞았다. `MaterialGroup` enum(`Dungeon1/2/3MonsterDrop`)을 만들고 `materialGroupItems`로 그룹 → 아이템 목록을 매핑해서, "1단계 던전 몬스터 아이템 중 1종"처럼 그룹 단위로 재료를 검색/소비하도록 바꿨다.
- 포션 제작(`craftPotion`) 기능 추가
  - 연금술 공방 메뉴에 "4. 포션 제작"을 추가했다. 레시피의 각 재료 그룹마다 인벤토리에 필요 수량을 가진 아이템이 있는지 먼저 전부 확인하고, 하나라도 부족하면 제작을 취소하고, 다 있으면 그때 실제로 소비하도록 순서를 나눴다.
  - `WorkshopManagement`가 재료를 확인/소비하려면 `PlayerInventory`가 필요해서, `showWorkshopMenu()`/`ControlWorkshopMenu()`에 `PlayerInventory&`를 넘기도록 시그니처를 바꿨다.
- 던전을 클리어하고 얻은 아이템이 인벤토리가 가득 찼다며 추가가 안되길래 확인해봤더니 maxCapacity를 만들고 정작 사용해야하는 곳에는 추가를 안했었다..
  - `getTotalItemCount() < 10`처럼 하드코딩돼 있던 최대 수량을 `PlayerInventory`의 `maxCapacity` 멤버로 옮겼다.
- 던전 전투 중 인벤토리 열람 가능
  - 지금까지는 전투 턴마다 무조건 공격만 할 수 있었는데, "1. 공격 2. 인벤토리"로 선택지를 나눠서 전투 중에도 인벤토리를 확인할 수 있도록 했다.

```cpp
// Monster.h / Monster.cpp — attack()을 순수가상함수에서 일반 함수로,
// 서브클래스(Goblin/Slime/Wolf) 없이 MonsterInfo로만 동작을 결정
class Monster {
public:
    Monster(MonsterInfo mi);
    void attack(Player& player); // virtual ... = 0; 이었던 것을 단일 구현으로 교체
    // ...
};

void Monster::attack(Player& player) {
    std::cout << mi.attackMessage << "\n";
    player.takeDamage(mi.ap, mi.name);
}
```

```cpp
// MaterialInfo.h — 재료를 개별 이름이 아니라 그룹으로 묶어서 레시피에 사용
enum class MaterialGroup {
    None,
    Dungeon1MonsterDrop,
    Dungeon2MonsterDrop,
    Dungeon3MonsterDrop,
};

extern const std::map<MaterialGroup, std::vector<std::string>> materialGroupItems;
```

```cpp
// WorkshopManagement.cpp — 재료가 전부 있는지 먼저 확인한 뒤에만 소비
void WorkshopManagement::craftPotion(PlayerInventory& inventory, const std::string& potionName) {
    auto it = searchRecipeByName(potionName);
    if(it == recipes.end()) {
        std::cout << "해당 레시피를 찾을 수 없습니다.\n";
        return;
    }

    std::vector<std::pair<std::string, int>> materialsToConsume;
    for(const auto& ingredient : it->ingredients) {
        const auto& groupItems = materialGroupItems.at(ingredient.group);
        auto itemIt = std::find_if(groupItems.begin(), groupItems.end(),
            [&](const std::string& itemName) {
                auto ownedItem = inventory.getItem(itemName);
                return ownedItem && ownedItem->count >= ingredient.amount;
            });

        if(itemIt == groupItems.end()) {
            std::cout << "재료가 부족하여 " << potionName << "을(를) 제작할 수 없습니다.\n";
            return;
        }
        materialsToConsume.emplace_back(*itemIt, ingredient.amount);
    }

    for(const auto& [itemName, amount] : materialsToConsume) {
        inventory.removeItem(itemName, amount);
    }

    inventory.addItem(potionNameMap.at(potionName));
    std::cout << potionName << "을(를) 제작했습니다.\n";
}
```

- 서브클래스로 몬스터를 나누던 걸 데이터(`MonsterInfo`)로 합치면서, 재료 매칭도 문자열 하나하나 대신 그룹으로 묶는 게 자연스럽게 이어졌다. 둘 다 "종류가 늘어날수록 개별 분기/클래스를 추가하는 대신, 데이터 테이블에 항목만 추가하면 되도록" 하는 같은 방향의 리팩터링이었다.
- 지금은 포션을 제작할 때 재료가 자동으로 소모되지만, 내일은 제작하려는 포션의 개수를 입력하고 인벤토리 창을 띄워줘 재료로 사용하고 싶은 아이템을 직접 선택하여 포션을 제작하게끔 추가해야겠다.

### extern, static, .h/.cpp의 관계

오늘 `MonsterInfo`, `MaterialInfo`, `PotionInfo`를 정리하면서 전부 같은 패턴으로 바꿨다.

```cpp
// Before — MonsterInfo.h
const MonsterInfo SLIME_INFO = {"슬라임", 100, 20, 10, 30, DropItemType::DROP_ITEM_SLIME};

// After — MonsterInfo.h (선언만)
extern const MonsterInfo SLIME_INFO;

// After — MonsterInfo.cpp (정의는 여기 딱 한 번)
const MonsterInfo SLIME_INFO = {"슬라임", 100, 20, 10, 30, DropItemType::DROP_ITEM_SLIME, "슬라임이 엉겨붙습니다."};
```

**왜 헤더에 바로 정의하면 안 되는가**

C++에서 전역 `const` 변수는 기본적으로 **internal linkage**를 가진다. 그래서 `const MonsterInfo SLIME_INFO = {...}`를 헤더에 그대로 써도 링커 에러(중복 정의)는 안 난다. 대신 이 헤더를 include하는 `.cpp` 파일마다 **각자 별도의 사본**이 만들어진다. `GameManagement.cpp`가 보는 `SLIME_INFO`와 `MonsterInfo.cpp`가 보는 `SLIME_INFO`가 이름만 같을 뿐 실제로는 메모리상 다른 객체가 되는 것이다. 지금 코드에서는 값만 읽으니 당장 문제는 없지만, 데이터가 하나라는 보장이 없고 include하는 파일 수만큼 복사본이 쌓인다.

::: tip linkage(연결 속성)

`linkage`는 같은 이름이 서로 다른 번역 단위(translation unit, 대략 `.cpp` 파일 하나가 컴파일되는 단위)에서 **같은 실체를 가리키는지**를 결정하는 속성이다.

- **external linkage**: 이 이름은 프로그램 전체에서 하나의 실체를 가리킨다. 다른 `.cpp`에서도 `extern` 선언으로 같은 대상을 참조할 수 있다. 일반 함수, `extern` 변수, 클래스의 정적 멤버 등이 기본적으로 이 속성을 가진다.
- **internal linkage**: 이 이름은 **자신이 정의된 파일(번역 단위) 안에서만** 유효하다. 다른 `.cpp`에서 같은 이름을 써도 완전히 다른 실체다. 전역 `const`/`constexpr` 변수, `static` 전역 변수/함수, 익명 네임스페이스 안의 모든 것이 기본적으로 이 속성을 가진다.
- **no linkage**: 함수 내부의 지역 변수처럼 다른 파일은커녕 함수 밖에서도 그 이름 자체를 알 수 없는 경우.

오늘 다룬 사례로 보면, 헤더에 그대로 쓴 `const MonsterInfo SLIME_INFO = {...}`는 internal linkage라서 include한 `.cpp`마다 이름은 같지만 서로 다른 객체가 각각 만들어진다. 여기에 `extern`을 붙이면 external linkage로 바뀌어서, "이 이름의 실체는 프로그램 전체에 단 하나"라는 게 보장되고 그 실체를 `.cpp`에 딱 한 번만 정의해주면 된다.

:::

`extern`은 "이 이름을 가진 객체가 어딘가에 (단 하나) 정의되어 있다"는 걸 컴파일러에게 알려주는 **선언**이다. 실제 메모리를 할당하는 **정의**는 `extern` 없이 값을 채워서 딱 한 파일(`MonsterInfo.cpp`)에만 둔다. 이렇게 하면 헤더를 몇 군데서 include하든 실체는 하나뿐이고, 모든 `.cpp`가 링크 단계에서 같은 주소를 가리키게 된다.

**static은 반대 방향**

`extern`이 "이건 외부에 있는 하나의 실체를 가리킨다"(external linkage)라면, `static`(전역/네임스페이스 범위에서)은 "이건 이 파일 안에서만 존재한다"(internal linkage)는 선언이다. 오늘 건드리진 않았지만 `GameManagement.cpp`의 `spawnMonster`처럼 **이 파일에서만 쓰는 헬퍼**는 익명 네임스페이스(`namespace { ... }`)로 감싸서 사실상 `static`과 같은 효과(다른 `.cpp`의 동일한 이름과 충돌하지 않음)를 내고 있다. 반대로 `WorkshopManagement.cpp`의 `printRecipe`처럼 헤더에 선언 없이 `.cpp`에만 있는 함수는 기본이 external linkage라, 나중에 다른 파일에 같은 이름의 전역 함수가 생기면 충돌할 수 있다 — 이런 "이 파일 전용" 함수들은 `static`이나 익명 네임스페이스로 명시해주는 게 안전하다.

**.h와 .cpp는 "선언 대 정의"로 나뉜 한 몸**

헤더(`.h`)는 "이런 타입/함수/변수가 존재한다"는 **선언**만 모아두고, 실제 내용(함수 몸통, 변수 초기값)인 **정의**는 `.cpp` 한 곳에만 둔다는 원칙(One Definition Rule, ODR)이 오늘 리팩터링(일부만이지만)을 한 이유였다. 헤더는 여러 `.cpp`에서 몇 번이고 include될 수 있지만, 정의는 프로그램 전체에서 딱 한 번만 있어야 한다. 그래서,

- 클래스/함수 시그니처, `extern` 변수 선언 → `.h`
- 실제 로직, 변수 초기값 → `.cpp`

로 나누는 것이고, 이렇게 짝지어진 `.h`/`.cpp`는 사실상 하나의 컴포넌트를 "외부에 보여줄 것"과 "내부 구현"으로 나눠 놓은 것에 가깝다. `WorkshopManagement.h`에 `class PlayerInventory;` 전방 선언만 두고 실제 include는 `.cpp`에서 하는 것도 같은 맥락 — 헤더는 "필요한 만큼만" 알려주고, 진짜 구현은 `.cpp`가 책임진다.

::: note 정리

- 전역 `const` 변수/객체를 헤더에 바로 정의하면 include할 때마다 별도 사본이 생긴다(internal linkage). 실체를 하나로 유지하려면 헤더엔 `extern` 선언만, 정의는 `.cpp` 한 곳에.
- `static`(또는 익명 네임스페이스)은 그 반대 — 이 파일 밖으로 이름이 노출되지 않게 막아서, 다른 `.cpp`의 같은 이름과 충돌하지 않도록 한다.
- `.h`는 "무엇이 있는지"(선언), `.cpp`는 "어떻게 동작하는지"(정의)를 담당한다. 하나의 이름은 선언은 여러 번 가능하지만 정의는 프로그램 전체에서 단 한 번(ODR)이어야 한다.

:::
