// ===== HERO ANIMATIONS =====
export function initHero() {
  const heroImg     = document.getElementById('heroImg');
  const heroTitle   = document.getElementById('heroTitle');
  const heroSub     = document.getElementById('heroSub');
  const heroScrollHint = document.getElementById('heroScrollHint');
  const eyebrow     = document.querySelector('.hero__eyebrow');
  const actions     = document.querySelector('.hero__actions');
  const counterBadge = document.querySelector('.hero__counter-badge');

  if (!heroTitle) return;

  // ── Split title lines into chars ──────────────────────────────
  const lines = heroTitle.querySelectorAll('[data-split]');
  const splitInstances = [];

  lines.forEach((line) => {
    const split = new SplitType(line, { types: 'chars' });
    splitInstances.push(split);
    // Wrap chars in overflow-hidden parent for clean clip reveal
    split.chars.forEach((char) => {
      char.style.display = 'inline-block';
    });
  });

  // ── Entrance timeline ─────────────────────────────────────────
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // Eyebrow
  tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8 }, 0.2);

  // Title chars stagger per line
  splitInstances.forEach((split, i) => {
    tl.from(
      split.chars,
      {
        y: '110%',
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        ease: 'power3.out',
      },
      0.4 + i * 0.15
    );
  });

  // Sub
  tl.to(heroSub, { opacity: 1, y: 0, duration: 0.8 }, 0.9);

  // Actions
  tl.to(actions, { opacity: 1, y: 0, duration: 0.8 }, 1.05);

  // Counter badge
  tl.to(counterBadge, { opacity: 1, y: 0, duration: 0.8 }, 1.2);

  // Scroll hint
  tl.to(heroScrollHint, { opacity: 1, duration: 0.6 }, 1.5);

  // ── Parallax on scroll ────────────────────────────────────────
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Fade out hero content on scroll
  gsap.to('.hero__content', {
    opacity: 0,
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'center top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // ── Mouse parallax on hero image ──────────────────────────────
  const hero = document.getElementById('hero');
  if (hero && heroImg && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top)  / rect.height - 0.5;

      gsap.to(heroImg, {
        x: cx * 18,
        y: cy * 10,
        duration: 1.8,
        ease: 'power2.out',
      });
    });

    hero.addEventListener('mouseleave', () => {
      gsap.to(heroImg, { x: 0, y: 0, duration: 1.5, ease: 'power2.out' });
    });
  }
}
