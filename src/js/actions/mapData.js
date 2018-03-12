import {CALL_API, API_SENSOR} from '../client/api';

/*------------------------------------------------------------------------------------------
 * Plane POSITIONS
 *-----------------------------------------------------------------------------------------*/
export const LOAD_PLANES_REQUEST = 'LOAD_PLANES_REQUEST';
export const LOAD_PLANES_SUCCESS = 'LOAD_PLANES_SUCCESS';
export const LOAD_PLANES_FAILURE = 'LOAD_PLANES_FAILURE';

const callLoadPlanesAsync = (box) => ({
  // we send bebox (w,s,e,n)
  [CALL_API]: {
    types: [LOAD_PLANES_REQUEST, LOAD_PLANES_SUCCESS, LOAD_PLANES_FAILURE],
    endpoint: `planes/loc?bbox=(` + box.getWest() + "," + box.getSouth() + "," + box.getEast() + "," + box.getNorth() + ")",
    api: API_SENSOR,
    method: 'GET',
    body: box
  }
});

export const loadPlanesAsync = (box) => (dispatch) => {
  return dispatch(callLoadPlanesAsync(box));
};

/*------------------------------------------------------------------------------------------
 * Plane DATA
 *-----------------------------------------------------------------------------------------*/
export const LOAD_PLANE_DETAIL_REQUEST = 'LOAD_PLANE_DETAIL_REQUEST';
export const LOAD_PLANE_DETAIL_SUCCESS = 'LOAD_PLANE_DETAIL_SUCCESS';
export const LOAD_PLANE_DETAIL_FAILURE = 'LOAD_PLANE_DETAIL_FAILURE';

const callLoadPlaneDetailAsync = (planeId) => ({
  // we send bebox (w,s,e,n)
  [CALL_API]: {
    types: [LOAD_PLANE_DETAIL_REQUEST, LOAD_PLANE_DETAIL_SUCCESS, LOAD_PLANE_DETAIL_FAILURE],
    endpoint: `planes/loc?bbox=(` + planeId,
    api: API_SENSOR,
    method: 'GET',
  }
});

export const loadPlaneDetail = (planeId) => (dispatch) => {
  return dispatch(callLoadPlaneDetailAsync(planeId));
};

/*------------------------------------------------------------------------------------------
 * Navigation
 *-----------------------------------------------------------------------------------------*/
export const PLANE_SELECTED = 'PLANE_SELECTED';

export const selectPlane = (plane) => ({
  type: PLANE_SELECTED,
  plane: plane
});