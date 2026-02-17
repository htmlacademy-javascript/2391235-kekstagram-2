import { openBigPicture } from './big-picture.js';

const PICTURES_CONTAINER_SELECTOR = '.pictures';
const PICTURE_TEMPLATE_SELECTOR = '#picture';
const PICTURE_SELECTOR = '.picture';
const PICTURE_IMG_SELECTOR = '.picture__img';
const PICTURE_LIKES_SELECTOR = '.picture__likes';
const PICTURE_COMMENTS_SELECTOR = '.picture__comments';

const picturesContainer = document.querySelector(PICTURES_CONTAINER_SELECTOR);
const pictureTemplate = document
  .querySelector(PICTURE_TEMPLATE_SELECTOR)
  .content
  .querySelector(PICTURE_SELECTOR);

let renderedPhotos = [];

function onPicturesContainerClick(evt) {
  const pictureElement = evt.target.closest(PICTURE_SELECTOR);
  if (!pictureElement) {
    return;
  }

  evt.preventDefault();

  const index = Number(pictureElement.dataset.pictureId);
  const photo = renderedPhotos[index];

  if (!photo) {
    return;
  }

  openBigPicture(photo);
}

if (picturesContainer) {
  picturesContainer.addEventListener('click', onPicturesContainerClick);
}

const renderThumbnails = (photos) => {
  if (!picturesContainer || !pictureTemplate) {
    return;
  }
  renderedPhotos = photos;
  const fragment = document.createDocumentFragment();

  photos.forEach((photo, index) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.pictureId = index;
    const img = pictureElement.querySelector(PICTURE_IMG_SELECTOR);
    img.src = photo.url;
    img.alt = photo.description;

    pictureElement.querySelector(PICTURE_LIKES_SELECTOR).textContent = photo.likes;
    pictureElement.querySelector(PICTURE_COMMENTS_SELECTOR).textContent = photo.comments.length;

    fragment.append(pictureElement);
  });
  picturesContainer.append(fragment);
};

export { renderThumbnails };
