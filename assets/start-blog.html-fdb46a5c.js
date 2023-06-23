import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as r,c as u,e as l,w as a,a as e,b as n,f as p}from"./app-61545c3a.js";const m={},v=e("h1",{id:"vuepress-theme-로-블로그-만들기",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vuepress-theme-로-블로그-만들기","aria-hidden":"true"},"#"),n(" Vuepress Theme 로 블로그 만들기")],-1),h=e("p",null,"Let's create a development blog with the Vuepress Hope theme.",-1),b=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"pnpm"),n(" create vuepress-theme-hope "),e("span",{class:"token punctuation"},"["),n("dir"),e("span",{class:"token punctuation"},"]"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),g=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"yarn"),n(" create vuepress-theme-hope "),e("span",{class:"token punctuation"},"["),n("dir"),e("span",{class:"token punctuation"},"]"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),f=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"npm"),n(" init vuepress-theme-hope "),e("span",{class:"token punctuation"},"["),n("dir"),e("span",{class:"token punctuation"},"]"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),k=p(`<ul><li>In [dir], you must put the name of the actual folder you want to create.</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>language
package manager
Project Name
Project version
Project description
license
multiple languages
github workflow
type of project
initialize repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>You have to make about 10 choices.</li></ul><br><br><p>When the project is created, go to the GitHub homepage and create a github public repo with the name <code>username.github.io</code>.</p><div class="hint-container info"><p class="hint-container-title">Info</p><p>Create a repo, go to Settings tab =&gt; Actions =&gt; General, change the Workflow permissions option to <code>Read and write permissions</code> and click Save.</p></div><p>I&#39;ll open a terminal in the project created with vuepress and connect to the git repository.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> init
$ <span class="token function">git</span> remote <span class="token function">add</span> origin <span class="token punctuation">[</span>url<span class="token punctuation">]</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-m</span> master main
$ <span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;message&quot;</span>
$ <span class="token function">git</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you get a branch error in git push, please enter the following command.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> push --set-upstream origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>vuepress hope provides a github actions template by default.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- name: Install pnpm
  uses: pnpm/action-setup@v2
  with:
    run_install: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>There is something called <code>Install pnpm</code> in the middle, and you need to put the version as follows.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- name: Install pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8
    run_install: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you have uploaded everything up to this point in the git repo, a new branch called gh-pages should have been created if you did not modify the .yml file separately during the build.</p><p>This time, I will go to Settings tab =&gt; Pages and change Branch to gh-pages in Build and deployment and Save.</p>`,17),_={href:"http://username.github.io",target:"_blank",rel:"noopener noreferrer"};function x(w,y){const o=t("CodeTabs"),d=t("ExternalLinkIcon");return r(),u("div",null,[v,h,l(o,{id:"6",data:[{id:"pnpm"},{id:"yarn"},{id:"npm"}],active:0,"tab-id":"shell"},{title0:a(({value:s,isActive:i})=>[n("pnpm")]),title1:a(({value:s,isActive:i})=>[n("yarn")]),title2:a(({value:s,isActive:i})=>[n("npm")]),tab0:a(({value:s,isActive:i})=>[b]),tab1:a(({value:s,isActive:i})=>[g]),tab2:a(({value:s,isActive:i})=>[f]),_:1}),k,e("p",null,[n("After waiting for a while, go to "),e("a",_,[n("username.github.io"),l(d)]),n(" and you will see a pretty home page.")])])}const $=c(m,[["render",x],["__file","start-blog.html.vue"]]);export{$ as default};