# 푸시 알림 보내기

@capacitor/push-notifications 를 이용한 푸시알림 보내는 기능을 구현해보겠습니다.

우선 firebase 콘솔에서 프로젝트를 만들고 android와 apple 을 각각 만들고, `google-services.json`과 `GoogleService-Info.plist` 파일을 적절한 위치에 넣어주세요.

FCM의 가이드를 따르지 않고, 파일들만 넣어주어야 합니다. 특히 절대로 Xcode 에서 `firebase-ios-sdk` 를 설치하지마세요.

<br/>

Xcode 에서는 폴더를 오른쪽 클릭 후 `Add files to "App"...` 을 눌러 넣어주어야 합니다. 폴더에 그냥 넣으면 인식하지 못합니다.

<br/>

이제 프로젝트에서 `yarn add @capacitor/push-notifications` 해당 라이브러리를 설치 후 `npx cap sync` 를 해주세요.

## 공통 설정

`capacitor.config.json` 파일에 다음 코드를 넣어주세요.

```json
{
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
}
```

앱이 foreground 상태일때 푸시 알림이 표시되는 방식을 구성하는 것입니다.

## IOS의 경우

### `AppDelegate.swift` 파일에 다음 코드를 넣어주세요.

```swift
import Firebase

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    FirebaseApp.configure() // add here
    return true
}

// add
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    Messaging.messaging().apnsToken = deviceToken
    Messaging.messaging().token(completion: { (token, error) in
        if let error = error {
            NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
        } else if let token = token {
            NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: token)
        }
    })
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

### Podfile

```ruby
target 'App' do
  capacitor_pods
  pod 'Firebase/Messaging'
end
```

### Xcode

App을 더블클릭 한 후 TARGETS -> Signing & Capabilities 로 이동 후, + Capability를 눌러 Push Notifications 를 추가해주세요.

최근에 인증키가 바뀌었는데 `응용 프로그램을 위한 유효한 'aps-environment' 인타이틀먼트 문자열을 찾을 수 없습니다.` 라는 에러 문구가 보인다면
Firebase 콘솔 프로젝트에서 클라우드 메시징 -> Apple 앱 구성 -> APN 인증 키 삭제 후 APN 인증서 두 개를 (개발, 프로덕션) 등록해주세요.

<br/> <br/>

## Android의 경우

다음 처럼 추가해주세요.

### `variables.gradle`

com.google.firebase:firebase-messaging 의 버전을 23.1.2 로 사용하겠다는 것입니다.

```groovy
ext {
    firebaseMessagingVersion = "23.1.2"
}

```

### string.xml & AndroidManifest.xml

다음 코드를 등록해주셔야 정상적으로 안드로이드 기기 푸시 알림이 동작합니다.

```xml
<!-- app/src/main/res/values/strings.xml -->
<resources>
  ...
  <string name="default_notification_channel_id">{CHANNEL_ID}</string>
</resources>
```

```xml
<!-- AndroidManifest.xml -->
<meta-data
android:name="com.google.firebase.messaging.default_notification_channel_id"
android:value="@string/default_notification_channel_id" />
```

별도의 푸시 알림 아이콘을 사용하시려면 다음 코드에서 @mipmap/push_icon_name 을 수정해주세요.

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```
