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

/*------------------------------------------------------------------------------------------
 * Activate Sensor
 *-----------------------------------------------------------------------------------------*/

export const ACTIVATE_SENSOR_REQUEST = "ACTIVATE_SENSOR_REQUEST";
export const ACTIVATE_SENSOR_SUCCESS = "ACTIVATE_SENSOR_SUCCESS";
export const ACTIVATE_SENSOR_FAILURE = "ACTIVATE_SENSOR_FAILURE";


const callActivateSensor = (label, activate) => ({
  [CALL_API]: {
    types: [ACTIVATE_SENSOR_REQUEST, ACTIVATE_SENSOR_SUCCESS, ACTIVATE_SENSOR_FAILURE],
    endpoint: `sensor/${label}/activate/${activate}`,
    api: API_SENSOR,
    method: 'PUT',
  }
});

export const activateSensor = (label, activate) => (dispatch) => {
  return dispatch(callActivateSensor(label, activate));
};

/*------------------------------------------------------------------------------------------
 * Delete Sensor
 *-----------------------------------------------------------------------------------------*/

export const DELETE_SENSOR_REQUEST = "DELETE_SENSOR_REQUEST";
export const DELETE_SENSOR_SUCCESS = "DELETE_SENSOR_SUCCESS";
export const DELETE_SENSOR_FAILURE = "DELETE_SENSOR_FAILURE";


const callDeleteSensor = (label) => ({
  [CALL_API]: {
    types: [DELETE_SENSOR_REQUEST, DELETE_SENSOR_SUCCESS, DELETE_SENSOR_FAILURE],
    endpoint: `sensor/${label}`,
    api: API_SENSOR,
    method: 'DELETE',
  }
});

export const deleteSensor = (label) => (dispatch) => {
  return dispatch(callDeleteSensor(label));
};

/*------------------------------------------------------------------------------------------
 * Create Sensor
 *-----------------------------------------------------------------------------------------*/

export const CREATE_SENSOR_REQUEST = "CREATE_SENSOR_REQUEST";
export const CREATE_SENSOR_SUCCESS = "CREATE_SENSOR_SUCCESS";
export const CREATE_SENSOR_FAILURE = "CREATE_SENSOR_FAILURE";


const callCreateSensor = (sensor) => ({
  [CALL_API]: {
    types: [CREATE_SENSOR_REQUEST, CREATE_SENSOR_SUCCESS, CREATE_SENSOR_FAILURE],
    endpoint: `sensor`,
    api: API_SENSOR,
    method: 'POST',
    body: sensor
  }
});

export const createSensor = (sensor) => (dispatch) => {
  return dispatch(callCreateSensor(sensor));
};

/*------------------------------------------------------------------------------------------
 * Edit Sensor
 *-----------------------------------------------------------------------------------------*/

export const EDIT_SENSOR_REQUEST = "EDIT_SENSOR_REQUEST";
export const EDIT_SENSOR_SUCCESS = "EDIT_SENSOR_SUCCESS";
export const EDIT_SENSOR_FAILURE = "EDIT_SENSOR_FAILURE";


const callEditSensor = (label, sensor) => ({
  [CALL_API]: {
    types: [EDIT_SENSOR_REQUEST, EDIT_SENSOR_SUCCESS, EDIT_SENSOR_FAILURE],
    endpoint: `sensor/${label}`,
    api: API_SENSOR,
    method: 'PUT',
    body: sensor
  }
});

export const editSensor = (label, sensor) => (dispatch) => {
  return dispatch(callEditSensor(label, sensor));
};