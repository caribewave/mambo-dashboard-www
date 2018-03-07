import PropTypes from 'prop-types';

export const PROPS_TYPE_STYLE = PropTypes.shape({
  name: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  retina: PropTypes.bool,
  vector: PropTypes.bool,
  "default": PropTypes.bool,
});

export const PROPS_COORDINATE = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number
});

export const PROPS_LOCATION = PropTypes.shape({
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
});

export const PROPS_POI = PropTypes.shape({
  location: PROPS_LOCATION,
  altitude: PropTypes.number,
  hex: PropTypes.string,
  heading: PropTypes.number,
  time: PropTypes.instanceOf(Date),
});

export const PROPS_PLANES = PropTypes.arrayOf(PROPS_POI);