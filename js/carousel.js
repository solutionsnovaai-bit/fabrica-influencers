// ===== CAROUSEL — drag inercial, touch, auto-scroll =====
export function initCarousel() {
  const wrap  = document.getElementById('carouselWrap');
  const track = document.getElementById('carouselTrack');
  if (!wrap || !track) return;

  let isDown    = false;
  let startX    = 0;
  let scrollLeft = 0;
  let velocity  = 0;
  let lastX     = 0;
  let lastTime  = 0;
  let momentum  = null;

  // ── Header reveal ──────────────────────────────────────────────
  const header = document.querySelector('.carousel-header');
  if (header) {
    const titleEl = header.querySelector('[data-split]');
    if (titleEl) {
      const split = new SplitType(titleEl, { types: 'words, chars' });
      gsap.from(split.chars, {
        opacity: 0,
        y: '60%',
        duration: 0.9,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
        },
      });
    }

    gsap.from(header.querySelector('.carousel-header__sub'), {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 75%',
      },
    });
  }

  // ── Cards entrance stagger ──────────────────────────────────────
  const cards = track.querySelectorAll('.carousel-card');
  gsap.from(cards, {
    opacity: 0,
    y: 60,
    scale: 0.94,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: wrap,
      start: 'top 80%',
    },
  });

  // ── MOUSE drag ─────────────────────────────────────────────────
  wrap.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
    lastX = e.pageX;
    lastTime = performance.now();
    velocity = 0;
    cancelMomentum();
    wrap.style.cursor = 'grabbing';
  });

  wrap.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    wrap.style.cursor = 'grab';
    startMomentum();
  });

  wrap.addEventListener('mouseup', () => {
    isDown = false;
    wrap.style.cursor = 'grab';
    startMomentum();
  });

  wrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x    = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1.2;
    wrap.scrollLeft = scrollLeft - walk;

    // Calc velocity
    const now   = performance.now();
    const dt    = now - lastTime;
    velocity    = ((e.pageX - lastX) / dt) * 16;
    lastX       = e.pageX;
    lastTime    = now;
  });

  // ── TOUCH drag ─────────────────────────────────────────────────
  let touchStartX = 0;
  let touchScrollLeft = 0;

  wrap.addEventListener('touchstart', (e) => {
    touchStartX    = e.touches[0].pageX;
    touchScrollLeft = wrap.scrollLeft;
    velocity       = 0;
    cancelMomentum();
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    const dx = touchStartX - e.touches[0].pageX;
    wrap.scrollLeft = touchScrollLeft + dx;

    const now  = performance.now();
    velocity   = -((e.touches[0].pageX - lastX) / (now - lastTime || 1)) * 16;
    lastX      = e.touches[0].pageX;
    lastTime   = now;
  }, { passive: true });

  wrap.addEventListener('touchend', () => {
    startMomentum();
  });

  // ── Momentum / inertia ─────────────────────────────────────────
  function startMomentum() {
    cancelMomentum();
    let vel = velocity;

    function step() {
      if (Math.abs(vel) < 0.5) return;
      wrap.scrollLeft -= vel;
      vel *= 0.93; // friction
      momentum = requestAnimationFrame(step);
    }
    momentum = requestAnimationFrame(step);
  }

  function cancelMomentum() {
    if (momentum) {
      cancelAnimationFrame(momentum);
      momentum = null;
    }
  }

  // ── Auto-scroll on scroll-trigger (horizontal parallax) ────────
  gsap.to(wrap, {
    scrollLeft: () => track.scrollWidth * 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: '#sectionCarousel',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    },
  });
}
