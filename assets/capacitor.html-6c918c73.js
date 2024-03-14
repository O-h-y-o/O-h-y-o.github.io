import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as s,f as e}from"./app-034d064a.js";const i={},r=e(`<h1 id="capacitor로-모바일-앱-빌드하기" tabindex="-1"><a class="header-anchor" href="#capacitor로-모바일-앱-빌드하기" aria-hidden="true">#</a> Capacitor로 모바일 앱 빌드하기</h1><h2 id="capacitor-란" tabindex="-1"><a class="header-anchor" href="#capacitor-란" aria-hidden="true">#</a> capacitor 란?</h2><p>웹 페이지를 안드로이드, ios, 웹 앱으로 배포하기 위한 크로스 플랫폼 입니다.</p><p>아이오닉을 기반으로 둔 cordova 의 상위 버전이라 할 수 있습니다.</p><p>대부분의 ionic, cordova 플러그인을 지원합니다.</p><p>cordova는 안드로이드 스튜디오, 그래들, 자바 최신버전으로 구동이 불가능 할 수 있습니다.</p><p>capacitor는 최신 버전으로도 구동이 가능합니다.</p><p><a href="https://capacitorjs.com/" target="_blank">공식 홈페이지</a></p><h2 id="capacitor-android-준비" tabindex="-1"><a class="header-anchor" href="#capacitor-android-준비" aria-hidden="true">#</a> Capacitor Android 준비</h2><p>Quasar에서도 capacitor, cordova 모두 지원합니다. 이번에는 capacitor를 이용한 모바일 앱을 만들어 보겠습니다.</p><p>안드로이드 부터 시작하겠습니다.</p><h3 id="_1-안드로이드-홈페이지-에서-최신버전-안드로이드-스튜디오를-다운로드하여-설치합니다" tabindex="-1"><a class="header-anchor" href="#_1-안드로이드-홈페이지-에서-최신버전-안드로이드-스튜디오를-다운로드하여-설치합니다" aria-hidden="true">#</a> 1. <a href="https://developer.android.com/studio" target="_blank">안드로이드 홈페이지</a> 에서 최신버전 안드로이드 스튜디오를 다운로드하여 설치합니다.</h3><h3 id="_2-java-17-os에-맞는-버전을-다운로드-하여-설치합니다" tabindex="-1"><a class="header-anchor" href="#_2-java-17-os에-맞는-버전을-다운로드-하여-설치합니다" aria-hidden="true">#</a> 2. <a href="https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html" target="_blank"> Java 17 </a> OS에 맞는 버전을 다운로드 하여 설치합니다.</h3><h3 id="_3-환경-변수-설정을-해주겠습니다-cmd에-다음과-같이-입력해주세요" tabindex="-1"><a class="header-anchor" href="#_3-환경-변수-설정을-해주겠습니다-cmd에-다음과-같이-입력해주세요" aria-hidden="true">#</a> 3. 환경 변수 설정을 해주겠습니다. cmd에 다음과 같이 입력해주세요.</h3><p><code>ANDROID_HOME</code> 은 더 이상 사용되지 않는다고 하지만 같이 설정해주겠습니다.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># macos</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ANDROID_HOME</span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$HOME</span>/Android/Sdk&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ANDROID_SDK_ROOT</span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$HOME</span>/Android/Sdk&quot;</span>
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$ANDROID_SDK_ROOT</span>/tools<span class="token punctuation">;</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$ANDROID_SDK_ROOT</span>/platform-tools

<span class="token comment"># windows</span>
setx ANDROID_HOME <span class="token string">&quot;%USERPROFILE%\\AppData\\Local\\Android\\Sdk&quot;</span>
setx ANDROID_SDK_ROOT <span class="token string">&quot;%USERPROFILE%\\AppData\\Local\\Android\\Sdk&quot;</span>
setx path <span class="token string">&quot;%path%;%ANDROID_SDK_ROOT%<span class="token entity" title="\\t">\\t</span>ools;%ANDROID_SDK_ROOT%\\platform-tools&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AppData\\Local\\Android 혹은 Android/Sdk 가 아닌 C:\\android_sdk 에 있다면 확인해주세요. C:\\android_sdk 로 경로를 지정해주세요.</p><p>사용자 환경 혹은 안드로이드 스튜디오 버전에 따라 경로가 상이할 수 있습니다. 잘 맞추어서 해주시기 바랍니다.</p><h3 id="_4-다음-명령어로-capacitor-개발-서버를-열어주세요" tabindex="-1"><a class="header-anchor" href="#_4-다음-명령어로-capacitor-개발-서버를-열어주세요" aria-hidden="true">#</a> 4. 다음 명령어로 capacitor 개발 서버를 열어주세요.</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ quasar mode <span class="token function">add</span> capacitor
$ quasar dev <span class="token parameter variable">-m</span> capacitor <span class="token parameter variable">-T</span> android
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>정상적으로 구동된다면 안드로이드 스튜디오가 켜지면서 모바일 기기에 웹페이지가 나오는 것을 확인할 수 있습니다.</p><p>자바 버전이 17미만 gradle 버전이 8미만 일 경우 에러가 발생 할 수 있습니다. 에러가 나면 어떤 에러인지 어떻게 해결해야 하는지 상세하게 나오니 참고하여 해결해주시면 되겠습니다.</p><h3 id="_5-다음-명령어로-capacitor-빌드를-해주세요" tabindex="-1"><a class="header-anchor" href="#_5-다음-명령어로-capacitor-빌드를-해주세요" aria-hidden="true">#</a> 5. 다음 명령어로 capacitor 빌드를 해주세요.</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ quasar build <span class="token parameter variable">-m</span> capacitor <span class="token parameter variable">-T</span> android
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>빌드에 성공하면 <code>\\dist\\capacitor\\android\\apk\\release</code>, <code>\\src-capacitor\\android\\app\\build\\outputs\\apk</code> 경로에 app-release-unsigned.apk 가 나타납니다.</p><p>하지만 구글에서는 .apk 가 아닌 .aab 확장자를 가진 파일만 허용합니다.</p><p>아쉽게도 Quasar-capacitor 에서는 .aab 확장자로 빌드하는 것을 지원하지 않습니다.</p><p>gradle로 직접 빌드하여 .aab 확장자로 빌드해보겠습니다.</p><h3 id="_6-다음-명령어로-keystore-파일을-만들어주세요" tabindex="-1"><a class="header-anchor" href="#_6-다음-명령어로-keystore-파일을-만들어주세요" aria-hidden="true">#</a> 6. 다음 명령어로 keystore 파일을 만들어주세요.</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ keytool <span class="token parameter variable">-genkey</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-keystore</span> my-release-key.keystore <span class="token parameter variable">-alias</span> alias_name <span class="token parameter variable">-keyalg</span> RSA <span class="token parameter variable">-keysize</span> <span class="token number">2048</span> <span class="token parameter variable">-validity</span> <span class="token number">20000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>유효 기간이 20,000일인 2,048비트 RSA 키 쌍 및 자체 서명된 인증서(SHA256withRSA)를 만드는 명령어입니다.</p><p>my-release-key 와 alias_name 에는 자신의 프로젝트 이름을 넣거나 원하는 이름을 넣어주시면 됩니다.</p><div class="hint-container tip"><p class="hint-container-title">팁</p><p>keystore 파일이 없으면 신뢰할 수 없는 파일로 분류되어 설치 및 실행이 불가능합니다.<br> 또한 구글 플레이 스토어에 배포하였을때 이 keystore 파일이 없다면 업데이트 등 접근이 불가합니다.</p><p>잃어버리거나 노출되는 일이 없도록 하여야합니다.</p><p>Git에도 올라가지 않게 .gitignore 파일에 추가하여 주세요.</p></div><h3 id="_7-src-capacitor-에-keystore-properties-파일을-생성하고-다음과-문구를-입력해주세요" tabindex="-1"><a class="header-anchor" href="#_7-src-capacitor-에-keystore-properties-파일을-생성하고-다음과-문구를-입력해주세요" aria-hidden="true">#</a> 7. src-capacitor 에 keystore.properties 파일을 생성하고 다음과 문구를 입력해주세요.</h3><p>방금 생성한 keystore 에서 설정한 비밀번호와 alias_name 을 입력하면 됩니다.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">storePassword</span><span class="token operator">=</span>storePassword
<span class="token assign-left variable">keyPassword</span><span class="token operator">=</span>keyPassowrd
<span class="token assign-left variable">keyAlias</span><span class="token operator">=</span>keyAlias
<span class="token assign-left variable">storeFile</span><span class="token operator">=</span>storeFileRoot <span class="token comment"># ../../name.keystore</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>경로가 ../../ 인 이유는 8번 작업의 경로가 <code>\\src-capacitor\\android\\app\\build.gradle</code> 인데 build.gradel 로 부터 keystore.properties 파일을 찾아줘야 하기 때문입니다.</p><h3 id="_8-keystore-properties-파일을-읽게-해주겠습니다" tabindex="-1"><a class="header-anchor" href="#_8-keystore-properties-파일을-읽게-해주겠습니다" aria-hidden="true">#</a> 8. keystore.properties 파일을 읽게 해주겠습니다.</h3><p><code>\\src-capacitor\\android\\app\\build.gradle</code> 에 들어가서 주석으로 add라고 표기한 부분을 모두 추가해주세요.</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;com.android.application&#39;</span>

<span class="token keyword">def</span> keystorePropertiesFile <span class="token operator">=</span> rootProject<span class="token punctuation">.</span><span class="token function">file</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;keystore.properties&quot;</span></span><span class="token punctuation">)</span> <span class="token comment">// add</span>

<span class="token keyword">def</span> keystoreProperties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// add</span>

keystoreProperties<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>keystorePropertiesFile<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// add</span>

android <span class="token punctuation">{</span>
  <span class="token punctuation">...</span>
  defaultConfig <span class="token punctuation">{</span>
    <span class="token punctuation">...</span>
    signingConfigs <span class="token punctuation">{</span> <span class="token comment">// add</span>
      release <span class="token punctuation">{</span>
        storeFile <span class="token function">file</span><span class="token punctuation">(</span>keystoreProperties<span class="token punctuation">[</span><span class="token string">&#39;storeFile&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        keyAlias keystoreProperties<span class="token punctuation">[</span><span class="token string">&#39;keyAlias&#39;</span><span class="token punctuation">]</span>
        keyPassword keystoreProperties<span class="token punctuation">[</span><span class="token string">&#39;keyPassword&#39;</span><span class="token punctuation">]</span>
        storePassword keystoreProperties<span class="token punctuation">[</span><span class="token string">&#39;storePassword&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  buildTypes <span class="token punctuation">{</span>
    release <span class="token punctuation">{</span>
      signingConfig signingConfigs<span class="token punctuation">.</span>release <span class="token comment">// add</span>
      minifyEnabled <span class="token boolean">false</span>
      proguardFiles <span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string">&#39;proguard-android.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;proguard-rules.pro&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-마지막으로-src-capacitor-android-경로에서-다음-release-명령어를-입력하여-build를-해주세요" tabindex="-1"><a class="header-anchor" href="#_9-마지막으로-src-capacitor-android-경로에서-다음-release-명령어를-입력하여-build를-해주세요" aria-hidden="true">#</a> 9. 마지막으로 <code>\\src-capacitor\\android</code> 경로에서 다음 release 명령어를 입력하여 build를 해주세요.</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ./gradlew :app:bundleRelease <span class="token comment"># release 빌드</span>
$ ./gradlew :app:bundleDebug <span class="token comment"># debug 빌드</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>\\src-capacitor\\android\\app\\build\\outputs\\bundle\\release</code> 경로에 app-release.aab 파일이 생성됩니다.<br><code>\\src-capacitor\\android\\app\\build\\outputs\\bundle\\debug</code> 경로에 app-debug.aab 파일이 생성됩니다.</p><p>생성된 파일(release)로 퍼블리싱을 하면 되겠습니다.</p><h2 id="실제-테스트" tabindex="-1"><a class="header-anchor" href="#실제-테스트" aria-hidden="true">#</a> 실제 테스트</h2><p>퍼블리싱에 앞서 실제 모바일로 테스트를 해보아야 합니다.</p><div class="hint-container warning"><p class="hint-container-title">경고</p><p><code>.aab</code> 는 테스트 모바일 기기에 설치가 불가능합니다. .aab 는 구글 플레이스토어 게시를 위한 파일입니다.</p></div><h3 id="첫번째-방법" tabindex="-1"><a class="header-anchor" href="#첫번째-방법" aria-hidden="true">#</a> 첫번째 방법</h3><p><code>quasar build -m capacitor -T android</code> 를 하면 <code>\\dist\\capacitor\\apk\\release</code> 에 <code>app-release.apk</code> 가 생성됩니다.</p><p>이 파일을 테스트 모바일에 다운로드 하고 사용하면 됩니다.</p><p>S3버킷 같은 곳에 올려 파일 다운로드 링크를 생성하거나 USB로 직접 파일을 설치할 수 있습니다.</p><h3 id="두번째-방법" tabindex="-1"><a class="header-anchor" href="#두번째-방법" aria-hidden="true">#</a> 두번째 방법</h3><p>안드로이드 스튜디오로 테스트를 진행할 수 있습니다.</p><p>USB 등을 이용하여 데스크탑과 안드로이드 모바일을 연결하여주세요.</p><p>안드로이드 스튜디오 우측 상단에 기기를 선택하는 곳을 누르면 Avaliable devices 에 <code>Device</code> 혹은 자신의 휴대기기 이름으로 되어있는 것이 보일겁니다.</p><p>클릭을 하고, 옆에 Run 버튼을 눌러주시면 모바일 기기에 설치가 됩니다.</p><h2 id="아이콘-설정하기" tabindex="-1"><a class="header-anchor" href="#아이콘-설정하기" aria-hidden="true">#</a> 아이콘 설정하기</h2><p>Quasar 는 favicon을 쉽게 generate 해주는 <code>Icongenie</code> 를 지원합니다.</p><p>자세한 내용은 <a href="https://o-h-y-o.github.io/ko/posts/quasar/start-project-quasar.html">Icongenie 로 favicon 생성하기</a> 를 참고해주세요.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ icongenie generate <span class="token parameter variable">-m</span> capacitor <span class="token parameter variable">-i</span> /path/to/source/logo.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>아이콘 생성에 성공하면 다음과 같이 Android 와 IOS에 최적화된 이미지를 만들어낼 수 있습니다.<br> 별도로 더 추가할 사항은 없습니다.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="capacitor-ios-빌드하기" tabindex="-1"><a class="header-anchor" href="#capacitor-ios-빌드하기" aria-hidden="true">#</a> Capacitor IOS 빌드하기</h2>`,63),l=[r];function d(p,c){return n(),s("div",null,l)}const u=a(i,[["render",d],["__file","capacitor.html.vue"]]);export{u as default};
