const CHARACTERS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=<>/\\|';

const NAME = 'JATIN LALCHANDANI';
const SUBTITLE = 'Welcome to my world';

const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const loadingBar = document.getElementById('loading-bar');
const opening = document.getElementById('opening');


function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


/* =========================================
   SCRAMBLE NAME
========================================= */

async function scrambleText(text, duration = 1400) {

    title.innerHTML = '';

    const characters = [];

    for (const char of text) {

        const span = document.createElement('span');

        span.className = 'scramble-char';

        if (char === ' ') {
            span.innerHTML = '&nbsp;';
            span.classList.add('space');
        } else {
            span.textContent = char;
        }

        title.appendChild(span);

        characters.push({
            element: span,
            final: char
        });
    }

    const start = performance.now();

    return new Promise(resolve => {

        function animate(now) {

            const elapsed = now - start;

            const progress =
                Math.min(elapsed / duration, 1);

            characters.forEach((char, index) => {

                if (char.final === ' ') {
                    return;
                }

                const revealPoint =
                    (index / characters.length) * 0.7;

                if (progress < revealPoint) {

                    char.element.textContent =
                        CHARACTERS[
                            Math.floor(
                                Math.random() *
                                CHARACTERS.length
                            )
                        ];

                } else {

                    const settleProgress =
                        (progress - revealPoint) /
                        0.3;

                    if (settleProgress >= 1) {

                        char.element.textContent =
                            char.final;

                    } else {

                        char.element.textContent =
                            Math.random() <
                            settleProgress
                                ? char.final
                                : CHARACTERS[
                                    Math.floor(
                                        Math.random() *
                                        CHARACTERS.length
                                    )
                                ];
                    }
                }
            });

            if (progress < 1) {

                requestAnimationFrame(animate);

            } else {

                characters.forEach(char => {
                    char.element.textContent =
                        char.final === ' '
                            ? '\u00A0'
                            : char.final;
                });

                resolve();
            }
        }

        requestAnimationFrame(animate);
    });
}


/* =========================================
   LOADING BAR
========================================= */

function loadBar(duration = 900) {

    return new Promise(resolve => {

        loadingBar.style.transition =
            `width ${duration}ms ease`;

        requestAnimationFrame(() => {
            loadingBar.style.width = '100%';
        });

        setTimeout(resolve, duration);
    });
}


/* =========================================
   START INTRO
========================================= */

async function startIntro() {

    await wait(400);

    document.querySelector('.intro-frame')
        .classList.add('visible');

    await wait(200);

    title.classList.add('visible');

    await scrambleText(NAME, 1400);

    await wait(300);

    subtitle.textContent = SUBTITLE;
    subtitle.classList.add('visible');

    await wait(500);

    await loadBar(900);

    await wait(400);

    opening.classList.add('fade-out');

    await wait(1000);

    opening.style.display = 'none';

    // Hand off to the Home page (multi-page app: separate HTML file)
    window.location.href = '/home.html';
}


/* =========================================
   RUN
========================================= */

startIntro();