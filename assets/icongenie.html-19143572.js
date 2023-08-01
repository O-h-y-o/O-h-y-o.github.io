import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c,e as u,w as s,a as n,b as a,f as r}from"./app-3bec446e.js";const d={},v=n("h1",{id:"creating-a-favicon-with-icongenie",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#creating-a-favicon-with-icongenie","aria-hidden":"true"},"#"),a(" Creating a favicon with Icongenie")],-1),k=n("p",null,"Icongenie converts logos and splashes used in browsers, desktop apps, Android apps, and ios apps easily and quickly for each device and situation.",-1),m=n("p",null,[a("Icongenie was created by the Quasar Team, and was originally a "),n("code",null,"Quasar App Extension"),a(", but has been changed to its own CLI and can be used as its own CLI as well as the Quasar framework.")],-1),b=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"pnpm"),a(),n("span",{class:"token function"},"install"),a(),n("span",{class:"token parameter variable"},"-g"),a(` @quasar/icongenie
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),g=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"yarn"),a(" global "),n("span",{class:"token function"},"add"),a(` @quasar/icongenie
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),h=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"npm"),a(),n("span",{class:"token function"},"install"),a(),n("span",{class:"token parameter variable"},"-g"),a(` @quasar/icongenie
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),q=r(`<p>Install icongenie.</p><p>Please prepare an icon to use as a logo.</p><p>The minimum logo size required for icongenie icon conversion is <code>64x64</code> and the recommended size is <code>1024x1024</code>. Converting to a minimum size may result in poor quality images. The file extension must be <code>png</code>.</p><p>Let&#39;s convert it with icongenie. Open a terminal at the root of the project.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
$ icongenie generate <span class="token parameter variable">-i</span> /path/to/icon.png

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>::: codes All commands</p><p>If you type icongenie generate -h in your terminal, you should see a command like this:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ icongenie generate <span class="token parameter variable">-h</span>

  Description
    Generate App icons <span class="token operator">&amp;</span> splash screens

  Usage
    $ icongenie generate <span class="token punctuation">[</span>options<span class="token punctuation">]</span>

    <span class="token comment"># generate icons for all installed Quasar modes</span>
    $ icongenie generate <span class="token parameter variable">-i</span> /path/to/icon.png
    $ icongenie g <span class="token parameter variable">-i</span> /path/to/icon.png

    <span class="token comment"># generate for (as example) PWA mode only</span>
    $ icongenie generate <span class="token parameter variable">-m</span> pwa <span class="token parameter variable">--icon</span> /path/to/icon.png

    <span class="token comment"># generate for (as example) Cordova &amp; Capacitor mode only</span>
    $ icongenie g <span class="token parameter variable">-m</span> cordova,capacitor <span class="token parameter variable">-i</span>
         /path/to/icon.png <span class="token parameter variable">-b</span> /path/to/background.png

    <span class="token comment"># generate by using a profile file</span>
    $ icongenie generate <span class="token parameter variable">-p</span> ./icongenie-profile.json

    <span class="token comment"># generate by using batch of profile files</span>
    $ icongenie generate <span class="token parameter variable">-p</span> ./folder-containing-profile-files

  Options
    --icon, <span class="token parameter variable">-i</span>            Required<span class="token punctuation">;</span>
                          Path to <span class="token builtin class-name">source</span> <span class="token function">file</span> <span class="token keyword">for</span> icon<span class="token punctuation">;</span> must be:
                            - a .png <span class="token function">file</span>
                            - min resolution: 64x64 px <span class="token punctuation">(</span>the higher the better<span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">)</span>
                            - with transparency
                          Best results are with a square image <span class="token punctuation">(</span>height <span class="token operator">=</span> width<span class="token punctuation">)</span>
                          Image will be trimmed automatically
                            <span class="token punctuation">(</span>also see <span class="token string">&quot;skip-trim&quot;</span> and <span class="token string">&quot;padding&quot;</span> param<span class="token punctuation">)</span>
                          Path can be absolute, or relative to the root of the
                            Quasar project folder
                          Recommended min size: 1024x1024 px

    --background, <span class="token parameter variable">-b</span>      Path to optional background <span class="token builtin class-name">source</span> <span class="token function">file</span> <span class="token punctuation">(</span>for splash screens<span class="token punctuation">)</span><span class="token punctuation">;</span>
                          must be:
                            - a .png <span class="token function">file</span>
                            - min resolution: 128x128 px <span class="token punctuation">(</span>the higher the better<span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">)</span>
                            - transparency is optional <span class="token punctuation">(</span>but recommended <span class="token keyword">if</span> you
                              combine with the splashscreen-color param<span class="token punctuation">)</span>
                          Path can be absolute, or relative to the root of the
                            Quasar project folder
                          Recommended min size: 1024x1024 px

    --mode, <span class="token parameter variable">-m</span>            For <span class="token function">which</span> Quasar mode<span class="token punctuation">(</span>s<span class="token punctuation">)</span> to generate the assets<span class="token punctuation">;</span>
                          Default: all
                            <span class="token punctuation">[</span>all<span class="token operator">|</span>spa<span class="token operator">|</span>pwa<span class="token operator">|</span>ssr<span class="token operator">|</span>bex<span class="token operator">|</span>cordova<span class="token operator">|</span>capacitor<span class="token operator">|</span>electron<span class="token punctuation">]</span>
                          Multiple can be specified, separated by <span class="token string">&quot;,&quot;</span><span class="token builtin class-name">:</span>
                            spa,cordova

    --filter, <span class="token parameter variable">-f</span>          Filter the available generators<span class="token punctuation">;</span> when used, it can
                          generate only one <span class="token builtin class-name">type</span> of asset instead of all
                            <span class="token punctuation">[</span>png<span class="token operator">|</span>ico<span class="token operator">|</span>icns<span class="token operator">|</span>splashscreen<span class="token operator">|</span>svg<span class="token punctuation">]</span>

    <span class="token parameter variable">--quality</span>             Quality of the files <span class="token punctuation">[</span><span class="token number">1</span> - <span class="token number">12</span><span class="token punctuation">]</span> <span class="token punctuation">(</span>default: <span class="token number">5</span><span class="token punctuation">)</span>
                            - higher quality --<span class="token operator">&gt;</span> bigger filesize <span class="token operator">&amp;</span> slower to create
                            - lower quality  --<span class="token operator">&gt;</span> smaller filesize <span class="token operator">&amp;</span> faster to create

    --skip-trim           Do not trim the icon <span class="token builtin class-name">source</span> <span class="token function">file</span>

    <span class="token parameter variable">--padding</span>             Apply fixed padding to the icon after trimming it<span class="token punctuation">;</span>
                          Syntax: <span class="token operator">&lt;</span>horiz: number<span class="token operator">&gt;</span>,<span class="token operator">&lt;</span>vert: number<span class="token operator">&gt;</span>
                          Default: <span class="token number">0,0</span>
                          Example: <span class="token string">&quot;--padding 10,5&quot;</span> means apply 10px padding to <span class="token function">top</span>
                            10px to bottom, 5px to left side and 5px to rightside

    --theme-color         Theme color to use <span class="token keyword">for</span> all generators requiring a color<span class="token punctuation">;</span>
                          It gets overridden <span class="token keyword">if</span> any generator color is also specified<span class="token punctuation">;</span>
                          The color must be <span class="token keyword">in</span> hex <span class="token function">format</span> <span class="token punctuation">(</span>NOT hexa<span class="token punctuation">)</span> without the leading
                          <span class="token string">&#39;#&#39;</span> character. Transparency not allowed.
                          Examples: 1976D2, eee

    --svg-color           Color to use <span class="token keyword">for</span> the generated monochrome svgs
                          Default <span class="token punctuation">(</span>if no theme-color is specified<span class="token punctuation">)</span>: 1976D2
                          The color must be <span class="token keyword">in</span> hex <span class="token function">format</span> <span class="token punctuation">(</span>NOT hexa<span class="token punctuation">)</span> without the leading
                          <span class="token string">&#39;#&#39;</span> character. Transparency not allowed.
                          Examples: 1976D2, eee

    --png-color           Background color to use <span class="token keyword">for</span> the png generator, when
                          <span class="token string">&quot;background: true&quot;</span> <span class="token keyword">in</span> the asset definition <span class="token punctuation">(</span>like <span class="token keyword">for</span>
                          the cordova/capacitor iOS icons<span class="token punctuation">)</span><span class="token punctuation">;</span>
                          Default <span class="token punctuation">(</span>if no theme-color is specified<span class="token punctuation">)</span>: fff
                          The color must be <span class="token keyword">in</span> hex <span class="token function">format</span> <span class="token punctuation">(</span>NOT hexa<span class="token punctuation">)</span> without the leading
                          <span class="token string">&#39;#&#39;</span> character. Transparency not allowed.
                          Examples: 1976D2, eee

    --splashscreen-color  Background color to use <span class="token keyword">for</span> the splashscreen generator<span class="token punctuation">;</span>
                          Default <span class="token punctuation">(</span>if no theme-color is specified<span class="token punctuation">)</span>: fff
                          The color must be <span class="token keyword">in</span> hex <span class="token function">format</span> <span class="token punctuation">(</span>NOT hexa<span class="token punctuation">)</span> without the leading
                          <span class="token string">&#39;#&#39;</span> character. Transparency not allowed.
                          Examples: 1976D2, eee

    --splashscreen-icon-ratio  Ratio of icon size <span class="token keyword">in</span> respect to the width or height
                               <span class="token punctuation">(</span>whichever is smaller<span class="token punctuation">)</span> of the resulting splashscreen<span class="token punctuation">;</span>
                               Represents percentages<span class="token punctuation">;</span> Valid values: <span class="token number">0</span> - <span class="token number">100</span>
                               If <span class="token number">0</span> <span class="token keyword">then</span> it doesn&#39;t <span class="token function">add</span> the icon of <span class="token function">top</span> of background
                               Default: <span class="token number">40</span>

    --profile, <span class="token parameter variable">-p</span>         Use JSON profile file<span class="token punctuation">(</span>s<span class="token punctuation">)</span>:
                            - path to folder <span class="token punctuation">(</span>absolute or relative to current folder<span class="token punctuation">)</span>
                              that contains JSON profile files <span class="token punctuation">(</span>icongenie-*.json<span class="token punctuation">)</span>
                            - path to a single *.json profile <span class="token function">file</span> <span class="token punctuation">(</span>absolute or relative
                              to current folder<span class="token punctuation">)</span>
                          Structure of a JSON profile file:
                            <span class="token punctuation">{</span>
                              <span class="token string">&quot;params&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                                <span class="token string">&quot;include&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">..</span>. <span class="token punctuation">]</span>, /* optional */
                                <span class="token punctuation">..</span>.
                              <span class="token punctuation">}</span>,
                              <span class="token string">&quot;assets&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> /* list of custom assets */ <span class="token punctuation">]</span>
                            <span class="token punctuation">}</span>

    --help, <span class="token parameter variable">-h</span>            Displays this message
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><p>Specify the path of the icon to be converted well.<br> If there is an icon in the public folder, enter the path as follows.<br><code>./public/icon.png</code></p><p>If the path is specified correctly, the icon will be generated and displayed as follows.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>📦icons
┣ 📜apple-icon-120x120.png
┣ 📜apple-icon-152x152.png
┣ 📜apple-icon-167x167.png
┣ 📜apple-icon-180x180.png
┣ 📜apple-launch-1080x2340.png
┣ 📜apple-launch-1125x2436.png
┣ 📜apple-launch-1170x2532.png
┣ 📜apple-launch-1179x2556.png
┣ 📜apple-launch-1242x2208.png
┣ 📜apple-launch-1242x2688.png
┣ 📜apple-launch-1284x2778.png
┣ 📜apple-launch-1290x2796.png
┣ 📜apple-launch-1536x2048.png
┣ 📜apple-launch-1620x2160.png
┣ 📜apple-launch-1668x2224.png
┣ 📜apple-launch-1668x2388.png
┣ 📜apple-launch-2048x2732.png
┣ 📜apple-launch-750x1334.png
┣ 📜apple-launch-828x1792.png
┣ 📜favicon-128x128.png
┣ 📜favicon-16x16.png
┣ 📜favicon-32x32.png
┣ 📜favicon-96x96.png
┣ 📜favicon.ico
┣ 📜icon-128x128.png
┣ 📜icon-192x192.png
┣ 📜icon-256x256.png
┣ 📜icon-384x384.png
┣ 📜icon-512x512.png
┣ 📜ms-icon-144x144.png
┗ 📜safari-pinned-tab.svg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now let&#39;s apply it to the html file.<br> Put that code inside the head tag.</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/ico<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/favicon.ico<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/png<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>128x128<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/favicon-128x128.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/png<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>96x96<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/favicon-96x96.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/png<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>32x32<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/favicon-32x32.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/png<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>16x16<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/favicon-16x16.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- iPhone XR --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple-touch-startup-image<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/apple-launch-828x1792.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- iPhone X, XS --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple-touch-startup-image<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/apple-launch-1125x2436.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- iPhone XS Max --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple-touch-startup-image<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/apple-launch-1242x2688.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- iPhone 8, 7, 6s, 6 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple-touch-startup-image<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/apple-launch-750x1334.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple-touch-startup-image<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/apple-launch-1242x2208.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- iPhone 5 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple-touch-startup-image<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/apple-launch-640x1136.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- iPad Mini, Air, 9.7&quot; --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple-touch-startup-image<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/apple-launch-1536x2048.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- iPad Pro 10.5&quot; --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple-touch-startup-image<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/apple-launch-1668x2224.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- iPad Pro 11&quot; --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple-touch-startup-image<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/apple-launch-1668x2388.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- iPad Pro 12.9&quot; --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>apple-touch-startup-image<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons/apple-launch-2048x2732.png<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>These images are now available in <code>PWA</code> mode.<br> I will write about <code>PWA</code> in another post.</p>`,15);function f(x,w){const p=l("CodeTabs");return o(),c("div",null,[v,k,m,u(p,{id:"9",data:[{id:"pnpm"},{id:"yarn"},{id:"npm"}],active:0,"tab-id":"shell"},{title0:s(({value:e,isActive:t})=>[a("pnpm")]),title1:s(({value:e,isActive:t})=>[a("yarn")]),title2:s(({value:e,isActive:t})=>[a("npm")]),tab0:s(({value:e,isActive:t})=>[b]),tab1:s(({value:e,isActive:t})=>[g]),tab2:s(({value:e,isActive:t})=>[h]),_:1}),q])}const P=i(d,[["render",f],["__file","icongenie.html.vue"]]);export{P as default};
