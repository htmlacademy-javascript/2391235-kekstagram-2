import { createPhotos } from './data.js';
import { initThumbnails } from './picture-thumbnails.js';
import './upload-form.js';
import { showDataError } from './data-error.js';


try {
  const photos = createPhotos();
  initThumbnails(photos);
} catch (e) {
  showDataError();
}

