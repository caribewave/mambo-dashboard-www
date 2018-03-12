import PropTypes from 'prop-types';

export const PROPS_TYPE_STYLE_META = PropTypes.shape({
  name: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  retina: PropTypes.bool,
  vector: PropTypes.bool,
  "default": PropTypes.bool,
});

export const PROPS_TYPE_STYLE = PropTypes.shape({
  meta: PROPS_TYPE_STYLE_META,
  source: PropTypes.string.isRequired
});

export const PROPS_COORDINATE = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number
});

export const PROPS_LOCATION = PropTypes.shape({
  value: PropTypes.arrayOf(PropTypes.number),
  time: PropTypes.string
});

export const PROPS_POI = PropTypes.shape({
  _id: PropTypes.string,
  coordinates: PropTypes.arrayOf(PROPS_LOCATION),
  altitude: PropTypes.number,
  hex: PropTypes.string,
  heading: PropTypes.number,
  time: PropTypes.instanceOf(Date),
  lastSpeed: PropTypes.number,
  direction: PropTypes.number
});

export const PROPS_PLANES = PropTypes.arrayOf(PROPS_POI);