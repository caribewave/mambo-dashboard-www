/*------------------------------------------------------------------------------------------
 * Navigation
 *-----------------------------------------------------------------------------------------*/

import {API_SENSOR, CALL_API} from "../client/api";

export const OPEN_SENSOR_MANAGER_POPIN = 'OPEN_SENSOR_MANAGER_POPIN';

export const openSensorManagerPopin = (open) => ({
  type: OPEN_SENSOR_MANAGER_POPIN,
  open: open
});

/*------------------------------------------------------------------------------------------
 * Find All Sensors
 *-----------------------------------------------------------------------------------------*/

export const LOAD_ALL_SENSORS_REQUEST = "LOAD_ALL_SENSORS_REQUEST";
export const LOAD_ALL_SENSORS_SUCCESS = "LOAD_ALL_SENSORS_SUCCESS";
export const LOAD_ALL_SENSORS_FAILURE = "LOAD_ALL_SENSORS_FAILURE";


const callLoadAllSensors = () => ({
  // we send bebox (w,s,e,n)
  [CALL_API]: {
    types: [LOAD_ALL_SENSORS_REQUEST, LOAD_ALL_SENSORS_SUCCESS, LOAD_ALL_SENSORS_FAILURE],
    endpoint: `sensor/all`,
    api: API_SENSOR,
    method: 'GET',
  }
});

export const loadAllSensors = () => (dispatch) => {
  return dispatch(callLoadAllSensors());
};