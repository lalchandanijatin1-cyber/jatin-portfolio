
/* =========================================
   PROJECTS PAGE CONTROLLER

   FLOW:

   HOME
      ↓
   CATEGORIES
      ↓
   PROJECT LIST
      ↓
   PROJECT DETAIL

   Every project is clickable.

   Projects marked comingSoon show the
   Coming Soon screen.

   Categories without projects also show
   Coming Soon.
========================================= */

import {
    CATEGORIES,
    PROJECTS
} from './data.js';


/* =========================================
   ELEMENTS
========================================= */

const categoryView =
    document.getElementById('category-view');

const projectListView =
    document.getElementById('project-list-view');

const projectDetailView =
    document.getElementById('project-detail-view');

const comingSoonView =
    document.getElementById('coming-soon-view');

const categoryGrid =
    document.getElementById('category-grid');

const projectGrid =
    document.getElementById('project-grid');

const categoryTitle =
    document.getElementById('category-title');

const closeHomeBtn =
    document.getElementById('close-to-home-btn');

const backCategoriesBtn =
    document.getElementById('back-to-categories-btn');

const backProjectsBtn =
    document.getElementById('back-to-projects-btn');

const backComingSoonBtn =
    document.getElementById('back-from-coming-soon-btn');


/* =========================================
   DETAIL ELEMENTS
========================================= */

const detailProjectName =
    document.getElementById('detail-project-name');

const detailNameValue =
    document.getElementById('detail-name-value');

const detailDescription =
    document.getElementById('detail-description');

const detailStatus =
    document.getElementById('detail-status');

const detailProjectImage =
    document.getElementById('detail-project-image');

const detailImagePlaceholder =
    document.getElementById('detail-image-placeholder');

const detailTopSkills =
    document.getElementById('detail-top-skills');

const detailAllSkills =
    document.getElementById('detail-all-skills');

const detailGithubBtn =
    document.getElementById('detail-github-btn');

const detailDemoBtn =
    document.getElementById('detail-demo-btn');

const detailLinksSection =
    document.getElementById('detail-links-section');

const comingSoonName =
    document.getElementById('coming-soon-name');


/* =========================================
   NAVIGATION STATE

   Keeps track of where Coming Soon was opened.
========================================= */

let currentCategory = null;
let comingSoonFrom = null;


/* =========================================
   SAFETY CHECK
========================================= */

const requiredElements = {
    categoryView,
    projectListView,
    projectDetailView,
    comingSoonView,
    categoryGrid,
    projectGrid,
    categoryTitle,
    closeHomeBtn,
    backCategoriesBtn,
    backProjectsBtn,
    backComingSoonBtn
};

for (const [name, element] of Object.entries(requiredElements)) {

    if (!element) {
        console.error(
            `Projects page error: Missing element #${name}`
        );
    }

}


/* =========================================
   SCREEN CONTROL
========================================= */

function hideAllScreens() {

    categoryView?.classList.remove('active-screen');

    projectListView?.classList.remove('active-screen');

    projectDetailView?.classList.remove('active-screen');

    comingSoonView?.classList.remove('active-screen');

}


function showScreen(screen) {

    if (!screen) {
        return;
    }

    hideAllScreens();

    screen.classList.add('active-screen');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}


/* =========================================
   CATEGORIES
========================================= */

function renderCategories() {

    if (!categoryGrid) {
        return;
    }

    categoryGrid.innerHTML = '';

    CATEGORIES.forEach(category => {

        const card =
            document.createElement('button');

        card.type = 'button';

        card.className = 'category-card';

        card.innerHTML = `

            <div class="card-image-wrap">

                <img
                    src="${category.image}"
                    alt="${category.title}"
                    class="card-image"
                >

                <div class="card-image-fallback">
                    ${category.title}
                </div>

            </div>

            <div class="card-title">
                ${category.title}
            </div>

            <div class="card-arrow">
                →
            </div>

        `;


        const image =
            card.querySelector('.card-image');

        const fallback =
            card.querySelector('.card-image-fallback');


        image.addEventListener('error', () => {

            image.style.display = 'none';

            fallback.style.display = 'flex';

        });


        card.addEventListener('click', () => {

            openCategory(category);

        });


        categoryGrid.appendChild(card);

    });

}


/* =========================================
   OPEN CATEGORY
========================================= */

function openCategory(category) {

    currentCategory = category;

    /*
        Category itself is Coming Soon.
    */

    if (category.comingSoon) {

        comingSoonFrom = 'category';

        openComingSoon(category.title);

        return;

    }


    const projects =
        PROJECTS[category.id] || [];


    /*
        No projects available.
    */

    if (projects.length === 0) {

        comingSoonFrom = 'category';

        openComingSoon(category.title);

        return;

    }


    categoryTitle.textContent =
        category.title.toUpperCase();


    renderProjects(projects);

    showScreen(projectListView);

}


/* =========================================
   PROJECT LIST
========================================= */

function renderProjects(projects) {

    if (!projectGrid) {
        return;
    }

    projectGrid.innerHTML = '';

    projects.forEach(project => {

        const card =
            document.createElement('button');

        card.type = 'button';

        card.className = 'project-card';


        card.innerHTML = `

            <div class="project-card-image-wrap">

                <img
                    src="${project.image}"
                    alt="${project.name}"
                    class="project-card-image"
                >

                <div class="project-card-placeholder">
                    ${project.name}
                </div>

                ${
                    project.comingSoon
                    ?
                    `
                    <div class="project-coming-badge">
                        COMING SOON
                    </div>
                    `
                    :
                    ''
                }

            </div>


            <div class="project-card-content">

                <div class="project-card-name">
                    ${project.name}
                </div>

                <div class="project-card-status">
                    ${project.status || ''}
                </div>

            </div>


            <div class="project-card-arrow">
                →
            </div>

        `;


        const image =
            card.querySelector('.project-card-image');

        const placeholder =
            card.querySelector('.project-card-placeholder');


        image.addEventListener('error', () => {

            image.style.display = 'none';

            placeholder.style.display = 'flex';

        });


        /*
            IMPORTANT:

            Every project is clickable.
        */

        card.addEventListener('click', () => {

            openProject(project);

        });


        projectGrid.appendChild(card);

    });

}


/* =========================================
   OPEN PROJECT
========================================= */

function openProject(project) {

    currentCategory = currentCategory;

    /*
        Coming Soon project.
    */

    if (project.comingSoon) {

        comingSoonFrom = 'project';

        openComingSoon(project.name);

        return;

    }


    /*
        Normal project.
    */

    renderProjectDetail(project);

    showScreen(projectDetailView);

}


/* =========================================
   PROJECT DETAIL
========================================= */

function renderProjectDetail(project) {

    if (!detailProjectName) {
        return;
    }


    detailProjectName.textContent =
        project.name;


    detailNameValue.textContent =
        project.name;


    detailDescription.textContent =
        project.description ||
        'No description added yet.';


    detailStatus.textContent =
        project.status || '';


    /* =====================================
       IMAGE
    ===================================== */

    detailImagePlaceholder.textContent =
        project.name;


    detailProjectImage.style.display =
        'block';


    detailProjectImage.src =
        project.image;


    detailProjectImage.alt =
        project.name;


    detailProjectImage.onerror = () => {

        detailProjectImage.style.display =
            'none';

        detailImagePlaceholder.style.display =
            'flex';

    };


    detailProjectImage.onload = () => {

        detailProjectImage.style.display =
            'block';

        detailImagePlaceholder.style.display =
            'none';

    };


    /* =====================================
       TOP SKILLS
    ===================================== */

    detailTopSkills.innerHTML = '';


    (project.topSkills || []).forEach(skill => {

        const skillBox =
            document.createElement('div');

        skillBox.className =
            'top-skill';

        skillBox.textContent =
            skill;

        detailTopSkills.appendChild(skillBox);

    });


    /* =====================================
       ALL SKILLS
    ===================================== */

    detailAllSkills.innerHTML = '';


    (project.allSkills || []).forEach(skill => {

        const skillItem =
            document.createElement('div');

        skillItem.className =
            'all-skill';

        skillItem.textContent =
            skill;

        detailAllSkills.appendChild(skillItem);

    });


    /* =====================================
       GITHUB
    ===================================== */

    if (project.github) {

        detailGithubBtn.style.display =
            'block';

        detailGithubBtn.onclick = () => {

            window.open(
                project.github,
                '_blank',
                'noopener,noreferrer'
            );

        };

    } else {

        detailGithubBtn.style.display =
            'none';

    }


    /* =====================================
       DEMO
    ===================================== */

    if (project.demo) {

        detailDemoBtn.style.display =
            'block';

        detailDemoBtn.onclick = () => {

            window.open(
                project.demo,
                '_blank',
                'noopener,noreferrer'
            );

        };

    } else {

        detailDemoBtn.style.display =
            'none';

    }


    /* =====================================
       LINKS SECTION
    ===================================== */

    if (!project.github && !project.demo) {

        detailLinksSection.style.display =
            'none';

    } else {

        detailLinksSection.style.display =
            'block';

    }

}


/* =========================================
   COMING SOON
========================================= */

function openComingSoon(name) {

    comingSoonName.textContent =
        `${name} — MORE INFORMATION WILL BE ADDED SOON.`;

    showScreen(comingSoonView);

}


/* =========================================
   BACK TO CATEGORIES
========================================= */

backCategoriesBtn.addEventListener(
    'click',
    () => {

        currentCategory = null;

        showScreen(categoryView);

    }
);


/* =========================================
   BACK TO PROJECT LIST
========================================= */

backProjectsBtn.addEventListener(
    'click',
    () => {

        showScreen(projectListView);

    }
);


/* =========================================
   BACK FROM COMING SOON
========================================= */

backComingSoonBtn.addEventListener(
    'click',
    () => {

        /*
            Coming Soon opened from a project:
            return to that category's project list.
        */

        if (comingSoonFrom === 'project') {

            const projects =
                currentCategory
                    ? PROJECTS[currentCategory.id] || []
                    : [];

            renderProjects(projects);

            showScreen(projectListView);

            return;
        }


        /*
            Coming Soon opened directly from
            a category:
            return to categories.
        */

        currentCategory = null;

        showScreen(categoryView);

    }
);


/* =========================================
   BACK TO HOME
========================================= */

closeHomeBtn.addEventListener(
    'click',
    () => {

        window.location.href =
            '/home.html';

    }
);


/* =========================================
   INITIALIZE
========================================= */

renderCategories();

showScreen(categoryView);
