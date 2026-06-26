---
date: 2024-10-16
category:
  - Memorit
order: false
article: false
---

# 예제로 보는 웹, 앱 크로스 플랫폼 출시 a 부터 Z 까지

Vue3, Quasar framework를 이용하여 웹(모바일 웹 포함), 앱(aos, ios) 크로스 플랫폼을 만들어보겠습니다.

시간은 다소 걸리겠지만 디자인부터 코드, 배포, 실제 출시까지 모두 진행해보려 합니다.

Quasar framework는 어디에서든 하나의 코드를 사용하여 웹이나 앱 모두 사용 가능하게 합니다.

앱은 Capacitor를 이용한 Webview기반의 하이브리드 앱입니다.

서비스 이름은 Memorit으로 하겠습니다.

Memorit은 기록을 저장하여 언제 어디서든지 확인이 가능한 서비스입니다. 주요 기능은 기록 저장과 열람이고 이외 기능으로는 소셜로그인만 지원, 다국어(en,ko,ja) 지원, 다크모드 정도가 있습니다.

## 주의사항

`앱(aos, ios)은 선택사항입니다.`

- 앱만 배포하고싶어도 웹뷰 기반이기 때문에 웹은 필수 입니다.
- aos는 한번 결제하면 영구적이고 (ios보단 싸요) 윈도우나 맥북 어디에서든 빌드 및 배포가 가능합니다.
- aos는 올해 개인 개발자 정책이 변경되어 20명의 테스터가 2주동안 테스트를 진행하여야 배포가 가능합니다.
- ios는 1년 단위의 비싼(?) 개발자 등록과 맥북이 필수입니다.

## 주요 기술스택 & 배포환경

- vue3 composition API, quasar framework, capacitor
- pinia, vite, typescript
- yarn (quasar 권장사항이라 yarn 사용)
- 프론트: aws s3, route53, cloudfront, github ci/cd
- 백엔드: firebase

## 개요

디자인 (Feat. 피그마)
구글 클라우드 콘솔
애플 콘솔
파이어베이스
