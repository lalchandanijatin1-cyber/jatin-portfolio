
const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=<>/\\|';


function easeOutCubic(t) {

  return 1 -
    Math.pow(
      1 - t,
      3
    );
}


/**
 * ScrambleText
 *
 * Creates the character-by-character
 * decoding animation.
 *
 * Example:
 *
 * J#7!N L@LCH4ND@NI
 *       ↓
 * JA7IN LALCH@NDANI
 *       ↓
 * JATIN LALCHANDANI
 */
export class ScrambleText {

  constructor(
    element,
    finalText
  ) {

    this.element =
      element;

    this.finalText =
      finalText;

    this.chars = [];


    // Clear existing content.
    element.textContent =
      '';


    // Create one span for
    // every character.
    finalText
      .split('')
      .forEach((character) => {

        const span =
          document.createElement(
            'span'
          );

        span.className =
          'scramble-char' +
          (
            character === ' '
              ? ' is-space'
              : ''
          );


        span.textContent =
          character === ' '
            ? '\u00A0'
            : character;


        element.appendChild(
          span
        );


        this.chars.push({
          el: span,
          final: character
        });
      });
  }


  /**
   * Run scramble animation.
   */
  play(
    durationMs = 1400
  ) {

    return new Promise(
      (resolve) => {

        const total =
          this.chars.length;

        const start =
          performance.now();


        // Create a reveal window
        // for every character.
        const windows =
          this.chars.map(
            (_, index) => {

              const base =
                total > 1
                  ? index / (total - 1)
                  : 0;


              // Small randomness prevents
              // the effect from looking too mechanical.
              const jitter =
                (Math.random() - 0.5)
                * 0.04;


              const revealAt =
                Math.min(
                  Math.max(
                    base + jitter,
                    0
                  ),
                  1
                ) * 0.65;


              return {

                scrambleUntil:
                  revealAt *
                  durationMs,

                settleUntil:
                  Math.min(
                    revealAt + 0.22,
                    1
                  ) *
                  durationMs
              };
            }
          );


        // ==================================================
        // ANIMATION LOOP
        // ==================================================

        const tick = (now) => {

          const elapsed =
            now - start;

          let allDone =
            true;


          this.chars.forEach(
            (character) => {

              // Spaces don't scramble.
              if (
                character.final === ' '
              ) {
                return;
              }


              const window =
                windows[
                  this.chars.indexOf(
                    character
                  )
                ];


              // ------------------------------------------
              // SCRAMBLING
              // ------------------------------------------

              if (
                elapsed <
                window.scrambleUntil
              ) {

                allDone =
                  false;

                character.el.textContent =
                  CHARSET[
                    Math.floor(
                      Math.random() *
                      CHARSET.length
                    )
                  ];

              }


              // ------------------------------------------
              // SETTLING
              // ------------------------------------------

              else if (
                elapsed <
                window.settleUntil
              ) {

                allDone =
                  false;


                const settleProgress =
                  easeOutCubic(
                    (
                      elapsed -
                      window.scrambleUntil
                    ) /
                    (
                      window.settleUntil -
                      window.scrambleUntil
                    )
                  );


                character.el.textContent =
                  Math.random() >
                  settleProgress
                    ? CHARSET[
                        Math.floor(
                          Math.random() *
                          CHARSET.length
                        )
                      ]
                    : character.final;
              }


              // ------------------------------------------
              // FINAL CHARACTER
              // ------------------------------------------

              else {

                character.el.textContent =
                  character.final;
              }
            }
          );


          // Continue animation.
          if (
            elapsed < durationMs &&
            !allDone
          ) {

            requestAnimationFrame(
              tick
            );

          } else {

            // Guarantee exact final text.
            this.chars.forEach(
              (character) => {

                character.el.textContent =
                  character.final === ' '
                    ? '\u00A0'
                    : character.final;
              }
            );


            resolve();
          }
        };


        requestAnimationFrame(
          tick
        );
      }
    );
  }
}

