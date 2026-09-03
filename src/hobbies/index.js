import { HOBBIES } from "./data.js";


// =========================================================
// ELEMENTS
// =========================================================

const mainView =
    document.getElementById(
        "hobbies-main-view"
    );


const writingDetailView =
    document.getElementById(
        "writing-detail-view"
    );


const writingCard =
    document.getElementById(
        "writing-card"
    );


const closeButton =
    document.getElementById(
        "close-to-home-btn"
    );


const backButton =
    document.getElementById(
        "back-to-hobbies-btn"
    );


const video =
    document.getElementById(
        "hobbies-video"
    );


// =========================================================
// SCREEN CONTROL
// =========================================================

function hideAllScreens() {

    mainView.classList.remove(
        "active-screen"
    );

    writingDetailView.classList.remove(
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


function showWriting() {

    hideAllScreens();

    writingDetailView.classList.add(
        "active-screen"
    );

    writingDetailView.scrollTop = 0;

}


// =========================================================
// WRITING
// =========================================================

writingCard.addEventListener(
    "click",
    () => {

        showWriting();

    }
);


// =========================================================
// BACK
// =========================================================

backButton.addEventListener(
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
            writingDetailView.classList.contains(
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

if (video) {

    video.muted = true;

    video.play().catch(() => {});

}


// =========================================================
// INITIALIZE
// =========================================================

showMain();

console.log(
    "Hobbies initialized."
);