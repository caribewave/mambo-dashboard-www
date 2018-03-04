import {CALL_API} from '../client/api';

/*------------------------------------------------------------------------------------------
 * Home ABOUTME
 *-----------------------------------------------------------------------------------------*/
export const LOAD_POINT_REQUEST = 'LOAD_POINT_REQUEST';
export const LOAD_POINT_SUCCESS = 'LOAD_POINT_SUCCESS';
export const LOAD_POINT_FAILURE = 'LOAD_POINT_FAILURE';
 const callPointAsync = () => ({
  [CALL_API]: {
    types: [ LOAD_POINT_REQUEST, LOAD_POINT_SUCCESS, LOAD_POINT_FAILURE ],
    endpoint: `points.json`,
    method: 'GET'
  }
});

export const loadPointAsync = () => (dispatch) => {
  return dispatch(callPointAsync());
};