import * as ActionTypes from '../actions/style';
import merge from 'lodash.merge';

const profile = (state = {
  layers: [],
  layerToEdit: null,
  popupOpen: false,
  editPopupOpen: false,
  editMode: 'create',
}, action) => {
  const {type} = action;
  let layers = [];
  switch (type) {
    case ActionTypes.LOAD_LAYERS_SUCCESS:
      let defaultStyle = null;
      Object.keys(action.result).forEach((k) => {
        let s = Object.assign({id: k}, action.result[k]);
        layers.push(s);
        if (s.meta.default) {
          defaultStyle = s; 
        }
      });
      return merge({}, state, {layers: layers});
    case ActionTypes.OPEN_LAYERS_POPUP:
      return merge({}, state, {popupOpen: action.open});
    // Layer creation / edition popup
    case ActionTypes.OPEN_LAYERS_EDITION_POPUP:
      return merge({}, state, {editPopupOpen: action.open, layerToEdit: action.layer, editMode: action.layer ? 'edit' : 'create'});
    // Create layer
    case ActionTypes.CREATE_LAYER_REQUEST:
      return merge({}, state, {loading: true, layerEditionError: null});
    case ActionTypes.CREATE_LAYER_SUCCESS:
      return merge({}, state, {loading: false, layers: [...state.layers, action.result]});
    case ActionTypes.CREATE_LAYER_FAILURE:
      return merge({}, state, {loading: false, layerEditionError: action.error});
    // Update layer
    case ActionTypes.EDIT_LAYER_REQUEST:
      return merge({}, state, {loading: true, layerEditionError: null});
    case ActionTypes.EDIT_LAYER_SUCCESS:
      layers = [];
      state.layers.forEach((l) => {
        if (l.meta.name != action.result.meta.name) {
          layers.push(l);
        } else {
          layers.push(action.result);
        }
      });
      return merge({}, state, {loading: false, layers: layers});
    case ActionTypes.EDIT_LAYER_FAILURE:
      return merge({}, state, {loading: false, layerEditionError: action.error});
    // Show layer success
    case ActionTypes.SHOW_LAYER_SUCCESS:
      layers = [];
      layers.push(...state.layers);
      state.layers.forEach((layer) => {
        if (layer.meta.name === action.result.meta.name) {
          layer.meta.display = action.result.meta.display;
        }
      });
      return {...state, layers: layers};
    // Delete layer
    case ActionTypes.DELETE_LAYER_REQUEST:
      return merge({}, state, {loading: true});
    case ActionTypes.DELETE_LAYER_SUCCESS:
      layers = [];
      state.layers.forEach((l) => {
        if (l.meta.name != action.result.name) {
          layers.push(l);
        }
      });
      return merge({...state, layers: layers}, {loading: false});
  }

  return state;
};


export default profile;
