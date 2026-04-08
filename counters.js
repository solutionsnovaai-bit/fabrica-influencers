// ===== ANIMATED COUNTERS =====
export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  counters.forEach((el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);

    gsap.to({ val: 0 }, {
      val: target,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: function () {
        el.textContent = Math.round(this.targets()[0].val);
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}
