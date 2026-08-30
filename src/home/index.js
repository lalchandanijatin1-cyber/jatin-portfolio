/* =========================================
   HOME PAGE LOGIC
   Independent from Opening. Handles:
   - Menu button clicks — every item now
     navigates somewhere real.
   - World icon click — navigates to world.html
========================================= */

import { playImageRainTransition } from '../explore/transition.js';

const menuButtons = document.querySelectorAll('.menu-btn');
const worldIconBtn = document.querySelector('.world-icon-btn');


/* =========================================
   Direct-navigation targets.
   Each of these is currently an empty stub
   page (heading only) — fill them in later.
========================================= */

const DIRECT_PAGES = {
    projects: '/projects.html',
    skills: '/skills.html',
    experience: '/experience.html',
    hobbies: '/hobbies.html',
    others: '/others.html'
};


/* =========================================
   MENU CLICK HANDLER

   EXPLORE plays the image-rain transition,
   then opens Explore.

   Everything else navigates straight to its
   own page — no transition.
========================================= */

function handleMenuClick(target) {

    if (target === 'explore') {
        playImageRainTransition('/explore.html');
        return;
    }

    const page = DIRECT_PAGES[target];

    if (page) {
        window.location.href = page;
        return;
    }

    console.log(`Menu clicked: ${target} (no page mapped)`);
}


menuButtons.forEach(btn => {

    btn.addEventListener('click', () => {

        const target = btn.dataset.target;

        handleMenuClick(target);
    });
});


/* =========================================
   WORLD ICON CLICK HANDLER
========================================= */

if (worldIconBtn) {

    worldIconBtn.addEventListener('click', () => {

        window.location.href = '/world.html';
    });
}