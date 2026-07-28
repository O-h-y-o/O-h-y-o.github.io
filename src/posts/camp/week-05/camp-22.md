---
date: 2026-07-28
category:
  - Camp
  - Unreal
order: 3
---

# 캠프 21일차

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
