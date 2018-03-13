import * as ActionTypes from '../actions/style';
import merge from 'lodash.merge';

const profile = (state = {
  layers: [],
  selectedStyle: null,
  popupOpen: false
}, action) => {
  const {type} = action;
  let styles = [];
  switch (type) {
    case ActionTypes.CHANGE_MAP_LAYERS :
      return merge({}, state, {selectedStyle: null}, {selectedStyle: action.style});

    case ActionTypes.LOAD_LAYERS_SUCCESS:
      let defaultStyle = null;
      Object.keys(action.result).forEach((k) => {
        let s = Object.assign({id: k}, action.result[k]);
        styles.push(s);
        if (s.meta.default) {
          defaultStyle = s; 
        }
      });
      return merge({}, state, {layers: styles, selectedStyle: defaultStyle});

    case ActionTypes.OPEN_MAP_LAYERS_POPUP:
      return merge({}, state, {popupOpen: false}, {popupOpen: action.open});
    case ActionTypes.CREATE_LAYER_REQUEST:
      return merge({}, state, {loading: true});
    case ActionTypes.CREATE_LAYER_SUCCESS:
      return merge({}, state, {loading: false, layers: [...state.layers, action.result]});
    case ActionTypes.CREATE_LAYER_FAILURE:
      return merge({}, state, {loading: false});
    case ActionTypes.SHOW_LAYER_SUCCESS:
      styles = [...state.layers];
      for (let i in styles) {
        if (styles[i].meta.name === action.result.meta.name) {
          styles[i].meta.display = action.result.meta.display;
        }
      }
      return merge({}, state, {layers: styles});
    
  }

  return state;
};


export default profile;
