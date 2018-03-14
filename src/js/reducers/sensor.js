import * as ActionTypes from '../actions/sensor';
import merge from 'lodash.merge';

const profile = (state = {
  popupOpen: false,
  sensors: []
}, action) => {
  const {type} = action;
  let sensors = [];

  switch (type) {
    case ActionTypes.OPEN_SENSOR_MANAGER_POPIN:
      return merge({}, state, {popupOpen: action.open});
    case  ActionTypes.LOAD_ALL_SENSORS_SUCCESS:
      return merge({}, state, {sensors: action.result});
    case ActionTypes.ACTIVATE_SENSOR_SUCCESS:
      sensors = [...state.sensors];

      for (let i in sensors) {
        if (sensors[i].label === action.result.label) {
          sensors[i].activated = action.result.activated;
        }
      }
      return merge({}, state, {sensors: sensors});
    case ActionTypes.DELETE_SENSOR_SUCCESS:
      sensors = [...state.sensors];
      for (let i in sensors) {
        if (sensors[i].label === action.result) {
          sensors.splice(i, 1);
        }
      }
      return {...state, sensors: sensors};
    case ActionTypes.EDIT_SENSOR_SUCCESS:
      sensors = [...state.sensors];

      for (let i in sensors) {
        if (sensors[i].label === action.result.editLabel) {
          sensors[i] = action.result.sensor;
        }
      }
      return merge({}, state, {sensors: sensors});
  }

  return state;
};


export default profile;
