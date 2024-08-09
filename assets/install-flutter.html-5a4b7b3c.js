import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as u,c as p,a as e,b as n,e as o,w as a,f as r}from"./app-829d1310.js";const h={},b=e("h1",{id:"flutter-설치",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#flutter-설치","aria-hidden":"true"},"#"),n(" Flutter 설치")],-1),_=e("h2",{id:"flutter-다운로드",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#flutter-다운로드","aria-hidden":"true"},"#"),n(" Flutter 다운로드")],-1),m={href:"https://docs.flutter.dev/get-started/install",target:"_blank",rel:"noopener noreferrer"},f=e("p",null,"해당 링크를 들어가서 자신의 운영체제에 맞는 것을 찾아서 다운로드를 받고, 압축 해제를 해주세요.",-1),v=e("br",null,null,-1),k=e("h2",{id:"환경변수-설정",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#환경변수-설정","aria-hidden":"true"},"#"),n(" 환경변수 설정")],-1),g=e("p",null,[n("Window의 경우 환경 변수를 들어가서 사용자 변수에 "),e("code",null,"path"),n("에 flutter를 압축 해제한 경로에서 "),e("code",null,"/bin"),n(" 을 추가하여 적은 뒤 생성해주세요.")],-1),x=e("p",null,"Mac의 경우 터미널을 열어주고 터미널에 맞게 환경 변수를 추가해주세요.",-1),A=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"touch"),n(` ~/.zshrc
`),e("span",{class:"token function"},"open"),n(` ~/.zshrc

`),e("span",{class:"token comment"},'# 열린 파일에 export PATH="$PATH:경로/bin"'),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),y=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"touch"),n(` ~/.bash_profile
`),e("span",{class:"token function"},"open"),n(` ~/.bash_profile

`),e("span",{class:"token comment"},'# 열린 파일에 export PATH="$PATH:경로/bin"'),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),F=r('<br><h3 id="flutter가-잘-설치되었는지-확인하는-방법" tabindex="-1"><a class="header-anchor" href="#flutter가-잘-설치되었는지-확인하는-방법" aria-hidden="true">#</a> Flutter가 잘 설치되었는지 확인하는 방법</h3><p><code>cmd</code> 에서 <code>flutter doctor</code> 를 입력해주세요.</p><p>Flutter 개발에 필요한 세팅이 되어있는지 체크해줍니다.</p><p>경고가 나온다면 뒤에 run: XXXXXXX 라고 나올텐데 그대로 복사 후 붙여넣기를 해주고 모두 동의를 해주면 됩니다.</p><br><h2 id="android-studio-다운로드" tabindex="-1"><a class="header-anchor" href="#android-studio-다운로드" aria-hidden="true">#</a> Android Studio 다운로드</h2>',7),S={href:"https://developer.android.com/codelabs/basic-android-kotlin-compose-install-android-studio?hl=ko#1",target:"_blank",rel:"noopener noreferrer"},T=r(`<p><code>Android Studio</code> 를 같이 설치해주세요.<br> 설치가 되었다면, Plugins를 들어가 <code>Flutter</code> 플러그인을 설치해주세요. <code>Dart</code>도 같이 설치됩니다.</p><p>그리고 File → Settings → Appearance &amp; Behavior → System Settings → Android SDK 에 들어가서<br><code>SDK Tools</code> 탭으로 들어간 후 <code>Android SDK Command-line Tools(latest)</code> 를 체크하고 <code>Apply</code>를 눌러주세요.</p><br><h3 id="flutter-프로젝트-생성" tabindex="-1"><a class="header-anchor" href="#flutter-프로젝트-생성" aria-hidden="true">#</a> Flutter 프로젝트 생성</h3><p>File → New Flutter Project → (Generators) Flutter 를 선택하고 플러터 압축 해제한 경로를 넣어주고 다음을 누르고, 프로젝트 이름을 적고 생성하면 됩니다.</p><p>이름만 적고 다른 설정은 건들지 않아도 됩니다.</p><h3 id="lint-끄는-방법" tabindex="-1"><a class="header-anchor" href="#lint-끄는-방법" aria-hidden="true">#</a> lint 끄는 방법</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token key atrule">prefer_typing_uninitialized_variables</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">prefer_const_constructors</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">prefer_const_constructors_in_immutables</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">avoid_print</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>analysis_options.yml</code>에 해당 코드를 넣어주세요.</p><br>`,10);function X(P,z){const l=i("ExternalLinkIcon"),d=i("CodeTabs");return u(),p("div",null,[b,_,e("p",null,[e("a",m,[n("https://docs.flutter.dev/get-started/install"),o(l)])]),f,v,k,g,x,o(d,{id:"22",data:[{id:"zsh"},{id:"bash"}],active:0},{title0:a(({value:s,isActive:t})=>[n("zsh")]),title1:a(({value:s,isActive:t})=>[n("bash")]),tab0:a(({value:s,isActive:t})=>[A]),tab1:a(({value:s,isActive:t})=>[y]),_:1}),F,e("p",null,[e("a",S,[n("https://developer.android.com/codelabs/basic-android-kotlin-compose-install-android-studio"),o(l)])]),T])}const w=c(h,[["render",X],["__file","install-flutter.html.vue"]]);export{w as default};