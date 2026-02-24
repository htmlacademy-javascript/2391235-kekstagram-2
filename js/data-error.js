const DATA_ERROR_TEMPLATE_SELECTOR = '#data-error';

const showDataError = () => {
  const template = document.querySelector(DATA_ERROR_TEMPLATE_SELECTOR);

  if (!template) {
    return;
  }

  const node = template.content.cloneNode(true);
  const element = node.querySelector('.data-error');

  if (!element) {
    return;
  }

  element.style.position = 'fixed';
  element.style.left = '0';
  element.style.right = '0';
  element.style.top = '0';
  element.style.zIndex = '1000';

  document.body.append(node);

  setTimeout(() => {
    const current = document.querySelector('.data-error');
    if (current) {
      current.remove();
    }
  }, 5000);
};

export { showDataError };
