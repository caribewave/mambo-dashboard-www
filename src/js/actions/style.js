import {CALL_API, API_TILE, API_SENSOR} from '../client/api';

/*------------------------------------------------------------------------------------------
 * Style actions
 *-----------------------------------------------------------------------------------------*/
export const CHANGE_MAP_STYLE = 'CHANGE_MAP_STYLE';

export const changeMapStyle = (style) => ({
  type: CHANGE_MAP_STYLE,
  style: style
});

/*------------------------------------------------------------------------------------------
 * Loads layers
 *-----------------------------------------------------------------------------------------*/
export const LOAD_LAYERS_REQUEST = 'LOAD_LAYERS_REQUEST';
export const LOAD_LAYERS_SUCCESS = 'LOAD_LAYERS_SUCCESS';
export const LOAD_LAYERS_FAILURE = 'LOAD_LAYERS_FAILURE';

const loadLayersAsync = () => ({
  [CALL_API]: {
    types: [ LOAD_LAYERS_REQUEST, LOAD_LAYERS_SUCCESS, LOAD_LAYERS_FAILURE ],
    endpoint: `layers`,
    api: API_TILE,
    method: 'GET'
  }
});

export const loadLayers = () => (dispatch) => {
  return dispatch(loadLayersAsync());
};

/*------------------------------------------------------------------------------------------
 * Create style
 *-----------------------------------------------------------------------------------------*/
export const CREATE_STYLE_REQUEST = 'CREATE_STYLE_REQUEST';
export const CREATE_STYLE_SUCCESS = 'CREATE_STYLE_SUCCESS';
export const CREATE_STYLE_FAILURE = 'CREATE_STYLE_FAILURE';

const createStyleAsync = (style) => ({
  [CALL_API]: {
    types: [ CREATE_STYLE_REQUEST, CREATE_STYLE_SUCCESS, CREATE_STYLE_FAILURE ],
    endpoint: `layers`,
    api: API_TILE,
    method: 'POST',
    body: style
  }
});

export const createStyle = (style) => (dispatch) => {
  console.log(style);
  return dispatch(createStyleAsync(style));
};

/*------------------------------------------------------------------------------------------
 * Navigation
 *-----------------------------------------------------------------------------------------*/
export const OPEN_MAP_STYLE_POPUP = 'OPEN_MAP_STYLE_POPUP';

export const openMapStylePopup = (open) => ({
  type: OPEN_MAP_STYLE_POPUP,
  open: open
});