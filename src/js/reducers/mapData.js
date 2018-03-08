import * as ActionTypes from '../actions/mapData';
import merge from 'lodash.merge';

const profile = (state = {
}, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.LOAD_PLANE_SUCCESS :
      return merge({}, state, {planes: action.result});

      case ActionTypes.PLANE_SELECTED :
      return merge({}, state, {selectedPlane: action.plane});
  }

  return state;
};

export default profile;
