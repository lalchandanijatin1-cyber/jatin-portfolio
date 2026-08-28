import { MAIN_MENU_ITEMS } from '../data/menuData.js';
import { MenuItem } from './MenuItem.js';

/**
 * MainMenu
 * Builds the vertical list of game-style menu selections from
 * `menuData.js` and forwards each selection to the handlers Home.js
 * supplies. New destinations (Explore, Projects, ...) just need their
 * `action` wired to a real navigation call in Home.js later — nothing
 * here needs to change.
 */
export class MainMenu {
  constructor({ onPlaceholder, onOptions, onQuit }) {
    this.el = document.createElement('div');
    this.el.className = 'menu-column';

    const heading = document.createElement('p');
    heading.className = 'menu-heading';
    heading.textContent = 'JATIN LALCHANDANI';
    this.el.appendChild(heading);

    this.items = MAIN_MENU_ITEMS.map((data) => {
      const item = new MenuItem({
        label: data.label,
        onSelect: () => this._handleSelect(data, { onPlaceholder, onOptions, onQuit })
      });
      this.el.appendChild(item.el);
      return item;
    });
  }

  _handleSelect(data, { onPlaceholder, onOptions, onQuit }) {
    switch (data.action) {
      case 'options':
        onOptions();
        break;
      case 'quit':
        onQuit(data.placeholderMessage);
        break;
      case 'placeholder':
      default:
        onPlaceholder(data.placeholderMessage || `${data.label} is on its way...`);
        break;
    }
  }
}
