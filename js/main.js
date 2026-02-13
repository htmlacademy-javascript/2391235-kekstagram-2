import { createPhotos } from './data.js';
import { renderThumbnails } from './picture-thumbnails.js';

const photos = createPhotos();
renderThumbnails(photos);
