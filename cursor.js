// ===== CUSTOM CURSOR =====
export function initCursor() {
  // Skip on touch-only devices
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  // Track mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    gsap.set(cursor, { x: mouseX, y: mouseY });
  });

  // Follower lags behind with inertia
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    gsap.set(follower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover state on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .carousel-card, .editorial__img-wrap, [data-magnetic]'
  );

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor--hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor--hover');
    });
  });

  // Drag state
  const carousel = document.getElementById('carouselWrap');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor--drag');
      document.body.classList.remove('cursor--hover');
    });
    carousel.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor--drag');
    });
  }
}
