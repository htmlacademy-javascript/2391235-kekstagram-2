import { checkStringLength, isPalindrome, extractNumbers } from './functions.js';
import { createPhotos } from './data.js';
import { renderThumbnails } from './picture-thumbnails.js';

createPhotos();


checkStringLength('проверяемая строка', 20);
isPalindrome('топот');
extractNumbers('2023 год');

const photos = createPhotos();
renderThumbnails(photos);
