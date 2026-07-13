---
date: 2026-07-13
category:
  - Camp
  - Unreal
order: 3
---

# 캠프 12일차

## Atani 퀴즈

<AtaniQuiz :questionIds="[20, 21, 22, 23, 24]" />

## 프로그래머스 코테 연습

<programmers-coding :test-id="12925" >

::: tabs

@tab stoi

atoi 도 있지만 오래된 방식이라 stoi를 쓰자

```cpp
#include <string>
using namespace std;

int solution(string s) {
    int answer = 0;
    answer = stoi(s);
    return answer;
}
```

@tab stringstream

```cpp
#include <string>
#include <sstream>
using namespace std;

int solution(string s) {
    int answer = 0;
    stringstream ss(s);
    ss >> answer;
    return answer;
}
```

:::

</programmers-coding>

## C++

### 코드 연습

#### 던전 탈출 텍스트 RPG

콘솔에서 이름을 입력하고 능력치를 설정한 뒤, 직업을 선택해 슬라임과 전투를 벌이는 텍스트 RPG를 클래스 기반으로 설계

**역할 정리**

- `Types.h`: `StatusType`(HP/MP/AP/DP), `JobType`(전직 종류) 같은 공용 `enum class`와 `Status`/`Item`/`StatModifier` 구조체, 문자열 변환 함수들을 모아둔 공통 헤더
  - `StatOperator`: `variant<plus<int>, multiplies<int>, minus<int>>`로 "더하기/곱하기/빼기" 연산 자체를 값처럼 담아서 넘길 수 있게 함
  - `statusMap`: `StatusType` → `Status`의 멤버 포인터(`int Status::*`)를 매핑해, 어떤 스탯이든 하나의 함수로 조회/수정할 수 있게 함
- `HeroStatus`: 용사의 이름과 `Status`(HP/MP/AP/DP)를 들고 있는 클래스
  - `inputHeroStatus(istream&)`: 조건(HP·MP ≥ 50, 공격력·방어력 ≥ 20)을 만족할 때까지 반복 입력받음
  - `controlHeroStatus(StatusType, StatModifier)`: `statusMap`으로 멤버 포인터를 얻고, `variant`에 담긴 연산자를 `visit`으로 실행해 해당 스탯만 증감시킴
- `HeroItem`: 포션 등 아이템을 `map<string, Item>`으로 관리
  - `canUsePotion`/`usePotion`/`getPotionEffect`: 포션 보유 수량 확인, 소모, 회복량 조회
  - `setItem`: 인벤토리 총 수량이 10개 미만일 때만 아이템 추가
- `HeroEnhancement`(`GameManagement` 상속): 전투 전 강화 메뉴를 반복 출력
  - HP/MP 포션 사용, 공격력/방어력 2배 증가, 현재 능력치 확인, `0`을 입력하면 `gameStart()`를 호출하고 메뉴 종료
- `Player`(추상 클래스): 모든 직업의 공통 동작을 정의
  - `attack(Monster*)`: 직업마다 다르게 구현해야 하는 순수 가상 함수
  - `takeDamage(int, string)`: 받은 데미지에서 방어력을 뺀 값(최소 1)만큼 HP 감소
  - `Warrior`/`Mage`/`Thief`/`Archor`: `Player`를 상속받아 전직 시 각각 HP/MP/공격력/방어력을 30 증가시키고, `attack()`에서 직업별 대사와 함께 공격력만큼 몬스터에게 데미지를 줌
- `Monster`(추상 클래스) / `Slime`: `Player`와 대칭 구조로, `MonsterInfo`(이름·HP·공격력·방어력·드랍 아이템)를 들고 `attack(Player*)`과 `takeDamage(int)`를 제공
- `GameManagement`: `enterDungeon(Player*, Monster*)`에서 플레이어 HP와 몬스터 HP가 모두 0보다 큰 동안 턴을 번갈아가며 `attack()`을 호출하는 전투 루프를 담당
- `main` (`textrpg.cpp`): 이름 입력 → 능력치 입력 → 강화 → 전직 → (전투) → 승패 출력까지 전체 흐름을 순서대로 호출

```cpp
// Types.h — 공용 enum·구조체·연산자
enum class StatusType { HP, MP, AP, DP };
enum class JobType { Warrior, Mage, Thief, Archor };

using StatOperator = variant<plus<int>, multiplies<int>, minus<int>>;

struct Status { int hp, mp, ap, dp; };
struct Item { string itemName; int count; int effect; int price; };
struct StatModifier { StatOperator oper; int value; };

static const map<StatusType, int Status::*> statusMap = {
    {StatusType::HP, &Status::hp},
    {StatusType::MP, &Status::mp},
    {StatusType::AP, &Status::ap},
    {StatusType::DP, &Status::dp},
};
```

```cpp
// HeroStatus.cpp — 멤버 포인터 + variant로 스탯을 범용적으로 증감
void HeroStatus::controlHeroStatus(StatusType st, const StatModifier& modi) {
    int Status::*statusType = statusMap.at(st);
    int before = stat.*statusType;
    int after = visit([&](auto&& op) { return op(stat.*statusType, modi.value); }, modi.oper);
    stat.*statusType = after;
    int diff = after - before;
    cout << "* " << statusTypeToString(st) << "가 " << abs(diff);
    cout << (diff > 0 ? " 증가했습니다." : " 감소했습니다.");
    cout << " 현재 체력: " << after << "\n";
}
```

```cpp
// Player.h / Warrior.h, cpp — 추상 클래스와 직업 구현
class Player {
protected:
    HeroStatus& heroStatus;
    HeroItem& heroItem;
    JobType job;
    int level;

public:
    Player(HeroStatus& hs, HeroItem& hi, JobType job) : heroStatus(hs), heroItem(hi), job(job), level(1) {};
    virtual ~Player() {};

    virtual void attack(Monster* monster) = 0;
    void takeDamage(int damage, string monsterName);
};

class Warrior : public Player {
public:
    Warrior(HeroStatus& hs, HeroItem& hi);
    void attack(Monster* monster) override;
};

Warrior::Warrior(HeroStatus& hs, HeroItem& hi) : Player(hs, hi, JobType::Warrior) {
    cout << "* 전사로 전직하였습니다. (HP + 30)\n";
    StatModifier plusHP{plus<int>(), 30};
    heroStatus.controlHeroStatus(StatusType::HP, plusHP);
}

void Warrior::attack(Monster* monster) {
    cout << "* 검을 휘두른다!\n";
    monster->takeDamage(heroStatus.getStat().ap);
}
```

```cpp
// GameManagement.cpp — 턴제 전투 루프
void GameManagement::enterDungeon(Player* player, Monster* monster) {
    while(player->getPlayerStatus().getStat().hp > 0 && monster->getHP() > 0) {
        cout << "--- 플레이어 턴 ---\n";
        player->attack(monster);

        if(monster->getHP() > 0) {
            cout << "--- 몬스터 턴 ---\n";
            monster->attack(player);
        }
    }
}
```

- `Player`/`Monster`를 각각 추상 클래스로 두고 `attack()`을 순수 가상 함수로 선언해, 직업·몬스터 종류가 늘어나도 `GameManagement`의 전투 루프 코드는 수정할 필요가 없게 만들었다.
- 스탯 증감(`controlHeroStatus`)을 `StatusType`과 `StatOperator`(변경 연산 자체)로 매개변수화해서, "어떤 스탯을 얼마나, 어떻게 바꿀지"를 호출부에서 조합만 하면 되도록 만들었다. 이후 새로운 연산(예: 나누기)이 추가돼도 `variant`에 타입만 더하면 된다.
- 전투 루프(`enterDungeon`)는 아직 `main`에서 직접 호출되지 않아서 내일 `HeroEnhancement`처럼 던전 진입 메뉴와 연결하는 작업부터 시작할 예정
- 확장성에 초점을 두고 코드를 짜서그런지.. 현재의 나에겐 되려 굉장히 복잡하게 느껴진다. 하나 추가할때마다 어질어질하다. 코드가 잘 짜여지게 하려다보니 진도가 너무 안나가는 느낌.. 우선은 기능이 잘 동작하게끔만 만들어놓고, 추후에 리팩토링을 하는게 좋을 것 같다.
