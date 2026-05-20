/* shared shell — runs on every page */
(function () {
  // ───── language ─────
  const LANGS = ['en', 'de'];
  function getLang() {
    return localStorage.getItem('pesidze.lang') || 'en';
  }
  function setLang(l) {
    localStorage.setItem('pesidze.lang', l);
    applyLang();
  }
  function applyLang() {
    const l = getLang();
    document.documentElement.setAttribute('lang', l);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const dict = window.PESIDZE_I18N || {};
      const node = dict[key];
      if (node && node[l] != null) el.innerHTML = node[l];
    });
    document.querySelectorAll('.lang button, .mob-lang-row button').forEach(b => {
      b.classList.toggle('on', b.dataset.lang === l);
    });
    // re-init reveal text after lang swap
    setupCharReveal();
  }
  window.PESIDZE_setLang = setLang;
  window.PESIDZE_getLang = getLang;

  // ───── cursor ─────
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);
  const cursorLabel = document.createElement('div');
  cursorLabel.className = 'cursor-label';
  document.body.appendChild(cursorLabel);

  let cx = 0, cy = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    cursorLabel.style.transform = `translate(${tx + 16}px, ${ty + 16}px)`;
  });
  function tick() {
    cx += (tx - cx) * 0.25;
    cy += (ty - cy) * 0.25;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();

  function bindCursor() {
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = '1';
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        const label = el.dataset.cursor;
        if (label) {
          cursorLabel.textContent = label;
          cursorLabel.classList.add('show');
        }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorLabel.classList.remove('show');
      });
    });
    document.querySelectorAll('input, textarea').forEach(el => {
      if (el.dataset.cursorTextBound) return;
      el.dataset.cursorTextBound = '1';
      el.addEventListener('mouseenter', () => cursor.classList.add('text'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('text'));
    });
  }

  // ───── reveal on scroll ─────
  function setupReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  function setupCharReveal() {
    document.querySelectorAll('[data-reveal-text]').forEach(el => {
      if (el.dataset.revealDone === el.textContent) return;
      const text = el.textContent;
      el.dataset.revealDone = text;
      el.innerHTML = '';
      text.split(' ').forEach((word, wi, arr) => {
        const wrap = document.createElement('span');
        wrap.className = 'char-reveal';
        wrap.style.transitionDelay = (wi * 30) + 'ms';
        const inner = document.createElement('span');
        inner.textContent = word;
        wrap.appendChild(inner);
        el.appendChild(wrap);
        // space text node between spans = wrap opportunity for the browser
        if (wi < arr.length - 1) {
          el.appendChild(document.createTextNode(' '));
        }
      });
    });
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.char-reveal').forEach(w => w.classList.add('in'));
          io2.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('[data-reveal-text]').forEach(el => io2.observe(el));
  }

  // ───── nav ─────
  function buildNav(activePage) {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const items = [
      { href: 'index.html', key: 'nav.home', match: 'home' },
      { href: 'work.html', key: 'nav.work', match: 'work' },
      { href: 'about.html', key: 'nav.about', match: 'about' },
      { href: 'nonprofit.html', key: 'nav.nonprofit', match: 'nonprofit' },
      { href: 'contact.html', key: 'nav.contact', match: 'contact' },
    ];
    nav.innerHTML = `
      <a href="index.html" class="brand" data-cursor="home">PESIDZE<sup style="font-size:10px;font-family:var(--mono);margin-left:4px;">®</sup></a>
      <ul>
        ${items.map(i => `<li><a href="${i.href}" class="${i.match === activePage ? 'active' : ''}" data-i18n="${i.key}"></a></li>`).join('')}
      </ul>
      <div class="lang">
        <button data-lang="en">EN</button>
        <button data-lang="de">DE</button>
      </div>
      <button class="nav-burger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    `;
    nav.querySelectorAll('.lang button').forEach(b => {
      b.addEventListener('click', () => setLang(b.dataset.lang));
    });

    // mobile overlay
    let mobileMenu = document.getElementById('nav-mobile');
    if (!mobileMenu) {
      mobileMenu = document.createElement('div');
      mobileMenu.id = 'nav-mobile';
      mobileMenu.className = 'nav-mobile';
      mobileMenu.innerHTML = `
        <ul class="mob-links">
          ${items.map(i => `<li><a href="${i.href}" class="${i.match === activePage ? 'active' : ''}" data-i18n="${i.key}"></a></li>`).join('')}
        </ul>
        <div class="mob-lang-row">
          <button data-lang="en">EN</button>
          <button data-lang="de">DE</button>
        </div>
      `;
      document.body.appendChild(mobileMenu);
      mobileMenu.querySelectorAll('.mob-lang-row button').forEach(b => {
        b.addEventListener('click', () => setLang(b.dataset.lang));
      });
    }

    const burger = nav.querySelector('.nav-burger');
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      burger.style.transform = isOpen
        ? 'rotate(0)' : '';
      // animate lines to X
      const [l1, l2, l3] = burger.querySelectorAll('span');
      if (isOpen) {
        l1.style.transform = 'translateY(8px) rotate(45deg)';
        l2.style.opacity = '0';
        l3.style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        l1.style.transform = '';
        l2.style.opacity = '';
        l3.style.transform = '';
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ───── footer ─────
  function buildFooter() {
    const f = document.querySelector('.footer');
    if (!f) return;
    f.innerHTML = `
      <div>
        <h4 data-i18n="footer.studio"></h4>
        <p style="font-size:14px; max-width:36ch;" data-i18n="footer.studioBody"></p>
      </div>
      <div>
        <h4 data-i18n="footer.menu"></h4>
        <ul>
          <li><a href="index.html" data-i18n="nav.home"></a></li>
          <li><a href="work.html" data-i18n="nav.work"></a></li>
          <li><a href="about.html" data-i18n="nav.about"></a></li>
          <li><a href="nonprofit.html" data-i18n="nav.nonprofit"></a></li>
          <li><a href="contact.html" data-i18n="nav.contact"></a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="footer.elsewhere"></h4>
        <ul>
          <li><a href="#" data-cursor="instagram">Instagram ↗</a></li>
          <li><a href="#" data-cursor="behance">Behance ↗</a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="footer.legal"></h4>
        <ul>
          <li><a href="terms.html" data-i18n="footer.terms"></a></li>
          <li><a href="privacy.html" data-i18n="footer.privacy"></a></li>
          <li><a href="cookies.html" data-i18n="footer.cookies"></a></li>
          <li><a href="legal.html" data-i18n="footer.aviso"></a></li>
        </ul>
      </div>
      <div class="colossal">
        <span>PESIDZE</span>
        <span class="avail">
          Available for 3 projects as per ${new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })} — small &amp; medium businesses and non-profits.
        </span>
      </div>
      <div class="legalbar">
        <span>© ${new Date().getFullYear()} Nicole Shakarishvili</span>
        <span data-i18n="footer.bcn"></span>
        <span>v 2026.05</span>
      </div>
    `;
  }

  // marquee duplication for seamless loop
  function setupMarquees() {
    document.querySelectorAll('.marquee-track').forEach(t => {
      if (t.dataset.dup) return;
      t.dataset.dup = '1';
      t.innerHTML = t.innerHTML + t.innerHTML;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const active = document.body.dataset.page || '';
    buildNav(active);
    buildFooter();
    applyLang();
    setupReveal();
    setupCharReveal();
    setupMarquees();
    bindCursor();
    // re-bind cursor after potential dynamic content
    setTimeout(bindCursor, 50);
    setTimeout(bindCursor, 500);
  });

  // expose for pages
  window.PESIDZE_bindCursor = bindCursor;
  window.PESIDZE_setupReveal = setupReveal;
})();
