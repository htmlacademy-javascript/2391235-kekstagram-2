import { getData } from './api.js';
import { initThumbnails } from './picture-thumbnails.js';
import './upload-form.js';
import { showDataError } from './data-error.js';

// Загружаем данные с сервера
getData()
  .then((photos) => {
    initThumbnails(photos);
  })
  .catch(() => {
    showDataError();
  });
