---
order: 1
---

# Creating an exchange page with Upbit Open API - Settings

`The things to be implemented are charts using Echarts, order book (general quotation), coin list, and contract details.`

Before that, let's start with a simple setup.

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

- Build with Quasar cli.

<br/>

```js
// global.d.ts
export {};

declare global {}
```

- First, create a global.d.ts file to collect types in the project root folder.

<br/>

```js
// socket-upbit.ts
export const useSocketUpbitStore = defineStore({
  id: "socketStore",
  state: (): ISocketState => ({}),
  actions: {},
});
```

- Create a `socket-upbit.ts` file in the stores folder.

Some data will be managed by pinia. There is no need to manage the state with pinia.

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

- Create `ExchangePage.vue` in pages folder and add it in routes.ts.
