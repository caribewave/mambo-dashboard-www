import {CALL_API, API_SENSOR} from '../client/api';

/*------------------------------------------------------------------------------------------
 * Plane DATA
 *-----------------------------------------------------------------------------------------*/
export const LOAD_PLANE_REQUEST = 'LOAD_PLANE_REQUEST';
export const LOAD_PLANE_SUCCESS = 'LOAD_PLANE_SUCCESS';
export const LOAD_PLANE_FAILURE = 'LOAD_PLANE_FAILURE';

const callLoadPlanesAsync = (box) => ({
  // we send bebox (w,s,e,n)
  [CALL_API]: {
    types: [LOAD_PLANE_REQUEST, LOAD_PLANE_SUCCESS, LOAD_PLANE_FAILURE],
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
 * Navigation
 *-----------------------------------------------------------------------------------------*/
export const PLANE_SELECTED = 'PLANE_SELECTED';

export const selectPlane = (plane) => ({
  type: PLANE_SELECTED,
  plane: plane
});