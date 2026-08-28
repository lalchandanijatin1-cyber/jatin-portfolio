/**
 * Central definition of the main menu and options menu contents.
 * Keeping this as data (rather than hard-coding into the DOM) means new
 * destinations (Explore, Projects, Skills, Contact, Hobbies...) can be
 * wired up later just by pointing `action` at a real router instead of
 * a placeholder toast.
 */

export const MAIN_MENU_ITEMS = [
  {
    id: 'explore',
    label: 'Explore',
    // Future: mount src/explore/Explore.js
    action: 'placeholder',
    placeholderMessage: 'The path beyond is still being carved...'
  },
  {
    id: 'projects',
    label: 'Projects',
    // Future: mount src/projects/Projects.js
    action: 'placeholder',
    placeholderMessage: 'The workshop is being organized...'
  },
  {
    id: 'skills',
    label: 'Skills',
    // Future: mount src/skills/Skills.js
    action: 'placeholder',
    placeholderMessage: 'The skill tree is still growing...'
  },
  {
    id: 'contact',
    label: 'Contact',
    // Future: mount src/contact/Contact.js
    action: 'placeholder',
    placeholderMessage: 'A signal fire is being prepared...'
  },
  {
    id: 'options',
    label: 'Options',
    action: 'options'
  },
  {
    id: 'quit',
    label: 'Quit Game',
    // Future: mount src/hobbies/Hobbies.js
    action: 'quit',
    placeholderMessage: 'Leaving the world...'
  }
];

export const OPTIONS_MENU_ITEMS = [
  { id: 'resume', label: 'Resume', type: 'action' },
  { id: 'languages', label: 'Languages', type: 'submenu' },
  { id: 'sound', label: 'Sound', type: 'toggle' },
  { id: 'fullscreen', label: 'Fullscreen', type: 'toggle' },
  { id: 'credits', label: 'Credits', type: 'modal' }
];

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' }
];

export const SIDE_PHOTOS = [
  {
    id: 'left-photo',
    side: 'left',
    src: '/assets/photos/left-photo.jpg',
    alt: 'Jatin Lalchandani — snapshot one',
    placeholderLabel: 'SNAPSHOT 01'
  },
  {
    id: 'right-photo',
    side: 'right',
    src: '/assets/photos/right-photo.jpg',
    alt: 'Jatin Lalchandani — snapshot two',
    placeholderLabel: 'SNAPSHOT 02'
  }
];
