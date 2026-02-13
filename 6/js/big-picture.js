const BIG_PICTURE_SELECTOR = '.big-picture';
const BIG_PICTURE_HIDDEN_CLASS = 'hidden';
const MODAL_OPEN_CLASS = 'modal-open';

const BIG_PICTURE_IMG_SELECTOR = '.big-picture__img img';
const LIKES_COUNT_SELECTOR = '.likes-count';
const SHOWN_COMMENTS_COUNT_SELECTOR = '.social__comment-shown-count';
const TOTAL_COMMENTS_COUNT_SELECTOR = '.social__comment-total-count';
const COMMENTS_CONTAINER_SELECTOR = '.social__comments';
const CAPTION_SELECTOR = '.social__caption';
const CLOSE_BUTTON_SELECTOR = '.big-picture__cancel';
const COMMENT_COUNT_BLOCK_SELECTOR = '.social__comment-count';
const COMMENTS_LOADER_SELECTOR = '.comments-loader';

const bigPictureElement = document.querySelector(BIG_PICTURE_SELECTOR);
const bigPictureImgElement = bigPictureElement?.querySelector(BIG_PICTURE_IMG_SELECTOR);
const likesCountElement = bigPictureElement?.querySelector(LIKES_COUNT_SELECTOR);
const shownCommentsCountElement = bigPictureElement?.querySelector(SHOWN_COMMENTS_COUNT_SELECTOR);
const totalCommentsCountElement = bigPictureElement?.querySelector(TOTAL_COMMENTS_COUNT_SELECTOR);
const commentsContainerElement = bigPictureElement?.querySelector(COMMENTS_CONTAINER_SELECTOR);
const captionElement = bigPictureElement?.querySelector(CAPTION_SELECTOR);
const closeButtonElement = bigPictureElement?.querySelector(CLOSE_BUTTON_SELECTOR);
const commentCountBlockElement = bigPictureElement?.querySelector(COMMENT_COUNT_BLOCK_SELECTOR);
const commentsLoaderElement = bigPictureElement?.querySelector(COMMENTS_LOADER_SELECTOR);

function isValidBigPicture() {
  return Boolean(
    bigPictureElement &&
      bigPictureImgElement &&
      likesCountElement &&
      shownCommentsCountElement &&
      totalCommentsCountElement &&
      commentsContainerElement &&
      captionElement &&
      closeButtonElement &&
      commentCountBlockElement &&
      commentsLoaderElement
  );
}

function createCommentElement({ avatar, name, message }) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);

  return commentElement;
}

function renderComments(comments) {
  commentsContainerElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });

  commentsContainerElement.append(fragment);
}

function hideExtraBlocks() {
  commentCountBlockElement.classList.add(BIG_PICTURE_HIDDEN_CLASS);
  commentsLoaderElement.classList.add(BIG_PICTURE_HIDDEN_CLASS);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCloseButtonClick(evt) {
  evt.preventDefault();
  closeBigPicture();
}

function addListeners() {
  document.addEventListener('keydown', onDocumentKeydown);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
}

function removeListeners() {
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
}

function openBigPicture({ url, description, likes, comments }) {
  if (!isValidBigPicture()) {
    return;
  }

  bigPictureImgElement.src = url;
  bigPictureImgElement.alt = description;

  likesCountElement.textContent = String(likes);

  const commentsCount = comments.length;
  shownCommentsCountElement.textContent = String(commentsCount);
  totalCommentsCountElement.textContent = String(commentsCount);

  captionElement.textContent = description;

  renderComments(comments);
  hideExtraBlocks();

  bigPictureElement.classList.remove(BIG_PICTURE_HIDDEN_CLASS);
  document.body.classList.add(MODAL_OPEN_CLASS);

  addListeners();
}

function closeBigPicture() {
  if (!isValidBigPicture()) {
    return;
  }

  bigPictureElement.classList.add(BIG_PICTURE_HIDDEN_CLASS);
  document.body.classList.remove(MODAL_OPEN_CLASS);

  removeListeners();
}

export { openBigPicture };
