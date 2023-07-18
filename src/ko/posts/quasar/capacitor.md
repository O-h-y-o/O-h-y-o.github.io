---
order: 2
---

# Capacitor로 모바일 앱 빌드하기

## capacitor 란?

웹 페이지를 안드로이드, ios, 웹 앱으로 배포하기 위한 크로스 플랫폼 입니다.

아이오닉을 기반으로 둔 cordova 의 상위 버전이라 할 수 있습니다.

대부분의 ionic, cordova 플러그인을 지원합니다.

cordova는 안드로이드 스튜디오, 그래들, 자바 최신버전으로 구동이 불가능 할 수 있습니다.

capacitor는 최신 버전으로도 구동이 가능합니다.

<a href="https://capacitorjs.com/" target="_blank">공식 홈페이지</a>

## Capacitor Android 준비

Quasar에서도 capacitor, cordova 모두 지원합니다. 이번에는 capacitor를 이용한 모바일 앱을 만들어 보겠습니다.

안드로이드 부터 시작하겠습니다.

### 1. <a href="https://developer.android.com/studio" target="_blank">안드로이드 홈페이지</a> 에서 최신버전 안드로이드 스튜디오를 다운로드하여 설치합니다.

### 2. <a href="https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html" target="_blank"> Java 17 </a> OS에 맞는 버전을 다운로드 하여 설치합니다.

### 3. 환경 변수 설정을 해주겠습니다. cmd에 다음과 같이 입력해주세요.

`ANDROID_HOME` 은 더 이상 사용되지 않는다고 하지만 같이 설정해주겠습니다.

```sh
# macos
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
PATH=$PATH:$ANDROID_SDK_ROOT/tools; PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools

# windows
setx ANDROID_HOME "%USERPROFILE%\AppData\Local\Android\Sdk"
setx ANDROID_SDK_ROOT "%USERPROFILE%\AppData\Local\Android\Sdk"
setx path "%path%;%ANDROID_SDK_ROOT%\tools;%ANDROID_SDK_ROOT%\platform-tools"
```

AppData\Local\Android 혹은 Android/Sdk 가 아닌 C:\android_sdk 에 있다면 확인해주세요. C:\android_sdk 로 경로를 지정해주세요.

사용자 환경 혹은 안드로이드 스튜디오 버전에 따라 경로가 상이할 수 있습니다. 잘 맞추어서 해주시기 바랍니다.

### 4. 다음 명령어로 capacitor 개발 서버를 열어주세요.

```sh
$ quasar mode add capacitor
$ quasar dev -m capacitor -T android
```

정상적으로 구동된다면 안드로이드 스튜디오가 켜지면서 모바일 기기에 웹페이지가 나오는 것을 확인할 수 있습니다.

자바 버전이 17미만 gradle 버전이 8미만 일 경우 에러가 발생 할 수 있습니다. 에러가 나면 어떤 에러인지 어떻게 해결해야 하는지 상세하게 나오니 참고하여 해결해주시면 되겠습니다.

### 5. 다음 명령어로 capacitor 빌드를 해주세요.

```sh
$ quasar build -m capacitor -T android
```

빌드에 성공하면 `\dist\capacitor\android\apk\release`, `\src-capacitor\android\app\build\outputs\apk` 경로에 app-release-unsigned.apk 가 나타납니다.

하지만 구글에서는 .apk 가 아닌 .aab 확장자를 가진 파일만 허용합니다.

아쉽게도 Quasar-capacitor 에서는 .aab 확장자로 빌드하는 것을 지원하지 않습니다.

gradle로 직접 빌드하여 .aab 확장자로 빌드해보겠습니다.

### 6. 다음 명령어로 keystore 파일을 만들어주세요.

```sh
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 20000
```

유효 기간이 20,000일인 2,048비트 RSA 키 쌍 및 자체 서명된 인증서(SHA256withRSA)를 만드는 명령어입니다.

my-release-key 와 alias_name 에는 자신의 프로젝트 이름을 넣거나 원하는 이름을 넣어주시면 됩니다.

::: tip

keystore 파일이 없으면 신뢰할 수 없는 파일로 분류되어 설치 및 실행이 불가능합니다.
또한 구글 플레이 스토어에 배포하였을때 이 keystore 파일이 없다면 업데이트 등 접근이 불가합니다.

잃어버리거나 노출되는 일이 없도록 하여야합니다.

Git에도 올라가지 않게 .gitignore 파일에 추가하여 주세요.

:::

### 7. src-capacitor 에 keystore.properties 파일을 생성하고 다음과 문구를 입력해주세요.

방금 생성한 keystore 에서 설정한 비밀번호와 alias_name 을 입력하면 됩니다.

```sh
storePassword=storePassword
keyPassword=keyPassowrd
keyAlias=keyAlias
storeFile=storeFileRoot # ../../name.keystore
```

경로가 ../../ 인 이유는 8번 작업의 경로가 `\src-capacitor\android\app\build.gradle` 인데 build.gradel 로 부터 keystore.properties 파일을 찾아줘야 하기 때문입니다.

### 8. keystore.properties 파일을 읽게 해주겠습니다.

`\src-capacitor\android\app\build.gradle` 에 들어가서 주석으로 add라고 표기한 부분을 모두 추가해주세요.

```groovy
apply plugin: 'com.android.application'

def keystorePropertiesFile = rootProject.file("keystore.properties") // add

def keystoreProperties = new Properties() // add

keystoreProperties.load(new FileInputStream(keystorePropertiesFile)) // add

android {
  ...
  defaultConfig {
    ...
    signingConfigs { // add
      release {
        storeFile file(keystoreProperties['storeFile'])
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storePassword keystoreProperties['storePassword']
      }
    }
  }
  buildTypes {
    release {
      signingConfig signingConfigs.release // add
      minifyEnabled false
      proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
  }
}

...
```

### 9. 마지막으로 `\src-capacitor\android` 경로에서 다음 release 명령어를 입력하여 build를 해주세요.

```sh
$ ./gradlew :app:bundleRelease # release 빌드
$ ./gradlew :app:bundleDebug # debug 빌드
```

`\src-capacitor\android\app\build\outputs\bundle\release` 경로에 app-release.aab 파일이 생성됩니다.
`\src-capacitor\android\app\build\outputs\bundle\debug` 경로에 app-debug.aab 파일이 생성됩니다.

생성된 파일(release)로 퍼블리싱을 하면 되겠습니다.

## 실제 테스트

퍼블리싱에 앞서 실제 모바일로 테스트를 해보아야 합니다.

::: warning

`.aab` 는 테스트 모바일 기기에 설치가 불가능합니다. .aab 는 구글 플레이스토어 게시를 위한 파일입니다.

:::

### 첫번째 방법

`quasar build -m capacitor -T android` 를 하면 `\dist\capacitor\apk\release` 에 `app-release.apk` 가 생성됩니다.

이 파일을 테스트 모바일에 다운로드 하고 사용하면 됩니다.

S3버킷 같은 곳에 올려 파일 다운로드 링크를 생성하거나 USB로 직접 파일을 설치할 수 있습니다.

### 두번째 방법

안드로이드 스튜디오로 테스트를 진행할 수 있습니다.

USB 등을 이용하여 데스크탑과 안드로이드 모바일을 연결하여주세요.

안드로이드 스튜디오 우측 상단에 기기를 선택하는 곳을 누르면 Avaliable devices 에 `Device` 혹은 자신의 휴대기기 이름으로 되어있는 것이 보일겁니다.

클릭을 하고, 옆에 Run 버튼을 눌러주시면 모바일 기기에 설치가 됩니다.

## 아이콘 설정하기

Quasar 는 favicon을 쉽게 generate 해주는 `Icongenie` 를 지원합니다.

자세한 내용은 <a href="https://o-h-y-o.github.io/ko/posts/quasar/start-project-quasar.html" >Icongenie 로 favicon 생성하기</a> 를 참고해주세요.

```sh
$ icongenie generate -m capacitor -i /path/to/source/logo.png
```

아이콘 생성에 성공하면 다음과 같이 Android 와 IOS에 최적화된 이미지를 만들어낼 수 있습니다.
별도로 더 추가할 사항은 없습니다.

```

📦res
 ┣ 📂drawable
 ┃ ┣ 📜ic_launcher_background.xml
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-land-hdpi
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-land-mdpi
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-land-xhdpi
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-land-xxhdpi
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-land-xxxhdpi
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-port-hdpi
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-port-mdpi
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-port-xhdpi
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-port-xxhdpi
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-port-xxxhdpi
 ┃ ┗ 📜splash.png
 ┣ 📂drawable-v24
 ┃ ┗ 📜ic_launcher_foreground.xml
 ┣ 📂layout
 ┃ ┗ 📜activity_main.xml
 ┣ 📂mipmap-anydpi-v26
 ┃ ┣ 📜ic_launcher.xml
 ┃ ┗ 📜ic_launcher_round.xml
 ┣ 📂mipmap-hdpi
 ┃ ┣ 📜ic_launcher.png
 ┃ ┣ 📜ic_launcher_foreground.png
 ┃ ┗ 📜ic_launcher_round.png
 ┣ 📂mipmap-mdpi
 ┃ ┣ 📜ic_launcher.png
 ┃ ┣ 📜ic_launcher_foreground.png
 ┃ ┗ 📜ic_launcher_round.png
 ┣ 📂mipmap-xhdpi
 ┃ ┣ 📜ic_launcher.png
 ┃ ┣ 📜ic_launcher_foreground.png
 ┃ ┗ 📜ic_launcher_round.png
 ┣ 📂mipmap-xxhdpi
 ┃ ┣ 📜ic_launcher.png
 ┃ ┣ 📜ic_launcher_foreground.png
 ┃ ┗ 📜ic_launcher_round.png
 ┣ 📂mipmap-xxxhdpi
 ┃ ┣ 📜ic_launcher.png
 ┃ ┣ 📜ic_launcher_foreground.png
 ┃ ┗ 📜ic_launcher_round.png
 ┣ 📂values
 ┃ ┣ 📜ic_launcher_background.xml
 ┃ ┣ 📜strings.xml
 ┃ ┗ 📜styles.xml
 ┗ 📂xml
 ┃ ┣ 📜config.xml
 ┃ ┗ 📜file_paths.xml

```

## Capacitor IOS 빌드하기

//

## Capacitor 빌드 결과물을 S3로 관리하기 (github actions)

저같은 경우에는 공식 마켓에 올려서 배포를 하지 않고, 웹페이지에서 바로 다운로드 가능하게 하기 위해 S3에서 파일 관리를 하고 있습니다.

공식 마켓에 파일을 올려 버전 관리를 하실분들은 넘기셔도 됩니다.
공식 마켓에 자동배포를 하는 법은 추후 작성하겠습니다.

1. S3버킷을 하나 만들어주세요 (모든 퍼블랙 액세스 차단을 풀어주세요.)
   ACLs 를 꼭 활성화 시켜주세요. 비활성화 상태로 버킷을 생성하면 바꿀 수 없으며, github actions로 파일 업데이트를 진행할 수 없습니다.

2. 권한 => 버킷 정책을 생성하여 입력해주세요.
   GetObject, PutObject, PutObjectAcl 이 세가지 정책을 선택해주세요.

```json
// example
{
  "Version": "2012-10-17",
  "Id": "ID",
  "Statement": [
    {
      "Sid": "Sid",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:PutObjectAcl"],
      "Resource": "arn:aws:s3:::<BUCKET_NAME>/*"
    }
  ]
}
```

3. 권한 => CORS에 다음과 같이 입력해주세요.

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["HEAD", "GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

모두에게 허용할 수 있는 `*` 를 해주세요. 접근 권한을 두고싶다면 `*` 부분을 수정해주세요.

4. Github Repository Secret Key-Value를 다음과 같이 만들어주세요. 총 4개의 키를 만드는겁니다.

```
ANDROID_STORE_PASSWORD: 'storePassword'
ANDROID_KEY_PASSWORD: 'keyPassword'
ANDROID_KEY_ALIAS: 'aliasName'
ANDROID_STORE_FILE: '../../name.keystore'
```

여기서 storeFile 의 경로에서 에러가 발생할 수 있습니다.
그럴경우에는 `/home/runner/work/REPO/src-capacitor/name.keystore` 처럼 경로를 잘 지정해주세요.

5. `src-capacitor\android\app\build.gradle` 에서 다음과 같이 추가 및 수정해주세요.

```groovy
ext {
    kotlinVersion = "1.9.0"
}

def keystoreProperties = new Properties()

if (file('keystore.properties').exists()) {
    keystoreProperties.load(new FileInputStream(file('keystore.properties')))
} else {
    keystoreProperties.setProperty("storePassword", "${System.getenv('ANDROID_STORE_PASSWORD')}")
    keystoreProperties.setProperty("keyPassword", "${System.getenv('ANDROID_KEY_PASSWORD')}")
    keystoreProperties.setProperty("keyAlias", "${System.getenv('ANDROID_KEY_ALIAS')}")
    keystoreProperties.setProperty("storeFile", "${System.getenv('ANDROID_STORE_FILE')}")
}
```
