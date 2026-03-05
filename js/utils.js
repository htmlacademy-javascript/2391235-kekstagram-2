const DEFAULT_DEBOUNCE_DELAY = 500;
const ESCAPE_KEY = 'Escape';

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
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
  isEscapeKey,
  debounce,
};
