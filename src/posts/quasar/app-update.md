---
icon: pen-to-square
date: 2024-01-15
category:
  - App
  - Capacitor
  - Quasar
tag:
  - App
  - Capacitor
  - Quasar
order: 1
---

# 사용자에게 앱 업데이트 소식 알리기

Capacitor는 웹뷰를 사용하기 때문에 단순 컨텐츠 업데이트는 웹을 통하여 가능합니다.

하지만 카메라 사용, 키보드 이벤트 같은 경우에는 순수 자바스크립트로는 접근할 수가 없기 때문에 플러그인을 이용하여 접근할 수 있습니다.

이번 글은, 웹 업데이트가 아닌 앱 자체 업데이트가 되었고 사용자에게 스토어에서 업데이트를 받게 하는 방법입니다.

우선 @capacitor/app-launcher 와 @capacitor/app, @capacitor/core 를 설치해주세요.

@capacitor/core는 루트에만 설치해주시고 나머지 두개는 src-capacitor에도 설치해주세요.

src-capacitor에서 `npx cap sync` 를 해주세요.

Android의 경우, `AndroidManifest.xml` 파일에서 <manifest></manifest> 태그 안에 다음 코드를 넣어주세요.

```xml
<manifest>
    <queries>
        <package android:name='{GOOGLE_APP_NAME}' />
    </queries>
</manifest>
```

IOS의 경우 info 파일에서 `Queried URL Schemes` 키값을 추가해주고, 값으로는 `itms-app://itunes.apple.com/app/{APPLE_ID}` 를 입력해주세요.

## 코드

공통 코드입니다.

```vue
<script setup lang="ts">
import { App } from "@capacitor/app";
import { AppLauncher } from "@capacitor/app-launcher";

const getCurrentAppVersion = async () => {
  try {
    const version = (await App.getInfo()).version;

    return version;
  } catch (ex) {
    console.error(ex);
  }
};
</script>
```

Android의 경우 다음과 같이 작성해주세요.

```vue
<script setup lang="ts">
if ($q.platform.is.android) {
  const version = await getCurrentAppVersion();

  const latestVersion = "YOUR_APP_VERSION";

  if (version !== latestVersion) {
    const { value } = await AppLauncher.canOpenUrl({
      url: GOOGLE_APP_NAME,
    });

    if (value) {
      await AppLauncher.openUrl({
        url: GOOGLE_APP_NAME,
      });
    }
  }
}
</script>
```

IOS의 경우 다음과 같이 작성해주세요.

```vue
<script setup lang="ts">
if ($q.platform.is.ios) {
  const version = await getCurrentAppVersion();

  const latestVersion = "YOUR_APP_VERSION";

  if (version !== latestVersion) {
    const appleUrl = "https://itunes.apple.com/app/{APPLE_ID}";

    const { value } = await AppLauncher.canOpenUrl({
      url: appleUrl,
    });

    if (value) {
      await AppLauncher.openUrl({
        url: appleUrl,
      });
    }
  }
}
</script>
```

구글에서는 스토어 최신 버전을 가져오는 것이 없습니다.

따라서 서버에서 관리하는 버전을 가져와 구현을 해야합니다.

애플에서는 다음과 같이 앱스토어 최신 버전을 가져올 수 있습니다.

```ts
const res = await axios.get(
  "http://itunes.apple.com/lookup?bundleId={BUNDLE_ID}"
);

const latestVersion = res.data.results[0].version;
```

하지만 버전 업데이트 후 업데이트된 버전이 바로 갱신되지 않기때문에 원하는데로 구현을 하기 힘듭니다.

따라서 구글이나 애플 모두 서버에서 관리하는 버전이 필요합니다.

해당 코드들을 그대로 붙여넣는다면, 버전이 다를시 안내 문구나 창 없이 바로 스토어로 이동시키게 됩니다.

안내 문구나 창을 띄워주는 코드를 꼭 작성해주세요.
