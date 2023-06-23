import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c as u,e as l,w as s,a as e,b as n,f as p}from"./app-54a3948f.js";const v={},m=e("h1",{id:"vuepress-theme-로-블로그-만들기",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vuepress-theme-로-블로그-만들기","aria-hidden":"true"},"#"),n(" Vuepress Theme 로 블로그 만들기")],-1),b=e("p",null,"Vuepress hope theme 로 개발 블로그를 만들어보자.",-1),h=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"pnpm"),n(" create vuepress-theme-hope "),e("span",{class:"token punctuation"},"["),n("dir"),e("span",{class:"token punctuation"},"]"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),g=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"yarn"),n(" create vuepress-theme-hope "),e("span",{class:"token punctuation"},"["),n("dir"),e("span",{class:"token punctuation"},"]"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),_=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"npm"),n(" init vuepress-theme-hope "),e("span",{class:"token punctuation"},"["),n("dir"),e("span",{class:"token punctuation"},"]"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),k=p(`<ul><li>[dir] 에는 만들고자하는 실제 폴더 이름을 넣어주어야 합니다.</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>language
package manager
Project Name
Project version
Project description
license
multiple languages
github workflow
type of project
initialize repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>10가지 정도의 선택을 해야합니다.</li></ul><br><br><p>프로젝트가 만들어졌으면, 깃허브 홈페이지로 들어가서 <code>username.github.io</code> 라는 이름으로 github public repo 를 만들어줍니다.</p><div class="hint-container info"><p class="hint-container-title">정보</p><p>repo 를 만들고 Settings 탭 =&gt; Actions =&gt; General 로 들어가서 Workflow permissions의 옵션 중 Read and write permissions 로 바꿔주고 Save를 해줍니다.</p></div><p>vuepress로 만든 프로젝트에서 터미널을 열어주고 깃 저장소에 연결하겠습니다.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> init
$ <span class="token function">git</span> remote <span class="token function">add</span> origin <span class="token punctuation">[</span>url<span class="token punctuation">]</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-m</span> master main
$ <span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;message&quot;</span>
$ <span class="token function">git</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>git push에서 브랜치 에러가 난다면 다음 명령어를 입력해주세요.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> push --set-upstream origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>vuepress hope 에서는 기본적으로 github actions 템플릿을 제공해줍니다.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- name: Install pnpm
  uses: pnpm/action-setup@v2
  with:
    run_install: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>중간쯤에 <code>Install pnpm</code> 이란것이 있는데 다음과 같이 version을 넣어주어야 합니다.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- name: Install pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8
    run_install: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>여기까지 모두 git repo에 올렸으면, 이제 빌드가 되면서 따로 .yml 파일을 수정하지 않았다면 gh-pages 라는 브랜치가 새로 생겼을겁니다.</p><p>이번에는 Settings tab =&gt; Pages 로 들어가 Build and deployment 에서 Branch를 gh-pages로 바꾸고 Save 해주겠습니다.</p>`,17),f={href:"http://username.github.io",target:"_blank",rel:"noopener noreferrer"};function x(w,A){const c=t("CodeTabs"),d=t("ExternalLinkIcon");return o(),u("div",null,[m,b,l(c,{id:"6",data:[{id:"pnpm"},{id:"yarn"},{id:"npm"}],active:0,"tab-id":"shell"},{title0:s(({value:a,isActive:i})=>[n("pnpm")]),title1:s(({value:a,isActive:i})=>[n("yarn")]),title2:s(({value:a,isActive:i})=>[n("npm")]),tab0:s(({value:a,isActive:i})=>[h]),tab1:s(({value:a,isActive:i})=>[g]),tab2:s(({value:a,isActive:i})=>[_]),_:1}),k,e("p",null,[n("잠시 기다린 뒤, "),e("a",f,[n("username.github.io"),l(d)]),n(" 로 들어가면 예쁜 홈페이지가 보일겁니다.")])])}const B=r(v,[["render",x],["__file","start-blog.html.vue"]]);export{B as default};
