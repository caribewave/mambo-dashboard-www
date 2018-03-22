import * as ActionTypes from '../actions/mapData';
import mapboxgl from 'mapbox-gl';


const profile = (state = {}, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.LOAD_FEATURE_SUCCESS :
      const sw = new mapboxgl.LngLat(action.result.bboxRequested[1], action.result.bboxRequested[0]);
      const ne = new mapboxgl.LngLat(action.result.bboxRequested[3], action.result.bboxRequested[2]);

      let loadedBox = new mapboxgl.LngLatBounds(sw, ne);

      return {
        ...state,
        features: [
          {type: "planes", geoms: action.result.features.planes},
          {type: "boats", geoms: action.result.features.boats}
        ],
        loadedBox: loadedBox
      };

    case ActionTypes.LOAD_PLANE_DETAIL_SUCCESS :
      return {...state, selectedGeom: action.result};

    case ActionTypes.UNSELECT_PLANE :
      return {...state, selectedGeom: null};
  }

  return state;
};

export default profile;
