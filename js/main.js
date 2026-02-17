import { createPhotos } from './data.js';
import { initThumbnails } from './picture-thumbnails.js';
import './upload-form.js';

const photos = createPhotos();
initThumbnails(photos);
