import * as ActionTypes from '../actions/mapData';
import merge from 'lodash.merge';
import mapboxgl from 'mapbox-gl';


const profile = (state = {}, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.LOAD_PLANE_SUCCESS :
      const sw = new mapboxgl.LngLat(action.result.bboxRequested[0][1], action.result.bboxRequested[0][0]);
      const ne = new mapboxgl.LngLat(action.result.bboxRequested[1][1], action.result.bboxRequested[1][0]);

      let loadedBox = new mapboxgl.LngLatBounds(sw, ne);

      return merge({}, state, {
        planes: action.result.points,
        loadedBox: loadedBox
      });

    case ActionTypes.PLANE_SELECTED :
      return merge({}, state, {selectedPlane: action.plane});
  }

  return state;
};

export default profile;
