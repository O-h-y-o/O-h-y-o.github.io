import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as e,c as o,a as n,b as s,e as c,f as l}from"./app-864f7ff2.js";const i={},u=n("h1",{id:"카카오-맵-구현하기-typescript",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#카카오-맵-구현하기-typescript","aria-hidden":"true"},"#"),s(" 카카오 맵 구현하기 (Typescript)")],-1),k=n("p",null,"우선 카카오 개발자 센터를 들어가서 앱 등록을 해주세요.",-1),r={href:"https://developers.kakao.com",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>플랫폼에 들어가 사용할 플랫폼을 등록해줍니다.</p><p>앱키에서 Javascript 키를 복사하여 다음 코드에 넣어서 <code>index.html</code>에 넣어주세요.</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- index.html --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span>
    <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text/javascript<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>//dapi.kakao.com/v2/maps/sdk.js?appkey={Javascript Key}&amp;libraries=services<span class="token punctuation">&quot;</span></span>
  <span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><br> <br></p><p>다음은 navigator.geolocation과 kakao API를 이용하여 주소를 구하는 예제입니다. <code>ex) 서울 동작구</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IGeoLocationResponse</span> <span class="token punctuation">{</span>
  address_name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  building_name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  main_building_no<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  region_1depth_name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  region_2depth_name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  region_3depth_name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  road_name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  sub_building_no<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  underground_yn<span class="token operator">:</span> <span class="token string">&quot;Y&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;N&quot;</span><span class="token punctuation">;</span>
  zone_no<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> getGeoLocation <span class="token operator">=</span> <span class="token punctuation">(</span>coords<span class="token operator">:</span> <span class="token punctuation">{</span>
  lat<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  lng<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>IGeoLocationResponse<span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> geocoder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">.</span>kakao<span class="token punctuation">.</span>maps<span class="token punctuation">.</span>services<span class="token punctuation">.</span><span class="token function">Geocoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> coord <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">window</span><span class="token punctuation">.</span>kakao<span class="token punctuation">.</span>maps<span class="token punctuation">.</span><span class="token function">LatLng</span><span class="token punctuation">(</span>coords<span class="token punctuation">.</span>lat<span class="token punctuation">,</span> coords<span class="token punctuation">.</span>lng<span class="token punctuation">)</span><span class="token punctuation">;</span>

    geocoder<span class="token punctuation">.</span><span class="token function">coord2Address</span><span class="token punctuation">(</span>
      coord<span class="token punctuation">.</span><span class="token function">getLng</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      coord<span class="token punctuation">.</span><span class="token function">getLat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token comment">// eslint-disable-next-line @typescript-eslint/no-explicit-any</span>
      <span class="token punctuation">(</span>result<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> status<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">===</span> window<span class="token punctuation">.</span>kakao<span class="token punctuation">.</span>maps<span class="token punctuation">.</span>services<span class="token punctuation">.</span>Status<span class="token punctuation">.</span><span class="token constant">OK</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>road_address<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&quot;주소를 찾는데 실패하였습니다.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

navigator<span class="token punctuation">.</span>geolocation<span class="token punctuation">.</span><span class="token function">getCurrentPosition</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>position<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getGeoLocation</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    lat<span class="token operator">:</span> position<span class="token punctuation">.</span>coords<span class="token punctuation">.</span>latitude<span class="token punctuation">,</span>
    lng<span class="token operator">:</span> position<span class="token punctuation">.</span>coords<span class="token punctuation">.</span>longitude<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  currentPosition<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>res<span class="token punctuation">.</span>region_1depth_name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>res<span class="token punctuation">.</span>region_2depth_name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>다음은 kakao API의 addressSearch를 이용하여 지도를 그리고 마커를 찍는 간단한 예제입니다.</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- KakaoMap.vue --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mapElement<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> getAddressSearch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;src/util/functions&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> mapElement <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLElement<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> getAddressSearch <span class="token operator">=</span> <span class="token punctuation">(</span>
  <span class="token literal-property property">address</span><span class="token operator">:</span> string
<span class="token punctuation">)</span><span class="token operator">:</span> Promise<span class="token operator">&lt;</span><span class="token punctuation">{</span> <span class="token literal-property property">lat</span><span class="token operator">:</span> number<span class="token punctuation">;</span> lng<span class="token operator">:</span> number <span class="token punctuation">}</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> geocoder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">window<span class="token punctuation">.</span>kakao<span class="token punctuation">.</span>maps<span class="token punctuation">.</span>services<span class="token punctuation">.</span>Geocoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// eslint-disable-next-line @typescript-eslint/no-explicit-any</span>
    geocoder<span class="token punctuation">.</span><span class="token function">addressSearch</span><span class="token punctuation">(</span>address<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">result</span><span class="token operator">:</span> any<span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">===</span> window<span class="token punctuation">.</span>kakao<span class="token punctuation">.</span>maps<span class="token punctuation">.</span>services<span class="token punctuation">.</span>Status<span class="token punctuation">.</span><span class="token constant">OK</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">lat</span><span class="token operator">:</span> <span class="token function">Number</span><span class="token punctuation">(</span>result<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token literal-property property">lng</span><span class="token operator">:</span> <span class="token function">Number</span><span class="token punctuation">(</span>result<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&quot;주소를 찾는데 실패하였습니다.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> latLng <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getAddressSearch</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>address<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> mapOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">window<span class="token punctuation">.</span>kakao<span class="token punctuation">.</span>maps<span class="token punctuation">.</span>LatLng</span><span class="token punctuation">(</span>latLng<span class="token punctuation">.</span>lat<span class="token punctuation">,</span> latLng<span class="token punctuation">.</span>lng<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">level</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">window<span class="token punctuation">.</span>kakao<span class="token punctuation">.</span>maps<span class="token punctuation">.</span>Map</span><span class="token punctuation">(</span>mapElement<span class="token punctuation">.</span>value<span class="token punctuation">,</span> mapOptions<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> marker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">window<span class="token punctuation">.</span>kakao<span class="token punctuation">.</span>maps<span class="token punctuation">.</span>Marker</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">window<span class="token punctuation">.</span>kakao<span class="token punctuation">.</span>maps<span class="token punctuation">.</span>LatLng</span><span class="token punctuation">(</span>latLng<span class="token punctuation">.</span>lat<span class="token punctuation">,</span> latLng<span class="token punctuation">.</span>lng<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  marker<span class="token punctuation">.</span><span class="token function">setMap</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Typescript</code>의 경우에 window객체에 kakao를 추가하지 않으면 타입스크립트 에러가 발생합니다. 다음과 같이 추가해주세요.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// global.d.ts</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">declare</span> global <span class="token punctuation">{</span>
  <span class="token keyword">interface</span> <span class="token class-name">Window</span> <span class="token punctuation">{</span>
    <span class="token comment">// eslint-disable-next-line @typescript-eslint/no-explicit-any</span>
    kakao<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function v(m,b){const a=p("ExternalLinkIcon");return e(),o("div",null,[u,k,n("p",null,[n("a",r,[s("https://developers.kakao.com"),c(a)])]),d])}const w=t(i,[["render",v],["__file","kakao-map.html.vue"]]);export{w as default};
