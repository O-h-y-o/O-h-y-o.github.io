import{g as M,h as i,i as b,o as k,c as L,a as _,t as S,F as y}from"./app-4ae975cb.js";import{_ as A}from"./plugin-vue_export-helper-c27b6911.js";const D=["width","height"],N={class:"chart-start-info absolute-center"},T={class:"chart-start-text-area"},u=60*1e3,F=M({__name:"MoveCanvas",setup(G){const d=i(""),o=i(),a=i(0),s=i(0),m=Math.PI*2,g=m/360,h=-35*g,p=215*g;let e=null,c=0,r=0,l=0;const C=new Image,f=new Image,x=t=>{d.value=((u-t)/1e3).toFixed(2).replace(".",":")},I=()=>{const t=new Date,n=t.getSeconds()*1e3+t.getMilliseconds();if(x(n),!e)return;const v=n%u/u;e.clearRect(0,0,a.value,s.value),e.save(),e.beginPath(),e.fillStyle="rgba(32, 37, 49, 0.5)",e.strokeStyle="#e6af1c",e.arc(r,l,c,0,m),e.fill(),e.stroke(),e.closePath(),e.restore(),e.save(),e.translate(r,l),e.rotate(p),e.translate(c,0),e.drawImage(f,-7,-7),e.restore(),e.save(),e.translate(r,l),e.rotate(h+(p-h)*v),e.translate(c,0),e.drawImage(C,-8,-12),e.restore(),window.requestAnimationFrame(I)};return b(()=>{var E,w,R;if(e=(E=o.value)==null?void 0:E.getContext("2d"),e==null)return;a.value=((w=o.value)==null?void 0:w.clientWidth)??0,s.value=((R=o.value)==null?void 0:R.clientHeight)??0,e.globalCompositeOperation="destination-over",C.src="../../../public/images/move-rocket.png",f.src="images/move-circle.png";const t=10,n=a.value/2-t,v=s.value/2-t;c=Math.min(n,v),r=a.value/2,l=s.value/2,I()}),(t,n)=>(k(),L(y,null,[_("canvas",{ref_key:"canvas",ref:o,width:a.value,height:s.value},null,8,D),_("div",N,[_("div",T,"Start "+S(d.value),1)])],64))}});const P=A(F,[["__scopeId","data-v-a89ebd19"],["__file","MoveCanvas.vue"]]);export{P as default};