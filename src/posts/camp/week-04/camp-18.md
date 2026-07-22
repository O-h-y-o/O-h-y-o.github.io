---
date: 2026-07-22
category:
  - Camp
  - Unreal
order: 3
---

# 캠프 18일차

## 언리얼 엔진 코딩 컨벤션과 Allman 스타일

언리얼 엔진 dev 페이지에서 코딩 표준을 가볍게 읽어보다가, 코드 컨벤션이 Allman 스타일(중괄호를 다음 줄에 내려쓰는 방식)로 되어있는 걸 봤다. 나는 은근히 "C++은 K&R 스타일 쓰는거 아닌가?"라고 생각하고 있었어서 좀 의아했다.

그래서 왜 그런가 찾아보니, Visual Studio의 기본(표준) 스타일이 Allman이라서 그런 거였다. 그럼 "언리얼 엔진을 제대로 하려면 나도 Allman 스타일을 써야겠네?"라는 생각이 들었고, 이 생각을 타고 가다 보니 자연스럽게 "그럼 VSCode 말고 Visual Studio로 넘어가야 하는 거 아닌가?"까지 궁금해져서 VSCode에서 VS로 바꿔야 하는 이유를 찾아보게 됐다.

찾아본 결과 정리:
- 언리얼은 매크로(UCLASS, UPROPERTY, GENERATED_BODY 등)를 UHT가 빌드 시점에 코드로 생성해서 채워 넣는 구조라, Visual Studio 쪽이 이 부분의 IntelliSense/오류 표시를 훨씬 정확하게 인식한다.
- 디버거도 VS가 언리얼과 더 깊게 붙어있어서(TArray/FString 같은 언리얼 자료구조를 Watch 창에서 보기 좋게 표시, 블루프린트+C++ 믹스 디버깅 등) 편하다.
- UnrealVS라는 Epic 공식 확장도 Visual Studio 전용이다.
- 다만 최근엔 VSCode + C++ 확장도 많이 좋아져서, 무조건 바꿔야만 하는 건 아니라고 한다.

결론적으로 당장 VS로 완전히 갈아탈지는 좀 더 써보면서 정하기로 했고, 코드 스타일은 언리얼 프로젝트 작업할 땐 Allman으로 맞춰보기로.

## Atani 퀴즈

<AtaniQuiz :questionIds="[50, 51, 52, 53, 54]" />

## 프로그래머스 코테 연습

<programmers-coding :test-id="12919">

::: tabs

@tab find

```cpp
#include <string>
#include <vector>
#include <algorithm>

std::string solution(std::vector<std::string> seoul) {
    std::string answer = "";
    auto it = std::find(seoul.begin(), seoul.end(), "Kim");
    int index = std::distance(seoul.begin(), it);
    answer = "김서방은 " + std::to_string(index) + "에 있다";

    return answer;
}
```

@tab find_if + lambda

```cpp
#include <string>
#include <vector>
#include <algorithm>

std::string solution(const std::vector<std::string>& seoul) {
    std::string answer = "";
    auto it = std::find_if(seoul.begin(), seoul.end(),
                           [](const std::string& s){ return s == "Kim"; });
    int index = std::distance(seoul.begin(), it);
    answer = "김서방은 " + std::to_string(index) + "에 있다"
    return answer;
}
```

:::

</programmers-coding>
