---
icon: install
date: 2024-07-18
category:
  - I18n
  - Language
tag:
  - vue-i18n
order: 1
---

현 날짜 기준으로 프로젝트 생성시, vite, vue, pinia 기타 등등 세팅을 할때 모두 가장 최신버전으로 세팅을 해두었을때를 가정

- vue-i18n 사용시 개발서버에서는 변수 사용이 정상적으로 되는데 배포했을때 정상적으로 동작하지 않는 이슈

```json
// en.json
{
  "word.person": "{person} person"
}
```

```vue
<template>
  {{ $t("word.person", { person: 1 }) }}
</template>
```

해당 코드처럼 사용했을시 개발 서버에서는 정상적으로 `1 person` 이 출력이 된다.

하지만 배포할때에는 `{person} person` 이렇게 출력되는 현상이 있다.

다국어를 지원하고 변수까지 사용하는 사례가 별로 없어서 찾는데 애를 먹었지만, `vite.config` 혹은 `quasar.config` 에 `runtimeOnly: false` 이것을 추가해주면 된다는 것을 찾았다.

왜 runtimeOnly의 default 값이 true 인지는 정말 영 이해할 수 없지만 이것을 false 를 해줘야 배포를 했을때 정상적으로 변수가 잘 들어간다.
