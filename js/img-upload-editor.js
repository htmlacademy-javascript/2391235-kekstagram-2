import {
  SCALE_STEP,
  SCALE_MIN,
  SCALE_MAX,
  SCALE_DEFAULT,
  EFFECTS,
} from './img-upload-config.js';

const OVERLAY_SELECTOR = '.img-upload__overlay';
const PREVIEW_IMG_SELECTOR = '.img-upload__preview img';

const SCALE_SMALLER_BUTTON_SELECTOR = '.scale__control--smaller';
const SCALE_BIGGER_BUTTON_SELECTOR = '.scale__control--bigger';
const SCALE_VALUE_INPUT_SELECTOR = '.scale__control--value';

const EFFECTS_LIST_SELECTOR = '.effects__list';
const EFFECT_LEVEL_FIELDSET_SELECTOR = '.img-upload__effect-level';
const EFFECT_LEVEL_VALUE_SELECTOR = '.effect-level__value';
const SLIDER_SELECTOR = '.effect-level__slider';

const HIDDEN_CLASS = 'hidden';
const EFFECT_NONE = 'none';

const EFFECT_RADIO_CLASS = 'effects__radio';
const EFFECT_PREVIEW_CLASS_PREFIX = 'effects__preview--';
const EFFECT_NONE_RADIO_SELECTOR = '#effect-none';

const SLIDER_CONNECT_VALUE = 'lower';
const SLIDER_UPDATE_EVENT = 'update';

const overlayElement = document.querySelector(OVERLAY_SELECTOR);

if (!overlayElement) {
  throw new Error('Upload overlay not found');
}

const previewImageElement = overlayElement.querySelector(PREVIEW_IMG_SELECTOR);

const scaleSmallerButton = overlayElement.querySelector(SCALE_SMALLER_BUTTON_SELECTOR);
const scaleBiggerButton = overlayElement.querySelector(SCALE_BIGGER_BUTTON_SELECTOR);
const scaleValueInput = overlayElement.querySelector(SCALE_VALUE_INPUT_SELECTOR);

const effectsListElement = overlayElement.querySelector(EFFECTS_LIST_SELECTOR);
const effectLevelFieldset = overlayElement.querySelector(EFFECT_LEVEL_FIELDSET_SELECTOR);
const effectLevelValue = overlayElement.querySelector(EFFECT_LEVEL_VALUE_SELECTOR);
const sliderElement = overlayElement.querySelector(SLIDER_SELECTOR);

let currentScale = SCALE_DEFAULT;
let currentEffect = EFFECT_NONE;

let isEditorInitialized = false;

const resetEffectClass = () => {
  previewImageElement.classList.forEach((className) => {
    if (className.startsWith(EFFECT_PREVIEW_CLASS_PREFIX)) {
      previewImageElement.classList.remove(className);
    }
  });
};

const applyScale = (value) => {
  currentScale = value;
  scaleValueInput.value = `${currentScale}%`;
  previewImageElement.style.transform = `scale(${currentScale / 100})`;
};

const clampScale = (value) => Math.min(SCALE_MAX, Math.max(SCALE_MIN, value));

const onScaleSmallerClick = () => {
  applyScale(clampScale(currentScale - SCALE_STEP));
};

const onScaleBiggerClick = () => {
  applyScale(clampScale(currentScale + SCALE_STEP));
};

const setEffectLevelVisibility = (effectName) => {
  if (effectName === EFFECT_NONE) {
    effectLevelFieldset.classList.add(HIDDEN_CLASS);
    return;
  }

  effectLevelFieldset.classList.remove(HIDDEN_CLASS);
};

const applyEffect = (effectName, level) => {
  if (effectName === EFFECT_NONE) {
    previewImageElement.style.filter = '';
    effectLevelValue.value = '';
    return;
  }

  const config = EFFECTS[effectName];
  const value = Number(level);

  previewImageElement.style.filter = `${config.filter}(${value}${config.unit})`;
  effectLevelValue.value = String(value);
};

const updateSliderForEffect = (effectName) => {
  const config = EFFECTS[effectName];

  setEffectLevelVisibility(effectName);

  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, {
      range: config.range,
      start: config.start,
      step: config.step,
      connect: SLIDER_CONNECT_VALUE,
      format: {
        to: (value) => Number(value),
        from: (value) => Number(value),
      },
    });

    sliderElement.noUiSlider.on(SLIDER_UPDATE_EVENT, () => {
      const value = sliderElement.noUiSlider.get();
      applyEffect(currentEffect, value);
    });
  } else {
    sliderElement.noUiSlider.updateOptions(
      {
        range: config.range,
        step: config.step,
        start: config.start,
      },
      true
    );
  }

  sliderElement.noUiSlider.set(config.start);
};

const resetEffects = () => {
  currentEffect = EFFECT_NONE;
  resetEffectClass();

  previewImageElement.style.filter = '';
  setEffectLevelVisibility(EFFECT_NONE);

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.set(EFFECTS[EFFECT_NONE].start);
  }

  effectLevelValue.value = '';
};

const onEffectsChange = (evt) => {
  const target = evt.target;

  if (!target.classList.contains(EFFECT_RADIO_CLASS)) {
    return;
  }

  currentEffect = target.value;

  resetEffectClass();
  previewImageElement.style.filter = '';

  if (currentEffect === EFFECT_NONE) {
    resetEffects();
    return;
  }

  previewImageElement.classList.add(`${EFFECT_PREVIEW_CLASS_PREFIX}${currentEffect}`);
  updateSliderForEffect(currentEffect);
};

const resetEditor = () => {
  if (
    !previewImageElement ||
    !scaleValueInput ||
    !effectLevelFieldset ||
    !effectLevelValue ||
    !sliderElement
  ) {
    return;
  }

  applyScale(SCALE_DEFAULT);
  resetEffects();

  const noneRadio = overlayElement.querySelector(EFFECT_NONE_RADIO_SELECTOR);
  if (noneRadio) {
    noneRadio.checked = true;
  }
};

const initUploadEditor = () => {
  if (isEditorInitialized) {
    return;
  }

  if (
    !previewImageElement ||
    !scaleSmallerButton ||
    !scaleBiggerButton ||
    !effectsListElement ||
    !sliderElement
  ) {
    return;
  }

  isEditorInitialized = true;

  applyScale(SCALE_DEFAULT);
  setEffectLevelVisibility(EFFECT_NONE);

  scaleSmallerButton.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerClick);
  effectsListElement.addEventListener('change', onEffectsChange);

  if (!sliderElement.noUiSlider) {
    updateSliderForEffect(EFFECT_NONE);
  }
};

export { resetEditor, initUploadEditor };
