---
icon: install
date: 2024-06-28
category:
  - App
  - Flutter
  - Cross Platform
tag:
  - App
  - Flutter
  - Cross Platform
order: 1
---

# Flutter 설치

## Flutter 다운로드

[https://docs.flutter.dev/get-started/install](https://docs.flutter.dev/get-started/install)

해당 링크를 들어가서 자신의 운영체제에 맞는 것을 찾아서 다운로드를 받고, 압축 해제를 해주세요.

<br/>

## 환경변수 설정

Window의 경우 환경 변수를 들어가서 사용자 변수에 `path`에 flutter를 압축 해제한 경로에서 `/bin` 을 추가하여 적은 뒤 생성해주세요.

Mac의 경우 터미널을 열어주고 터미널에 맞게 환경 변수를 추가해주세요.

::: code-tabs

@tab:active zsh

```zsh
touch ~/.zshrc
open ~/.zshrc

# 열린 파일에 export PATH="$PATH:경로/bin"
```

@tab bash

```bash
touch ~/.bash_profile
open ~/.bash_profile

# 열린 파일에 export PATH="$PATH:경로/bin"
```

:::

<br/>

### Flutter가 잘 설치되었는지 확인하는 방법

`cmd` 에서 `flutter doctor` 를 입력해주세요.

Flutter 개발에 필요한 세팅이 되어있는지 체크해줍니다.

경고가 나온다면 뒤에 run: XXXXXXX 라고 나올텐데 그대로 복사 후 붙여넣기를 해주고 모두 동의를 해주면 됩니다.

<br/>

## Android Studio 다운로드

[https://developer.android.com/codelabs/basic-android-kotlin-compose-install-android-studio](https://developer.android.com/codelabs/basic-android-kotlin-compose-install-android-studio?hl=ko#1)

`Android Studio` 를 같이 설치해주세요.
설치가 되었다면, Plugins를 들어가 `Flutter` 플러그인을 설치해주세요. `Dart`도 같이 설치됩니다.

그리고 File → Settings → Appearance & Behavior → System Settings → Android SDK 에 들어가서
`SDK Tools` 탭으로 들어간 후 `Android SDK Command-line Tools(latest)` 를 체크하고 `Apply`를 눌러주세요.

<br/>

### Flutter 프로젝트 생성

File → New Flutter Project → (Generators) Flutter 를 선택하고 플러터 압축 해제한 경로를 넣어주고 다음을 누르고, 프로젝트 이름을 적고 생성하면 됩니다.

이름만 적고 다른 설정은 건들지 않아도 됩니다.

### lint 끄는 방법

```yaml
rules:
  prefer_typing_uninitialized_variables: false
  prefer_const_constructors: false
  prefer_const_constructors_in_immutables: false
  avoid_print: false
```

`analysis_options.yml`에 해당 코드를 넣어주세요.

<br/>
