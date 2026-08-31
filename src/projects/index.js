/* =========================================
   PROJECTS PAGE
   List view: 20 project rows, scrollable,
   only 2 clickable.
   Detail view: "EDIT WORLD"-style panel,
   shown when a clickable project is opened.
========================================= */

import { PROJECTS, PROJECT_DETAILS } from './data.js';

const listView = document.getElementById('projects-list-view');
const detailView = document.getElementById('project-detail-view');
const rowsContainer = document.getElementById('project-rows');

const projectNameValue = document.getElementById('project-name-value');
const topSkillsGrid = document.getElementById('top-skills-grid');
const skillsScroll = document.getElementById('skills-scroll');
const githubBtn = document.getElementById('github-link-btn');
const demoBtn = document.getElementById('demo-link-btn');
const feedbackBtn = document.getElementById('give-feedback-btn');
const backBtn = document.getElementById('back-to-projects-btn');


/* =========================================
   RENDER: LIST VIEW
========================================= */

function renderList() {

    rowsContainer.innerHTML = '';

    PROJECTS.forEach(project => {

        const row = document.createElement('button');
        row.className = 'project-row' + (project.available ? ' available' : ' locked');
        row.textContent = project.name;

        if (project.available) {

            row.addEventListener('click', () => {
                openDetail(project.key);
            });

        } else {

            row.disabled = true;
        }

        rowsContainer.appendChild(row);
    });
}


/* =========================================
   OPEN / CLOSE DETAIL VIEW
========================================= */

function openDetail(key) {

    const detail = PROJECT_DETAILS[key];

    if (!detail) {
        return;
    }

    projectNameValue.textContent = detail.projectName;

    topSkillsGrid.innerHTML = '';
    detail.topSkills.forEach(skill => {
        const box = document.createElement('div');
        box.className = 'top-skill-box';
        box.textContent = skill;
        topSkillsGrid.appendChild(box);
    });

    skillsScroll.innerHTML = '';
    detail.allSkills.forEach(skill => {
        const item = document.createElement('div');
        item.className = 'skill-list-item';
        item.textContent = skill;
        skillsScroll.appendChild(item);
    });

    githubBtn.onclick = () => {
        window.open(detail.github, '_blank', 'noopener,noreferrer');
    };

    demoBtn.onclick = () => {
        window.open(detail.demo, '_blank', 'noopener,noreferrer');
    };

    feedbackBtn.onclick = () => {
        window.open(detail.feedback, '_blank', 'noopener,noreferrer');
    };

    listView.classList.add('hidden');
    detailView.classList.add('visible');
}


function closeDetail() {

    detailView.classList.remove('visible');
    listView.classList.remove('hidden');
}


backBtn.addEventListener('click', closeDetail);


/* =========================================
   INIT
========================================= */

renderList();