const n=JSON.parse('{"key":"v-42fc5d30","path":"/ko/posts/upbit/upbit-orderbook.html","title":"업비트 오픈API로 거래소 페이지 만들어보기 - 오더북","lang":"ko-KR","frontmatter":{"order":5,"description":"업비트 오픈API로 거래소 페이지 만들어보기 - 오더북 팁 // global.d.ts interface ISocketOrderbookResponse { cd: string; tms: number; tas: number; tbs: number; obu: [ { ap: number; bp: number; as: number; bs: number; } ]; st: string; ty: string; } const connectOrderbookSocket = () =&gt; { orderbookSocket = new WebSocket(\\"wss://api.upbit.com/websocket/v1\\"); orderbookSocket.onopen = (e: any) =&gt; { orderbookSocket.send( `${JSON.stringify([ { ticket: \\"orderbook\\" }, { type: \\"orderbook\\", codes: [upbit.selectCoin] }, { format: \\"SIMPLE\\" }, ])}` ); }; orderbookSocket.onmessage = async (payload: any) =&gt; { const r = (await new Response( payload.data ).json()) as ISocketOrderbookResponse; orderbookList.value = r; }; };","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://o-h-y-o.github.io/posts/upbit/upbit-orderbook.html"}],["meta",{"property":"og:url","content":"https://o-h-y-o.github.io/ko/posts/upbit/upbit-orderbook.html"}],["meta",{"property":"og:site_name","content":"Delicious Jelly"}],["meta",{"property":"og:title","content":"업비트 오픈API로 거래소 페이지 만들어보기 - 오더북"}],["meta",{"property":"og:description","content":"업비트 오픈API로 거래소 페이지 만들어보기 - 오더북 팁 // global.d.ts interface ISocketOrderbookResponse { cd: string; tms: number; tas: number; tbs: number; obu: [ { ap: number; bp: number; as: number; bs: number; } ]; st: string; ty: string; } const connectOrderbookSocket = () =&gt; { orderbookSocket = new WebSocket(\\"wss://api.upbit.com/websocket/v1\\"); orderbookSocket.onopen = (e: any) =&gt; { orderbookSocket.send( `${JSON.stringify([ { ticket: \\"orderbook\\" }, { type: \\"orderbook\\", codes: [upbit.selectCoin] }, { format: \\"SIMPLE\\" }, ])}` ); }; orderbookSocket.onmessage = async (payload: any) =&gt; { const r = (await new Response( payload.data ).json()) as ISocketOrderbookResponse; orderbookList.value = r; }; };"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-06-30T20:18:30.000Z"}],["meta",{"property":"article:author","content":"O-h-y-o"}],["meta",{"property":"article:modified_time","content":"2023-06-30T20:18:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"업비트 오픈API로 거래소 페이지 만들어보기 - 오더북\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-30T20:18:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"O-h-y-o\\",\\"url\\":\\"https://github.com/O-h-y-o\\"}]}"]]},"headers":[],"git":{"createdTime":1687553203000,"updatedTime":1688156310000,"contributors":[{"name":"ohyo","email":"khr157929@gmail.com","commits":5}]},"readingTime":{"minutes":3.54,"words":1062},"filePathRelative":"ko/posts/upbit/upbit-orderbook.md","localizedDate":"2023년 6월 23일","excerpt":"<h1> 업비트 오픈API로 거래소 페이지 만들어보기 - 오더북</h1>\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">팁</p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token comment\\">// global.d.ts</span>\\n<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">ISocketOrderbookResponse</span> <span class=\\"token punctuation\\">{</span>\\n  cd<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n  tms<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n  tas<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n  tbs<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n  obu<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">[</span>\\n    <span class=\\"token punctuation\\">{</span>\\n      ap<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n      bp<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n      <span class=\\"token keyword\\">as</span><span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n      bs<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n  st<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n  ty<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div><div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">connectOrderbookSocket</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n  orderbookSocket <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">WebSocket</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"wss://api.upbit.com/websocket/v1\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n  orderbookSocket<span class=\\"token punctuation\\">.</span><span class=\\"token function-variable function\\">onopen</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span>e<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    orderbookSocket<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">send</span><span class=\\"token punctuation\\">(</span>\\n      <span class=\\"token template-string\\"><span class=\\"token template-punctuation string\\">`</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">${</span><span class=\\"token constant\\">JSON</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">stringify</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span>\\n        <span class=\\"token punctuation\\">{</span> ticket<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"orderbook\\"</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token punctuation\\">{</span> type<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"orderbook\\"</span><span class=\\"token punctuation\\">,</span> codes<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">[</span>upbit<span class=\\"token punctuation\\">.</span>selectCoin<span class=\\"token punctuation\\">]</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token punctuation\\">{</span> format<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"SIMPLE\\"</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n      <span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token interpolation-punctuation punctuation\\">}</span></span><span class=\\"token template-punctuation string\\">`</span></span>\\n    <span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n  orderbookSocket<span class=\\"token punctuation\\">.</span><span class=\\"token function-variable function\\">onmessage</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">async</span> <span class=\\"token punctuation\\">(</span>payload<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">const</span> r <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">await</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Response</span><span class=\\"token punctuation\\">(</span>\\n      payload<span class=\\"token punctuation\\">.</span>data\\n    <span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">json</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">as</span> ISocketOrderbookResponse<span class=\\"token punctuation\\">;</span>\\n\\n    orderbookList<span class=\\"token punctuation\\">.</span>value <span class=\\"token operator\\">=</span> r<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></div>","autoDesc":true}');export{n as data};