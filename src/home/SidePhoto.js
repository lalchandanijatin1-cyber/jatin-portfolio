/**
 * SidePhoto
 * A small, clickable framed photo used on either side of the main menu.
 * If the configured image is missing (this first version ships without
 * real photos), it falls back to an elegant textured placeholder instead
 * of a broken-image icon, so the layout always looks intentional.
 */
export class SidePhoto {
  constructor({ side, src, alt, placeholderLabel, onSelect }) {
    this.onSelect = onSelect;

    this.el = document.createElement('button');
    this.el.type = 'button';
    this.el.className = `side-photo ${side}`;
    this.el.setAttribute('aria-label', alt);

    const glow = document.createElement('span');
    glow.className = 'photo-frame-glow';
    glow.setAttribute('aria-hidden', 'true');

    const placeholder = document.createElement('span');
    placeholder.className = 'photo-placeholder';
    placeholder.textContent = placeholderLabel;

    const img = document.createElement('img');
    img.alt = alt;
    img.loading = 'lazy';
    img.style.display = 'none';
    img.addEventListener('load', () => {
      placeholder.style.display = 'none';
      img.style.display = 'block';
    });
    img.addEventListener('error', () => {
      // Keep the placeholder visible — this is the expected first-version state.
      img.remove();
    });
    img.src = src;

    this.el.append(placeholder, img, glow);
    this.el.addEventListener('click', () => this._handleSelect());
  }

  _handleSelect() {
    this.el.classList.add('is-pressed');
    setTimeout(() => this.el.classList.remove('is-pressed'), 160);
    if (typeof this.onSelect === 'function') this.onSelect();
  }
}
