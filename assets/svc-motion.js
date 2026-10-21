/* Service pages: scroll reveals + hover motion */
(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var css='.rv{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.2,.8,.2,1),transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:var(--rd,0ms)}.rv.in{opacity:1;transform:none}'+
'.svc-hero h1 .w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.06em}.svc-hero h1 .w>span{display:inline-block;transform:translateY(105%);animation:svcUp .9s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(.1s + var(--i)*70ms)}@keyframes svcUp{to{transform:none}}'+
'.svc-foot{opacity:0;animation:svcFade .8s ease forwards .7s}@keyframes svcFade{to{opacity:1}}'+
'.factors>div{transition:background .25s,padding .25s}.factors>div h4{transition:transform .25s}.factors>div:hover{background:color-mix(in srgb,currentColor 7%,transparent);padding-left:16px}.factors>div:hover h4{transform:translateX(4px)}'+
'.stat{transition:transform .3s cubic-bezier(.2,.8,.2,1)}.stat:hover{transform:translateY(-6px)}.stat .n{display:inline-block;transition:transform .3s cubic-bezier(.2,.8,.2,1);transform-origin:0 100%}.stat:hover .n{transform:scale(1.06)}'+
'.svc-list .ar{transition:transform .25s}.svc-list a:hover .ar{transform:translateX(8px)}'+
'.btn span{display:inline-block;transition:transform .25s}.btn:hover span{transform:translateX(5px)}'+
'.wbar .b{transform:scaleX(0);transform-origin:0 50%;transition:transform 1.1s cubic-bezier(.2,.8,.2,1);transition-delay:var(--rd,0ms)}.wbar li.in .b{transform:none}'+
'.cw-card,.duo>div{transition:transform .3s cubic-bezier(.2,.8,.2,1)}.cw-card:hover,.duo>div:hover{transform:translateY(-6px)}';
var s=Object.assign(document.createElement('style'),{nonce:'77f37wi73'});s.textContent=reduce?'.factors>div:hover{background:color-mix(in srgb,currentColor 7%,transparent)}':css;document.head.appendChild(s);
if(reduce)return;
var h=document.querySelector('.svc-hero h1');
if(h){var words=h.textContent.trim().split(/\s+/);h.setAttribute('aria-label',h.textContent.trim());h.innerHTML=words.map(function(w,i){return '<span class="w" aria-hidden="true"><span style="--i:'+i+'">'+w+'</span></span>'}).join(' ')}
var groups=['.sec-head','.factors','.stats','.duo','.svc-list','.wbar','.cw-grid','.wbar-h','.cta .wrap>div'];
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
groups.forEach(function(sel){document.querySelectorAll(sel).forEach(function(g){
var kids=(sel==='.sec-head'||sel==='.wbar-h'||sel==='.cta .wrap>div')?[g]:[].slice.call(g.children);
kids.forEach(function(k,i){k.classList.add('rv');k.style.setProperty('--rd',(i%6)*80+'ms');io.observe(k)})})});
})();
