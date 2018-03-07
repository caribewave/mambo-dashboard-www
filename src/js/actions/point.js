import {CALL_API, API_SENSOR, API_TILE} from '../client/api';
import {CREATE_STYLE_FAILURE, CREATE_STYLE_REQUEST, CREATE_STYLE_SUCCESS} from "./style";

/*------------------------------------------------------------------------------------------
 * Home ABOUTME
 *-----------------------------------------------------------------------------------------*/
export const LOAD_POINT_REQUEST = 'LOAD_POINT_REQUEST';
export const LOAD_POINT_SUCCESS = 'LOAD_POINT_SUCCESS';
export const LOAD_POINT_FAILURE = 'LOAD_POINT_FAILURE';
 const callPointAsync = () => ({
  [CALL_API]: {
    types: [ LOAD_POINT_REQUEST, LOAD_POINT_SUCCESS, LOAD_POINT_FAILURE ],
    endpoint: `planes/loc`,
    api: API_SENSOR,
    method: 'GET'
  }
});

export const loadPointAsync = () => (dispatch) => {
  return dispatch(callPointAsync());
};