import {CALL_API, API_SENSOR, API_TILE} from '../client/api';
import {CREATE_STYLE_FAILURE, CREATE_STYLE_REQUEST, CREATE_STYLE_SUCCESS} from "./style";

/*------------------------------------------------------------------------------------------
 * Home ABOUTME
 *-----------------------------------------------------------------------------------------*/
export const LOAD_PLANE_REQUEST = 'LOAD_PLANE_REQUEST';
export const LOAD_PLANE_SUCCESS = 'LOAD_PLANE_SUCCESS';
export const LOAD_PLANE_FAILURE = 'LOAD_PLANE_FAILURE';

 const callLoadPlanesAsync = () => ({
  [CALL_API]: {
    types: [ LOAD_PLANE_REQUEST, LOAD_PLANE_SUCCESS, LOAD_PLANE_FAILURE ],
    endpoint: `planes/loc`,
    api: API_SENSOR,
    method: 'GET'
  }
});

export const loadPlanesAsync = () => (dispatch) => {
  return dispatch(callLoadPlanesAsync());
};