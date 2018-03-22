import {CALL_API, API_SENSOR} from '../client/api';

/*------------------------------------------------------------------------------------------
 * Plane POSITIONS
 *-----------------------------------------------------------------------------------------*/
export const LOAD_FEATURE_REQUEST = 'LOAD_FEATURES_REQUEST';
export const LOAD_FEATURE_SUCCESS = 'LOAD_FEATURE_SUCCESS';
export const LOAD_FEATURE_FAILURE = 'LOAD_FEATURE_FAILURE';

const callLoadPoisAsync = (box, features) => ({
  // we send bebox (w,s,e,n)
  [CALL_API]: {
    types: [LOAD_FEATURE_REQUEST, LOAD_FEATURE_SUCCESS, LOAD_FEATURE_FAILURE],
    endpoint: `pois?bbox=(` + box.getWest() + "," + box.getSouth() + "," + box.getEast() + "," + box.getNorth() + ")&source=" + features,
    api: API_SENSOR,
    method: 'GET',
    body: box
  }
});

export const loadFeaturesAsync = (box) => (dispatch) => {
  const features = encodeURIComponent(JSON.stringify(["plane", "boat", "sensor"]));
  return dispatch(callLoadPoisAsync(box, features));
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
    endpoint: 'planes/' + planeId,
    api: API_SENSOR,
    method: 'GET',
  }
});

export const loadPlaneDetail = (planeId) => (dispatch) => {
  return dispatch(callLoadPlaneDetailAsync(planeId));
};

export const UNSELECT_PLANE = 'UNSELECT_PLANE';

export const openMapLayersPopup = () => ({
  type: UNSELECT_PLANE,
});