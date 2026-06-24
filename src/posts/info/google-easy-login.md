---
order: 3
---

# 구글 간편 로그인

이번에는 구글 간편 로그인을 구현해보겠습니다.

<a href="https://console.cloud.google.com/">구글 클라우드 콘솔</a>에서 새 프로젝트를 만들어주세요.

`API 및 서비스` => `OAuth 동의 화면` 에서 하나씩 설정을 하겠습니다.

첫번째 OAuth 동의 화면 에서의 User Type 을 외부로 바꾸어주고 나머지는 세팅을 잘 만져줍니다.

이후 앱 게시 버튼을 눌러줍니다.

다음으로 사용자 인증 정보 로 들어가서 상단의 `+ 사용자 인증 정보 만들기` => `OAuth 클라이언트 ID`

```
애플리케이션 유형 => 웹 애플리케이션
승인된 자바스크립트 원본 => http://localhost, http://localhost:port, https://serviceURL
승인된 리디렉션 URI => http://localhost, http://localhost:port, https://serviceURL
```

여기서 `http://localhost` 도 같이 입력해주어야 합니다.

client ID를 잘 저장해주고, 이제 코드를 작성해봅시다.

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

타입스크립트 사용시

```ts
// global.d.ts
export {};

declare global {
  google: any;
}
```

:::

::: tip

자세한 정보는 <a href="https://developers.google.com/identity/gsi/web/guides/overview?hl=ko">구글 개발자 센터</a> 에서 확인할 수 있습니다.

특히 <a href="https://developers.google.com/identity/gsi/web/tools/configurator?hl=ko">통합 코드 생성</a> 에서 디자인 까지 가능하니 참고하시기 바랍니다.

:::
