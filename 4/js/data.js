import { getRandomInteger, getRandomArrayElement, createIncrementIdGenerator } from './util.js';

const PHOTO_COUNT = 25;

const DESCRIPTIONS = [
  'Тёплый вечер и хороший кадр.',
  'Просто момент из жизни.',
  'Немного красоты в ленту.',
  'Случайная фотография, но вышло круто.',
  'Люблю такие детали.',
  'Настроение дня.',
  'Поймал(а) свет идеально.',
  'Без фильтров — как есть.',
  'Ещё один кадр в коллекцию.',
  'Снимок, который хочется сохранить.',
];

const MESSAGE_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Оля',
  'Маша',
  'Игорь',
  'Саша',
  'Даша',
  'Никита',
  'Катя',
  'Аня',
  'Кирилл',
  'Лена',
  'Паша',
];

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
