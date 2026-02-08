const PICTURES_CONTAINER_SELECTOR = '.pictures';
const PICTURE_TEMPLATE_SELECTOR = '#picture';
const PICTURE_SELECTOR = '.picture';
const PICTURE_IMG_SELECTOR = '.picture__img';
const PICTURE_LIKES_SELECTOR = '.picture__likes';
const PICTURE_COMMENTS_SELECTOR = '.picture__comments';

const picturesContainer = document.querySelector(PICTURES_CONTAINER_SELECTOR);
const pictureTemplate = document
  .querySelector(PICTURE_TEMPLATE_SELECTOR)
  ?.content
  ?.querySelector(PICTURE_SELECTOR);

const renderThumbnails = (photos) => {
  if (!picturesContainer || !pictureTemplate) {
    return;
  }

  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const img = pictureElement.querySelector(PICTURE_IMG_SELECTOR);
    img.src = url;
    img.alt = description;

    pictureElement.querySelector(PICTURE_LIKES_SELECTOR).textContent = likes;
    pictureElement.querySelector(PICTURE_COMMENTS_SELECTOR).textContent = comments.length;

    fragment.append(pictureElement);
  });

  picturesContainer.append(fragment);
};

export { renderThumbnails };
