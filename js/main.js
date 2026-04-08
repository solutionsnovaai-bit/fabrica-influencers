// ===== MAIN.JS — Entry Point =====
import { initLenis } from './lenis.js';
import { initCursor } from './cursor.js';
import { initGrain } from './grain.js';
import { initNav } from './nav.js';
import { initHero } from './hero.js';
import { initStickyPanels } from './stickyPanels.js';
import { initCarousel } from './carousel.js';
import { initRevealAnimations } from './reveals.js';
import { initCounters } from './counters.js';
import { initMagnetic } from './magnetic.js';
import { initProgressBar } from './progressBar.js';
import { initMarquee } from './marquee.js';

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Init all modules
  const lenis = initLenis();
  initGrain();
  initCursor();
  initNav();
  initProgressBar();
  initHero();
  initStickyPanels();
  initRevealAnimations();
  initCounters();
  initMagnetic();
  initCarousel();
  initMarquee();

  // Tick Lenis on GSAP
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
});
