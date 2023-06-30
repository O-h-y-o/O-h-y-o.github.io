---
icon: pen-to-square
date: 2023-06-23
category:
tag:
---

# Quasar로 프로젝트 시작하기

`Quasar에서는 패키지매니저로 yarn을 사용하는것을 강력 추천 하고 있습니다.`

`pnpm은 정식 지원이 아닙니다.`

## Quasar 전역 설치하기

```sh
$ yarn global add @quasar/cli
# or:
$ npm i -g @quasar/cli
# or:
$ pnpm add -g @quasar/cli # experimental support
```

## Quasar 로 프로젝트 만들기

```sh
$ yarn create quasar
# or:
$ npm init quasar
# or:
$ pnpm create quasar # experimental support
```

가이드 라인에 따라서 잘 선택해줍니다. <br />
`vite로 만들어줍니다. webpack보다 빠른 개발자 경험을 할 수 있습니다.`

## package.json 파일에 다음 문구 추가

```json
// package.json
"scripts": {
  "dev": "quasar dev", # 개발 서버 열기
  "build": "quasar build", # 빌드
}
```

## 서버가 잘 실행되는지 확인

```sh
$ yarn quasar dev
$ yarn quasar inspect
$ pnpm run dev
# ..etc
```
