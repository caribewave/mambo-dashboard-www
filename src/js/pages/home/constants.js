import PropTypes from 'prop-types';

export const PROPS_TYPE_STYLE = PropTypes.shape({
  name: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  retina: PropTypes.bool,
  vector: PropTypes.bool,
});

export const PROPS_COORDINATE = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number
});

export const PROPS_TRAJECTORY = PropTypes.arrayOf(PROPS_COORDINATE);