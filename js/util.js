const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIncrementIdGenerator = (start = 1) => {
  let current = start;
  return () => current++;
};

export { getRandomInteger, getRandomArrayElement, createIncrementIdGenerator };
