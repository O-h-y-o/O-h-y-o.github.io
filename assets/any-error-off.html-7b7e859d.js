import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,f as s}from"./app-829d1310.js";const a={},t=s(`<h1 id="타입스크립트-any-타입-경고-무시하기" tabindex="-1"><a class="header-anchor" href="#타입스크립트-any-타입-경고-무시하기" aria-hidden="true">#</a> 타입스크립트 any 타입 경고 무시하기</h1><div class="language-cjs line-numbers-mode" data-ext="cjs"><pre class="language-cjs"><code>module.exports = {
  rules: {
    &quot;@typescript-eslint/no-explicit-any&quot;: &quot;off&quot;, // 추가
  },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>요즘은 기본 설정으로 any가 있으면 에러처리가 되어버리는데 꼭 그래야만 하나 싶긴하다. 타입을 아예 지정하지 못할때도 있는데말이지..</p><p><code>// eslint-disable-next-line @typescript-eslint/no-explicit-any</code></p><p>이런거를 계속 쓸수는 없으니까..</p>`,5),r=[t];function c(d,l){return n(),i("div",null,r)}const p=e(a,[["render",c],["__file","any-error-off.html.vue"]]);export{p as default};
