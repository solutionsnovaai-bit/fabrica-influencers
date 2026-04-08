// ===== MARQUEE =====
export function initMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;

  // Clone track for seamless loop
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);

  // Base animation is CSS — here we speed it up on scroll
  let currentSpeed = 1;
  let targetSpeed  = 1;
  let lastScroll   = 0;
  let ticking      = false;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const delta   = Math.abs(scrollY - lastScroll);
    lastScroll    = scrollY;

    // Speed multiplier based on scroll velocity
    targetSpeed = 1 + Math.min(delta * 0.15, 4);

    if (!ticking) {
      requestAnimationFrame(updateSpeed);
      ticking = true;
    }
  }, { passive: true });

  function updateSpeed() {
    currentSpeed += (targetSpeed - currentSpeed) * 0.08;
    targetSpeed  += (1 - targetSpeed) * 0.05; // ease back to normal

    [track, clone].forEach((el) => {
      el.style.animationDuration = `${20 / currentSpeed}s`;
    });

    if (Math.abs(currentSpeed - 1) > 0.01) {
      requestAnimationFrame(updateSpeed);
    } else {
      ticking = false;
    }
  }
}
