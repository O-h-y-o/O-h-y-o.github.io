import{a as L}from"./axios-4a70c6fc.js";import{o as D}from"./rule-b4386e74.js";import{g as F,h as l,i as N,o as i,c as u,a as s,F as m,E as d,G as k,t as n,d as R}from"./app-30e71e31.js";import{_ as W}from"./plugin-vue_export-helper-c27b6911.js";const j={class:"exchange-nav-wrap"},K=["onClick"],$={class:"sort-area"},A=["onClick"],E={class:"coin-wrap"},I=["onClick"],O={class:"coin-name-wrap"},U={class:"coin-name"},P={class:"coin-market"},V={class:"now-price-wrap"},z={class:"signed-change-wrap"},G={class:"acc-trade-price24"},J={class:"coin-info"},q=F({__name:"SocketMarket",setup(H){const g=l("KRW-BTC"),v=l("KRW"),T=l({ko:"비트코인",en:"Bitcoin"}),f=l([{text:"원화",market:"KRW"},{text:"BTC",market:"BTC"},{text:"USDT",market:"USDT"}]),o=l({sortTarget:"",sort:"desc"}),x=[{text:"한글명",sortTarget:"korean_name"},{text:"현재가",sortTarget:"tp"},{text:"전일대비",sortTarget:"scr"},{text:"거래대금",sortTarget:"atp24h"}],a=l({KRW:{},BTC:{},USDT:{}}),p=l(!1),S=()=>{p.value=!0,setTimeout(()=>{p.value=!1},1e3)},y=async()=>{const t=await L.get("https://api.upbit.com/v1/market/all?isDetails=true");for(const r in t.data){const e=t.data[r],[c]=e.market.split("-");a.value[c][e.market]={...e,control(){this.box=!0,setTimeout(()=>{this.box=!1},500)}}}},h=t=>{a.value[v.value]=D(a.value[v.value],t,o.value.sort)},C=t=>{o.value.sortTarget===t?o.value.sort=o.value.sort==="ask"?"desc":"ask":o.value.sort="ask",o.value.sortTarget=t,h(t)},w=t=>{B(),v.value=t,S(),b(Object.keys(a.value[t])),o.value.sortTarget="",o.value.sort="desc",h("trp")},M=(t,r)=>{g.value=t,T.value.ko=r};let _;const b=t=>{_=new WebSocket("wss://api.upbit.com/websocket/v1"),_.onopen=r=>{_.send(`${JSON.stringify([{ticket:"ticker"},{type:"ticker",codes:t},{format:"SIMPLE"}])}`)},_.onmessage=async r=>{const e=await new Response(r.data).json(),[c]=e.cd.split("-");a.value[c][e.cd]={...a.value[c][e.cd],...e},!p.value&&a.value[c][e.cd].control()}},B=()=>{_.close()};return N(async()=>{await y(),b(Object.keys(a.value[v.value]))}),(t,r)=>(i(),u("div",j,[s("nav",null,[(i(!0),u(m,null,d(f.value,e=>(i(),u("button",{type:"button",class:k(["market-change-btn",{active:v.value===e.market}]),onClick:c=>w(e.market),key:e.market},n(e.text),11,K))),128))]),s("div",$,[(i(),u(m,null,d(x,e=>s("button",{type:"button",key:e.text,class:k([o.value.sortTarget===e.sortTarget?o.value.sort:""]),onClick:c=>[C(e.sortTarget)]},n(e.text),11,A)),64))]),s("div",E,[(i(!0),u(m,null,d(a.value[v.value],e=>(i(),u("div",{class:k(["coin-area",{selected:e.market===g.value}]),key:e.korean_name,onClick:c=>M(e.market,e.korean_name)},[s("div",O,[s("span",U,n(e.korean_name),1),s("span",P,n(e.market),1)]),s("div",V,[e.box?(i(),u("div",{key:0,class:k(["ask-bid-control",e.ab])},null,2)):R("v-if",!0),s("strong",{class:k(e.c)},n(e.tp&&e.tp.toLocaleString()),3)]),s("div",z,[s("span",{class:k(["coin-info",e.c])},n(e.scr&&(e.scr*100).toFixed(2))+"% ",3),s("span",{class:k(["coin-market",e.c])},n(e.scp&&e.scp.toLocaleString()),3)]),s("div",G,[s("span",J,n(e.atp24h&&Number(e.atp24h.toFixed().slice(0,-6)).toLocaleString().concat(" 백만")),1)])],10,I))),128))])]))}});const ee=W(q,[["__scopeId","data-v-50396343"],["__file","SocketMarket.vue"]]);export{ee as default};