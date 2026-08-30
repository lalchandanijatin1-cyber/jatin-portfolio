import { PROJECTS, SKILLS, SERVICES } from './data.js';


/* =========================================
   STATE
========================================= */

const TABS = ['projects', 'skills', 'services'];

let activeTab = new URLSearchParams(window.location.search).get('tab');

if (!TABS.includes(activeTab)) {
    activeTab = 'projects';
}

let activeSkillCategory = null;


/* =========================================
   ELEMENTS
========================================= */

const panelContent = document.getElementById('panel-content');
const tabButtons = document.querySelectorAll('.tab-btn[data-tab]');


/* =========================================
   RENDER: PROJECTS TAB
========================================= */

function renderProjects() {

    const list = document.createElement('div');
    list.className = 'project-list';

    PROJECTS.forEach(project => {

        const row = document.createElement('div');
        row.className = 'project-row' + (project.available ? ' available' : ' locked');

        row.innerHTML = `
            <div class="project-thumb"></div>
            <div class="project-info">
                <div class="project-name">${project.name}</div>
                <div class="project-status">
                    ${project.available ? 'Click to open' : 'Coming Soon'}
                </div>
            </div>
            ${project.available ? '<div class="project-action">&#8594;</div>' : ''}
        `;

        if (project.available) {

            row.addEventListener('click', () => {
                window.open(project.url, '_blank', 'noopener,noreferrer');
            });

        } else {

            row.setAttribute('aria-disabled', 'true');
        }

        list.appendChild(row);
    });

    return list;
}


/* =========================================
   RENDER: SKILLS TAB
========================================= */

function renderSkills() {

    if (activeSkillCategory) {
        return renderSkillDetail(activeSkillCategory);
    }

    return renderSkillCategoryList();
}


function renderSkillCategoryList() {

    const list = document.createElement('div');
    list.className = 'skill-category-list';

    Object.entries(SKILLS).forEach(([key, category]) => {

        const row = document.createElement('button');
        row.className = 'skill-category-row';
        row.textContent = category.label;

        row.addEventListener('click', () => {
            activeSkillCategory = key;
            renderPanel();
        });

        list.appendChild(row);
    });

    return list;
}


function renderSkillDetail(key) {

    const category = SKILLS[key];

    const wrap = document.createElement('div');
    wrap.className = 'skill-detail';

    const backBtn = document.createElement('button');
    backBtn.className = 'skill-back-btn';
    backBtn.innerHTML = '&#8592; Back to Categories';

    backBtn.addEventListener('click', () => {
        activeSkillCategory = null;
        renderPanel();
    });

    wrap.appendChild(backBtn);

    const heading = document.createElement('div');
    heading.className = 'skill-detail-heading';
    heading.textContent = category.label;
    wrap.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'skill-chip-grid';

    category.know.forEach(skill => {
        const chip = document.createElement('span');
        chip.className = 'skill-chip skill-know';
        chip.textContent = skill;
        grid.appendChild(chip);
    });

    category.yetToLearn.forEach(skill => {
        const chip = document.createElement('span');
        chip.className = 'skill-chip skill-yet';
        chip.textContent = skill;
        grid.appendChild(chip);
    });

    if (category.know.length === 0 && category.yetToLearn.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'skill-empty';
        empty.textContent = 'No skills listed yet.';
        wrap.appendChild(empty);
    } else {
        wrap.appendChild(grid);
    }

    return wrap;
}


/* =========================================
   RENDER: SERVICES TAB
========================================= */

function renderServices() {

    const list = document.createElement('div');
    list.className = 'service-list';

    SERVICES.forEach(service => {

        const row = document.createElement('div');
        row.className = 'service-row';

        row.innerHTML = `
            <div class="service-name">${service.name}</div>
            ${service.sub ? `<div class="service-sub">${service.sub}</div>` : ''}
        `;

        row.addEventListener('click', () => {

            if (service.action === 'link') {
                window.open(service.url, '_blank', 'noopener,noreferrer');
            } else {
                // Placeholder state for services without a page yet
                alert('COMING SOON');
            }
        });

        list.appendChild(row);
    });

    return list;
}


/* =========================================
   MAIN PANEL RENDER
========================================= */

function renderPanel() {

    panelContent.innerHTML = '';

    let content;

    if (activeTab === 'projects') {
        content = renderProjects();
    } else if (activeTab === 'skills') {
        content = renderSkills();
    } else {
        content = renderServices();
    }

    panelContent.appendChild(content);

    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === activeTab);
    });
}


/* =========================================
   TAB NAVIGATION
========================================= */

tabButtons.forEach(btn => {

    btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        activeSkillCategory = null;
        renderPanel();
    });
});


function cycleTab(direction) {

    const currentIndex = TABS.indexOf(activeTab);
    const nextIndex = (currentIndex + direction + TABS.length) % TABS.length;

    activeTab = TABS[nextIndex];
    activeSkillCategory = null;

    renderPanel();
}


document.getElementById('tab-prev').addEventListener('click', () => cycleTab(-1));
document.getElementById('tab-next').addEventListener('click', () => cycleTab(1));


/* =========================================
   BACK TO HOME 
========================================= */

function goBackHome() {
    window.location.href = '/home.html';
}


document.getElementById('close-tab').addEventListener('click', goBackHome);
document.getElementById('back-to-home-btn').addEventListener('click', goBackHome);


/* =========================================
   BUILD WITH ME / CONNECT WITH ME
========================================= */

document.getElementById('build-with-me-btn').addEventListener('click', () => {
    // Placeholder — no dedicated page/contact flow yet
    console.log('Build With Me clicked (placeholder — no target wired yet)');
});

document.getElementById('connect-with-me-btn').addEventListener('click', () => {
    window.open(
        'https://www.linkedin.com/in/jatin-lalchandani-robotics/',
        '_blank',
        'noopener,noreferrer'
    );
});


/* =========================================
   INIT
========================================= */

renderPanel();