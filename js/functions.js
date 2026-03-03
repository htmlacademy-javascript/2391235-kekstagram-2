const SPACE_REGEXP = / /g;
const EMPTY_STRING = '';
const DIGIT_MIN = '0';
const DIGIT_MAX = '9';

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalized = string
    .toLowerCase()
    .replace(SPACE_REGEXP, EMPTY_STRING);

  const reversed = normalized.split('').reverse().join('');

  return normalized === reversed;
};

const extractNumbers = (value) => {
  const digits = String(value)
    .split('')
    .filter((char) => char >= DIGIT_MIN && char <= DIGIT_MAX)
    .join(EMPTY_STRING);

  return digits === EMPTY_STRING ? Number.NaN : Number(digits);
};

export { checkStringLength, isPalindrome, extractNumbers };

