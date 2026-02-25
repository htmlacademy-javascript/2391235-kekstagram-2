const DATA_ERROR_TEMPLATE_SELECTOR = '#data-error';
const REMOVE_TIMEOUT = 5000;

const showDataError = () => {
  const template = document.querySelector(DATA_ERROR_TEMPLATE_SELECTOR);

  if (!template) {
    return;
  }

  const errorElement = template.content.firstElementChild.cloneNode(true);

  errorElement.style.position = 'fixed';
  errorElement.style.left = '0';
  errorElement.style.right = '0';
  errorElement.style.top = '0';
  errorElement.style.zIndex = '1000';

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_TIMEOUT);
};

export { showDataError };
