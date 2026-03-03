let photosCache = null;

const FORM_SELECTOR = '.img-upload__form';
const TRAILING_SLASH_REGEXP = /\/$/;

const DEFAULT_METHOD = 'GET';
const POST_METHOD = 'POST';

const ROUTES = {
  GET: '/data',
  POST: '/',
};

const FORM_DATA_KEYS = {
  FILE: 'filename',
  DESCRIPTION: 'description',
};

const DEFAULT_LIKES = 0;

const getServerUrl = () => {
  const formElement = document.querySelector(FORM_SELECTOR);

  if (!formElement || !formElement.action) {
    throw new Error('Upload form not found or form.action is empty');
  }

  return formElement.action.replace(TRAILING_SLASH_REGEXP, '');
};

const request = async (route, method = DEFAULT_METHOD, body = null) => {
  const serverUrl = getServerUrl();

  const response = await fetch(`${serverUrl}${route}`, {
    method,
    body,
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }
  return null;
};

const getData = async () => {
  if (!photosCache) {
    photosCache = await request(ROUTES.GET);
  }
  return photosCache;
};

const sendData = async (body) => {
  await getData();
  await request(ROUTES.POST, POST_METHOD, body);

  const file = body.get(FORM_DATA_KEYS.FILE);
  const description = body.get(FORM_DATA_KEYS.DESCRIPTION);

  if (!file) {
    return;
  }

  const newPhoto = {
    id: photosCache.length + 1,
    url: URL.createObjectURL(file),
    description: description || '',
    likes: DEFAULT_LIKES,
    comments: [],
  };

  photosCache.push(newPhoto);
};

export { getData, sendData };


