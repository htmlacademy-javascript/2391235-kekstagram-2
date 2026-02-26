const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ROUTES = {
  GET: '/data',
  POST: '/',
};

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response;
};

const getData = () =>
  fetch(`${SERVER_URL}${ROUTES.GET}`)
    .then(checkResponse)
    .then((response) => response.json());

const sendData = (body) =>
  fetch(`${SERVER_URL}${ROUTES.POST}`, {
    method: 'POST',
    body,
  }).then(checkResponse);

export { getData, sendData };
