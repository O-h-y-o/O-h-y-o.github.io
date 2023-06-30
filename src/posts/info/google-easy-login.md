---
order: 3
---

# Google easy login

This time, we will implement Google Simple Login.

Create a new project in <a href="https://console.cloud.google.com/">Google Cloud Console</a>.

We will set one by one in `API and Services` => `OAuth Consent Screen`.

In the first OAuth consent screen, change the User Type to external and touch the rest of the settings well.

Then click the Publish App button.

Next, go to Credentials and at the top `+ Create Credentials` => `OAuth Client ID`

```
Application Type => Web Application
Authorized JavaScript Source => http://localhost, http://localhost:port, https://serviceURL
Authorized Redirect URIs => http://localhost, http://localhost:port, https://serviceURL
```

You must also enter `http://localhost` here.

Save the Client ID well, and now let's write the code.

::: info

```html
<body>
  <script src="https://accounts.google.com/gsi/client" async defer></script>
</body>
```

```vue
<template>
  <div id="buttonDiv"></div>
</template>

<script setup>
const handleCredentialResponse = (response) => {
  const result = parseJwt(response.credential);
};

const parseJwt = (credential) => {
  const base64Url = credential.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const googleLogin = () => {
  window.google.accounts.id.initialize({
    client_id: process.env.GOOGLE_CLIENT,
    callback: handleCredentialResponse,
  });
  window.google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
    theme: "outline",
    size: "large",
    shape: "circle",
    type: "icon",
  });
};

onMounted(() => {
  setTimeout(() => {
    googleLogin();
  });
});
</script>
```

When using typescript

```ts
// global.d.ts
export {};

declare global {
  google: any;
}
```

:::

::: tip

More information is available at <a href="https://developers.google.com/identity/gsi/web/guides/overview?hl=en">Google Developer Center</a>.

In particular, please note that <a href="https://developers.google.com/identity/gsi/web/tools/configurator?hl=en">generate integrated code</a> to design.

:::
