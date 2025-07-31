export function createStars(count) {
  const container = document.querySelector('.stars-container');
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random position
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;

    // Random twinkle speed and delay
    star.style.animationDuration = `${1 + Math.random() * 3}s`;
    star.style.animationDelay = `${Math.random() * 3}s`;

    // Optional drifting effect
    star.animate([
      { transform: 'translateY(0)' },
      { transform: `translateY(${1 + Math.random() * 10}px)` }
    ], {
      duration: 5000 + Math.random() * 5000,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    });

    container.appendChild(star);
  }
}

export function createShootingStar() {
  const container = document.querySelector('.stars-container');
  const shootingStar = document.createElement('div');
  shootingStar.classList.add('shooting-star');

  // Possible directions: start position and translation vector (no rotation)
  const directions = [
    {
      start: { top: `${Math.random() * 20}vh`, left: '-5vw' },
      endTranslate: { x: window.innerWidth + 200, y: window.innerHeight / 2 }
    },
    {
      start: { top: `${Math.random() * 20}vh`, left: '105vw' },
      endTranslate: { x: -window.innerWidth - 200, y: window.innerHeight / 2 }
    },
    {
      start: { top: '105vh', left: `${Math.random() * 100}vw` },
      endTranslate: { x: 0, y: -window.innerHeight - 200 }
    },
    {
      start: { top: '-5vh', left: `${Math.random() * 100}vw` },
      endTranslate: { x: 0, y: window.innerHeight + 200 }
    }
  ];

  const dir = directions[Math.floor(Math.random() * directions.length)];

  shootingStar.style.top = dir.start.top;
  shootingStar.style.left = dir.start.left;

  container.appendChild(shootingStar);

  shootingStar.animate(
    [
      { transform: 'translate(0, 0)', opacity: 1 },
      {
        transform: `translate(${dir.endTranslate.x}px, ${dir.endTranslate.y}px)`,
        opacity: 0
      }
    ],
    {
      duration: 1500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    }
  );

  setTimeout(() => shootingStar.remove(), 1500);
}