# 업비트 오픈API로 거래소 페이지 만들어보기 - 세팅

`구현해볼 것은 Echarts를 이용한 차트와, 오더북(일반호가), 코인리스트, 체결내역 입니다.`

그에 앞서 간단한 세팅부터 하겠습니다.

```sh
$ pnpm create quasar
```

```json
1. vue3
2. pinia
3. typescript
4. composition api
5. scss
```

- Quasar cli로 구축합니다.

<br/>

```js
// global.d.ts
export {};

declare global {}
```

- 우선 타입을 모아놓을 global.d.ts 파일을 프로젝트 루트 폴더에 만들어줍니다.

<br/>

```js
// socket-upbit.ts
export const useSocketUpbitStore = defineStore({
  id: "socketStore",
  state: (): ISocketState => ({}),
  actions: {},
});
```

- stores 폴더에 `socket-upbit.ts` 파일을 만들어줍니다.

몇몇의 데이터들은 pinia로 상태관리를 해줄 예정입니다. 굳이 pinia로 상태 관리를 해줄 필요는 없습니다.

<br/>

```js
// routes.ts
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("src/pages/HomePage.vue"),
  },
  {
    path: "/exchange",
    name: "exchange",
    component: () => import("src/pages/ExchangePage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    redirect: () => {
      return "/";
    },
  },
];

export default routes;
```

- pages 폴더에 `ExchangePage.vue` 를 만들어주고 routes.ts 에서 추가해줍니다.

<Comment />

<script setup>
  import Comment from '../components/Comment.vue'
</script>
