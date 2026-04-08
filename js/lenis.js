// ===== LENIS SMOOTH SCROLL =====
export function initLenis() {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Link Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  return lenis;
}
