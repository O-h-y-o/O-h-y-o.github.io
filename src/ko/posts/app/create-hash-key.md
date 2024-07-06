---
icon: install
date: 2024-06-28
category:
  - App
tag:
  - App
  - Android Key Hash
  - Cross Platform
order: 1
---

# 키 해시

해시(Hash)는 데이터를 고정된 크기의 고유한 값으로 변환하는 함수나 알고리즘을 의미합니다. 주로 데이터의 무결성을 확인하거나, 데이터 검색의 효율성을 높이기 위해 사용됩니다. 안드로이드 개발에서는 해시를 주로 키 해시(Key Hash) 형태로 사용합니다.

**키 해시(Key Hash)**란 안드로이드 애플리케이션의 서명 키를 해싱한 결과로, 주로 외부 API 서비스(예: 카카오맵 API)를 사용할 때 보안 목적으로 사용됩니다. API 제공자는 애플리케이션이 올바르게 서명된 것인지 확인하기 위해 키 해시를 요구합니다.

안드로이드 스튜디오에서 키 해시를 생성하는 방법은 다음과 같습니다.

1. 디버그 키 해시 생성

키 해시를 생성하기 위해 keytool 명령어를 사용합니다. keytool은 JDK에 포함되어 있습니다.
안드로이드 해당 프로젝트 터미널(명령 프롬프트)에서 다음 명령어를 실행해주세요.

```sh
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore -storepass android -keypass android | openssl sha1 -binary | openssl base64
```

2. 릴리즈 키 해시 생성

릴리즈 키 해시는 앱을 배포할 때 사용하는 서명 키로 생성해주세요.
명령어를 실행할 때 -alias와 -keystore 부분을 자신의 릴리즈 키스토어 경로와 별칭으로 변경해주세요.

```sh
keytool -exportcert -alias your_alias -keystore your_keystore_path -storepass your_store_password -keypass your_key_password | openssl sha1 -binary | openssl base64
```
