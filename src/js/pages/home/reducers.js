import * as ActionTypes from './actions';
import merge from 'lodash.merge';

const profile = (state = {}, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.LOAD_ABOUTME_SUCCESS:
      return merge({}, state, {text: action.result});
    case ActionTypes.CHANGE_MAP_STYLE :
      console.log("but");
      return merge({}, state, {style: action.style});
  }

  return state;
};


export default profile;
