import * as ActionTypes from '../actions/point';
import merge from 'lodash.merge';

const profile = (state = {
}, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.LOAD_POINT_SUCCESS :
      return merge({}, state, {points: action.result});
  }

  return state;
};


export default profile;
