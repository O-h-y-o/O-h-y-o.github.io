# 앱 화면 전환 제어하기

앱을 세로모드에서만 지원하고 싶을때가 있고 가로모드에서만 지원하고 싶을 때가 있습니다.

### 안드로이드

안드로이드의 경우 다음과 같이 해주세요.

```xml
<!-- AndroidManifest.xml -->

<activity
    android:screenOrientation=""
>
</activity>
```

`landscape`는 가로모드, `portrait`는 세로모드 입니다. 아무것도 적지 않을시 가로, 세로 모두 지원합니다.

<br/> <br/>

### IOS

IOS의 경우, `info.plist` 에서 `Supported interface orientations` 에 원하는 지원 모드를 넣어주세요.

`Supported interface orientation (ipad)` 는 쓰여진 그대로 ipad 의 화면 전환을 제어하는 값을 넣는 곳입니다.
