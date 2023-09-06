import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as s,f as e}from"./app-4ae975cb.js";const t={},i=e(`<h1 id="start-project-with-quasar" tabindex="-1"><a class="header-anchor" href="#start-project-with-quasar" aria-hidden="true">#</a> Start project with Quasar</h1><p><code>Quasar strongly recommends using yarn as the package manager.</code></p><p><code>pnpm is not officially supported.</code></p><h2 id="installing-quasar-globally" tabindex="-1"><a class="header-anchor" href="#installing-quasar-globally" aria-hidden="true">#</a> Installing Quasar Globally</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">yarn</span> global <span class="token function">add</span> @quasar/cli
<span class="token comment"># or:</span>
$ <span class="token function">npm</span> i <span class="token parameter variable">-g</span> @quasar/cli
<span class="token comment"># or:</span>
$ <span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-g</span> @quasar/cli <span class="token comment"># experimental support</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="creating-a-project-with-quasar" tabindex="-1"><a class="header-anchor" href="#creating-a-project-with-quasar" aria-hidden="true">#</a> Creating a project with Quasar</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">yarn</span> create quasar
<span class="token comment"># or:</span>
$ <span class="token function">npm</span> init quasar
<span class="token comment"># or:</span>
$ <span class="token function">pnpm</span> create quasar <span class="token comment"># experimental support</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Choose according to the guidelines. <br><br><code>Make it vite. You can have a faster developer experience than webpack.</code></p><h2 id="add-the-following-statement-to-your-package-json-file" tabindex="-1"><a class="header-anchor" href="#add-the-following-statement-to-your-package-json-file" aria-hidden="true">#</a> Add the following statement to your package.json file</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// package.json</span>
<span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;quasar dev&quot;</span><span class="token punctuation">,</span> # Open development server
  <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;quasar build&quot;</span><span class="token punctuation">,</span> # Build
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="make-sure-the-server-is-running-well" tabindex="-1"><a class="header-anchor" href="#make-sure-the-server-is-running-well" aria-hidden="true">#</a> Make sure the server is running well</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">yarn</span> quasar dev
$ <span class="token function">yarn</span> quasar inspect
$ <span class="token function">pnpm</span> run dev
<span class="token comment"># ..etc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),r=[i];function o(l,c){return n(),s("div",null,r)}const u=a(t,[["render",o],["__file","start-project-quasar.html.vue"]]);export{u as default};