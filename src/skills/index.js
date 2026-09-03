import {
    CATEGORIES,
    SKILLS,
    LEVELS
} from './data.js';


/* =========================================
   DOM ELEMENTS
========================================= */

const categoryView =
    document.getElementById('skill-category-view');

const skillListView =
    document.getElementById('skill-list-view');

const skillDetailView =
    document.getElementById('skill-detail-view');

const comingSoonView =
    document.getElementById('skill-coming-soon-view');


const categoryGrid =
    document.getElementById('skill-category-grid');

const skillGrid =
    document.getElementById('skill-grid');

const categoryTitle =
    document.getElementById('skill-category-title');


/* =========================================
   BUTTONS
========================================= */

const closeToHomeBtn =
    document.getElementById('close-to-home-btn');

const backToSkillsBtn =
    document.getElementById('back-to-skills-btn');

const backToSkillListBtn =
    document.getElementById('back-to-skill-list-btn');

const backFromComingSoonBtn =
    document.getElementById(
        'back-from-skill-coming-soon-btn'
    );


/* =========================================
   DETAIL ELEMENTS
========================================= */

const detailSkillName =
    document.getElementById('detail-skill-name');

const detailSkillNameValue =
    document.getElementById('detail-skill-name-value');

const detailSkillDescription =
    document.getElementById(
        'detail-skill-description'
    );

const detailSkillStatus =
    document.getElementById(
        'detail-skill-status'
    );

const detailSkillLevel =
    document.getElementById(
        'detail-skill-level'
    );

const detailRelatedSkills =
    document.getElementById(
        'detail-related-skills'
    );


const comingSoonName =
    document.getElementById(
        'skill-coming-soon-name'
    );


/* =========================================
   DETAIL IMAGE
========================================= */

const detailSkillImage =
    document.getElementById(
        'detail-skill-image'
    );

const detailSkillPlaceholder =
    document.getElementById(
        'detail-skill-image-placeholder'
    );


/* =========================================
   STATE
========================================= */

let currentCategory = null;
let currentSkill = null;


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        renderCategories();

        showScreen(categoryView);

    }
);


/* =========================================
   SCREEN MANAGEMENT
========================================= */

function showScreen(screen) {

    const screens = [
        categoryView,
        skillListView,
        skillDetailView,
        comingSoonView
    ];


    screens.forEach((item) => {

        if (!item) return;

        item.classList.remove(
            'active-screen'
        );

    });


    if (screen) {

        screen.classList.add(
            'active-screen'
        );

    }

}


/* =========================================
   CATEGORY CARDS
========================================= */

function renderCategories() {

    if (!categoryGrid) return;


    categoryGrid.innerHTML = '';


    CATEGORIES.forEach((category) => {

        const card =
            document.createElement('article');

        card.className =
            'skill-category-card';


        /* IMAGE */

        const image =
            document.createElement('img');

        image.className =
            'skill-category-image';

        image.src =
            category.image;

        image.alt =
            category.title;

        image.loading =
            'lazy';


        image.addEventListener(
            'error',
            () => {

                image.style.display =
                    'none';

            }
        );


        /* OVERLAY */

        const overlay =
            document.createElement('div');

        overlay.className =
            'skill-category-overlay';


        /* CONTENT */

        const content =
            document.createElement('div');

        content.className =
            'skill-category-content';


        const title =
            document.createElement('div');

        title.className =
            'skill-category-title';

        title.textContent =
            category.title;


        const skills =
            SKILLS[category.id] || [];


        const count =
            document.createElement('div');

        count.className =
            'skill-category-count';

        count.textContent =
            `${skills.length} SKILLS`;


        content.appendChild(title);
        content.appendChild(count);


        card.appendChild(image);
        card.appendChild(overlay);
        card.appendChild(content);


        card.addEventListener(
            'click',
            () => {

                openCategory(category);

            }
        );


        categoryGrid.appendChild(card);

    });

}


/* =========================================
   OPEN CATEGORY
========================================= */

function openCategory(category) {

    currentCategory =
        category.id;


    const skills =
        SKILLS[currentCategory] || [];


    if (
        category.comingSoon ||
        skills.length === 0
    ) {

        showComingSoon(
            category.title
        );

        return;

    }


    if (categoryTitle) {

        categoryTitle.textContent =
            category.title;

    }


    renderSkills(skills);

    showScreen(skillListView);

}


/* =========================================
   SKILL CARDS
========================================= */

function renderSkills(skills) {

    if (!skillGrid) return;


    skillGrid.innerHTML = '';


    skills.forEach((skill) => {

        const card =
            document.createElement('article');

        card.className =
            'skill-card';


        /* -------------------------------------
           CONTENT
        ------------------------------------- */

        const content =
            document.createElement('div');

        content.className =
            'skill-card-content';


        /* SKILL NAME */

        const name =
            document.createElement('div');

        name.className =
            'skill-card-name';

        name.textContent =
            skill.name;


        /* STATUS */

        const status =
            document.createElement('div');

        status.className =
            `skill-status ${skill.level}`;


        const levelData =
            LEVELS[skill.level];


        status.textContent =
            levelData
                ? levelData.label
                : skill.level.toUpperCase();


        content.appendChild(name);
        content.appendChild(status);


        card.appendChild(content);


        /* -------------------------------------
           CLICK
        ------------------------------------- */

        card.addEventListener(
            'click',
            () => {

                openSkill(skill);

            }
        );


        skillGrid.appendChild(card);

    });

}


/* =========================================
   OPEN SKILL
========================================= */

function openSkill(skill) {

    currentSkill =
        skill.id;


    /* NAME */

    if (detailSkillName) {

        detailSkillName.textContent =
            skill.name;

    }


    if (detailSkillNameValue) {

        detailSkillNameValue.textContent =
            skill.name;

    }


    /* DESCRIPTION */

    if (detailSkillDescription) {

        detailSkillDescription.textContent =
            skill.description ||
            'No description available yet.';

    }


    /* -------------------------------------
       DETAIL IMAGE
       
       Since individual skills no longer
       have images, show a simple block.
    ------------------------------------- */

    if (detailSkillImage) {

        detailSkillImage.style.display =
            'none';

    }


    if (detailSkillPlaceholder) {

        detailSkillPlaceholder.style.display =
            'flex';

        detailSkillPlaceholder.textContent =
            skill.name.toUpperCase();

    }


    /* STATUS */

    const levelData =
        LEVELS[skill.level];


    if (detailSkillStatus) {

        detailSkillStatus.className =
            'detail-skill-status';


        detailSkillStatus.classList.add(
            skill.level
        );


        detailSkillStatus.textContent =
            levelData
                ? levelData.label
                : skill.level.toUpperCase();

    }


    /* LEVEL */

    if (detailSkillLevel) {

        detailSkillLevel.className =
            'skill-detail-level';


        detailSkillLevel.classList.add(
            skill.level
        );


        detailSkillLevel.textContent =
            levelData
                ? levelData.label
                : skill.level.toUpperCase();

    }


    /* RELATED SKILLS */

    renderRelatedSkills(skill);


    showScreen(skillDetailView);

}


/* =========================================
   RELATED SKILLS
========================================= */

function renderRelatedSkills(skill) {

    if (!detailRelatedSkills) return;


    detailRelatedSkills.innerHTML = '';


    if (!currentCategory) return;


    const categorySkills =
        SKILLS[currentCategory] || [];


    categorySkills.forEach((item) => {

        if (item.id === skill.id) return;


        const tag =
            document.createElement('span');

        tag.className =
            'related-skill-tag';

        tag.textContent =
            item.name;


        detailRelatedSkills.appendChild(tag);

    });

}


/* =========================================
   COMING SOON
========================================= */

function showComingSoon(name) {

    if (comingSoonName) {

        comingSoonName.textContent =
            `${name} — MORE INFORMATION WILL BE ADDED SOON.`;

    }


    showScreen(comingSoonView);

}


/* =========================================
   BACK TO CATEGORIES
========================================= */

if (backToSkillsBtn) {

    backToSkillsBtn.addEventListener(
        'click',
        () => {

            currentCategory = null;
            currentSkill = null;

            showScreen(categoryView);

        }
    );

}


/* =========================================
   BACK TO SKILL LIST
========================================= */

if (backToSkillListBtn) {

    backToSkillListBtn.addEventListener(
        'click',
        () => {

            if (!currentCategory) {

                showScreen(categoryView);

                return;

            }


            const skills =
                SKILLS[currentCategory] || [];


            renderSkills(skills);

            showScreen(skillListView);

        }
    );

}


/* =========================================
   BACK FROM COMING SOON
========================================= */

if (backFromComingSoonBtn) {

    backFromComingSoonBtn.addEventListener(
        'click',
        () => {

            showScreen(categoryView);

        }
    );

}


/* =========================================
   CLOSE → HOME
========================================= */

if (closeToHomeBtn) {

    closeToHomeBtn.addEventListener(
        'click',
        () => {

            window.location.href =
                '/home.html';

        }
    );

}


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    'keydown',
    (event) => {

        if (event.key !== 'Escape') return;


        if (
            skillDetailView &&
            skillDetailView.classList.contains(
                'active-screen'
            )
        ) {

            const skills =
                SKILLS[currentCategory] || [];

            renderSkills(skills);

            showScreen(skillListView);

            return;

        }


        if (
            skillListView &&
            skillListView.classList.contains(
                'active-screen'
            )
        ) {

            currentCategory = null;

            showScreen(categoryView);

            return;

        }


        if (
            comingSoonView &&
            comingSoonView.classList.contains(
                'active-screen'
            )
        ) {

            showScreen(categoryView);

        }

    }
);


/* =========================================
   BACKGROUND VIDEO
========================================= */

const skillsVideo =
    document.getElementById(
        'skills-video'
    );


if (skillsVideo) {

    skillsVideo.play().catch(() => {
        // Browser may block autoplay.
    });

}