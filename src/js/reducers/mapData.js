import * as ActionTypes from '../actions/mapData';
import merge from 'lodash.merge';
import mapboxgl from 'mapbox-gl';
import {LOAD_PLANE_DETAIL_SUCCESS} from "../actions/mapData";


const profile = (state = {}, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.LOAD_PLANES_SUCCESS :
      const sw = new mapboxgl.LngLat(action.result.bboxRequested[0][1], action.result.bboxRequested[0][0]);
      const ne = new mapboxgl.LngLat(action.result.bboxRequested[1][1], action.result.bboxRequested[1][0]);

      let loadedBox = new mapboxgl.LngLatBounds(sw, ne);
      return {...state, planes: action.result.points, loadedBox: loadedBox};

    case ActionTypes.LOAD_PLANE_DETAIL_SUCCESS :
      return {...state, selectedPlane: action.result};

    case ActionTypes.UNSELECT_PLANE :
      return {...state, selectedPlane: null};
  }

  return state;
};

export default profile;
