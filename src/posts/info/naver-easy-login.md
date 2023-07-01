---
order: 2
---

# Naver easy login

Following Kakao Easy Login, let's look at Naver Easy Login.

<a href="https://developers.naver.com/apps/#/register" target="_blank">Go to the Naver Developer Center</a> and register the application.

Save the Client ID of the registered application to env or other places.

Next, let's write the service URL and callback URL.

<!-- <img src="../../../images/naver-login-01.png" /> -->

<br/> <br/>

Now let's write some code.

```js
// index.html
<head>
  ...
  <script
    type="text/javascript"
    src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"
    charset="utf-8"
  ></script>
  ...
</head>
```

```vue
// Component
<template>
  <div id="naverIdLogin" style="display: none"></div>
</template>

<script setup>
const naver = () => {
  const naverLogin = new window.naver.LoginWithNaverId({
    clientId: process.env.NAVER_CLIENT,
    callbackUrl: process.env.REDIRECT,
    isPopup: false,
    loginButton: {},
    callbackHandle: true,
  });

  naverLogin.init();
};

onMounted(() => {
  setTimeout(() => {
    naver();
  });
});
</script>
```

::: tip

If you get a typescript error in window.naver, write it as follows.

```ts
// global.d.ts
export {};

declare global {
  ...
  interface Window {
    naver: any;
  }
}

```

:::

Create `id="naverIdLogin"` where you want to create a Naver login button.

You can remove `style="display:none"` if you don't want to customize it.

::: info

If you created a NAVER login button for customization, write the code as in the example below.

```vue
<template>
  <q-btn @click="naverLogin">
    <q-icon name="img:/icons/kakao.svg" />
  </q-btn>
</template>

<script setup>
const naverLogin = () => {
  document.getElementById("naverIdLogin_loginButton")?.click();
};
</script>
```

:::

When you click the login button, a response is sent to the callback URL as follows.

```
http://localhost:9000/#access_token=accessToken&state=state&token_type=bearer&expires_in=3600
```

You can continue the login function by coordinating with the backend server with the access_token of this callback URL.

```js
// Extract only access_token
new URLSearchParams(location.href.split("#")[1]).get("access_token");
```
