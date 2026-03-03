import {
  getRandomInteger,
  getRandomArrayElement,
  createIncrementIdGenerator
} from './utils.js';
import { DESCRIPTIONS, MESSAGE_SENTENCES, NAMES } from './mock-data.js';

const PHOTO_COUNT = 25;

const AVATAR_MIN = 1;
const AVATAR_MAX = 6;

const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;

const LIKES_MIN = 15;
const LIKES_MAX = 200;

const FIRST_PHOTO_ID = 1;

const MESSAGE_SECOND_PART_PROBABILITY = 0.5;

const createCommentMessage = () => {
  const firstSentence = getRandomArrayElement(MESSAGE_SENTENCES);

  if (Math.random() < MESSAGE_SECOND_PART_PROBABILITY) {
    return firstSentence;
  }

  const secondSentence = getRandomArrayElement(MESSAGE_SENTENCES);
  return `${firstSentence} ${secondSentence}`;
};

const createComment = (getCommentId) => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN, AVATAR_MAX)}.svg`,
  message: createCommentMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (id, getCommentId) => {
  const commentsCount = getRandomInteger(COMMENTS_MIN, COMMENTS_MAX);
  const comments = Array.from({ length: commentsCount }, () => createComment(getCommentId));

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments,
  };
};

const createPhotos = () => {
  const getCommentId = createIncrementIdGenerator();
  return Array.from(
    { length: PHOTO_COUNT },
    (_, index) => createPhoto(index + FIRST_PHOTO_ID, getCommentId)
  );
};

export { createPhotos };
