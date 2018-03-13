import * as ActionTypes from '../actions/style';
import merge from 'lodash.merge';

const profile = (state = {
  layers: [],
  selectedStyle: null,
  popupOpen: false
}, action) => {
  const {type} = action;
  let layers = [];
  switch (type) {
    case ActionTypes.CHANGE_MAP_LAYERS :
      return merge({}, state, {selectedStyle: null}, {selectedStyle: action.style});

    case ActionTypes.LOAD_LAYERS_SUCCESS:
      let defaultStyle = null;
      Object.keys(action.result).forEach((k) => {
        let s = Object.assign({id: k}, action.result[k]);
        layers.push(s);
        if (s.meta.default) {
          defaultStyle = s; 
        }
      });
      return merge({}, state, {layers: layers, selectedStyle: defaultStyle});

    case ActionTypes.OPEN_MAP_LAYERS_POPUP:
      return merge({}, state, {popupOpen: false}, {popupOpen: action.open});
    case ActionTypes.CREATE_LAYER_REQUEST:
      return merge({}, state, {loading: true});
    case ActionTypes.CREATE_LAYER_SUCCESS:
      return merge({}, state, {loading: false, layers: [...state.layers, action.result]});
    case ActionTypes.CREATE_LAYER_FAILURE:
      return merge({}, state, {loading: false});
    case ActionTypes.SHOW_LAYER_SUCCESS:
      layers = [...state.layers];
      for (let i in layers) {
        if (layers[i].meta.name === action.result.meta.name) {
          layers[i].meta.display = action.result.meta.display;
        }
      }
      return merge({}, state, {layers: layers});
  }

  return state;
};


export default profile;
