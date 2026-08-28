import './style.css';

import { Scene } from './scene/Scene.js';
import { Camera } from './scene/Camera.js';
import { World } from './scene/World.js';

import { Intro } from '../Intro.js';
import { Home } from './home/Home.js';


function main() {

  // ============================================================
  // BASIC HTML ELEMENTS
  // ============================================================

  const canvas =
    document.getElementById('scene-canvas');

  const introLayer =
    document.getElementById('intro-layer');

  const introVeil =
    document.getElementById('intro-veil');

  const introFrame =
    document.getElementById('intro-frame');

  const introTitle =
    document.getElementById('intro-title');

  const introSubtitle =
    document.getElementById('intro-subtitle');

  const loadingFill =
    document.getElementById('intro-loading-fill');

  const homeLayer =
    document.getElementById('home-layer');

  const a11yStatus =
    document.getElementById('a11y-status');


  // ============================================================
  // SAFETY CHECK
  // ============================================================

  if (!canvas) {
    console.error(
      'ERROR: #scene-canvas was not found.'
    );
    return;
  }

  if (!introLayer) {
    console.error(
      'ERROR: #intro-layer was not found.'
    );
    return;
  }

  if (!introVeil) {
    console.error(
      'ERROR: #intro-veil was not found.'
    );
    return;
  }

  if (!introFrame) {
    console.error(
      'ERROR: #intro-frame was not found.'
    );
    return;
  }

  if (!introTitle) {
    console.error(
      'ERROR: #intro-title was not found.'
    );
    return;
  }

  if (!introSubtitle) {
    console.error(
      'ERROR: #intro-subtitle was not found.'
    );
    return;
  }

  if (!loadingFill) {
    console.error(
      'ERROR: #intro-loading-fill was not found.'
    );
    return;
  }


  // ============================================================
  // ACCESSIBILITY
  // ============================================================

  const announce = (message) => {

    if (a11yStatus) {
      a11yStatus.textContent = message;
    }

  };


  // ============================================================
  // THREE.JS SCENE
  // ============================================================

  const scene =
    new Scene(canvas);


  // ============================================================
  // VOXEL WORLD
  // ============================================================

  const world =
    new World(scene.scene);


  // ============================================================
  // CAMERA
  // ============================================================

  const camera =
    new Camera(scene);


  // ============================================================
  // UPDATE LOOP
  // ============================================================

  scene.onUpdate(
    (delta, elapsed) => {

      world.update(
        delta,
        elapsed
      );

      camera.update(
        delta,
        elapsed
      );

    }
  );


  // ============================================================
  // START THREE.JS
  // ============================================================

  scene.start();


  // ============================================================
  // INTRO
  // ============================================================

  const intro =
    new Intro({

      layerEl:
        introLayer,

      veilEl:
        introVeil,

      titleEl:
        introTitle,

      subtitleEl:
        introSubtitle,

      frameEl:
        introFrame,

      loadingFillEl:
        loadingFill,

      announce

    });


  // ============================================================
  // HOME
  // ============================================================

  let home = null;

  if (homeLayer) {

    home =
      new Home({

        layerEl:
          homeLayer,

        announce,

        onQuitToHobbies: () => {

          console.info(
            'Quit Game → Hobbies'
          );

        }

      });

  }


  // ============================================================
  // PLAY INTRO
  // ============================================================

  intro
    .play(
      'JATIN LALCHANDANI',
      'Welcome to my world'
    )
    .then(() => {

      if (home) {
        home.show();
      }

    })
    .catch((error) => {

      console.error(
        'Intro failed:',
        error
      );

    });

}


// ================================================================
// START APPLICATION
// ================================================================

main();