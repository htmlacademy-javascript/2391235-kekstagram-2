const DEFAULT_DEBOUNCE_DELAY = 500;
const DEFAULT_ID_START = 1;
const ESCAPE_KEY = 'Escape';

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomArrayElement = (elements) => {
  if (!Array.isArray(elements) || elements.length === 0) {
    return undefined;
  }
  return elements[getRandomInteger(0, elements.length - 1)];
};

const createIncrementIdGenerator = (start = DEFAULT_ID_START) => {
  let current = start;
  return () => current++;
};

const isEscapeKey = (evt) => evt.key === ESCAPE_KEY;

const debounce = (callback, timeoutDelay = DEFAULT_DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), timeoutDelay);
  };
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createIncrementIdGenerator,
  isEscapeKey,
  debounce,
};
