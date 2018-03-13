import * as ActionTypes from '../actions/sensor';
import merge from 'lodash.merge';

const profile = (state = {
  popupOpen: false,
  sensors : []
}, action) => {
  const {type} = action;

  switch (type) {
    case ActionTypes.OPEN_SENSOR_MANAGER_POPIN:
      return merge({}, state, {popupOpen: action.open});
    case  ActionTypes.LOAD_ALL_SENSORS_SUCCESS:
      return merge({}, state, {sensors : action.result});
  }

  return state;
};


export default profile;
