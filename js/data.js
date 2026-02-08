import { getRandomInteger, getRandomArrayElement, createIncrementIdGenerator } from './util.js';
import { DESCRIPTIONS, MESSAGE_SENTENCES, NAMES } from './mock-data.js';

const PHOTO_COUNT = 25;


const createCommentMessage = () => {
  const first = getRandomArrayElement(MESSAGE_SENTENCES);

  if (Math.random() < 0.5) {
    return first;
  }

  const second = getRandomArrayElement(MESSAGE_SENTENCES);
  return `${first} ${second}`;
};

const createComment = (getCommentId) => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createCommentMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (id, getCommentId) => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({ length: commentsCount }, () => createComment(getCommentId));

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments,
  };
};

const createPhotos = () => {
  const getCommentId = createIncrementIdGenerator(1);
  return Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index + 1, getCommentId));
};

export { createPhotos };
