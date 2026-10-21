/* Shared nav: Services dropdown + mobile menu below 1100px. */
(function(){
var SVC=[['digital-sustainability','Digital sustainability'],['digital-strategy','Digital strategy'],['ui-ux-design','UI/UX design'],['low-carbon-development','Low carbon development'],['web-performance','Web performance'],['wordpress-cms','WordPress CMS'],['custom-websites','Custom-built websites'],['analytics-ab-testing','Analytics &amp; A/B testing']];
var css='.nav-toggle{display:none;align-items:center;justify-content:center;gap:8px;min-height:48px;min-width:48px;padding:0 14px;border:1.5px solid #0a0a0a;border-radius:999px;background:#FCFCFC;color:#0a0a0a;font-family:"Oswald","Arial Narrow",sans-serif;font-weight:500;font-size:15px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}.nav-toggle i{display:block;width:18px;height:2px;background:currentColor;position:relative}.nav-toggle i::before,.nav-toggle i::after{content:"";position:absolute;left:0;width:18px;height:2px;background:currentColor;transition:transform .2s}.nav-toggle i::before{top:-6px}.nav-toggle i::after{top:6px}.nav-open .nav-toggle i{background:transparent}.nav-open .nav-toggle i::before{transform:translateY(6px) rotate(45deg)}.nav-open .nav-toggle i::after{transform:translateY(-6px) rotate(-45deg)}.nav-toggle:focus-visible{outline:3px solid #0a0a0a;outline-offset:3px}'+
'.nav li.has-sub{position:relative;display:flex;align-items:center;gap:2px}.nav-caret{display:inline-flex;align-items:center;justify-content:center;width:28px;min-height:44px;border:0;background:none;color:inherit;cursor:pointer;padding:0}.nav-caret svg{width:12px;height:12px;transition:transform .2s}.has-sub.open .nav-caret svg{transform:rotate(180deg)}'+
'.nav-sub{position:absolute;left:-20px;top:100%;padding-top:10px;display:none;z-index:120}.has-sub.open .nav-sub{display:block}@media (hover:hover) and (min-width:1101px){.has-sub:hover .nav-sub{display:block}.has-sub:hover .nav-caret svg{transform:rotate(180deg)}}'+
'.nav-sub-in{background:#FCFCFC;border:1.5px solid #0a0a0a;border-radius:20px;padding:10px;min-width:340px;box-shadow:0 18px 40px rgba(10,10,10,.14);display:flex;flex-direction:column}'+
'.nav ul .nav-sub a{display:flex;align-items:center;min-height:48px;padding:6px 14px;border-radius:12px;font-family:"Merriweather",Georgia,serif;font-weight:400;font-size:18px;letter-spacing:0;text-transform:none;white-space:nowrap}.nav ul .nav-sub a:hover{background:#f2c418;opacity:1;text-decoration:none!important}.nav ul .nav-sub a[aria-current]{text-decoration:underline!important;text-underline-offset:5px}'+
'@media (max-width:1100px){.nav .wrap{position:relative}.nav-toggle{display:inline-flex}.nav .nav-ctas{margin-left:auto}.nav ul{display:none!important}.nav.nav-open ul{display:flex!important;flex-direction:column;gap:0;position:absolute;left:0;right:0;top:100%;background:#FCFCFC;border-bottom:1px solid #0a0a0a;padding:8px clamp(20px,4vw,56px) 20px;box-shadow:0 18px 32px rgba(10,10,10,.12);max-height:calc(100dvh - 64px);overflow-y:auto}.nav.nav-open ul li{border-top:1px solid rgba(10,10,10,.14)}.nav.nav-open ul a{display:flex;min-height:56px;font-size:22px;width:100%}'+
'.nav li.has-sub{flex-wrap:wrap}.nav li.has-sub>a{width:auto!important;flex:1}.nav-caret{width:56px;min-height:56px}.nav-caret svg{width:16px;height:16px}.nav-sub{position:static;padding:0 0 12px;width:100%}.nav-sub-in{border:0;box-shadow:none;border-radius:0;padding:0 0 0 4px;min-width:0;background:none}.nav.nav-open ul .nav-sub a{min-height:48px;font-size:20px;padding:6px 0;white-space:normal}.nav ul .nav-sub a:hover{background:none;text-decoration:underline!important}}'+
'@media (max-width:560px){.nav .wrap{gap:10px}.nav .nav-ctas .btn{padding:10px 14px;font-size:13px}.nav-toggle .lbl{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}}'+
'@media (max-width:380px){.nav .brand{font-size:17px}.nav .nav-ctas .btn{padding:10px 12px}}';
function addSub(ul){var a=ul.querySelector('a[href*="#services"]');if(!a)return;var li=a.closest('li');if(li.classList.contains('has-sub'))return;
var abs=a.getAttribute('href').charAt(0)==='/';var here=location.pathname.split('/').pop().replace(/\.html$/,'');
li.classList.add('has-sub');
var b=document.createElement('button');b.type='button';b.className='nav-caret';b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','svc-menu');b.setAttribute('aria-label','Show services');b.innerHTML='<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"></path></svg>';
var d=document.createElement('div');d.className='nav-sub';d.id='svc-menu';
d.innerHTML='<div class="nav-sub-in">'+SVC.map(function(s){return '<a href="'+(abs?'/'+s[0]:s[0]+'.html')+'"'+(here===s[0]?' aria-current="page"':'')+'>'+s[1]+'</a>'}).join('')+'</div>';
li.appendChild(b);li.appendChild(d);
function set(o){li.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false')}
b.addEventListener('click',function(e){e.stopPropagation();set(!li.classList.contains('open'))});
li.addEventListener('focusout',function(e){if(!li.contains(e.relatedTarget)&&matchMedia('(min-width:1101px)').matches)set(false)});
document.addEventListener('click',function(e){if(!li.contains(e.target))set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&li.classList.contains('open')){set(false);b.focus()}});}
function init(){var nav=document.querySelector('header.nav');if(!nav||nav.querySelector('.nav-toggle'))return;var wrap=nav.querySelector('.wrap'),ul=nav.querySelector('ul');if(!wrap||!ul)return;
if(!document.getElementById('nav-mobile-css')){var s=Object.assign(document.createElement('style'),{nonce:'77f37wi73'});s.id='nav-mobile-css';s.textContent=css;document.head.appendChild(s)}
addSub(ul);
ul.id=ul.id||'site-menu';var b=document.createElement('button');b.type='button';b.className='nav-toggle';b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls',ul.id);b.innerHTML='<i aria-hidden="true"></i><span class="lbl">Menu</span>';wrap.appendChild(b);
function set(o){nav.classList.toggle('nav-open',o);b.setAttribute('aria-expanded',o?'true':'false')}
b.addEventListener('click',function(){set(!nav.classList.contains('nav-open'))});
ul.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('nav-open')){set(false);b.focus()}});
document.addEventListener('click',function(e){if(!nav.contains(e.target))set(false)});
matchMedia('(min-width:1101px)').addEventListener('change',function(m){if(m.matches)set(false)});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,0)});else setTimeout(init,0);
})();
