import { OTHERS } from "./data.js";


// =========================
// ELEMENTS
// =========================

const mainView =
    document.getElementById("others-main-view");

const resumeView =
    document.getElementById("resume-detail-view");

const linksView =
    document.getElementById("all-links-detail-view");


const resumeCard =
    document.getElementById("resume-card");

const linksCard =
    document.getElementById("all-links-card");


const closeButton =
    document.getElementById("close-to-home-btn");

const resumeBackButton =
    document.getElementById("back-from-resume-btn");

const linksBackButton =
    document.getElementById("back-from-links-btn");

const video =
    document.getElementById("others-video");


// =========================
// SCREEN CONTROL
// =========================

function hideAllScreens() {

    mainView.classList.remove("active-screen");

    resumeView.classList.remove("active-screen");

    linksView.classList.remove("active-screen");
}


function showMain() {

    hideAllScreens();

    mainView.classList.add("active-screen");

    mainView.scrollTop = 0;
}


function showResume() {

    hideAllScreens();

    resumeView.classList.add("active-screen");

    resumeView.scrollTop = 0;
}


function showLinks() {

    hideAllScreens();

    linksView.classList.add("active-screen");

    linksView.scrollTop = 0;
}


// =========================
// CARD EVENTS
// =========================

resumeCard.addEventListener("click", () => {

    showResume();

});


linksCard.addEventListener("click", () => {

    showLinks();

});


// Keyboard accessibility

resumeCard.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();

        showResume();

    }

});


linksCard.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();

        showLinks();

    }

});


// =========================
// BACK BUTTONS
// =========================

resumeBackButton.addEventListener(
    "click",
    showMain
);


linksBackButton.addEventListener(
    "click",
    showMain
);


// =========================
// HOME BUTTON
// =========================

closeButton.addEventListener(
    "click",
    () => {

        window.location.href = "/home.html";

    }
);


// =========================
// ESCAPE KEY
// =========================

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        if (
            resumeView.classList.contains(
                "active-screen"
            ) ||
            linksView.classList.contains(
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


// =========================
// BACKGROUND VIDEO
// =========================

if (video) {

    video.muted = true;

    video.play().catch(() => {});

}


// =========================
// INITIALIZE
// =========================

showMain();

console.log(
    "Others initialized.",
    OTHERS
);