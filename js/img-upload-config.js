const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const EFFECTS = {
  none: {
    filter: '',
    unit: '',
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
  },
  heat: {
    filter: 'brightness',
    unit: '',
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
  },
};

export {
  SCALE_STEP,
  SCALE_MIN,
  SCALE_MAX,
  SCALE_DEFAULT,
  EFFECTS
};
