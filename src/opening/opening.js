```javascript
import { Intro } from './Intro.js';

import './opening.css';


// =============================================
// GET HTML ELEMENTS
// =============================================

const layerEl =
  document.getElementById('opening-layer');

const veilEl =
  document.getElementById('opening-veil');

const titleEl =
  document.getElementById('opening-title');

const subtitleEl =
  document.getElementById('opening-subtitle');

const frameEl =
  document.getElementById('opening-frame');

const loadingFillEl =
  document.getElementById('loading-fill');

const announcementEl =
  document.getElementById('opening-announcement');


// =============================================
// CREATE INTRO
// =============================================

const intro =
  new Intro({
    layerEl,
    veilEl,
    titleEl,
    subtitleEl,
    frameEl,
    loadingFillEl,

    announce: (message) => {
      announcementEl.textContent = message;
    }
  });


// =============================================
// START INTRO
// =============================================

intro.play(
  'JATIN LALCHANDANI',
  'Welcome to my world'
);
```
