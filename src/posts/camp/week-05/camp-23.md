---
date: 2026-07-29
category:
  - Camp
  - Unreal
order: 4
---

# 캠프 23일차

## 프로그래머스 코테 연습

<programmers-coding :test-id="12935">

::: tabs

@tab min_element + erase

최소값과 그 최소값의 index를 구해 erase를 진행

```cpp
#include <vector>
#include <algorithm>
#include <iterator>

using namespace std;

vector<int> solution(vector<int> arr) {
    auto it = min_element(arr.begin(), arr.end());
    int minIndex = distance(arr.begin(), it);

    arr.erase(arr.begin() + minIndex);
    if(arr.empty()) arr.push_back(-1);
    return arr;
}
```

@tab 더 간결하게

erase는 index가 아니라 반복자를 받는다.
min_element는 반복자를 반환하기 때문에 erase에 바로 넘기면 distance로 index를 구하는게 의미없어진다.

```cpp
#include <vector>
#include <algorithm>
#include <iterator>

using namespace std;

vector<int> solution(vector<int> arr) {
    arr.erase(min_element(arr.begin(), arr.end()));
    if (arr.empty()) arr.push_back(-1);
    return arr;
}
```

:::

</programmers-coding>

긴 시간 동안 팀 회의로 컨벤션 및 클래스 설계를 진행했다.
내가 맡기로한 레벨업 기능이 플레이어로 합쳐져서 붕 떠버렸기 때문에 남는 단순한 기능인 로그 출력 기능을 맡았다.

```cpp
// RpgLogger.h
#pragma once
#include <map>
#include <queue>
#include <string>

// 임시로 작성, 추후에 다른 파일에서 가져오기
namespace Test
{
enum class EMonsterID;
extern std::map<EMonsterID, std::string> convertMonsterString;
}  // namespace Test


class RpgLogger
{
   public:
    // Queue에 쌓인 전체 로그 출력
    void ShowLogs() const;

    // 킬 로그 출력
    void ShowKillLogs() const;

    // Queue에 로그 추가(10개 까지), 해당 로그 바로 출력
    void AddLog(std::string log);

    // 몬스터를 처치했을 때 호출, 킬카운트 증가
    void OnMonsterKilled(Test::EMonsterID id);

   private:
    static constexpr size_t MAX_SIZE = 10;
    std::queue<std::string> logs;
    std::map<Test::EMonsterID, int> killCounts;
};

void TestRpgLogger();
```

```cpp
// RpgLogger.cpp
#include "RpgLogger.h"

#include <iostream>

// 임시 작성
namespace Test
{
enum class EMonsterID
{
    NONE,
    GOBLIN,
    ORC
};
std::map<EMonsterID, std::string> convertMonsterString = {
    {EMonsterID::NONE, "NONE"}, {EMonsterID::GOBLIN, "GOBLIN"}, {EMonsterID::ORC, "ORK"}};
}  // namespace Test

void RpgLogger::ShowLogs() const
{
    std::cout << "------------- Recent Logs -------------" << std::endl;

    auto QueueCopy = logs;
    while (!QueueCopy.empty())
    {
        std::cout << QueueCopy.front() << "\n";
        QueueCopy.pop();
    }

    std::cout << "---------------------------------------" << std::endl;
}

void RpgLogger::ShowKillLogs() const
{
    std::cout << "------------- Monster Kill Count -------------" << std::endl;

    for (auto& [key, value] : killCounts)
    {
        std::cout << Test::convertMonsterString.at(key) << "을 " << value << "마리 처치하였습니다." << std::endl;
    }

    std::cout << "----------------------------------------------" << std::endl;
}

void RpgLogger::AddLog(std::string log)
{
    logs.push(log);

    if (logs.size() > MAX_SIZE)
    {
        logs.pop();
    }

    std::cout << log << std::endl;
}

void RpgLogger::OnMonsterKilled(Test::EMonsterID id)
{
    killCounts[id]++;
}

void TestRpgLogger()
{
    RpgLogger logger;
    logger.AddLog("캐릭터를 생성했어요!");
    logger.AddLog("고블린 몬스터가 등장했어요!");
    logger.AddLog("플레이어가 몬스터를 공격합니다!");
    logger.AddLog("몬스터가 플레이어를 공격합니다!");
    logger.AddLog("플레이어가 몬스터를 공격합니다!");
    logger.AddLog("몬스터가 플레이어를 공격합니다!");
    logger.AddLog("플레이어가 몬스터를 공격합니다!");
    logger.AddLog("플레이어가 몬스터를 처치했습니다~!!");
    logger.OnMonsterKilled(Test::EMonsterID::GOBLIN);

    logger.ShowLogs();

    logger.ShowKillLogs();

    for (int i = 0; i < 15; i++)
    {
        logger.AddLog(std::to_string(i) + "번째 로그");
    }

    logger.ShowLogs();
}
```

이 코드들처럼 임시 테스트 코드를 작성해두었다.
