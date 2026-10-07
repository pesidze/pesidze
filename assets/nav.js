/* Mobile menu for the shared nav. Adds a Menu button below 1100px. */
(function(){
var css='.nav-toggle{display:none;align-items:center;justify-content:center;gap:8px;min-height:48px;min-width:48px;padding:0 14px;border:1.5px solid #0a0a0a;border-radius:999px;background:#FCFCFC;color:#0a0a0a;font-family:"Oswald","Arial Narrow",sans-serif;font-weight:500;font-size:15px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}.nav-toggle i{display:block;width:18px;height:2px;background:currentColor;position:relative}.nav-toggle i::before,.nav-toggle i::after{content:"";position:absolute;left:0;width:18px;height:2px;background:currentColor;transition:transform .2s}.nav-toggle i::before{top:-6px}.nav-toggle i::after{top:6px}.nav-open .nav-toggle i{background:transparent}.nav-open .nav-toggle i::before{transform:translateY(6px) rotate(45deg)}.nav-open .nav-toggle i::after{transform:translateY(-6px) rotate(-45deg)}.nav-toggle:focus-visible{outline:3px solid #0a0a0a;outline-offset:3px}'+
'@media (max-width:1100px){.nav .wrap{position:relative}.nav-toggle{display:inline-flex}.nav .nav-ctas{margin-left:auto}.nav ul{display:none!important}.nav.nav-open ul{display:flex!important;flex-direction:column;gap:0;position:absolute;left:0;right:0;top:100%;background:#FCFCFC;border-bottom:1px solid #0a0a0a;padding:8px clamp(20px,4vw,56px) 20px;box-shadow:0 18px 32px rgba(10,10,10,.12);max-height:calc(100dvh - 64px);overflow-y:auto}.nav.nav-open ul li{border-top:1px solid rgba(10,10,10,.14)}.nav.nav-open ul a{display:flex;min-height:56px;font-size:22px;width:100%}}'+
'@media (max-width:560px){.nav .wrap{gap:10px}.nav .nav-ctas .btn{padding:10px 14px;font-size:13px}.nav-toggle .lbl{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}}'+
'@media (max-width:380px){.nav .brand{font-size:17px}.nav .nav-ctas .btn{padding:10px 12px}}';
function init(){var nav=document.querySelector('header.nav');if(!nav||nav.querySelector('.nav-toggle'))return;var wrap=nav.querySelector('.wrap'),ul=nav.querySelector('ul');if(!wrap||!ul)return;
if(!document.getElementById('nav-mobile-css')){var s=document.createElement('style');s.id='nav-mobile-css';s.textContent=css;document.head.appendChild(s)}
ul.id=ul.id||'site-menu';var b=document.createElement('button');b.type='button';b.className='nav-toggle';b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls',ul.id);b.innerHTML='<i aria-hidden="true"></i><span class="lbl">Menu</span>';wrap.appendChild(b);
function set(o){nav.classList.toggle('nav-open',o);b.setAttribute('aria-expanded',o?'true':'false')}
b.addEventListener('click',function(){set(!nav.classList.contains('nav-open'))});
ul.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('nav-open')){set(false);b.focus()}});
document.addEventListener('click',function(e){if(!nav.contains(e.target))set(false)});
matchMedia('(min-width:1101px)').addEventListener('change',function(m){if(m.matches)set(false)});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,0)});else setTimeout(init,0);
})();
