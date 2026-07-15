---
date: 2026-07-15
category:
  - Camp
  - Unreal
order: 5
---

# 캠프 14일차

## Atani 퀴즈

<AtaniQuiz :questionIds="[30, 31, 32, 33, 34]" />

## 프로그래머스 코테 연습

<programmers-coding :test-id="12933">

::: tabs

@tab 문자열/stoll

문자열로 변환 후 greater<char> 로 내림차순 정렬을 하고 stoll() 로 변환

```cpp
#include <string>
#include <algorithm>

using namespace std;

long long solution(long long n) {
    long long answer = 0;
    string s = to_string(n);
    sort(s.begin(), s.end(), greater<char>());
    answer = stoll(s);

    return answer;
}
```

@tab priority_queue

우선순위 큐(priority_queue)를 이용해 자동정렬

```cpp
#include <queue>

long long solution(long long n) {
    std::priority_queue<int> pq;

    while (n > 0) {
        pq.push(n % 10);
        n /= 10;
    }

    long long answer = 0;
    while (!pq.empty()) {
        answer = answer * 10 + pq.top();
        pq.pop();
    }

    return answer;
}
```

@tab vector

우선순위 큐로 하는 방식과 같다. 다만 자동정렬이 안되기때문에 algorithm의 sort()를 사용한다.

```cpp
#include <vector>
#include <algorithm>

long long solution(long long n) {
    std::vector<int> digits;

    while (n > 0) {
        digits.push_back(n % 10);
        n /= 10;
    }

    std::sort(digits.begin(), digits.end(), std::greater<int>());

    long long answer = 0;
    for (int d : digits) {
        answer = answer * 10 + d;
    }

    return answer;
}
```

:::

</programmers-coding>

## C++

### 코드 연습

#### 던전 탈출 텍스트 RPG (이어서)

- 전역 `using namespace std;` 제거
  - 모든 헤더/소스에서 `using namespace std;`를 지우고 `std::string`, `std::cout`처럼 명시적으로 적도록 정리. 헤더에 `using namespace std;`가 있으면 그 헤더를 include하는 모든 파일에 전역으로 퍼지기 때문에, 파일 수가 늘어난 지금 시점에 미리 정리해두었다.
- `Item`/`Potion` 다형성 실제 연결
  - 어제 미완성으로 남겨뒀던 부분. `Item`이 `PlayerInventory&`, `PlayerStatus&`를 참조로 들고 있도록 하고, `Potion`이 이를 상속받아 `use(itemName, count)`에서 인벤토리 소모 + 스탯 회복을 함께 처리하도록 구현
  - `PlayerEnhancement`에서 `canUsePotion`/`usePotion`/`getPotionEffect`로 나뉘어 있던 로직을 지우고 `potion.use(...)` 호출 하나로 대체
- 아이템 종류 확장을 위한 자료구조 정리
  - `InventoryItem`에 `itemCategory`(포션/재료 구분)와 `optional<StatusType> status`(회복시킬 스탯, 재료류는 없으므로 `nullopt`)를 추가
  - `Item/Potion/PotionInfo.h`: HP/MP 소형·중형 포션, AP/DP 소형 포션을 상수로 정의
  - `Item/Material/MaterialInfo.h`: 몬스터 드랍템(끈적한 젤리/고블린 가죽/늑대 가죽)을 `DropItemType` → `InventoryItem` 맵(`dropItemMap`)으로 정의해, `Monster::getDropItem()`이 `pair<string, int>` 대신 `InventoryItem`을 바로 반환하도록 변경
- `PlayerInventory` 리팩터링
  - `addInventory` → `addItem`으로 이름 정리, `getItem(name)`이 `optional<InventoryItem>`을 반환하도록 해서 존재 여부 확인과 값 조회를 한 번에 처리
  - `removeItem(name, count)` 추가. 성공/수량 부족/아이템 없음을 `ErrorCodes.h`에 새로 정의한 `RemoveItemResult` enum으로 구분해서 반환
  - 인벤토리 최대 용량을 매직넘버 `10`으로 박아두던 것을 `maxCapacity` 멤버(현재 20)로 분리

```cpp
// Item.h / Potion.h — Item을 상속받아 실제 아이템 사용 로직 구현
class Item {
protected:
    PlayerInventory& inventory;
    PlayerStatus& status;

public:
    Item(PlayerInventory& inventory, PlayerStatus& status);
    virtual ~Item() = default;
};

class Potion : public Item {
public:
    Potion(PlayerInventory& inventory, PlayerStatus& status);
    void use(const std::string& itemName, const int& count);
};
```

```cpp
// Potion.cpp — RemoveItemResult로 분기해서 소모 + 회복을 함께 처리
void Potion::use(const std::string& itemName, const int& count) {
    std::cout << "포션을 사용합니다.\n";
    RemoveItemResult result = inventory.removeItem(itemName, count);
    switch (result) {
        case RemoveItemResult::Success : {
            auto item = inventory.getItem(itemName);
            if(item->status.has_value()) {
                StatModifier p{std::plus<int>(), (item->effect) * count};
                status.controlPlayerStatus(item->status.value(), p);
            }
            break;
        }
        case RemoveItemResult::InsufficientCount :
            std::cout << "입력한 값이 보유 수량보다 큽니다.\n";
            break;
        case RemoveItemResult::NotFound :
            std::cout << "해당 아이템은 인벤토리에 없습니다.\n";
            break;
        default:
            break;
    }
}
```

- 어제 걱정했던 "인벤토리가 `map<string, InventoryItem>` 기반 데이터로만 동작하는데 `Item::use()` 다형성과 어떻게 연결할지" 문제는, `Item`이 인벤토리/스탯 참조를 직접 들고 있게 하는 방식으로 풀었다. `Potion` 입장에서는 그냥 자기 재료(포션 이름)로 인벤토리에서 빼고, 빠지는 데 성공하면 자기 효과만큼 스탯을 올리면 되니 생각보다 깔끔하게 연결됐다.
- 다만 `Material`은 아직 빈 클래스로만 만들어둔 상태라, 재료 아이템에 실제로 무슨 동작을 붙일지는 다음에 더 생각해봐야 할 듯

### std::optional

값이 "있을 수도, 없을 수도" 있는 상황을 표현하는 타입으로, `PlayerInventory::getItem()`처럼 아이템이 인벤토리에 있는지 없는지 모르는 상태에서 조회할 때 사용했다.

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

- 반환값을 그냥 `bool`(존재 여부)로 주거나 포인터로 줄 수도 있지만, `optional`을 쓰면 "값이 있으면 그 값 자체, 없으면 `nullopt`"를 하나의 타입으로 표현할 수 있어서 호출부에서 `if(item)`으로 존재 확인과 `item->effect`로 값 접근을 자연스럽게 이어갈 수 있다.
- `InventoryItem`의 `status` 필드도 `std::optional<StatusType>`으로 선언해서, 포션류는 회복시킬 스탯을 담고 재료류는 `nullopt`로 비워둘 수 있게 했다. 재료를 위해 `StatusType`에 별도의 `None` 값을 추가하지 않아도 되는 점이 마음에 들었다.

::: note 정리

- `optional<T>`는 "T 타입 값이 있을 수도, 없을 수도 있음"을 표현하며, `bool`/포인터로 존재 여부만 따로 다루는 것보다 값과 존재 여부를 한 번에 다룰 수 있다.
- `has_value()`(또는 `if(opt)`)로 존재 여부를 확인하고, `value()`나 `->`/`*`로 내부 값에 접근한다.
- 값이 없을 때는 `std::nullopt`를 반환한다.

:::
