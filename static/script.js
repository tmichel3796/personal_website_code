// static/script.js
// Handles: smooth scroll for nav, hamburger drawer, and a light touch-hover effect for project cards.

document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const smoothScrollTo = (target) => {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  };

  /* ============================
     Nav buttons (desktop)
     ============================ */
  $$('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) smoothScrollTo(target);
    });
  });

  /* ============================
     Hamburger drawer (mobile)
     ============================ */
  const hamburger = $('#hamburger');
  const drawer = $('#mobile-drawer');
  const drawerClose = $('.drawer-close', drawer);

  const setDrawer = (open) => {
    if (!drawer || !hamburger) return;
    drawer.setAttribute('aria-hidden', String(!open));
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const toggleDrawer = () => {
    const isOpen = drawer.getAttribute('aria-hidden') === 'false';
    setDrawer(!isOpen);
  };

  if (hamburger) hamburger.addEventListener('click', toggleDrawer);
  if (drawerClose) drawerClose.addEventListener('click', () => setDrawer(false));

  if (drawer) {
    // close on backdrop click
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) setDrawer(false);
    });
    // drawer links: scroll and close
    $$('.drawer-link', drawer).forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const href = a.getAttribute('href');
        setDrawer(false);
        if (href) smoothScrollTo(href);
      });
    });
  }

  /* ============================
     Projects open in SAME TAB (default anchor behavior)
     - No modal, no JS interception needed.
     - Touch enhancement: briefly show "hover" state on press.
     ============================ */
  const cards = $$('.project-card');
  let hideTimer = null;

  cards.forEach((card) => {
    // On touchstart, add a temporary class that mimics :hover (to reveal desc)
    card.addEventListener('touchstart', () => {
      card.classList.add('touch-hover');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => card.classList.remove('touch-hover'), 600);
    }, { passive: true });

    // If user lifts finger quickly, keep it visible a brief moment
    card.addEventListener('touchend', () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => card.classList.remove('touch-hover'), 400);
    });
  });
});
