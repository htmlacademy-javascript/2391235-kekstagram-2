const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

const isPalindrome = function (string) {
  const normalized = string
    .toLowerCase()
    .replaceAll(' ', '');

  const reversed = normalized
    .split('')
    .reverse()
    .join('');

  return normalized === reversed;
};

const extractNumbers = function (value) {
  const string = String(value);
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
};
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
