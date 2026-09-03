import { EXPERIENCE } from './data.js';


// =========================================================
// ELEMENTS
// =========================================================

const mainView = document.getElementById('experience-main-view');
const detailView = document.getElementById('experience-detail-view');

const mechaDojoCard = document.getElementById('mecha-dojo-card');

const closeToHomeBtn = document.getElementById('close-to-home-btn');
const backToExperienceBtn = document.getElementById(
    'back-to-experience-btn'
);

const detailExperienceName =
    document.getElementById('detail-experience-name');

const detailExperienceImage =
    document.getElementById('detail-experience-image');

const detailExperienceRole =
    document.getElementById('detail-experience-role');

const detailExperienceDuration =
    document.getElementById('detail-experience-duration');

const detailExperienceDescription =
    document.getElementById('detail-experience-description');

const detailExperienceResponsibilities =
    document.getElementById(
        'detail-experience-responsibilities'
    );

const detailExperienceSkills =
    document.getElementById(
        'detail-experience-skills'
    );

const experienceVideo =
    document.getElementById('experience-video');


// =========================================================
// SHOW MAIN EXPERIENCE
// =========================================================

function showMainView() {

    mainView.classList.add('active-screen');
    detailView.classList.remove('active-screen');

    mainView.scrollTop = 0;
}


// =========================================================
// SHOW MECHA DOJO DETAIL
// =========================================================

function showDetailView() {

    mainView.classList.remove('active-screen');
    detailView.classList.add('active-screen');

    detailView.scrollTop = 0;
}


// =========================================================
// LOAD MECHA DOJO DATA
// =========================================================

function loadExperience() {

    detailExperienceName.textContent =
        EXPERIENCE.name;

    detailExperienceImage.src =
        EXPERIENCE.image;

    detailExperienceImage.alt =
        EXPERIENCE.name;

    detailExperienceRole.textContent =
        EXPERIENCE.role;

    detailExperienceDuration.textContent =
        EXPERIENCE.duration;

    detailExperienceDescription.textContent =
        EXPERIENCE.description;


    // ---------------------------------------------------------
    // RESPONSIBILITIES
    // ---------------------------------------------------------

    detailExperienceResponsibilities.innerHTML = '';

    EXPERIENCE.responsibilities.forEach(
        (responsibility) => {

            const item =
                document.createElement('div');

            item.className =
                'experience-responsibility-item';

            item.textContent =
                responsibility;

            detailExperienceResponsibilities.appendChild(
                item
            );
        }
    );


    // ---------------------------------------------------------
    // SKILLS
    // ---------------------------------------------------------

    detailExperienceSkills.innerHTML = '';

    EXPERIENCE.skills.forEach(
        (skill) => {

            const tag =
                document.createElement('span');

            tag.className =
                'experience-skill-tag';

            tag.textContent =
                skill;

            detailExperienceSkills.appendChild(
                tag
            );
        }
    );
}


// =========================================================
// MECHA DOJO CLICK
// =========================================================

if (mechaDojoCard) {

    mechaDojoCard.addEventListener(
        'click',
        () => {

            console.log('Mecha Dojo clicked');

            loadExperience();

            showDetailView();
        }
    );


    // Keyboard support
    mechaDojoCard.addEventListener(
        'keydown',
        (event) => {

            if (
                event.key === 'Enter' ||
                event.key === ' '
            ) {

                event.preventDefault();

                loadExperience();

                showDetailView();
            }
        }
    );

}


// =========================================================
// BACK TO EXPERIENCE
// =========================================================

if (backToExperienceBtn) {

    backToExperienceBtn.addEventListener(
        'click',
        () => {

            showMainView();
        }
    );

}


// =========================================================
// GO HOME
// =========================================================

if (closeToHomeBtn) {

    closeToHomeBtn.addEventListener(
        'click',
        () => {

            window.location.href = '/home.html';
        }
    );

}


// =========================================================
// ESCAPE KEY
// =========================================================

document.addEventListener(
    'keydown',
    (event) => {

        if (event.key !== 'Escape') {
            return;
        }


        if (
            detailView &&
            detailView.classList.contains(
                'active-screen'
            )
        ) {

            showMainView();

        } else {

            window.location.href =
                '/home.html';

        }
    }
);


// =========================================================
// VIDEO
// =========================================================

if (experienceVideo) {

    experienceVideo.muted = true;

    const playPromise =
        experienceVideo.play();

    if (playPromise) {

        playPromise.catch(() => {
            console.log(
                'Video autoplay was blocked.'
            );
        });

    }
}


// =========================================================
// INITIALIZE
// =========================================================

loadExperience();

showMainView();

console.log(
    'Experience page loaded successfully.'
);