// ===== STICKY PANELS (Seção Dor) =====
export function initStickyPanels() {
  const section = document.getElementById('sectionDor');
  if (!section) return;

  const panels = section.querySelectorAll('.sticky-split__panel');
  const stickyImg = section.querySelector('.sticky-split__img');

  if (!panels.length) return;

  // Split titles inside panels
  panels.forEach((panel) => {
    const titleEl = panel.querySelector('[data-split]');
    if (titleEl) {
      new SplitType(titleEl, { types: 'words' });
    }
  });

  // On mobile — skip sticky logic, use simple reveal
  if (window.innerWidth <= 900) {
    panels.forEach((panel) => {
      panel.classList.add('panel--active');
      gsap.from(panel, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 80%',
        },
      });
    });
    return;
  }

  // Desktop sticky scroll — activate panels one by one
  panels.forEach((panel, i) => {
    // Remove initial active from all except first
    panel.classList.remove('panel--active');

    ScrollTrigger.create({
      trigger: panel,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => activatePanel(panel, panels),
      onEnterBack: () => activatePanel(panel, panels),
    });
  });

  // Activate first panel immediately
  if (panels[0]) panels[0].classList.add('panel--active');

  // Subtle parallax on the sticky image
  if (stickyImg) {
    gsap.to(stickyImg, {
      scale: 1.0,
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }
}

function activatePanel(activePanel, allPanels) {
  allPanels.forEach((panel) => panel.classList.remove('panel--active'));
  activePanel.classList.add('panel--active');

  // Animate words in active panel
  const words = activePanel.querySelectorAll('.word');
  if (words.length) {
    gsap.from(words, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.04,
      ease: 'power3.out',
    });
  }

  // Animate body paragraphs
  const bodies = activePanel.querySelectorAll('.section__body, .section__list-item');
  if (bodies.length) {
    gsap.from(bodies, {
      opacity: 0,
      y: 15,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.1,
    });
  }
}
