
/**
 * LoadingBar
 *
 * Controls the thin progress line
 * displayed underneath the welcome text.
 *
 * JavaScript controls the timing.
 * CSS controls the visual transition.
 */
export class LoadingBar {

  constructor(fillEl) {

    this.fillEl =
      fillEl;
  }


  /**
   * Fill the bar from 0% to 100%.
   *
   * @param {number} durationMs
   * @returns {Promise<void>}
   */
  play(
    durationMs = 800
  ) {

    return new Promise(
      (resolve) => {

        // Set transition duration.
        this.fillEl.style.transitionDuration =
          `${durationMs}ms`;


        // Reset first.
        this.fillEl.classList.remove(
          'is-filled'
        );


        /*
         * Force browser reflow.
         *
         * This ensures the transition
         * starts from 0%.
         */
        this.fillEl.offsetWidth;


        /*
         * Start animation on the
         * next browser frame.
         */
        requestAnimationFrame(
          () => {

            this.fillEl.classList.add(
              'is-filled'
            );
          }
        );


        /*
         * Wait until the CSS animation
         * has completed.
         */
        setTimeout(
          resolve,
          durationMs + 40
        );
      }
    );
  }


  /**
   * Reset loading bar.
   */
  reset() {

    this.fillEl.classList.remove(
      'is-filled'
    );
  }
}
