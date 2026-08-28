import { LANGUAGES } from '../data/menuData.js';

/**
 * OptionsMenu
 * A small modal-style overlay covering Resume / Languages / Sound /
 * Fullscreen / Credits. Kept deliberately simple and modular — each
 * row is its own small render method so new settings can be appended
 * later without restructuring the panel.
 */
export class OptionsMenu {
  constructor({ onClose, onToast, soundEnabled = false }) {
    this.onClose = onClose;
    this.onToast = onToast || (() => {});
    this.soundEnabled = soundEnabled;
    this.languageCode = 'en';
    this.showingLanguages = false;

    this.overlay = document.createElement('div');
    this.overlay.className = 'options-overlay';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', 'Options');

    this.panel = document.createElement('div');
    this.panel.className = 'options-panel';
    this.overlay.appendChild(this.panel);

    this._render();
    document.getElementById('app').appendChild(this.overlay);

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    this._escHandler = (e) => {
      if (e.key === 'Escape') this.close();
    };
    window.addEventListener('keydown', this._escHandler);
  }

  _render() {
    this.panel.innerHTML = '';

    const heading = document.createElement('h2');
    heading.textContent = this.showingLanguages ? 'Languages' : 'Options';
    this.panel.appendChild(heading);

    if (this.showingLanguages) {
      this._renderLanguagePicker();
    } else {
      this._renderMainOptions();
    }

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'options-close';
    closeBtn.textContent = this.showingLanguages ? 'Back' : 'Resume';
    closeBtn.addEventListener('click', () => {
      if (this.showingLanguages) {
        this.showingLanguages = false;
        this._render();
      } else {
        this.close();
      }
    });
    this.panel.appendChild(closeBtn);
  }

  _renderMainOptions() {
    this._addRow('Languages', () => {
      this.showingLanguages = true;
      this._render();
    });

    this._addToggleRow('Sound', this.soundEnabled, (next) => {
      this.soundEnabled = next;
      this.onToast(next ? 'Sound on' : 'Sound off');
    });

    this._addToggleRow('Fullscreen', Boolean(document.fullscreenElement), async (next) => {
      try {
        if (next) {
          await document.documentElement.requestFullscreen();
        } else if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (err) {
        this.onToast('Fullscreen unavailable in this browser');
      }
    });

    this._addRow('Credits', () => {
      this.onToast('Designed & built for Jatin Lalchandani — v0.1');
    });
  }

  _renderLanguagePicker() {
    const grid = document.createElement('div');
    grid.className = 'lang-grid';
    LANGUAGES.forEach((lang) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = lang.label;
      if (lang.code === this.languageCode) btn.setAttribute('aria-pressed', 'true');
      btn.addEventListener('click', () => {
        this.languageCode = lang.code;
        this.onToast(`Language set to ${lang.label} (interface text stays English for now)`);
        this.showingLanguages = false;
        this._render();
      });
      grid.appendChild(btn);
    });
    this.panel.appendChild(grid);
  }

  _addRow(label, onClick) {
    const row = document.createElement('div');
    row.className = 'options-row';
    const span = document.createElement('span');
    span.textContent = label;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Open';
    btn.addEventListener('click', onClick);
    row.append(span, btn);
    this.panel.appendChild(row);
  }

  _addToggleRow(label, initial, onChange) {
    const row = document.createElement('div');
    row.className = 'options-row';
    const span = document.createElement('span');
    span.textContent = label;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'toggle';
    let state = initial;
    const render = () => {
      toggle.textContent = state ? 'On' : 'Off';
      toggle.setAttribute('aria-pressed', String(state));
    };
    render();

    toggle.addEventListener('click', () => {
      state = !state;
      render();
      onChange(state);
    });

    row.append(span, toggle);
    this.panel.appendChild(row);
  }

  open() {
    requestAnimationFrame(() => this.overlay.classList.add('visible'));
  }

  close() {
    this.overlay.classList.remove('visible');
    setTimeout(() => {
      this.overlay.remove();
      window.removeEventListener('keydown', this._escHandler);
      if (typeof this.onClose === 'function') this.onClose();
    }, 400);
  }
}
