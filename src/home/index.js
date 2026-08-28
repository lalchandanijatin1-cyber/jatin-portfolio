/* =========================================
   HOME PAGE LOGIC
   Independent from Opening. Handles:
   - Menu button clicks (placeholders for now)
   - World icon click (placeholder for now)
========================================= */

const menuButtons = document.querySelectorAll('.menu-btn');
const worldIconBtn = document.querySelector('.world-icon-btn');


/* =========================================
   MENU CLICK HANDLER (placeholder)

   Replace the body of this function once each
   section (Explore, Projects, Skills,
   Experience, Hobbies, Others) has a real
   page/route to go to.
========================================= */

function handleMenuClick(target) {

    console.log(`Menu clicked: ${target} (placeholder — no page wired yet)`);
}


menuButtons.forEach(btn => {

    btn.addEventListener('click', () => {

        const target = btn.dataset.target;

        handleMenuClick(target);
    });
});


/* =========================================
   WORLD ICON CLICK HANDLER (placeholder)
========================================= */

if (worldIconBtn) {

    worldIconBtn.addEventListener('click', () => {

        console.log('World icon clicked (placeholder — no page wired yet)');
    });
}