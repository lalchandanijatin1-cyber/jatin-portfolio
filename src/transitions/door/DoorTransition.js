/* =========================================
   DOOR TRANSITION
   Reusable Minecraft-style "walk through a
   door into another world" transition.

   Usage:

       import { DoorTransition } from
           '/src/transitions/door/DoorTransition.js';

       DoorTransition.transitionTo('/projects.html');

   Currently wired only to the PROJECTS button
   on Home. Safe to reuse later for Skills,
   Experience, Hobbies, etc. — just call
   transitionTo() with a different URL.

   Place the door artwork at:
   public/transitions/door/door.png

   Implementation note: each phase of the
   animation is driven by a single
   data-stage attribute on the overlay
   ("appear" → "grow" → "open" →
   "camera-forward" → "dark"), so every
   CSS rule below is a full, explicit,
   non-conflicting target state for that
   stage rather than several classes
   stacking transforms on top of each other.
========================================= */

const OVERLAY_ID = 'door-transition-overlay';
const LABEL_TEXT = 'ENTERING...';

// Timings (ms) — tune the whole transition from here only.
const TIMINGS = {
    appear: 450,
    grow: 500,
    labelHold: 250,
    open: 800,
    cameraForward: 550,
    darkHold: 200,
    navigateBuffer: 120
};


function prefersReducedMotion() {

    return window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}


function wait(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));
}


class DoorTransitionClass {

    /* =========================================
       Plays the full cinematic sequence, then
       navigates to targetUrl. Pass
       { onComplete } instead of navigating,
       for future flexibility.
    ========================================= */

    async transitionTo(targetUrl, options = {}) {

        const overlay = document.getElementById(OVERLAY_ID);

        if (!overlay) {
            // No transition markup on this page — just navigate.
            window.location.href = targetUrl;
            return;
        }

        if (prefersReducedMotion()) {
            await this.playReducedMotion(overlay);
            this.finish(targetUrl, options);
            return;
        }

        await this.playFullSequence(overlay, options.label ?? LABEL_TEXT);
        this.finish(targetUrl, options);
    }


    finish(targetUrl, options) {

        if (typeof options.onComplete === 'function') {
            options.onComplete();
            return;
        }

        window.location.href = targetUrl;
    }


    /* =========================================
       REDUCED MOTION: quick fade only
    ========================================= */

    async playReducedMotion(overlay) {

        overlay.classList.add('door-overlay-active', 'door-reduced-motion');
        overlay.dataset.stage = 'dark';

        await wait(250);
    }


    /* =========================================
       FULL SEQUENCE
    ========================================= */

    async playFullSequence(overlay, labelText) {

        const label = overlay.querySelector('.door-label');

        label.textContent = labelText;

        // Reset state from any previous run
        overlay.classList.remove('door-reduced-motion');
        overlay.dataset.stage = '';
        label.classList.remove('door-label-visible');

        overlay.classList.add('door-overlay-active');

        // Force layout so the sequence restarts cleanly every time
        void overlay.offsetWidth;

        // 1) Door appears (small, faded in)
        overlay.dataset.stage = 'appear';
        await wait(TIMINGS.appear);

        // 2) Door grows toward the viewer
        overlay.dataset.stage = 'grow';
        await wait(TIMINGS.grow);

        // Optional label flash just before opening
        if (labelText) {
            label.classList.add('door-label-visible');
            await wait(TIMINGS.labelHold);
            label.classList.remove('door-label-visible');
        }

        // 3) Door opens (3D rotate on its hinge)
        overlay.dataset.stage = 'open';
        await wait(TIMINGS.open);

        // 4) Camera moves forward through the doorway
        overlay.dataset.stage = 'camera-forward';
        await wait(TIMINGS.cameraForward);

        // 5) Brief dark moment
        overlay.dataset.stage = 'dark';
        await wait(TIMINGS.darkHold);

        // Small buffer so the dark frame is guaranteed to paint
        // before we navigate away.
        await wait(TIMINGS.navigateBuffer);
    }
}


export const DoorTransition = new DoorTransitionClass();