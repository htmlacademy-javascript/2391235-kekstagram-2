import { isEscapeKey } from './utils.js';
import { initUploadEditor, resetEditor } from './img-upload-editor.js';

const FORM_SELECTOR = '.img-upload__form';
const OVERLAY_SELECTOR = '.img-upload__overlay';
const FILE_INPUT_SELECTOR = '.img-upload__input';
const CANCEL_BUTTON_SELECTOR = '.img-upload__cancel';
const HASHTAGS_SELECTOR = '.text__hashtags';
const DESCRIPTION_SELECTOR = '.text__description';

const MODAL_OPEN_CLASS = 'modal-open';
const HIDDEN_CLASS = 'hidden';

const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MIN_LENGTH = 2;
const HASHTAG_MAX_LENGTH = 20;

const COMMENT_MAX_LENGTH = 140;

const HASHTAG_REGEXP = /^#[A-Za-zА-Яа-яЁё0-9_]+$/;

const formElement = document.querySelector(FORM_SELECTOR);
const overlayElement = document.querySelector(OVERLAY_SELECTOR);
const fileInputElement = document.querySelector(FILE_INPUT_SELECTOR);
const cancelButtonElement = document.querySelector(CANCEL_BUTTON_SELECTOR);
const hashtagsElement = document.querySelector(HASHTAGS_SELECTOR);
const descriptionElement = document.querySelector(DESCRIPTION_SELECTOR);

const isOverlayOpened = () => overlayElement && !overlayElement.classList.contains(HIDDEN_CLASS);

const getHashtags = (value) => value
  .trim()
  .split(/\s+/)
  .filter((tag) => tag.length > 0);

const isTextFieldFocused = () => document.activeElement === hashtagsElement || document.activeElement === descriptionElement;

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

const validateHashtagsCount = (value) => getHashtags(value).length <= HASHTAG_MAX_COUNT;

const validateHashtagsUnique = (value) => {
  const hashtags = getHashtags(value).map((tag) => tag.toLowerCase());
  return new Set(hashtags).size === hashtags.length;
};

const validateHashtagsFormat = (value) => {
  const hashtags = getHashtags(value);
  if (hashtags.length === 0) {
    return true;
  }

  return hashtags.every((tag) => {
    if (tag.length < HASHTAG_MIN_LENGTH || tag.length > HASHTAG_MAX_LENGTH) {
      return false;
    }

    return HASHTAG_REGEXP.test(tag);
  });
};

const getHashtagsErrorMessage = (value) => {
  const hashtags = getHashtags(value);

  if (hashtags.length === 0) {
    return '';
  }

  if (!validateHashtagsCount(value)) {
    return `Не больше ${HASHTAG_MAX_COUNT} хэштегов`;
  }

  if (!validateHashtagsUnique(value)) {
    return 'Хэштеги не должны повторяться';
  }

  if (!validateHashtagsFormat(value)) {
    return `Хэштег начинается с # и содержит только буквы/цифры/_, длина ${HASHTAG_MIN_LENGTH}-${HASHTAG_MAX_LENGTH}`;
  }

  return '';
};

const getCommentErrorMessage = () => `Длина комментария не больше ${COMMENT_MAX_LENGTH} символов`;

const initValidate = () => {
  if (!formElement) {
    return null;
  }

  const instance = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'text__error',
  });

  if (hashtagsElement) {
    instance.addValidator(hashtagsElement, validateHashtagsFormat, getHashtagsErrorMessage, 1, true);
    instance.addValidator(hashtagsElement, validateHashtagsCount, getHashtagsErrorMessage, 2, true);
    instance.addValidator(hashtagsElement, validateHashtagsUnique, getHashtagsErrorMessage, 3, true);
  }

  if (descriptionElement) {
    instance.addValidator(descriptionElement, validateComment, getCommentErrorMessage);
  }

  return instance;
};

let pristine = null;
let isEditorInitialized = false;

const resetForm = () => {
  formElement.reset();
  fileInputElement.value = '';
  if (pristine) {
    pristine.reset();
  }
};

const onDocumentKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }

  if (isTextFieldFocused()) {
    return;
  }

  evt.preventDefault();
  closeUploadForm();
};

function closeUploadForm () {
  if (!isOverlayOpened()) {
    return;
  }

  overlayElement.classList.add(HIDDEN_CLASS);
  document.body.classList.remove(MODAL_OPEN_CLASS);
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
  resetEditor();
}

const openUploadForm = () => {
  overlayElement.classList.remove(HIDDEN_CLASS);
  document.body.classList.add(MODAL_OPEN_CLASS);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onFileInputChange = () => {
  openUploadForm();

  if (!isEditorInitialized) {
    initUploadEditor();
    isEditorInitialized = true;
  }

  resetEditor();
};

const onCancelButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

const onFormSubmit = (evt) => {
  if (!pristine) {
    return;
  }

  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

const initUploadForm = () => {
  if (!formElement || !overlayElement || !fileInputElement || !cancelButtonElement) {
    return;
  }
  pristine = initValidate();
  fileInputElement.addEventListener('change', onFileInputChange);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormSubmit);
};

initUploadForm();

export { initUploadForm };
