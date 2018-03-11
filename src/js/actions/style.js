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
  return dispatch(createStyleAsync(style));
};

/*------------------------------------------------------------------------------------------
 * Edit style
 *-----------------------------------------------------------------------------------------*/

export const EDIT_STYLE_REQUEST = 'EDIT_STYLE_REQUEST';
export const EDIT_STYLE_SUCCESS = 'EDIT_STYLE_SUCCESS';
export const EDIT_STYLE_FAILURE = 'EDIT_STYLE_FAILURE';

const editStyleAsync = (style) => ({
  [CALL_API]: {
    types: [ EDIT_STYLE_REQUEST, EDIT_STYLE_SUCCESS, EDIT_STYLE_FAILURE ],
    endpoint: `layers`,
    api: API_TILE,
    method: 'PUT',
    body: style
  }
});

export const editMapStyle = (style) => (dispatch) => {
  return dispatch(editStyleAsync(style));
};

/*------------------------------------------------------------------------------------------
 * Delete style
 *-----------------------------------------------------------------------------------------*/

export const DELETE_STYLE_REQUEST = 'DELETE_STYLE_REQUEST';
export const DELETE_STYLE_SUCCESS = 'DELETE_STYLE_SUCCESS';
export const DELETE_STYLE_FAILURE = 'DELETE_STYLE_FAILURE';

const deleteStyleAsync = (style) => ({
  [CALL_API]: {
    types: [ DELETE_STYLE_REQUEST, DELETE_STYLE_SUCCESS, DELETE_STYLE_FAILURE ],
    endpoint: `layers`,
    api: API_TILE,
    method: 'DELETE',
    body: style
  }
});

export const deleteMapStyle = (style) => (dispatch) => {
  return dispatch(deleteStyleAsync(style));
};

/*------------------------------------------------------------------------------------------
 * Navigation
 *-----------------------------------------------------------------------------------------*/
export const OPEN_MAP_STYLE_POPUP = 'OPEN_MAP_STYLE_POPUP';

export const openMapStylePopup = (open) => ({
  type: OPEN_MAP_STYLE_POPUP,
  open: open
});