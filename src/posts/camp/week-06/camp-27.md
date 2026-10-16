---
date: 2026-08-04
category:
  - Camp
  - Unreal
order: 3
---

# 캠프 27일차

## 프로그래머스 코테 연습

<programmers-coding :test-id="77884">

::: tabs

@tab 반복문

```cpp
#include <string>

using namespace std;

int solution(int left, int right)
{
    int answer = 0;

    for (int i = left; i <= right; i++)
    {
        int divisorCount = 0;

        for (int j = 1; j <= i; j++)
        {
            if (i % j == 0)
            {
                divisorCount++;
            }
        }

        if (divisorCount % 2 == 0)
        {
            answer += i;
        }
        else
        {
            answer -= i;
        }

    }

    return answer;
}
```

@tab 완전제곱수

이중 반복문으로 문제를 풀면 이것의 시간 복잡도는 O(n²)가 된다.
`어떤 수의 약수 개수가 홀수 이면 그 수는 완전제곱수이다.`
약수는 보통 (a, b) 쌍으로 짝지어지는데(a×b=i), a == b인 경우, 즉 i가 완전제곱수일 때만 짝이 안 맞고 하나 남아서 홀수 개가 됩니다. 예: 16의 약수는 1,2,4,8,16 → 4=4로 짝이 안 지어져서 5개(홀수)
그 수의 제곱근을 서로 곱하였을때, 그 수가 나온다면 이것은 완전제곱수(약수 개수가 홀수)이다.

```cpp
#include <cmath>

using namespace std;

int solution(int left, int right)
{
    int answer = 0;

    for (int i = left; i <= right; i++)
    {
        int sg = static_cast<int>(sqrt(i));

        if (sg * sg == i)
        {
            answer -= i;
        }
        else
        {
            answer += i;
        }
    }

    return answer;
}


```

:::

</programmers-coding>

오늘의 TIL은 첫 팀 프로젝트를 발표 준비를 해야하여.. 바빠서 TIL 작성을.... 미루기로했다...
