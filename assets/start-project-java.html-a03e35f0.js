import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-864f7ff2.js";const i={},p=e(`<h1 id="자바로-백엔드-시작하기" tabindex="-1"><a class="header-anchor" href="#자바로-백엔드-시작하기" aria-hidden="true">#</a> 자바로 백엔드 시작하기</h1><p>자바 언어로 백엔드 API를 만들어보겠습니다.</p><p>시작에 앞서 자바 version 17, IntelliJ IDEA Community 최신 버전을 설치해주세요.</p><p>자바같은 경우에는 환경변수도 추가해주세요.</p><p><code>ex) 시스템변수 =&gt; 새로 만들기 =&gt; 변수 이름 = JAVA_HOME / 변수 값 = C:\\Program Files\\Java\\jdk-17</code></p><p>다음으로 IntelliJ 를 실행시키고 새 프로젝트를 만들어주세요.<br> 적당한 폴더 이름과 경로를 잘 지정해주고 언어는 자바, 빌드시스템은 Gradle, JDK는 17 (Oracle OpenJDK), Gradle DSL은 Groovy로 설정해주세요.</p><p><code>src/main/java/org.example</code> 경로에 들어와서 Application.java 클래스를 생성해주세요. org.example 폴더 오른쪽클릭 =&gt; new =&gt; Java Class 를 누르고 파일 이름을 적으면 됩니다. 스프링부트로 실행시킬 메인 파일을 생성하는 것입니다.</p><p><code>build.gradle</code> 파일을 찾아서 다음 문구를 추가해주세요.</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    id <span class="token string">&#39;org.springframework.boot&#39;</span> version <span class="token string">&#39;3.0.1&#39;</span>
    id <span class="token string">&#39;io.spring.dependency-management&#39;</span> version <span class="token string">&#39;1.1.0&#39;</span>
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-web&#39;</span>
<span class="token punctuation">}</span>

springBoot <span class="token punctuation">{</span>
    mainClass <span class="token operator">=</span> <span class="token string">&#39;org.example.Application&#39;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">팁</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>id &#39;org.springframework.boot&#39; version &#39;3.0.1&#39; 이란 프로젝트를 Spring Boot 프로젝트로 설정하고, 해당 버전의 Spring Boot를 사용하겠다는 의미입니다. 따라서 Spring Boot 프로젝트를 생성하고 관리할 때는 이러한 플러그인 설정을 사용하여 Spring Boot의 기능들을 활용할 수 있습니다.

1. 자동 설정: Spring Boot 프로젝트를 생성하면 기본적으로 필요한 의존성과 설정들이 자동으로 추가됩니다. 예를 들어, spring-boot-starter-web 의존성을 추가하면 웹 애플리케이션을 개발할 때 필요한 여러 라이브러리들이 자동으로 추가됩니다.

2. 실행 가능한 JAR 파일 생성: Spring Boot는 실행 가능한 JAR 파일을 생성할 수 있습니다. 이 JAR 파일에는 애플리케이션 실행에 필요한 모든 의존성이 포함되어 있으며, java -jar 명령으로 간단하게 실행할 수 있습니다.

3. 의존성 관리: Spring Boot는 BOM (Bill of Materials)을 사용하여 의존성 버전을 관리합니다. BOM을 통해 각 의존성들의 버전을 일일이 명시하지 않고도 일관성 있게 버전을 관리할 수 있습니다.

4. DevTools: 개발을 보다 편리하게 하기 위한 도구들을 제공합니다. 예를 들어, 코드 변경 감지와 자동 재시작 등의 기능이 포함됩니다.

5. 프로파일 지원: 다양한 프로파일을 사용하여 환경별로 다른 설정을 쉽게 적용할 수 있습니다.

6. 기타: 많은 기능들이 Spring Boot Gradle 플러그인을 통해 제공되며, 개발 생산성과 애플리케이션의 실행과 배포를 보다 편리하게 만드는데 도움이 됩니다.


id &#39;io.spring.dependency-management&#39; version &#39;1.1.0&#39; 이란 Spring Boot 프로젝트의 의존성 관리를 간편하게 해주는 유틸리티 플러그인입니다.
io.spring.dependency-management 플러그인을 사용하면 각 의존성들의 버전을 일일이 명시하지 않고도 Spring Boot의 BOM에 정의된 버전들을 사용할 수 있게 됩니다. 이렇게 함으로써 버전 관리를 간편하게 하고 호환성을 보장할 수 있습니다.


implementation &#39;org.springframework.boot:spring-boot-starter-web&#39; 은 웹 애플리케이션 개발을 위한 스타터 의존성으로서 다음과 같은 기능들을 포함하고 있습니다:

1. Spring Web: 스프링 프레임워크에서 제공하는 웹 개발 관련 기능들을 포함합니다.

2. Spring Web MVC: 스프링의 웹 MVC 프레임워크로서 웹 애플리케이션의 컨트롤러와 뷰를 지원합니다.

3. Tomcat: 내장형 Tomcat 웹 서버를 사용하여 웹 애플리케이션을 실행할 수 있도록 합니다.

4. 기타: 여러 웹 관련 라이브러리들을 포함하여 웹 애플리케이션 개발에 필요한 기본적인 환경을 제공합니다.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>build.gradle 파일을 수정할때마다 우측 상단부분에 reload를 해야만할거같은 작은 버튼이 생기는데 수정할때마다 눌러주세요.</p><p><code>Application.java</code> 를 다음 코드로 입력해주세요.</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>example</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Application</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>\`\`\`


다음으로 org<span class="token punctuation">.</span>example 폴더에서 controller 폴더를 만들고<span class="token punctuation">,</span> <span class="token class-name">TestController</span><span class="token punctuation">.</span>java 를 만들고 다음 코드를 입력해주세요<span class="token punctuation">.</span>

\`\`\`java
<span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>example<span class="token punctuation">.</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">GetMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/test&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Hello API!&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>이후 Application.java 에서 프로젝트를 실행시켜주세요.</p><p><code>http://localhost:8080/test</code> 경로에 들어가서 <code>Hello API!</code> 문구가 정상적으로 출력되면 성공입니다.</p>`,15),t=[p];function o(l,c){return s(),a("div",null,t)}const u=n(i,[["render",o],["__file","start-project-java.html.vue"]]);export{u as default};
