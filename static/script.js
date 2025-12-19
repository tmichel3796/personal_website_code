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

  // Email copy/hover logic
  const emailEl = $('#header-email');
  if (emailEl) {
    let bubbleTimeout = null;
    let lastBubbleText = emailEl.getAttribute('data-hover-text');
    const showBubble = (text) => {
      emailEl.setAttribute('data-hover-text', text || lastBubbleText);
      emailEl.setAttribute('data-show-bubble', 'true');
      clearTimeout(bubbleTimeout);
    };
    const hideBubble = () => {
      emailEl.setAttribute('data-hover-text', lastBubbleText);
      emailEl.setAttribute('data-show-bubble', 'false');
    };
    emailEl.addEventListener('mouseenter', () => showBubble(lastBubbleText));
    emailEl.addEventListener('mouseleave', hideBubble);
    emailEl.addEventListener('focus', () => showBubble(lastBubbleText));
    emailEl.addEventListener('blur', hideBubble);
    emailEl.addEventListener('mousedown', (e) => {
      // Prevent text selection on click
      e.preventDefault();
    });
    emailEl.addEventListener('click', (e) => {
      const email = emailEl.getAttribute('data-email');
      const successText = emailEl.getAttribute('data-success-text') || 'Copy successful!';
      if (email) {
        navigator.clipboard.writeText(email);
        // Show bubble with success text for 1.2s
        showBubble(successText);
        clearTimeout(bubbleTimeout);
        bubbleTimeout = setTimeout(hideBubble, 1200);
      }
      // Remove any selection highlight
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel) sel.removeAllRanges();
      }
    });
    // Keyboard accessibility: Enter/Space copies
    emailEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        emailEl.click();
      }
    });
  }

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
