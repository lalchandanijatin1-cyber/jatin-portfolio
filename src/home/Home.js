import { SIDE_PHOTOS } from '../data/menuData.js';
import { MainMenu } from './MainMenu.js';
import { SidePhoto } from './SidePhoto.js';
import { OptionsMenu } from './OptionsMenu.js';

/**
 * Home
 * The main-menu screen that sits over the 3D world once the intro has
 * finished. Owns the menu, the two side photos, transient toast
 * notices, the options modal, and the "quit" departure transition.
 */
export class Home {
  constructor({ layerEl, announce, onQuitToHobbies }) {
    this.layerEl = layerEl;
    this.announce = announce || (() => {});
    this.onQuitToHobbies = onQuitToHobbies || (() => {});

    this.toastTimeout = null;
    this._build();
  }

  _build() {
    this.mainMenu = new MainMenu({
      onPlaceholder: (message) => this._showToast(message),
      onOptions: () => this._openOptions(),
      onQuit: (message) => this._quit(message)
    });
    this.layerEl.appendChild(this.mainMenu.el);

    SIDE_PHOTOS.forEach((photo) => {
      const sidePhoto = new SidePhoto({
        ...photo,
        onSelect: () => this._showToast(`${photo.placeholderLabel} — more coming soon.`)
      });
      this.layerEl.appendChild(sidePhoto.el);
    });

    this.toast = document.createElement('div');
    this.toast.className = 'toast-layer';
    this.toast.setAttribute('role', 'status');
    document.getElementById('app').appendChild(this.toast);

    this.departVeil = document.createElement('div');
    this.departVeil.className = 'depart-veil';
    const departLabel = document.createElement('span');
    this.departVeil.appendChild(departLabel);
    this.departLabel = departLabel;
    document.getElementById('app').appendChild(this.departVeil);
  }

  show() {
    this.layerEl.classList.add('visible');
    this.layerEl.setAttribute('aria-hidden', 'false');
  }

  _showToast(message) {
    this.announce(message);
    this.toast.textContent = message;
    this.toast.classList.add('visible');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => this.toast.classList.remove('visible'), 2600);
  }

  _openOptions() {
    this.layerEl.classList.add('dimmed');
    this.optionsMenu = new OptionsMenu({
      onClose: () => this.layerEl.classList.remove('dimmed'),
      onToast: (message) => this._showToast(message)
    });
    this.optionsMenu.open();
  }

  _quit(message) {
    this.announce(message);
    this.departLabel.textContent = message;
    this.departVeil.classList.add('visible');

    // First version: no Hobbies page yet, so this is a placeholder beat
    // that later just needs to call a real router instead of the timeout.
    setTimeout(() => {
      this.onQuitToHobbies();
      setTimeout(() => {
        this.departVeil.classList.remove('visible');
      }, 1400);
    }, 1400);
  }
}
