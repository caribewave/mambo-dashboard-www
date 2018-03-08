import {CALL_API, API_SENSOR} from '../client/api';

/*------------------------------------------------------------------------------------------
 * Plane DATA
 *-----------------------------------------------------------------------------------------*/
export const LOAD_PLANE_REQUEST = 'LOAD_PLANE_REQUEST';
export const LOAD_PLANE_SUCCESS = 'LOAD_PLANE_SUCCESS';
export const LOAD_PLANE_FAILURE = 'LOAD_PLANE_FAILURE';

const callLoadPlanesAsync = () => ({
  [CALL_API]: {
    types: [LOAD_PLANE_REQUEST, LOAD_PLANE_SUCCESS, LOAD_PLANE_FAILURE],
    endpoint: `planes/loc`,
    api: API_SENSOR,
    method: 'GET'
  }
});

export const loadPlanesAsync = () => (dispatch) => {
  return dispatch(callLoadPlanesAsync());
};

/*------------------------------------------------------------------------------------------
 * Navigation
 *-----------------------------------------------------------------------------------------*/
export const PLANE_SELECTED = 'PLANE_SELECTED';

export const selectPlane = (plane) => ({
  type: PLANE_SELECTED,
  plane: plane
});