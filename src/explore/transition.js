/* =========================================
   IMAGE-RAIN TRANSITION
   Plays only when opening Explore from Home.

   10 images continuously fall from the top of
   the screen to the bottom for ~5 seconds,
   then navigates to Explore.

   Place your 10 images at:
   public/explore/transition/img-1.png
   public/explore/transition/img-2.png
   ...
   public/explore/transition/img-10.png
========================================= */

const OVERLAY_ID = 'world-transition-overlay';
const IMAGE_COUNT = 10;
const DEFAULT_DURATION_MS = 5000;
const SPAWN_INTERVAL_MS = 220;

const IMAGE_PATHS = Array.from(
    { length: IMAGE_COUNT },
    (_, i) => `/explore/transition/img-${i + 1}.png`
);


export function playImageRainTransition(targetUrl, durationMs = DEFAULT_DURATION_MS) {

    const overlay = document.getElementById(OVERLAY_ID);

    if (!overlay) {
        // No overlay on this page — just navigate.
        window.location.href = targetUrl;
        return;
    }

    overlay.innerHTML = '';
    overlay.classList.add('overlay-active');

    function spawnImage() {

        const src = IMAGE_PATHS[Math.floor(Math.random() * IMAGE_PATHS.length)];

        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        img.className = 'falling-image';

        const leftPercent = Math.random() * 90;          // 0–90vw
        const fallDuration = 1.4 + Math.random() * 1.2;   // 1.4s–2.6s
        const size = 60 + Math.random() * 40;             // 60–100px
        const spinDirection = Math.random() < 0.5 ? -1 : 1;

        img.style.left = `${leftPercent}vw`;
        img.style.width = `${size}px`;
        img.style.animationDuration = `${fallDuration}s`;
        img.style.setProperty('--spin', `${360 * spinDirection}deg`);

        overlay.appendChild(img);

        img.addEventListener('animationend', () => {
            img.remove();
        });
    }

    // Continuous spawning for the whole duration
    const spawnInterval = setInterval(spawnImage, SPAWN_INTERVAL_MS);

    // Fire an immediate first wave so it isn't empty on frame 1
    for (let i = 0; i < IMAGE_COUNT; i++) {
        setTimeout(spawnImage, i * 120);
    }

    setTimeout(() => {
        clearInterval(spawnInterval);
        window.location.href = targetUrl;
    }, durationMs);
}