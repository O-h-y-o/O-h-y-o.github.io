---
date: 2026-07-22
category:
  - Camp
  - Unreal
order: 3
---

# 캠프 18일차

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

## C++ 개념 복습을 다듬고

어제 만든 개념 복습 시스템을 오늘 좀 더 다듬었다.

- **순서 재정리**: 개념들을 훑어보다가 "동적 메모리 할당(new/delete)" 설명에 힙(Heap) 메모리 얘기가 나오는데, 정작 "힙 vs 스택" 개념은 그 뒤에 나오는 걸 발견했다. 이런 식으로 뒤에 나와야 이해가 되는 개념이 앞서 나오는 부분들을 전체적으로 다시 훑어서, 파일 순서(기초 문법 → 포인터/메모리 → 클래스 → 상속 → ...)랑 각 파일 안의 개념 순서를 선후관계에 맞게 재배치했다. 생성자/소멸자 호출 순서 개념이 상속 문법을 예제로 쓰길래 상속 파트로 옮긴 것도 이때 발견.
- **코드 작성란에 기본 틀 제공**: 매번 `#include <iostream>`이랑 `int main() {}`부터 치는 게 번거로워서, main()이 필요한 문제는 시작할 때부터 그 틀이 채워져 있게 만들었다.

변수란 무엇인가 를 누군가 나에게 물었을때, 어제의 나는 "어... 변수가.. 변수지... 메모리 공간... 어쩌구.." 라고 했겠지만 이제는 "프로그램이 실행되는 동안 값을 저장하고 변경할 수 있는 메모리 공간에 붙인 이름이며 자료형에 따라 데이터의 종류와 크기가 달라진다 어쩌구.." 라고 할 수 있다. (내일 아침이면 또 까먹을 예정이라 복습 또 해야함 돌머리) 포인터와 레퍼런스도, textrpg를 만들때 아무렇게나 사용했는데 이제는 적절하게 사용할 곳을 적재적소에 잘 쓸 수 있을 것 같다. 역시 기초가 최고다.

## 언리얼 엔진 코딩 컨벤션과 Allman 스타일

머리 좀 식힐겸 언리얼 엔진 dev 페이지에서 코딩 표준을 가볍게 읽어보다가, 코드 컨벤션이 Allman 스타일(중괄호를 다음 줄에 내려쓰는 방식)로 되어있는데, 전에는 별 신경 안썼다. 하지만 나는 C++은 K&R 스타일이 권장되며 주로 쓰인다 라고 알고 있었어서 좀 의아했다.

그래서 왜 그런가 찾아보니, Visual Studio의 기본 스타일이 Allman이라서 그런 거였다. 그럼 "언리얼 엔진을 제대로 하려면 나도 Allman 스타일을 써야겠네?"라는 생각이 들었고, 이 생각을 타고 가다 보니 자연스럽게 "VSCode 말고 Visual Studio로 에디터를 변경해야 하는 이유가 있을까?"까지 궁금해져서 VSCode에서 VS로 바꿔야 하는 이유를 찾아보게 됐다. (사실 별 연관은 없지만 문득 이런 생각이 듦)

찾아본 결과로는 다음과 같았다.

- 언리얼은 매크로(UCLASS, UPROPERTY, GENERATED_BODY 등)를 UHT가 빌드 시점에 코드로 생성해서 채워 넣는 구조라, Visual Studio 쪽이 이 부분의 IntelliSense/오류 표시를 훨씬 정확하게 인식한다.
- 디버거도 VS가 언리얼과 더 깊게 붙어있어서(TArray/FString 같은 언리얼 자료구조를 Watch 창에서 보기 좋게 표시, 블루프린트+C++ 믹스 디버깅 등) 편하다.
- UnrealVS라는 Epic 공식 확장도 Visual Studio 전용이다.
- 다만 최근엔 VSCode + C++ 확장도 많이 좋아져서, 무조건 바꿔야만 하는 건 아니라고 한다.

결론적으로 당장 VS로 완전히 갈아탈지는 좀 더 써보면서 정하기로 했고, 코드 스타일은 언리얼 프로젝트 작업할 땐 Allman으로 맞춰보기로.
