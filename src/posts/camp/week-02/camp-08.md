---
date: 2026-07-07
category:
  - Camp
  - Unreal
order: 4
---

# 캠프 8일차

## Atani

::: tabs

@tab 문제1

<AtaniQuiz :questionId="0" />

@tab 문제2

<AtaniQuiz :questionId="1" />

:::

## 프로그래머스 코딩테스트 연습

<ProgrammersCoding :test-id="12928">

::: tabs

@tab 풀이1

입력받은 n 에서 `n % i = 0` 을 통해 약수인지 판별해준다.
n을 i로 나누었을때 나머지가 0이 아니라면 약수가 아니다.
반복문으로 n 이하의 값에서 약수를 모두 찾아서, 약수면 answer에 더해주었다.

```cpp
int solution(int n) {
    int answer = 0;

    for (int i = 1; i <= n; i++) {
        if(n % i == 0) {
            answer += i;
        };
    };

    return answer;
}
```

@tab 풀이2

풀이1은 n 이하의 모든 수를 반복해야 하기 때문에 성능면에서 비효율적이게 된다.
약수는 항상 짝으로 존재하기 때문에, 작은 수 i를 찾으면 큰 수 `n / i` 도 자동으로 약수임을 알 수 있다.
n이 20이라고 했을때, `i <= n` 은 20번의 반복을 하게 되는데, 조건식을 `i * i <= n` 로 변경하면 `1, 2, 3, 4` 총 4번으로 줄어들어 효율이 좋아진다.

```cpp
int solution(int n) {
    int answer = 0;
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            answer += i;
            if (i != n / i) answer += n / i;
        }
    }
    return answer;
}

```

@tab 풀이3

c++에서 vector는 처음보고, 해당 문제에서 이 문제풀이는 필요하진 않지만, 몇 가지 이점이 있다고해서 가지고 왔다.

1. 약수 목록을 직접 확인하고 싶을 때
   - 문제에서 “약수들을 출력하라” 같은 요구가 있을 때
   - 벡터에 저장해두면 cout으로 바로 찍을 수 있음
2. 약수들을 다른 계산에 활용할 때
   - 단순히 합만 구하는 게 아니라, 약수들의 개수, 최대/최소, 특정 조건에 맞는 약수 등을 찾을 때
   - 벡터에 모아두면 재활용 가능
3. 디버깅이나 학습용
   - 처음 배우는 단계에서는 “약수가 제대로 구해졌는지” 눈으로 확인하기 위해 벡터에 담아두는 게 직관적

```cpp

#include <vector>
using namespace std;

int solution(int n) {
    vector<int> divisors;

    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            divisors.push_back(i);
            if (i != n / i) {
                divisors.push_back(n / i);
            }
        }
    }

    int answer = 0;
    for (int d : divisors) {
        answer += d;
    }
    return answer;
}


```

:::

</ProgrammersCoding >

## Class
