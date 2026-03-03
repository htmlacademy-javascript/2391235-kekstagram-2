const DATA_ERROR_TEMPLATE_SELECTOR = '#data-error';
const REMOVE_TIMEOUT = 5000;

const dataErrorTemplate = document.querySelector(DATA_ERROR_TEMPLATE_SELECTOR);

const showDataError = () => {
  if (!dataErrorTemplate || !dataErrorTemplate.content.firstElementChild) {
    return;
  }

  const errorElement =
    dataErrorTemplate.content.firstElementChild.cloneNode(true);

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_TIMEOUT);
};

export { showDataError };
