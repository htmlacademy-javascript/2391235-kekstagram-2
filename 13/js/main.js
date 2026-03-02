import { getData } from './api.js';
import { initThumbnails } from './picture-thumbnails.js';
import './upload-form.js';
import { showDataError } from './data-error.js';
import { showFilters } from './img-filters.js';

const loadData = async () => {
  try {
    const photos = await getData();
    initThumbnails(photos);
    showFilters(photos);
  } catch (error) {
    showDataError();
  }
};

loadData();
