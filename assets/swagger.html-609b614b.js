import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-79ff6955.js";const t={},i=e(`<h1 id="nodejs-swagger-api-문서-만들기-typescript" tabindex="-1"><a class="header-anchor" href="#nodejs-swagger-api-문서-만들기-typescript" aria-hidden="true">#</a> Nodejs Swagger API 문서 만들기 (typescript)</h1><p>먼저 패키지 설치를 해주세요.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">yarn</span> <span class="token function">add</span> @types/swagger-jsdoc @types/swagger-ui-express <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>그리고 Swagger를 연동시켜줄 파일을 하나 만들어주세요. 저는 <code>src/middleware/swagger.ts</code>에 만들겠습니다.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// src/middleware/swagger.ts</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> Router <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;express&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> swaggerJSDoc<span class="token punctuation">,</span> <span class="token punctuation">{</span> OAS3Options <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;swagger-jsdoc&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> swaggerUI <span class="token keyword">from</span> <span class="token string">&quot;swagger-ui-express&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> router<span class="token operator">:</span> Router <span class="token operator">=</span> <span class="token function">Router</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> swaggerOptions<span class="token operator">:</span> OAS3Options <span class="token operator">=</span> <span class="token punctuation">{</span>
  definition<span class="token operator">:</span> <span class="token punctuation">{</span>
    openapi<span class="token operator">:</span> <span class="token string">&quot;3.0.0&quot;</span><span class="token punctuation">,</span>
    info<span class="token operator">:</span> <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&quot;API 문서&quot;</span><span class="token punctuation">,</span>
      version<span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    components<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 스키마 정의 예시</span>
      schemas<span class="token operator">:</span> <span class="token punctuation">{</span>
        Example<span class="token operator">:</span> <span class="token punctuation">{</span>
          type<span class="token operator">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
          properties<span class="token operator">:</span> <span class="token punctuation">{</span>
            example1<span class="token operator">:</span> <span class="token punctuation">{</span>
              type<span class="token operator">:</span> String<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            example2<span class="token operator">:</span> <span class="token punctuation">{</span>
              type<span class="token operator">:</span> Number<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            example3<span class="token operator">:</span> <span class="token punctuation">{</span>
              type<span class="token operator">:</span> Object<span class="token punctuation">,</span>
              additionalProperties<span class="token operator">:</span> <span class="token punctuation">{</span>
                type<span class="token operator">:</span> Object<span class="token punctuation">,</span>
                properties<span class="token operator">:</span> <span class="token punctuation">{</span>
                  additionalExample1<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> Number <span class="token punctuation">}</span><span class="token punctuation">,</span>
                  additionalExample2<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> Number <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      securitySchemes<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 토큰 예시</span>
        bearerAuth<span class="token operator">:</span> <span class="token punctuation">{</span>
          type<span class="token operator">:</span> <span class="token string">&quot;apiKey&quot;</span><span class="token punctuation">,</span>
          name<span class="token operator">:</span> <span class="token string">&quot;authorization&quot;</span><span class="token punctuation">,</span>
          scheme<span class="token operator">:</span> <span class="token string">&quot;bearer&quot;</span><span class="token punctuation">,</span>
          <span class="token keyword">in</span><span class="token operator">:</span> <span class="token string">&quot;header&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  apis<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;src/routes/*.ts&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> swaggerSpec <span class="token operator">=</span> <span class="token function">swaggerJSDoc</span><span class="token punctuation">(</span>swaggerOptions<span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">&quot;/api-docs&quot;</span><span class="token punctuation">,</span> swaggerUI<span class="token punctuation">.</span>serve<span class="token punctuation">)</span><span class="token punctuation">;</span>
router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/api-docs&quot;</span><span class="token punctuation">,</span> swaggerUI<span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span>swaggerSpec<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> router<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>만들어둔 스웨거 파일을 app.ts에 등록시켜주겠습니다.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// app.ts</span>
<span class="token keyword">import</span> express<span class="token punctuation">,</span> <span class="token punctuation">{</span> Express <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;express&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> swagger <span class="token keyword">from</span> <span class="token string">&quot;src/middleware/swagger&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app<span class="token operator">:</span> Express <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>swagger<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>다음으로 Routes에 스웨거를 적용시켜보겠습니다.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Router <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;express&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> router<span class="token operator">:</span> Router <span class="token operator">=</span> <span class="token function">Router</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@swagger</span>
 * /api/user/login:
 *   post:
 *     summary: 로그인
 *     description: &gt;
 *       아이디: 특수 문자를 제외한 4-16자리의 문자열 &lt;br/&gt;
 *       비밀번호: 특수 문자, 숫자를 한 개 이상 포함한 8-15자리의 문자열
 *       관련 코드: 1001, 1002, 1003, 1004, 1005
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identity:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *            application/json:
 *              schema:
 *                $ref: &#39;#/components/schemas/loginResponse&#39;
 *       400:
 *         description: 유효성 검사 실패 또는 이미 존재하는 유저
 *       500:
 *         description: 서버 오류
 */</span>
router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&quot;/login&quot;</span><span class="token punctuation">,</span> checkExistMember<span class="token punctuation">,</span> checkPassword<span class="token punctuation">,</span> userController<span class="token punctuation">.</span>login<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@swagger</span>
 * /api/ko/exchange/candle:
 *   get:
 *     summary: 차트 candle 정보 가져오기
 *     description: &gt;
 *       intervalUnit ex) minutes &lt;br/&gt;
 *       intervalCount ex) 1 | 5 | 15 &lt;br/&gt;
 *       cd ex) KRW-BTC &lt;br/&gt;
 *       count ex) 50 &lt;br/&gt;
 *       to ex) 1692473880000
 *     tags: [Ko-Exchange]
 *     parameters:
 *       - in: query
 *         name: cd
 *         required: true
 *         description: 코인 코드
 *         schema:
 *           type: string
 *       - in: query
 *         name: intervalUnit
 *         required: true
 *         description: 불러올 단위
 *         schema:
 *           type: string
 *       - in: query
 *         name: intervalCount
 *         required: true
 *         description: 불러올 유닛의 단위
 *         schema:
 *           type: string
 *       - in: query
 *         name: count
 *         required: true
 *         description: 몇개 불러올지
 *         schema:
 *           type: number
 *       - in: query
 *         name: to
 *         description: 추가로 불러올 데이터 시간(가지고있는 데이터의 가장 예전)
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 캔들 조회 성공
 *       400:
 *         description: 잘못된 파라미터
 *       500:
 *         description: 서버 오류
 */</span>
router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/candle&quot;</span><span class="token punctuation">,</span> koExchangeController<span class="token punctuation">.</span>getCandle<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>제가 작성한 get, post 중 하나씩 가져왔습니다.</p><p>yml 파일을 작성하는것처럼 적어주시면 됩니다. swagger문서를 자동으로 만들어주는 툴도 있는 것 같지만 저는 이렇게 하나하나 다 적어주었습니다.</p><p>routes를 app에 등록시켜주고, 서버를 실행시켜 <code>localhost:PORT/api-docs</code> 로 들어가면 스웨거 문서가 나옵니다.</p>`,12),p=[i];function o(c,l){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","swagger.html.vue"]]);export{d as default};
