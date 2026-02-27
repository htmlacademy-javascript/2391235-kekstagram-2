const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalized = string.toLowerCase().replaceAll(' ', '');

  const chars = normalized.split('');
  const reversedChars = [...chars].reverse();

  return chars.join('') === reversedChars.join('');
};

const extractNumbers = (value) => {
  const digits = String(value)
    .split('')
    .filter((char) => char >= '0' && char <= '9')
    .join('');

  return digits === '' ? NaN : Number(digits);
};

export { checkStringLength, isPalindrome, extractNumbers };

