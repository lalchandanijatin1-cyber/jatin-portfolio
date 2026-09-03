/* =========================================
   GLOBAL PORTFOLIO MUSIC
========================================= */

const MUSIC_SRC = '/audio/background-music.mp3';

const MUSIC_TIME_KEY = 'portfolioMusicTime';
const MUSIC_ENABLED_KEY = 'portfolioMusicEnabled';

const music = new Audio(MUSIC_SRC);

music.loop = true;
music.volume = 0.35;
music.preload = 'auto';


/* =========================================
   RESTORE PREVIOUS POSITION
========================================= */

const savedTime = Number(
    sessionStorage.getItem(MUSIC_TIME_KEY)
);

if (Number.isFinite(savedTime) && savedTime > 0) {

    music.addEventListener('loadedmetadata', () => {

        if (savedTime < music.duration) {
            music.currentTime = savedTime;
        }

    }, { once: true });

}


/* =========================================
   SAVE CURRENT POSITION
========================================= */

setInterval(() => {

    if (!music.paused && Number.isFinite(music.currentTime)) {

        sessionStorage.setItem(
            MUSIC_TIME_KEY,
            music.currentTime.toString()
        );

    }

}, 500);


/* =========================================
   SAVE POSITION BEFORE PAGE CHANGES
========================================= */

window.addEventListener('pagehide', () => {

    if (Number.isFinite(music.currentTime)) {

        sessionStorage.setItem(
            MUSIC_TIME_KEY,
            music.currentTime.toString()
        );

    }

});


/* =========================================
   START MUSIC
========================================= */

function startMusic() {

    music.play().catch(() => {
        // Browser blocked autoplay.
        // It will try again after another user interaction.
    });

}


/* =========================================
   USER INTERACTION
========================================= */

document.addEventListener('pointerdown', startMusic, {
    once: true
});

document.addEventListener('keydown', startMusic, {
    once: true
});


/* =========================================
   EXPOSE MUSIC CONTROLS
========================================= */

window.portfolioMusic = {

    play() {
        return music.play();
    },

    pause() {
        music.pause();
    },

    toggle() {

        if (music.paused) {
            return music.play();
        }

        music.pause();
    },

    setVolume(volume) {

        music.volume = Math.max(
            0,
            Math.min(1, volume)
        );

    },

    getVolume() {
        return music.volume;
    },

    isPlaying() {
        return !music.paused;
    }

};