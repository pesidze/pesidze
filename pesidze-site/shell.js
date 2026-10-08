/* shared shell — runs on every page */
(function () {
  // ───── copy injection (English only) ─────
  function applyLang() {
    document.documentElement.setAttribute('lang', 'en');
    const dict = window.PESIDZE_I18N || {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const node = dict[el.dataset.i18n];
      if (node == null) return;
      el.innerHTML = typeof node === 'string' ? node : (node.en || '');
    });
    setupCharReveal();
  }

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
      // wrap each word so we don't break wrapping
      text.split(' ').forEach((word, wi, arr) => {
        const wrap = document.createElement('span');
        wrap.className = 'char-reveal';
        wrap.style.transitionDelay = (wi * 30) + 'ms';
        const inner = document.createElement('span');
        inner.textContent = word + (wi < arr.length - 1 ? '\u00A0' : '');
        wrap.appendChild(inner);
        el.appendChild(wrap);
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
    const header = document.createElement('header');
    header.className = 'nav';
    header.innerHTML = '<div class="wrap"><a href="index.html" class="brand">PESIDZE<sup>®</sup></a><ul><li><a href="index.html#services">Services</a></li><li><a href="index.html#speed">Performance</a></li><li><a href="security.html">Security</a></li><li><a href="index.html#work">Work</a></li><li><a href="pricing.html">Pricing</a></li><li><a href="about.html">About us</a></li></ul><div class="nav-ctas"><a href="security.html#check" class="btn ghost">Test your website</a><a href="contact.html" class="btn">Start a project</a></div></div>';
    nav.replaceWith(header);
  }

  // ───── footer ─────
  function buildFooter() {
    const f = document.querySelector('footer.footer, footer.foot');
    if (!f) return;
    const tmp = document.createElement('div');
    tmp.innerHTML = "<footer class=\"foot\"><div class=\"wrap\">\n<div class=\"foot-grid\">\n<div><h4>Studio</h4><p style=\"font-size:15px;max-width:36ch\">Pesidze is a design and engineering studio based in Berlin, building fast, secure websites for clients across Europe and beyond.</p></div>\n<div><h4>Menu</h4><ul><li><a href=\"index.html#services\">Services</a></li><li><a href=\"index.html#speed\">Performance</a></li><li><a href=\"security.html\">Security</a></li><li><a href=\"index.html#work\">Work</a></li><li><a href=\"pricing.html\">Pricing</a></li><li><a href=\"about.html\">About us</a></li><li><a href=\"contact.html\">Contact</a></li></ul></div>\n<div><h4>Legal</h4><ul><li><a href=\"terms.html\">Terms</a></li><li><a href=\"privacy.html\">Privacy</a></li><li><a href=\"cookies.html\">Cookies</a></li><li><a href=\"legal.html\">Impressum</a></li><li><a href=\"cookies.html\" data-consent-open>Cookie settings</a></li></ul></div>\n</div>\n<div class=\"bar\"><span>© <span id=\"yr\">2026</span> Pesidze</span><span>Berlin, Germany</span></div>\n</div></footer>";
    const nf = tmp.firstElementChild;
    const yr = nf.querySelector('#yr'); if (yr) yr.textContent = new Date().getFullYear();
    f.replaceWith(nf);
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
