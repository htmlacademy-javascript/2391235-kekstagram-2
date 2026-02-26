const DATA_ERROR_TEMPLATE_SELECTOR = '#data-error';
const REMOVE_TIMEOUT = 5000;

const showDataError = () => {
  const template = document.querySelector(DATA_ERROR_TEMPLATE_SELECTOR);

  if (!template) {
    return;
  }

  const errorElement = template.content.firstElementChild.cloneNode(true);

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_TIMEOUT);
};

export { showDataError };
