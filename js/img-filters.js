import { initThumbnails } from './picture-thumbnails.js';
import { debounce, getRandomInteger } from './utils.js';

const FILTERS_SELECTOR = '.img-filters';
const FILTER_BUTTON_SELECTOR = '.img-filters__button';
const ACTIVE_CLASS = 'img-filters__button--active';
const FILTERS_INACTIVE_CLASS = 'img-filters--inactive';

const FILTER_IDS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const RANDOM_COUNT = 10;
const RENDER_DELAY = 500;

const filtersElement = document.querySelector(FILTERS_SELECTOR);

let originalPhotos = [];
let activeButtonElement = null;

const getRandomPhotos = (photos) => {
  const copied = photos.slice();
  const result = [];
  const count = Math.min(RANDOM_COUNT, copied.length);

  while (result.length < count) {
    const index = getRandomInteger(0, copied.length - 1);
    result.push(copied[index]);
    copied.splice(index, 1);
  }

  return result;
};

const getDiscussedPhotos = (photos) =>
  photos
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);

const renderThumbnails = debounce((photos) => {
  initThumbnails(photos);
}, RENDER_DELAY);

const setActiveButton = (buttonElement) => {
  if (activeButtonElement) {
    activeButtonElement.classList.remove(ACTIVE_CLASS);
  }

  activeButtonElement = buttonElement;
  activeButtonElement.classList.add(ACTIVE_CLASS);
};

const onFilterClick = (evt) => {
  const buttonElement = evt.target.closest(FILTER_BUTTON_SELECTOR);

  if (!buttonElement) {
    return;
  }

  if (buttonElement === activeButtonElement) {
    return;
  }

  setActiveButton(buttonElement);

  switch (buttonElement.id) {
    case FILTER_IDS.DEFAULT:
      renderThumbnails(originalPhotos.slice());
      break;
    case FILTER_IDS.RANDOM:
      renderThumbnails(getRandomPhotos(originalPhotos));
      break;
    case FILTER_IDS.DISCUSSED:
      renderThumbnails(getDiscussedPhotos(originalPhotos));
      break;
    default:
      break;
  }
};

const showFilters = (photos) => {
  if (!filtersElement) {
    return;
  }

  originalPhotos = photos.slice();

  activeButtonElement =
    filtersElement.querySelector(`.${ACTIVE_CLASS}`) ||
    filtersElement.querySelector(FILTER_BUTTON_SELECTOR);

  if (activeButtonElement) {
    setActiveButton(activeButtonElement);
  }

  filtersElement.classList.remove(FILTERS_INACTIVE_CLASS);

  filtersElement.removeEventListener('click', onFilterClick);
  filtersElement.addEventListener('click', onFilterClick);
};

export { showFilters };
