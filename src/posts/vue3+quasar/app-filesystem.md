# App Filesystem 접근

App에서 Filesystem에 접근하는 방법입니다.

### IOS 세팅

`UIFileSharingEnabled` 값을 추가 후 `YES` 로 변경해주세요.
`LSSupportsOpeningDocumentsInPlace` 값을 추가 후 `YES` 로 변경해주세요.

### Android 세팅

다음 문구를 추가해주세요.

```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### 플러그인 설치

`yarn add @capacitor/filesystem` 설치 후 `npx cap sync` 명령어로 최신화시켜주세요.

### 전체 코드

```ts
import { Directory, Filesystem } from "@capacitor/filesystem";

export const downloadFile = async (data: {
  url: string;
  fileName: string;
  notFile?: boolean;
}): Promise<boolean> => {
  try {
    if (Platform.is.capacitor) {
      const permission = await Filesystem.checkPermissions();

      if (permission.publicStorage === "prompt") {
        const requestPermission = await Filesystem.requestPermissions();

        if (requestPermission.publicStorage === "granted") {
          // 권한 허용
        } else {
          // 거절 문구 => 권한 허용을 거절하실 경우 다운로드가 불가능합니다.
        }
      } else if (permission.publicStorage === "granted") {
        try {
          const dirLength = (
            await Filesystem.readdir({
              path: PATH, // e.g. ""
              directory: Directory.Documents,
            })
          ).files.length;

          if (data.notFile) {
            await Filesystem.writeFile({
              data: data.url,
              path: PATH, // e.g. `${img_${NUMBER}}`
              directory: Directory.Documents,
            });
          } else {
            await Filesystem.downloadFile({
              url: data.url,
              path: PATH, // e.g. `${img_${NUMBER}}`
              directory: Directory.Documents,
            });
          }
        } catch (ex) {
          // 실패 문구
        }
      } else if (permission.publicStorage === "denied") {
        // 거절 상황 => 앱 설정에 들어가 파일 권한을 허용해주세요. 등의 문구
      }
    } else {
      const downloadTag = document.createElement("a");

      downloadTag.href = data.url;

      downloadTag.download = "image";

      downloadTag.click();

      downloadTag.parentNode?.removeChild(downloadTag);
    }
  } catch (ex) {
    console.error(ex);
  } finally {
    return false;
  }
};
```

모바일 웹에서도 다운로드가 가능해야하니, capacitor로 접속했을때와 분기를 나누었습니다.
