import { EXPERIENCE } from "./data.js";


// =========================================================
// ELEMENTS
// =========================================================

const mainView =
    document.getElementById(
        "experience-main-view"
    );

const detailView =
    document.getElementById(
        "experience-detail-view"
    );

const comingSoonView =
    document.getElementById(
        "coming-soon-detail-view"
    );


const mechaDojoCard =
    document.getElementById(
        "mecha-dojo-card"
    );

const comingSoonCard =
    document.getElementById(
        "coming-soon-card"
    );


const closeButton =
    document.getElementById(
        "close-to-home-btn"
    );

const backButton =
    document.getElementById(
        "back-to-experience-btn"
    );

const comingSoonBackButton =
    document.getElementById(
        "back-from-coming-soon-btn"
    );


// =========================================================
// SCREEN CONTROL
// =========================================================

function hideAllScreens() {

    mainView.classList.remove(
        "active-screen"
    );

    detailView.classList.remove(
        "active-screen"
    );

    comingSoonView.classList.remove(
        "active-screen"
    );

}


function showMain() {

    hideAllScreens();

    mainView.classList.add(
        "active-screen"
    );

    mainView.scrollTop = 0;
}


function showMechaDojo() {

    hideAllScreens();

    detailView.classList.add(
        "active-screen"
    );

    detailView.scrollTop = 0;
}


function showComingSoon() {

    hideAllScreens();

    comingSoonView.classList.add(
        "active-screen"
    );

    comingSoonView.scrollTop = 0;
}


// =========================================================
// LOAD MECHA DOJO
// =========================================================

function loadExperience() {

    document.getElementById(
        "detail-experience-name"
    ).textContent =
        EXPERIENCE.name;


    const image =
        document.getElementById(
            "detail-experience-image"
        );

    image.src =
        EXPERIENCE.image;

    image.alt =
        EXPERIENCE.name;


    document.getElementById(
        "detail-experience-role"
    ).textContent =
        EXPERIENCE.role;


    document.getElementById(
        "detail-experience-description"
    ).textContent =
        EXPERIENCE.description;


    // Responsibilities

    const responsibilities =
        document.getElementById(
            "detail-experience-responsibilities"
        );

    responsibilities.innerHTML = "";


    EXPERIENCE.responsibilities.forEach(
        (item) => {

            const element =
                document.createElement(
                    "div"
                );

            element.className =
                "experience-responsibility-item";

            element.textContent =
                item;

            responsibilities.appendChild(
                element
            );

        }
    );


    // Skills

    const skills =
        document.getElementById(
            "detail-experience-skills"
        );

    skills.innerHTML = "";


    EXPERIENCE.skills.forEach(
        (skill) => {

            const element =
                document.createElement(
                    "span"
                );

            element.className =
                "experience-skill-tag";

            element.textContent =
                skill;

            skills.appendChild(
                element
            );

        }
    );

}


// =========================================================
// MECHA DOJO
// =========================================================

mechaDojoCard.addEventListener(
    "click",
    () => {

        loadExperience();

        showMechaDojo();

    }
);


// =========================================================
// COMING SOON
// =========================================================

comingSoonCard.addEventListener(
    "click",
    () => {

        showComingSoon();

    }
);


// =========================================================
// BACK
// =========================================================

backButton.addEventListener(
    "click",
    showMain
);


comingSoonBackButton.addEventListener(
    "click",
    showMain
);


// =========================================================
// HOME
// =========================================================

closeButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "/home.html";

    }
);


// =========================================================
// ESCAPE
// =========================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        if (
            detailView.classList.contains(
                "active-screen"
            ) ||
            comingSoonView.classList.contains(
                "active-screen"
            )
        ) {

            showMain();

        } else {

            window.location.href =
                "/home.html";

        }

    }
);


// =========================================================
// VIDEO
// =========================================================

const video =
    document.getElementById(
        "experience-video"
    );

if (video) {

    video.muted = true;

    video.play().catch(() => {});

}


// =========================================================
// INITIALIZE
// =========================================================

loadExperience();

showMain();

console.log(
    "Experience initialized."
);