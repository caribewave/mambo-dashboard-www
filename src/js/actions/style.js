import {CALL_API, API_TILE, API_SENSOR} from '../client/api';

/*------------------------------------------------------------------------------------------
 * Style actions
 *-----------------------------------------------------------------------------------------*/
export const CHANGE_MAP_LAYERS = 'CHANGE_MAP_LAYERS';

export const changeMapLayers = (style) => ({
  type: CHANGE_MAP_LAYERS,
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
export const CREATE_LAYER_REQUEST = 'CREATE_LAYER_REQUEST';
export const CREATE_LAYER_SUCCESS = 'CREATE_LAYER_SUCCESS';
export const CREATE_LAYER_FAILURE = 'CREATE_LAYER_FAILURE';

const createLayerAsync = (style) => ({
  [CALL_API]: {
    types: [ CREATE_LAYER_REQUEST, CREATE_LAYER_SUCCESS, CREATE_LAYER_FAILURE ],
    endpoint: `layers`,
    api: API_TILE,
    method: 'POST',
    body: style
  }
});

export const createLayer = (style) => (dispatch) => {
  return dispatch(createLayerAsync(style));
};

/*------------------------------------------------------------------------------------------
 * Edit style
 *-----------------------------------------------------------------------------------------*/

export const EDIT_LAYER_REQUEST = 'EDIT_LAYER_REQUEST';
export const EDIT_LAYER_SUCCESS = 'EDIT_LAYER_SUCCESS';
export const EDIT_LAYER_FAILURE = 'EDIT_LAYER_FAILURE';

const editLayerAsync = (layer) => ({
  [CALL_API]: {
    types: [ EDIT_LAYER_REQUEST, EDIT_LAYER_SUCCESS, EDIT_LAYER_FAILURE ],
    endpoint: `layers`,
    api: API_TILE,
    method: 'PUT',
    body: layer
  }
});

export const editLayer = (layer) => (dispatch) => {
  return dispatch(editLayerAsync(layer));
};

/*------------------------------------------------------------------------------------------
 * Delete style
 *-----------------------------------------------------------------------------------------*/

export const DELETE_LAYER_REQUEST = 'DELETE_LAYER_REQUEST';
export const DELETE_LAYER_SUCCESS = 'DELETE_LAYER_SUCCESS';
export const DELETE_LAYER_FAILURE = 'DELETE_LAYER_FAILURE';

const deleteLayerAsync = (styleName) => ({
  [CALL_API]: {
    types: [ DELETE_LAYER_REQUEST, DELETE_LAYER_SUCCESS, DELETE_LAYER_FAILURE ],
    endpoint: `layers/${styleName}`,
    api: API_TILE,
    method: 'DELETE'
  }
});

export const deleteLayer = (layerName) => (dispatch) => {
  return dispatch(deleteLayerAsync(layerName));
};


/*------------------------------------------------------------------------------------------
 * Upload MBTiles
 *-----------------------------------------------------------------------------------------*/
export const UPLOAD_MBTILES_REQUEST = 'UPLOAD_MBTILES_REQUEST';
export const UPLOAD_MBTILES_SUCCESS = 'UPLOAD_MBTILES_SUCCESS';
export const UPLOAD_MBTILES_FAILURE = 'UPLOAD_MBTILES_FAILURE';

const uploadMBTilesAsync = (styleName, file) => ({
  [CALL_API]: {
    types: [ UPLOAD_MBTILES_REQUEST, UPLOAD_MBTILES_SUCCESS, UPLOAD_MBTILES_FAILURE ],
    endpoint: `layers/${styleName}/upload`,
    api: API_TILE,
    method: 'POST',
    headers: {
      "Content-Type": 'multipart/form-data'
    },
    body: file
  }
});

export const uploadMBTiles = (styleName, file) => (dispatch) => {
  let formData = new FormData();
  formData.append("mbtiles", file);
  return dispatch(uploadMBTilesAsync(styleName, formData));
};


/*------------------------------------------------------------------------------------------
 * Show/hide layer
 *-----------------------------------------------------------------------------------------*/

export const SHOW_LAYER_REQUEST = 'SHOW_LAYER_REQUEST';
export const SHOW_LAYER_SUCCESS = 'SHOW_LAYER_SUCCESS';
export const SHOW_LAYER_FAILURE = 'SHOW_LAYER_FAILURE';

const showLayerAsync = (styleName, show) => ({
  [CALL_API]: {
    types: [ SHOW_LAYER_REQUEST, SHOW_LAYER_SUCCESS, SHOW_LAYER_FAILURE ],
    endpoint: `layers/${styleName}/show/${show}`,
    api: API_TILE,
    method: 'POST'
  }
});

export const showLayer = (layerName, show) => (dispatch) => {
  return dispatch(showLayerAsync(layerName, show));
};

/*------------------------------------------------------------------------------------------
 * Navigation
 *-----------------------------------------------------------------------------------------*/
export const OPEN_LAYERS_POPUP = 'OPEN_LAYERS_POPUP';

export const openMapLayersPopup = (open) => ({
  type: OPEN_LAYERS_POPUP,
  open: open
});


/*------------------------------------------------------------------------------------------
 * Navigation
 *-----------------------------------------------------------------------------------------*/
export const OPEN_LAYERS_EDITION_POPUP = 'OPEN_LAYERS_EDITION_POPUP';

export const openLayersEditionPopup = (open, layer) => ({
  type: OPEN_LAYERS_EDITION_POPUP,
  open: open,
  layer: layer
});