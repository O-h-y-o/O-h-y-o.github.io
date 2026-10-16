---
icon: install
date: 2024-07-23
category:
  - App
  - Xcode
tag:
  - App
  - Xcode setting
order: 2
---

# xcode 설치 및 초기 세팅

1. 스토어에서 Xcode 설치

2. cocoapods 설치

```shell
$ brew install cocoapods
# or
$ sudo gem install cocoapods
```

3. 기본 개발자 디렉토리 설정

```shell
$ sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

4. Xcode 라이센스 동의

```shell
$ sudo xcodebuild -license
```

- Xcode cli가 설치되어있지 않다고 할때

```shell
$ xcode-select --install
```
