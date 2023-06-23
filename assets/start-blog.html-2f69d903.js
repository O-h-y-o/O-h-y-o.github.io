import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as d,c as r,e as u,w as s,a as e,b as n,f as o}from"./app-be181259.js";const p={},v=e("h1",{id:"vuepress-theme-로-블로그-만들기",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vuepress-theme-로-블로그-만들기","aria-hidden":"true"},"#"),n(" Vuepress Theme 로 블로그 만들기")],-1),m=e("p",null,"Vuepress hope theme 로 개발 블로그를 만들어보자.",-1),b=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"pnpm"),n(" create vuepress-theme-hope "),e("span",{class:"token punctuation"},"["),n("dir"),e("span",{class:"token punctuation"},"]"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),h=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"yarn"),n(" create vuepress-theme-hope "),e("span",{class:"token punctuation"},"["),n("dir"),e("span",{class:"token punctuation"},"]"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),g=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"npm"),n(" init vuepress-theme-hope "),e("span",{class:"token punctuation"},"["),n("dir"),e("span",{class:"token punctuation"},"]"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),k=o(`<ul><li>[dir] 에는 만들고자하는 실제 폴더 이름을 넣어주어야 합니다.</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>language
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15);function _(f,x){const t=c("CodeTabs");return d(),r("div",null,[v,m,u(t,{id:"6",data:[{id:"pnpm"},{id:"yarn"},{id:"npm"}],active:0,"tab-id":"shell"},{title0:s(({value:a,isActive:i})=>[n("pnpm")]),title1:s(({value:a,isActive:i})=>[n("yarn")]),title2:s(({value:a,isActive:i})=>[n("npm")]),tab0:s(({value:a,isActive:i})=>[b]),tab1:s(({value:a,isActive:i})=>[h]),tab2:s(({value:a,isActive:i})=>[g]),_:1}),k])}const $=l(p,[["render",_],["__file","start-blog.html.vue"]]);export{$ as default};
