import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-c4fc6554.js";const e={},p=t(`<h1 id="nodejs-cors-설정하기" tabindex="-1"><a class="header-anchor" href="#nodejs-cors-설정하기" aria-hidden="true">#</a> Nodejs cors 설정하기</h1><p>부연설명없이 크게 설정을 많이 하지않으니 바로 코드만 적겠습니다.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// src/middleware/cors</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> NextFunction<span class="token punctuation">,</span> Request<span class="token punctuation">,</span> Response <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;express&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">corsMiddleware</span> <span class="token operator">=</span> <span class="token punctuation">(</span>req<span class="token operator">:</span> Request<span class="token punctuation">,</span> res<span class="token operator">:</span> Response<span class="token punctuation">,</span> next<span class="token operator">:</span> NextFunction<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> allowedOrigins <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;url&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;Access-Control-Allow-Origin&quot;</span><span class="token punctuation">,</span> allowedOrigins<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &#39;*&#39;를 넣으면 전체 허용합니다.</span>
  res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span>
    <span class="token string">&quot;Access-Control-Allow-Headers&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Origin, X-Requested-With, Content-Type, Accept&quot;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// header에 다른 값을 허용하고싶으면 추가로 적어주세요.</span>
  res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span>
    <span class="token string">&quot;Access-Control-Allow-Methods&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;GET, PUT, UPDATE, PATCH, POST, DELETE&quot;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> corsMiddleware<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// app.ts</span>
<span class="token keyword">import</span> express<span class="token punctuation">,</span> <span class="token punctuation">{</span> Express <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;express&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> corsMiddleware <span class="token keyword">from</span> <span class="token string">&quot;src/middleware/cors&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app<span class="token operator">:</span> Express <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>corsMiddleware<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 만약 corsMiddleware에서 설정한 Methods들이 정상적으로 작동되지않으면 아래 코드를 추가해주세요.</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token function">cors</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    origin<span class="token operator">:</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">,</span> <span class="token comment">// url</span>
    methods<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;DELETE&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;UPDATE&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PUT&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PATCH&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","cors.html.vue"]]);export{d as default};
