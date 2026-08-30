/* =========================================
   HOME PAGE LOGIC
   Independent from Opening. Handles:
   - Menu button clicks — every item now
     navigates somewhere real.
   - World icon click — navigates to world.html
========================================= */

import { playImageRainTransition } from '../explore/transition.js';
import { DoorTransition } from '../transitions/door/DoorTransition.js';

const menuButtons = document.querySelectorAll('.menu-btn');
const worldIconBtn = document.querySelector('.world-icon-btn');


/* =========================================
   Pages that open via the door transition,
   each with its own label text.
========================================= */

const DOOR_PAGES = {
    projects: { url: '/projects.html', label: 'ENTERING PROJECTS...' },
    skills: { url: '/skills.html', label: 'ENTERING SKILLS...' },
    experience: { url: '/experience.html', label: 'ENTERING EXPERIENCE...' },
    hobbies: { url: '/hobbies.html', label: 'ENTERING HOBBIES...' },
    others: { url: '/others.html', label: 'ENTERING OTHERS...' }
};


/* =========================================
   MENU CLICK HANDLER

   EXPLORE → image-rain transition
   Everything else with a door-page entry
   → door transition
========================================= */

function handleMenuClick(target) {

    if (target === 'explore') {
        playImageRainTransition('/explore.html');
        return;
    }

    const doorPage = DOOR_PAGES[target];

    if (doorPage) {
        DoorTransition.transitionTo(doorPage.url, { label: doorPage.label });
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