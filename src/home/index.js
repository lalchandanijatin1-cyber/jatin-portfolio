
/* =========================================
   HOME PAGE LOGIC
   Independent from Opening. Handles:
   - Menu button clicks
   - Explore → Image-rain transition
   - Projects / Skills / Experience /
     Hobbies / Others → Block-wipe transition
   - World icon → Block-wipe transition
========================================= */

import { playImageRainTransition } from '../explore/transition.js';
import { BlockWipeTransition } from '../transitions/block-wipe/BlockWipeTransition.js';

/* =========================================
   BACKGROUND MUSIC
========================================= */

const backgroundMusic = new Audio('/audio/background-music.mp3');

backgroundMusic.loop = true;
backgroundMusic.volume = 0.35;


/* =========================================
   START MUSIC AFTER USER INTERACTION
========================================= */

function startBackgroundMusic() {

    backgroundMusic.play().catch(() => {
        console.log('Music playback was blocked by the browser.');
    });

}

document.addEventListener('click', startBackgroundMusic, {
    once: true
});
const menuButtons = document.querySelectorAll('.menu-btn');
const worldIconBtn = document.querySelector('.world-icon-btn');


/* =========================================
   PAGES THAT OPEN VIA BLOCK WIPE
========================================= */

const BLOCK_WIPE_PAGES = {

    projects: '/projects.html',

    skills: '/skills.html',

    experience: '/experience.html',

    hobbies: '/hobbies.html',

    others: '/others.html'

};


/* =========================================
   MENU CLICK HANDLER

   EXPLORE
       → Image-rain transition

   PROJECTS / SKILLS / EXPERIENCE /
   HOBBIES / OTHERS
       → Block-wipe transition
========================================= */

function handleMenuClick(target) {

    /* -----------------------------------------
       EXPLORE
       Keep existing image-rain transition
    ----------------------------------------- */

    if (target === 'explore') {

        playImageRainTransition('/explore.html');

        return;
    }


    /* -----------------------------------------
       BLOCK WIPE PAGES
    ----------------------------------------- */

    const blockWipeUrl = BLOCK_WIPE_PAGES[target];

    if (blockWipeUrl) {

        BlockWipeTransition.transitionTo(blockWipeUrl);

        return;
    }


    console.log(`Menu clicked: ${target} (no page mapped)`);
}


/* =========================================
   MENU BUTTON LISTENERS
========================================= */

menuButtons.forEach(btn => {

    btn.addEventListener('click', () => {

        const target = btn.dataset.target;

        handleMenuClick(target);

    });

});


/* =========================================
   WORLD ICON CLICK HANDLER

   World → Block-wipe transition
========================================= */

if (worldIconBtn) {

    worldIconBtn.addEventListener('click', () => {

        BlockWipeTransition.transitionTo('/world.html');

    });

}
