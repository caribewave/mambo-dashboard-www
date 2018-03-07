import * as ActionTypes from '../actions/mapData';
import merge from 'lodash.merge';

const profile = (state = {
}, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.LOAD_PLANE_SUCCESS :
      return merge({}, state, {planes: action.result});
  }

  return state;
};

export default profile;
