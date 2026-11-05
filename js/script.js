/* ============================================================
   HEAD TURNERS — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Page Loader ---------- */
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    if (loader) loader.classList.add('is-hidden');
  });

  /* ---------- Navigation Scroll State ---------- */
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('is-scrolled', y > 60);
    if (backToTop) backToTop.classList.toggle('is-visible', y > 600);
  }

let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const nav = document.getElementById('nav');
  if (!nav) return;
  nav.classList.toggle('is-scrolled', y > 60);
  // Optional hide-on-scroll-down:
  if (y > 400 && y > lastY) {
    nav.classList.add('is-hidden');
  } else {
    nav.classList.remove('is-hidden');
  }
  lastY = y;
}, { passive: true });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile Menu ---------- */
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

function openMenu() {
  if (!toggle || !mobileMenu) return;
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  mobileMenu.classList.toggle('is-open', !isOpen);
  mobileMenu.setAttribute('aria-hidden', String(isOpen));
  document.body.style.overflow = isOpen ? '' : 'hidden';
  document.body.classList.toggle('menu-open', !isOpen);   // <-- ADD THIS
}

  if (toggle) toggle.addEventListener('click', openMenu);

  // Close menu on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
          openMenu();
        }
      });
    });
  }

  /* ---------- Intersection Observer — Reveal on Scroll ---------- */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-line');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Back to Top ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Gallery Lightbox ---------- */
  const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  let currentIndex = 0;

  function getGalleryData() {
    return galleryItems.map((item) => {
      const img = item.querySelector('img');
      const overlay = item.querySelector('.gallery__overlay');
      return {
        src: img ? img.src : '',
        alt: img ? img.alt : '',
        title: overlay ? overlay.textContent : '',
      };
    });
  }

/* ---------- Page Loader (fail-safe) ---------- */
const loader = document.getElementById('pageLoader');
function hideLoader() {
  if (loader) loader.classList.add('is-hidden');
}
if (document.readyState === 'complete') {
  hideLoader();
} else {
  window.addEventListener('load', hideLoader);
  // Fallback: never let the loader trap the page
  setTimeout(hideLoader, 1200);
}

  function openLightbox(index) {
    if (!lightbox || !lbImg) return;
    currentIndex = index;
    const data = getGalleryData();
    lbImg.src = data[index].src;
    lbImg.alt = data[index].alt;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (galleryItems[currentIndex]) galleryItems[currentIndex].focus();
  }

  function navigateLightbox(dir) {
    const data = getGalleryData();
    if (!data.length) return;
    currentIndex = (currentIndex + dir + data.length) % data.length;
    lbImg.src = data[currentIndex].src;
    lbImg.alt = data[currentIndex].alt;
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => navigateLightbox(-1));
  if (lbNext) lbNext.addEventListener('click', () => navigateLightbox(1));

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  /* ---------- Footer Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

