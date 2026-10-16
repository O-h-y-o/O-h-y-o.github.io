---
date: 2024-07-26
category:
  - App
  - Apple
tag:
  - App
  - Deploy
  - Setting
order: 1
---

# 애플 앱 출시

모든 과정에서 다운로드 버튼이 있다면 다운로드를 해주세요.

1. 먼저 CSR 인증서를 발급받기위해 맥북에서 키체인 접근 -> 상단의 키체인 접근 -> 인증서 지원 -> 인증 기관에서 인증서 요청 을 눌러줍니다.

사용자 이메일 주소를 입력해주고, 요청 항목에 디스크에 저장됨, 본인이 키 쌍 정보 지정 을 선택해주고 완료해줍니다.

2. 애플 개발자 페이지로 들어가서 `Certificates, Identifiers & Profiles` 를 들어가주세요.

3. Certificates 에서 IOS Distribution (App Store Connect And Ad Hoc)을 체크하고 Continue를 해주세요.

2번에서 발급받은 CSR 인증서 파일을 올려주세요.

4. Identifiers 에서 App IDs 로 추가, Bundle ID를 잘 적어줍니다.

5. Profiles를 찾아서 들어가줍니다.

`App Store Connect` 를 체크해주고 continue 해줍니다.

4번에서 만들었던 App ID를 선택해주고 Continue를 눌러주세요.

3번에서 만들었던 Certificate를 선택해주고 Continue를 눌러주세요.

프로필 이름을 적어주고 Generate를 눌러주세요.

6. App Store Connect로 들어가 신규 앱을 생성해줍니다.

번들 ID는 1~5 과정에서 생성한 번들 ID를 넣으면 되고 SKU도 번들 ID와 같이 입력해주세요.

액세스 권한은 전체 액세스로 하겠습니다.

7. Xcode로 들어가 내 프로젝트의 TARGETS -> Signing & Capabilities -> Automatically manage signing 선택 혹은 수동으로 등록해줍니다.

8. 상단의 Product -> Archive로 빌드 & 배포를 해줍니다.

Archive가 비활성화 되어있다면 상단의 망치모양을 Any iOS Device (arm64) 로 변경해주세요.
