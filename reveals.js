// ===== REVEAL ANIMATIONS =====
export function initRevealAnimations() {

  // ── Generic [data-reveal] items ───────────────────────────────
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });

  // ── [data-split] titles throughout page ───────────────────────
  gsap.utils.toArray('[data-split]').forEach((el) => {
    // Skip if already handled by hero or carousel
    if (el.closest('#hero') || el.closest('.carousel-header') || el.closest('.sticky-split__panel')) return;

    const split = new SplitType(el, { types: 'words' });

    gsap.from(split.words, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
      },
    });
  });

  // ── Editorial section image clip-path reveal ──────────────────
  const editorialImg = document.querySelector('.editorial__img-wrap');
  if (editorialImg) {
    gsap.from(editorialImg, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.4,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: editorialImg,
        start: 'top 75%',
      },
    });
  }

  // ── Mechanism image stack — staggered reveal ──────────────────
  const mechImgs = gsap.utils.toArray('.mechanism__img');
  mechImgs.forEach((img, i) => {
    gsap.from(img, {
      opacity: 0,
      scale: 0.9,
      rotation: i % 2 === 0 ? -5 : 5,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.mechanism__visual',
        start: 'top 80%',
      },
      delay: i * 0.15,
    });
  });

  // Mechanism badge
  gsap.from('.mechanism__badge', {
    opacity: 0,
    scale: 0.7,
    duration: 0.8,
    ease: 'back.out(1.8)',
    scrollTrigger: {
      trigger: '.mechanism__visual',
      start: 'top 70%',
    },
    delay: 0.5,
  });

  // ── Offer card reveal ─────────────────────────────────────────
  gsap.from('.offer__card', {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.offer__card',
      start: 'top 80%',
    },
  });

  // ── Closing images — parallax spread ─────────────────────────
  const closingImgs = gsap.utils.toArray('.closing__img');
  closingImgs.forEach((img, i) => {
    const dir = i === 0 ? -1 : i === 2 ? 1 : 0;
    gsap.from(img, {
      xPercent: dir * 15,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.section--closing',
        start: 'top 80%',
      },
      delay: i * 0.1,
    });
  });

  // ── Section number labels ─────────────────────────────────────
  gsap.utils.toArray('.section__num').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
      },
    });
  });

  // ── Footer reveal ─────────────────────────────────────────────
  gsap.from('.footer', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 95%',
    },
  });
}
