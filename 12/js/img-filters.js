import { initThumbnails } from './picture-thumbnails.js';
import { debounce } from './utils.js';

const FILTERS_SELECTOR = '.img-filters';
const FILTER_BUTTON_SELECTOR = '.img-filters__button';
const ACTIVE_CLASS = 'img-filters__button--active';
const FILTERS_INACTIVE_CLASS = 'img-filters--inactive';

const RANDOM_COUNT = 10;

const filtersElement = document.querySelector(FILTERS_SELECTOR);

let originalPhotos = [];

const getRandomPhotos = (photos) => {
  const copied = photos.slice();
  const result = [];

  while (result.length < Math.min(RANDOM_COUNT, copied.length)) {
    const index = Math.floor(Math.random() * copied.length);
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
}, 500);

const onFilterClick = (evt) => {
  if (!filtersElement) {
    return;
  }

  const button = evt.target.closest(FILTER_BUTTON_SELECTOR);
  if (!button) {
    return;
  }

  const activeButton = filtersElement.querySelector(`.${ACTIVE_CLASS}`);
  if (activeButton) {
    activeButton.classList.remove(ACTIVE_CLASS);
  }

  button.classList.add(ACTIVE_CLASS);

  if (button.id === 'filter-default') {
    renderThumbnails(originalPhotos.slice());
  }

  if (button.id === 'filter-random') {
    renderThumbnails(getRandomPhotos(originalPhotos));
  }

  if (button.id === 'filter-discussed') {
    renderThumbnails(getDiscussedPhotos(originalPhotos));
  }
};

const showFilters = (photos) => {
  if (!filtersElement) {
    return;
  }

  originalPhotos = photos.slice();

  filtersElement.classList.remove(FILTERS_INACTIVE_CLASS);
  filtersElement.addEventListener('click', onFilterClick);
};

export { showFilters };
