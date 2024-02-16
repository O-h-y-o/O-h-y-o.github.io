# 원치않은 수정사항 모두 취소하기

원치않는 수정사항 혹은 브랜치 초기 상태로 리셋하고 싶을때 다음 명령어를 순서대로 입력하면 됩니다.

모든 수정사항이 취소되므로 신중하세요.

``` bash
$ git reset # 모든 stage 파일을 unstage 상태로 변경
$ git checkout . # 모든 변경 사항을 취소
$ git clean -fdx # 추적 불가능한 모든 파일 제거
```