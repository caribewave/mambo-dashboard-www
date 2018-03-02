import * as ActionTypes from '../actions/style.actions';
import merge from 'lodash.merge';

const profile = (state = {
  styles: [
    {text: "Normal", url:"mapbox://styles/nicofav/cjeaacnkq1n9g2so207wgyab6"},
    {text: "Satelite", url:"mapbox://styles/nicofav/cjeaadjf8jvzo2snupevgtn5j"}
    ],
  selectedStyle: {text: "Normal", url:"mapbox://styles/nicofav/cjeaacnkq1n9g2so207wgyab6"}
}, action) => {
  const {type} = action;

  switch (type) {
    case ActionTypes.CHANGE_MAP_STYLE :
      return merge({}, state, {selectedStyle: action.style});
  }

  return state;
};


export default profile;
