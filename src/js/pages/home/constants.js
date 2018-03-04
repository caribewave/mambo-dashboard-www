import PropTypes from 'prop-types';

export const PROPS_TYPE_STYLE = PropTypes.shape({
  text: PropTypes.string,
  url: PropTypes.string
});

export const PROPS_COORDINATE = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number
});

export const PROPS_TRAJECTORY = PropTypes.arrayOf(PROPS_COORDINATE);