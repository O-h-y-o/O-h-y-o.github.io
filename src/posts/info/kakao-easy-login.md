---
order: 1
---

# Kakao easy login

<a href="https://developers.kakao.com/" target="_blank">Kakao Developer Center</a> on the main page
Click 'Get Started' or 'My Applications' to add an application.

Enter the added application and save the `REST API key` in the project.

to the next,

```
App settings => Web platform registration => Enter site domain
```

::: tip

```
Add the following to your site's domain:
http://localhost:port # Test server
https://...  # Real domain
```

:::

Once entered, click <span style="color: blue">Go to registration</span> at the bottom to go to the place where you register `Redirect_URI`, or go to `Product Settings => Kakao Login` in the left sidebar .

Here, change the 'activation setting state' to On. The 'Activate OpenID Connect Settings' is free.

And for `Redirect URI`, enter the test server or real domain server as if you had registered the platform.

Next, go to <a href="https://developers.kakao.com/docs/latest/en/sdk-download/js" target="_blank">SDK download</a> page and copy `Full SDK` and paste it into the project `index.html`.

::: info

Write the following where you want to put the login button.

```vue
<template>
  <a :href="link"> Kakao login </a>
  <!--  -->
  <q-btn label="카카오 로그인" :href="link" />
</template>

<script setup>
const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_KEY}&redirect_uri=${process.env.REDIRECT}&response_type=code`;
</script>
```

:::

If you press Kakao Login, the following will appear, and if you agree and continue, you will be moved to the redirect uri you have set up.

<!-- <img src="https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_code.png" /> -->

::: info

At this time, the authorization code is transferred to the uri parameter `code`. You need to send this authorization code back to the kakao API to get an `access_token`.

```vue
// App.vue
<script setup>
import { onBeforeMount } from "vue";
import axios from "axios";

onBeforeMount(async () => {
  const kakaoRequest = axios.create();

  const kakaoCode = new URL(location.href).searchParams.get("code");
  if (kakaoCode) {
    try {
      const res = await kakaoRequest.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_KEY}&redirect_uri=${process.env.REDIRECT}&code=${kakaoCode}`
      );
    } catch (ex) {
      console.error(ex);
    }
  }
});
</script>
```

```json
HTTP/1.1 200 OK Example
{
  "token_type": "bearer",
  "access_token": "${ACCESS_TOKEN}",
  "id_token": "${ID_TOKEN}",
  "expires_in": 7199,
  "refresh_token": "${REFRESH_TOKEN}",
  "refresh_token_expires_in": 86399,
  "scope": "profile_image openid profile_nickname"
}
```

After confirming that it is coming as follows, I will immediately check the information with `access_token`.

```vue
// App.vue
<script setup>
import { onBeforeMount } from "vue";
import axios from "axios";

onBeforeMount(async () => {
  const kakaoRequest = axios.create();

  const kakaoCode = new URL(location.href).searchParams.get("code");
  if (kakaoCode) {
    try {
      const res = await kakaoRequest.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_KEY}&redirect_uri=${process.env.REDIRECT}&code=${kakaoCode}`
      );

      const info = await kakaoRequest.get(
        "https://kapi.kakao.com/v1/user/access_token_info",
        {
          headers: { Authorization: `Bearer ${res.data.access_token}` },
        }
      );
    }
  }
});
</script>
```

```json
HTTP/1.1 200 OK Example
{
    "id":123456789,
    "expires_in": 7199,
    "app_id":1234
}
```

:::

Now, you can save the id to the server, log in first, and log in afterwards.

:::tip

For Quasar you can easily manage env in your `quasar.config` file like this:

```json
build: {
  env: {
    KAKAO_REST_KEY: '',
    REDIRECT: '',
  }
}
```

From Kakao Login ver2, the pop-up form has disappeared due to security issues.

Please refer to <a href="https://developers.kakao.com/docs/latest/ko/kakaologin/design-guide" target="_blank">design guide</a> to create UI/UX.

For detailed documentation, please check <a href="https://developers.kakao.com/docs/latest/ko/kakaologin/common" target="_blank">Kakao Developer Center</a>.

:::
