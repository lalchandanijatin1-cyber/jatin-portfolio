/* =========================================
   BLOCK WIPE TRANSITION
   Reusable Minecraft-style page transition —
   replaces the old door transition.

   A grid of square blocks spreads in from the
   edges/corners until the screen is fully
   covered, the new page loads underneath,
   then the blocks disperse (edges last) to
   reveal it.

   Usage:

       import { BlockWipeTransition } from
           '/src/transitions/block-wipe/BlockWipeTransition.js';

       BlockWipeTransition.transitionTo('/skills.html');

   Wired to: Projects, Skills, Experience,
   Hobbies, Others. NOT used for Explore
   (that keeps its own image-rain transition).

   No assets required — blocks are plain CSS
   colors, no textures/images needed.
========================================= */

const OVERLAY_ID = 'block-wipe-overlay';

const GRID_COLS = 10;
const GRID_ROWS = 6;

// Timings (ms) — keeps the whole thing in the
// ~0.8–1.2s range requested.
const TIMINGS = {
    cover: 400,        // blocks spreading in to fully cover
    coverSpread: 220,   // max stagger across cells during cover
    hold: 120,          // brief full-cover hold before navigating
    reveal: 400,        // blocks dispersing to reveal new page
    revealSpread: 220    // max stagger across cells during reveal
};

const VARIANT_COUNT = 4;


function prefersReducedMotion() {

    return window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}


function wait(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));
}


class BlockWipeTransitionClass {

    /* =========================================
       Call from the page you're LEAVING.
       Covers the screen, then navigates.
    ========================================= */

    async transitionTo(targetUrl, options = {}) {

        const overlay = document.getElementById(OVERLAY_ID);

        if (!overlay) {
            window.location.href = targetUrl;
            return;
        }

        try {

            if (prefersReducedMotion()) {
                overlay.classList.add('block-wipe-active', 'block-wipe-covered', 'block-wipe-reduced-motion');
                await wait(200);
                window.location.href = targetUrl;
                return;
            }

            this.buildGrid(overlay);

            overlay.classList.add('block-wipe-active');

            // Force layout so the animation restarts cleanly every time
            void overlay.offsetWidth;

            this.applyDelays(overlay, TIMINGS.coverSpread, /* fromEdges */ true);
            overlay.classList.add('block-wipe-covered');

            await wait(TIMINGS.cover + TIMINGS.coverSpread);
            await wait(TIMINGS.hold);

            window.location.href = targetUrl;

        } catch (err) {

            // Never leave the screen stuck behind a blocking overlay
            console.error('BlockWipeTransition.transitionTo failed, navigating anyway:', err);
            window.location.href = targetUrl;
        }
    }


    /* =========================================
       Call from the page you're ARRIVING on.
       Overlay starts already fully covering
       (via the "block-wipe-covered" class set
       directly in HTML, to avoid any flash),
       then disperses to reveal the page.
    ========================================= */

    async revealIn() {

        const overlay = document.getElementById(OVERLAY_ID);

        if (!overlay) {
            return;
        }

        // Absolute failsafe: no matter what happens above, this
        // guarantees the overlay is gone (and clicks work again)
        // within 3 seconds of page load.
        const failsafe = setTimeout(() => {
            overlay.classList.remove('block-wipe-covered', 'block-wipe-active');
            if (overlay.isConnected) {
                overlay.remove();
            }
        }, 3000);

        try {

            if (prefersReducedMotion()) {
                overlay.classList.remove('block-wipe-covered');
                await wait(200);
                overlay.remove();
                return;
            }

            this.buildGrid(overlay);

            // Force layout so cells render fully-covered before we
            // animate them away
            void overlay.offsetWidth;

            this.applyDelays(overlay, TIMINGS.revealSpread, /* fromEdges */ false);
            overlay.classList.remove('block-wipe-covered');

            await wait(TIMINGS.reveal + TIMINGS.revealSpread);

            overlay.remove();

        } catch (err) {

            // Never leave the page stuck behind a blocking overlay —
            // force it gone even if the animation logic broke.
            console.error('BlockWipeTransition.revealIn failed, clearing overlay anyway:', err);
            overlay.classList.remove('block-wipe-covered', 'block-wipe-active');
            overlay.remove();

        } finally {

            clearTimeout(failsafe);
        }
    }


    /* =========================================
       Builds the GRID_COLS x GRID_ROWS grid of
       block cells inside the overlay.
    ========================================= */

    buildGrid(overlay) {

        overlay.innerHTML = '';
        overlay.style.setProperty('--block-wipe-cols', GRID_COLS);
        overlay.style.setProperty('--block-wipe-rows', GRID_ROWS);

        for (let row = 0; row < GRID_ROWS; row++) {

            for (let col = 0; col < GRID_COLS; col++) {

                const cell = document.createElement('div');

                const variant = 1 + Math.floor(Math.random() * VARIANT_COUNT);
                cell.className = `block-wipe-cell block-wipe-variant-${variant}`;

                // Normalized distance to the nearest edge/corner:
                // 0 = on an edge, ~1 = dead center.
                const distX = Math.min(col, GRID_COLS - 1 - col) / (GRID_COLS / 2);
                const distY = Math.min(row, GRID_ROWS - 1 - row) / (GRID_ROWS / 2);
                cell.dataset.edgeDistance = Math.min(distX, distY).toFixed(3);

                overlay.appendChild(cell);
            }
        }
    }


    /* =========================================
       Sets each cell's transition-delay based
       on its distance from the edge.

       fromEdges = true  → edge cells go first
                            (covering the screen)
       fromEdges = false → edge cells go last
                            (revealing the page,
                            center clears first)
    ========================================= */

    applyDelays(overlay, spreadMs, fromEdges) {

        const cells = overlay.querySelectorAll('.block-wipe-cell');

        cells.forEach(cell => {

            const distance = parseFloat(cell.dataset.edgeDistance);
            const factor = fromEdges ? distance : (1 - distance);

            cell.style.transitionDelay = `${factor * spreadMs}ms`;
        });
    }
}


export const BlockWipeTransition = new BlockWipeTransitionClass();