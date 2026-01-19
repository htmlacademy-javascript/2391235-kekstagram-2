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

/*
checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

isPalindrome('топот');
isPalindrome('Довод');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл');

extractNumbers('2023 год');
extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона');
extractNumbers('агент 007');
extractNumbers('я томат');
*/
