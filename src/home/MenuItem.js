/**
 * MenuItem
 * A single game-menu-style selection: renders as a <button> with a hidden
 * "> " indicator that appears on hover/focus, a subtle underline sweep,
 * and a brief press animation before firing its click handler. This is a
 * DOM element (not a 3D object) so it stays fully accessible — real
 * button semantics, keyboard focus, screen-reader label.
 */
export class MenuItem {
  constructor({ label, onSelect }) {
    this.onSelect = onSelect;

    this.el = document.createElement('button');
    this.el.type = 'button';
    this.el.className = 'menu-item';
    this.el.setAttribute('aria-label', label);

    const indicator = document.createElement('span');
    indicator.className = 'indicator';
    indicator.textContent = '>';
    indicator.setAttribute('aria-hidden', 'true');

    const labelEl = document.createElement('span');
    labelEl.className = 'label';
    labelEl.textContent = label;

    this.el.append(indicator, labelEl);

    this.el.addEventListener('click', () => this._handleSelect());
    this.el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // Let the button's native activation handle Enter/Space; just
        // ensure the press animation still plays for keyboard users.
        this._pulsePress();
      }
    });
  }

  _pulsePress() {
    this.el.classList.add('is-pressed');
    setTimeout(() => this.el.classList.remove('is-pressed'), 160);
  }

  _handleSelect() {
    this._pulsePress();
    if (typeof this.onSelect === 'function') this.onSelect();
  }

  setActive(isActive) {
    this.el.classList.toggle('is-active', Boolean(isActive));
  }
}
