---
date: 2026-07-16
category:
  - Camp
  - Unreal
order: 6
---

# 캠프 15일차

## Atani 퀴즈

<AtaniQuiz :questionIds="[35, 36, 37, 38, 39]" />

## 프로그래머스 코테 연습

<programmers-coding :test-id="12947">

::: tabs

@tab vector

어제 vector를 이용해서 푸는 문제가 있었고, 기본 템플릿에 `#include <vector>`가 있어서 자연스럽게 vector를 사용했다.
vector 없이도 간단하게 가능하다..

```cpp
#include <string>
#include <vector>

using namespace std;

bool solution(int x) {
    bool answer = true;
    if(x < 10) {
        return answer;
    }

    int copyX = x;

    vector<int> v;
    while(copyX > 0) {
        v.push_back(copyX % 10);
        copyX /= 10;
    }

    int sum = 0;
    for(int i; i < v.size(); i++) {
        sum += v.at(i);
    }

    if(x % sum != 0) {
        answer = false;
    }

    return answer;
}
```

@tab 일반 코드

```cpp
#include <string>

using namespace std;

bool solution(int x) {
    bool answer = true;
    if(x < 10) {
        return answer;
    }

    int sum = 0;
    int copyX = x;

    while(copyX > 0) {
        sum += copyX % 10;
        copyX /= 10;
    }

    if(x % sum != 0) {
        answer = false;
    }

    return answer;
}
```

:::

</programmers-coding>

## C++

### 던전 탈출 텍스트 RPG

- `Player` 소유권 구조 변경 (참조 → 소유)
  - 지금까지 `Player`가 `PlayerStatus&`/`PlayerInventory&`를 참조로 들고 있고, 각 Job 생성자(`Warrior(PlayerStatus&, PlayerInventory&)`)에서 외부에서 만든 객체를 주입받는 구조였다. 참조 대신 `Player`가 `std::unique_ptr<PlayerStatus>`, `std::unique_ptr<PlayerInventory>`, `std::unique_ptr<PlayerEnhancement>`를 멤버로 직접 소유하도록 바꾸고, Job 생성자는 `Warrior(const std::string playerName)`처럼 이름만 받도록 정리했다.
  - 참조를 계속 들고 있으려면 `Player` 생성 이전에 `PlayerStatus`/`PlayerInventory`를 별도로 만들어서 넘겨줘야 했는데, 소유로 바꾸면서 `Player` 하나만 만들면 내부에서 필요한 객체를 알아서 생성한다. 대신 헤더에서 `#include` 대신 전방 선언(`class PlayerStatus;`)만 남기고 실제 include는 cpp로 내렸다.
- 경험치(EXP) / 레벨업 시스템 추가
  - `MonsterInfo`에 있던 `exp`를 `Monster::getExp()`로 노출하고, 던전에서 몬스터를 잡으면 `player->setPlayerExp(monster->getExp())`를 호출하도록 연결
  - `Player`에 `level`별로 필요한 경험치 테이블(`expTable`)을 두고, `setPlayerExp()`가 누적 경험치가 다음 레벨 요구치를 넘으면 레벨을 올리고 남은 경험치로 재귀 호출하도록 구현. 한 번에 여러 레벨을 올려도 남은 경험치가 유실되지 않는다.
- 직업별 공격 특성 분리
  - 지금까지는 모든 직업이 `monster->takeDamage(ap)` 한 번으로 동일하게 공격했는데, 궁수(`Archor`)는 공격력을 3등분해서 3번, 도적(`Thief`)은 5등분해서 5번 나눠 때리도록 바꿔 직업별로 손맛이 다르게 느껴지도록 했다.
- 레벨업 시 스탯 증가
  - 레벨업이 발생하면 `PlayerStatus::plusPlayerStatus()`로 HP +10, MP +5, 공격력 +5를 바로 반영하도록 추가. 기존 `controlPlayerStatus(st, StatModifier{...})` 호출부를 감싸는 형태로 짧게 씀
- 인벤토리에서 아이템 바로 사용하기
  - `showInventory()`가 목록만 보여주고 끝나던 걸, 번호를 입력해서 그 자리에서 포션과 같은 아이템을 사용할 수 있도록 확장. `PlayerInventory`가 `Potion*`을 들고 있다가(`setPotion()`) 사용 요청이 오면 `potion->use(itemName, count)`를 호출하는 방식
  - 숫자 입력 검증(`cin.fail()` 체크, 버퍼 비우기)이 `PlayerInventory`, `WorkshopManagement`, `PlayerEnhancement`, `PlayerStatus`, `textrpg.cpp` 등 여러 곳에서 똑같이 반복되고 있길래, `Utils/Input.h`에 템플릿 함수 `readInput<T>()` / `readRangedPair<T>()`로 만들고 전부 이걸 쓰도록 정리

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

```cpp
// Player.cpp — 재귀로 레벨업 처리, 넘친 경험치는 다음 레벨로 넘김
void Player::setPlayerExp(int addExp) {
    int sumExp = exp + addExp;
    int needExp = expTable.at(level);
    if(sumExp >= needExp) {
        std::cout << "\n*** 레벨업! ***\n";
        level++;
        exp = 0;
        setPlayerExp(sumExp - needExp);
        std::cout << "HP +10, MP +5, Attack +5\n";
        playerStatus->plusPlayerStatus(StatusType::HP, 10);
        playerStatus->plusPlayerStatus(StatusType::MP, 5);
        playerStatus->plusPlayerStatus(StatusType::AP, 5);
    } else {
        exp += addExp;
    }
}
```

```cpp
// Archor.cpp / Thief.cpp — 같은 공격력을 여러 번 나눠 때리는 방식으로 직업 특성 표현
void Archor::attack(Monster* monster) {
    std::cout << "* 활을 쏜다!\n";
    int split = 3;
    for(int i = 0; i < split; i++) {
        monster->takeDamage(playerStatus->getStatus().ap / split);
    }
}
```

```cpp
// Utils/Input.h — 여러 파일에 흩어져있던 입력 검증 로직을 템플릿으로 통합
template<typename T>
bool readInput(T& value, const std::string& errorMsg = "잘못 입력하셨습니다.") {
    std::cin >> value;
    if (std::cin.fail()) {
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        std::cout << errorMsg << "\n";
        return false;
    }
    return true;
}

template<typename T>
void readRangedPair(const std::string& prompt, T& first, T& second, T min, T max, const std::string& errorMsg) {
    while (true) {
        std::cout << prompt;
        std::cin >> first >> second;
        if (first >= min && first <= max && second >= min && second <= max) {
            break;
        }
        std::cout << errorMsg;
    }
}
```

- 참조 대신 소유로 바꾸면서 좋았던 점은 `Player`를 만드는 쪽(`textrpg.cpp`)이 더 이상 `PlayerStatus`, `PlayerInventory`를 미리 만들어서 넘겨줄 필요가 없다는 것. 다만 `unique_ptr` 멤버를 헤더에서 그대로 include 하면 순환 참조(`Player.h` ↔ `PlayerStatus.h`)가 생기기 쉬워서, 헤더는 전방 선언만 두고 실제 정의가 필요한 cpp에서만 include 하도록 신경 써야 했다.

### 소유권(Ownership)과 전방 선언

`Player`가 `PlayerStatus&`처럼 참조로 멤버를 들고 있던 구조에서는 그 객체의 생명주기를 `Player` 바깥에서 책임져야 했다. `std::unique_ptr<PlayerStatus>`로 바꾸면 `Player`가 생성될 때 `std::make_unique<PlayerStatus>()`로 직접 만들고, `Player`가 소멸할 때 자동으로 함께 정리되어 생명주기가 명확해진다.

이때 헤더 파일에서 `unique_ptr<PlayerStatus>`를 멤버로 선언하려면 `PlayerStatus`의 완전한 정의까지는 필요 없고, 타입의 존재만 알려주는 전방 선언(`class PlayerStatus;`)이면 충분하다. 완전한 정의(멤버 접근, `sizeof` 등)가 필요한 시점, 즉 실제로 `->`나 `.`으로 멤버를 쓰는 cpp 파일에서만 `#include`하면 된다.

::: note 정리

- 참조(`&`) 멤버는 대상 객체를 바깥에서 만들어 주입해야 하고, 재대입이 불가능하다. 소유(`unique_ptr`)는 대상 객체의 생성/소멸을 멤버 스스로 책임진다.
- 헤더에 실제 정의가 필요 없는 타입(포인터/참조/`unique_ptr` 멤버 선언)은 전방 선언으로 충분하며, 이렇게 하면 헤더 간 순환 include를 피하고 컴파일 의존성도 줄일 수 있다.
- 전방 선언만 있는 타입은 멤버 접근이나 `sizeof`가 필요한 지점(주로 `.cpp`)에서 반드시 완전한 정의를 include해야 한다.

:::
