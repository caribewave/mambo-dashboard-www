import * as ActionTypes from '../actions/mapData';
import merge from 'lodash.merge';
import mapboxgl from 'mapbox-gl';


const profile = (state = {}, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.LOAD_PLANE_SUCCESS :
      console.log(loadedBox);
      // http://localhost:8082/planes/loc?bbox=(-8.480957031216647,40.52121100904992,12.393066406299099,53.88634731053787)
      //   (2) [-8.480957031216647, 40.52121100904992]
      // (2) [12.393066406299099, 53.88634731053787]
      //
      //
      // ----- lng
      //
      // // we send bebox (w,s,e,n)


      const sw = new mapboxgl.LngLat(action.result.bboxRequested[0][0], action.result.bboxRequested[0][1]);
      const ne = new mapboxgl.LngLat(action.result.bboxRequested[1][0], action.result.bboxRequested[1][1]);

      let loadedBox = new mapboxgl.LngLatBounds(sw, ne);
      console.log(loadedBox);
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
