
import { ScrambleText } from './ScrambleText.js';
import { LoadingBar } from './LoadingBar.js';

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class Intro {
  constructor({
    layerEl,
    veilEl,
    titleEl,
    subtitleEl,
    frameEl,
    loadingFillEl,
    announce
  }) {
    this.layerEl = layerEl;
    this.veilEl = veilEl;
    this.titleEl = titleEl;
    this.subtitleEl = subtitleEl;
    this.frameEl = frameEl;
    this.loadingBar = new LoadingBar(loadingFillEl);
    this.announce = announce || (() => {});
  }

  async play(
    name = 'JATIN LALCHANDANI',
    subtitle = 'Welcome to my world'
  ) {
    this.announce(`Entering the world of ${name}`);

    await wait(420);

    this.frameEl.classList.add('visible');
    this.titleEl.classList.add('visible');

    const scramble = new ScrambleText(
      this.titleEl,
      name
    );

    await scramble.play(1250);

    this.subtitleEl.textContent = subtitle;
    this.subtitleEl.classList.add('visible');

    await wait(500);

    await this.loadingBar.play(750);

    await wait(400);

    this.titleEl.classList.add('fading-out');
    this.subtitleEl.classList.add('fading-out');
    this.frameEl.classList.add('fading-out');

    this.layerEl.classList.add('veil-lifted');

    await wait(900);

    this.layerEl.classList.add('intro-done');
    this.layerEl.setAttribute('aria-hidden', 'true');

    this.announce(
      'Welcome. Use your mouse to look around.'
    );
  }
}
