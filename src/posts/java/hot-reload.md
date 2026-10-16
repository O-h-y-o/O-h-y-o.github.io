# Java Spring boot 3 IntelliJ HotSwap 사용하기

개발모드에서 소스를 변경할 때 마다 변경 사항을 확인하고 싶으면 서버를 재시작해야하는 번거로움이 있습니다.

이를 위해서 HotSwap 이 생겼습니다.
HotReload나 LiveReload 도 HotSwap으로 생각하면 됩니다. (같은 것은 아닙니다.)

우선 밑의 코드들 해당 파일에 추가해주세요.

```groovy
// build.gradle
dependencies {
  ...
  implementation 'org.springframework.boot:spring-boot-devtools:3.0.2'
  ...
}
```

IntelliJ 에서,

1. File => Settings => Build, Execution, Deployment => Compiler(드롭다운X) `Build project automatically` 를 체크해줍니다.

2. File => Settings => Advanced Settings
   `Allow auto-make to start even if developed application is currently running` 를 체크해줍니다.

IntelliJ 를 다시 시작하고 프로젝트를 실행시키고 변경 사항이 잘 변경되는지 확인해주세요.
