import PropTypes from 'prop-types';

export const PROPS_TYPE_STYLE_META = PropTypes.shape({
  name: PropTypes.string.isRequired,
  source: PropTypes.string,
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
  updated_at: PropTypes.string,
  lastSpeed: PropTypes.number,
  direction: PropTypes.number,
  flight: PropTypes.string,
  squack : PropTypes.string
});

export const PROPS_PLANES = PropTypes.arrayOf(PROPS_POI);

export const ARCRAFT_INFO = PropTypes.shape({
  icao: PropTypes.string,
  regid: PropTypes.string,
  mdl: PropTypes.string,
  type: PropTypes.string
});

export const PROPS_PLANE_DETAIL = PropTypes.shape({ data : PropTypes.arrayOf(PROPS_POI),
  aircraftInfo: ARCRAFT_INFO
});