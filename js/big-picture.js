import { isEscapeKey } from './utils.js';

const BIG_PICTURE_SELECTOR = '.big-picture';
const BIG_PICTURE_HIDDEN_CLASS = 'hidden';
const MODAL_OPEN_CLASS = 'modal-open';
const COMMENTS_STEP = 5;
const BIG_PICTURE_IMG_SELECTOR = '.big-picture__img img';
const LIKES_COUNT_SELECTOR = '.likes-count';
const SHOWN_COMMENTS_COUNT_SELECTOR = '.social__comment-shown-count';
const TOTAL_COMMENTS_COUNT_SELECTOR = '.social__comment-total-count';
const COMMENTS_CONTAINER_SELECTOR = '.social__comments';
const CAPTION_SELECTOR = '.social__caption';
const CLOSE_BUTTON_SELECTOR = '.big-picture__cancel';
const COMMENT_COUNT_BLOCK_SELECTOR = '.social__comment-count';
const COMMENTS_LOADER_SELECTOR = '.comments-loader';
const COMMENT_INPUT_SELECTOR = '.social__footer-text';
const COMMENT_SEND_BUTTON_SELECTOR = '.social__footer-btn';
const BIG_LIKED_CLASS = 'liked';

const bigPictureElement = document.querySelector(BIG_PICTURE_SELECTOR);
const bigPictureImgElement = bigPictureElement.querySelector(BIG_PICTURE_IMG_SELECTOR);
const likesCountElement = bigPictureElement.querySelector(LIKES_COUNT_SELECTOR);
const shownCommentsCountElement = bigPictureElement.querySelector(SHOWN_COMMENTS_COUNT_SELECTOR);
const totalCommentsCountElement = bigPictureElement.querySelector(TOTAL_COMMENTS_COUNT_SELECTOR);
const commentsContainerElement = bigPictureElement.querySelector(COMMENTS_CONTAINER_SELECTOR);
const captionElement = bigPictureElement.querySelector(CAPTION_SELECTOR);
const closeButtonElement = bigPictureElement.querySelector(CLOSE_BUTTON_SELECTOR);
const commentCountBlockElement = bigPictureElement.querySelector(COMMENT_COUNT_BLOCK_SELECTOR);
const commentsLoaderElement = bigPictureElement.querySelector(COMMENTS_LOADER_SELECTOR);
const commentInputElement = bigPictureElement.querySelector(COMMENT_INPUT_SELECTOR);
const commentSendButtonElement = bigPictureElement.querySelector(COMMENT_SEND_BUTTON_SELECTOR);

let currentComments = [];
let renderedCommentsCount = 0;
let currentPhoto = null;

const updateCommentsCounters = () => {
  shownCommentsCountElement.textContent = String(renderedCommentsCount);
  totalCommentsCountElement.textContent = String(currentComments.length);
};

const createCommentElement = ({ avatar, name, message }) => {
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
};

const updateLoaderVisibility = () => {
  commentsLoaderElement.classList.toggle(
    BIG_PICTURE_HIDDEN_CLASS,
    renderedCommentsCount >= currentComments.length
  );
};

const renderNextComments = () => {
  const comments = currentComments.slice(
    renderedCommentsCount,
    renderedCommentsCount + COMMENTS_STEP
  );

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => fragment.append(createCommentElement(comment)));

  commentsContainerElement.append(fragment);
  renderedCommentsCount += comments.length;

  updateCommentsCounters();
  updateLoaderVisibility();
};

const addNewComment = (message) => {
  const comment = {
    avatar: 'img/avatar-6.svg',
    name: 'Вы',
    message,
  };

  currentComments.push(comment);
  commentsContainerElement.append(createCommentElement(comment));

  renderedCommentsCount += 1;

  updateCommentsCounters();
  updateLoaderVisibility();
};

const closeBigPicture = () => {
  bigPictureElement.classList.add(BIG_PICTURE_HIDDEN_CLASS);
  document.body.classList.remove(MODAL_OPEN_CLASS);
  removeListeners();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCloseButtonClick(evt) {
  evt.preventDefault();
  closeBigPicture();
}

function onCommentsLoaderClick() {
  renderNextComments();
}

function trySendComment() {
  const message = commentInputElement.value.trim();
  if (!message) {
    return;
  }

  addNewComment(message);
  commentInputElement.value = '';
}

function onCommentInputKeydown(evt) {
  if (evt.key !== 'Enter') {
    return;
  }

  evt.preventDefault();
  trySendComment();
}

function onCommentSendButtonClick() {
  trySendComment();
}

function removeListeners() {
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);

  if (commentInputElement) {
    commentInputElement.removeEventListener('keydown', onCommentInputKeydown);
  }

  if (commentSendButtonElement) {
    commentSendButtonElement.removeEventListener('click', onCommentSendButtonClick);
  }
}

function addListeners() {
  document.addEventListener('keydown', onDocumentKeydown);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

  if (commentInputElement) {
    commentInputElement.addEventListener('keydown', onCommentInputKeydown);
  }

  if (commentSendButtonElement) {
    commentSendButtonElement.addEventListener('click', onCommentSendButtonClick);
  }
}

const openBigPicture = (photo) => {
  currentPhoto = photo;

  if (currentPhoto && currentPhoto.isLiked === undefined) {
    currentPhoto.isLiked = false;
  }

  const { url, description, comments } = currentPhoto;

  bigPictureImgElement.src = url;
  bigPictureImgElement.alt = description;

  likesCountElement.textContent = String(currentPhoto.likes);
  likesCountElement.classList.toggle(BIG_LIKED_CLASS, currentPhoto.isLiked);

  captionElement.textContent = description;

  currentComments = Array.isArray(comments) ? comments : [];
  renderedCommentsCount = 0;

  commentsContainerElement.innerHTML = '';

  commentCountBlockElement.classList.remove(BIG_PICTURE_HIDDEN_CLASS);
  commentsLoaderElement.classList.remove(BIG_PICTURE_HIDDEN_CLASS);

  renderNextComments();

  if (commentInputElement) {
    commentInputElement.value = '';
  }

  bigPictureElement.classList.remove(BIG_PICTURE_HIDDEN_CLASS);
  document.body.classList.add(MODAL_OPEN_CLASS);

  addListeners();
};

export { openBigPicture };
