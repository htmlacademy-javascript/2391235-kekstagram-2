const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const ROUTE_GET = '/data';
const ROUTE_POST = '';

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response;
};

const getData = () =>
  fetch(`${BASE_URL}${ROUTE_GET}`)
    .then(checkResponse)
    .then((response) => response.json());

const sendData = (body) =>
  fetch(`${BASE_URL}${ROUTE_POST}`, {
    method: 'POST',
    body,
  }).then(checkResponse);

export { getData, sendData };
