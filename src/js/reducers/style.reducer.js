import * as ActionTypes from '../actions/style.actions';
import merge from 'lodash.merge';

const profile = (state = {
  styles: [{text: "Normal"}, {text: "Satelite"}],
  selectedStyle: {text: "Normal"}
}, action) => {
  const {type} = action;

  switch (type) {
    case ActionTypes.CHANGE_MAP_STYLE :
      return merge({}, state, {selectedStyle: action.style});
  }

  return state;
};


export default profile;
