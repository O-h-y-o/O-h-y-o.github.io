---
date: 2026-07-28
category:
  - Camp
  - Unreal
order: 3
---

# 캠프 22일차

## 프로그래머스 코테 연습

<programmers-coding :test-id="86051">

::: tabs

@tab 반복문

```cpp
#include <vector>

using namespace std;

int solution(vector<int> numbers) {
    int answer = 0;

    for(int i = 0; i <= 9; i ++) {
        answer += i;
    }

    for(int number : numbers) {
        answer -= number;
    }

    return answer;
}
```

@tab STL(accumulate)

```cpp
#include <vector>
#include <numeric>

using namespace std;

int solution(vector<int> numbers) {
    return 45 - accumulate(numbers.begin(), numbers.end(), 0);
}
```

:::

</programmers-coding>

오늘은 개인 과제 제출 이후, 깃 특강과 cpp 보충?을 들었다.
짧게나마 팀 회의를 진행 → 5가지 기능 중 사다리타기로 기능 구현 담당자 정함 → 내일 다시 이어서 회의 진행 예정
