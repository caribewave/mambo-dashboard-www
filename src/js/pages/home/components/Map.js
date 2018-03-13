import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import mapboxgl from 'mapbox-gl';
import {PROPS_PLANES, PROPS_TYPE_STYLE} from "../constants";
import './Map.scss';
import 'mapbox-gl-css';


class Map extends Component {

  static propTypes = {
    style: PROPS_TYPE_STYLE,
    planes: PROPS_PLANES,
    onMapPositionChanged: PropTypes.func,
    onPlaneSelected: PropTypes.func
  };

  computeNewPosition = (plane) => {
    //if there is only one point we can't predict its position,
    if (plane.coordinates.length === 1) {
      return plane.coordinates[0].value;
    }

    const now = new Date();

    // point 0 is the newest point
    const point0 = plane.coordinates[0];
    const point1 = plane.coordinates[1];

    // new date is made so we can use .minutes
    const deltaTime = new Date(now - Date.parse(point0.time));
    const lastDeltaTime = new Date(Date.parse(point1.time) - Date.parse(point0.time));

    // if we don't have more information after 20 minutes we don't try to estimate the plane position
    if (deltaTime.getHours() > 1 || deltaTime.getMinutes() > 20) {
      return plane.coordinates[0].value;
    }


    const lngSpeed = (point0.value[0] - point1.value[0]) / lastDeltaTime;
    const latSpeed = (point0.value[1] - point1.value[1]) / lastDeltaTime;
    const newLng = Number((point0.value[0] + deltaTime * lngSpeed).toFixed(6));
    const newLat = Number((point0.value[1] + deltaTime * latSpeed).toFixed(6));

    return [newLng, newLat];
  };

  computePlaneFeature = (plane) => {
    let line = [];

    let newPosition = this.computeNewPosition(plane);

    line.push(newPosition);

    // we will only draw the last 10 point
    plane.coordinates.slice(1, 10).forEach((point) =>
      line.push(point.value)
    );

    return [{
      "type": "Feature",
      "properties": {"name": "Null Island"},
      "geometry": {
        "type": "Point",
        "coordinates": newPosition,
        properties: {plane: plane._id}
      }
    }, {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: line
      }
    }]
  };

  computeFeatures = () => {
    let features = [];
    this.props.planes.forEach((plane) => {
      features = features.concat(this.computePlaneFeature(plane));
    });

    return features;
  };

  animateMarker = () => {
    // Update the data to a new position based on the animation timestamp.
    let planeSource = this.map.getSource('plane_source_id');
    if (planeSource) {
      const features = this.computeFeatures();
      planeSource.setData({
          "type": "FeatureCollection",
          "features": features
        }
      );
    }
    // Request the next frame of the animation.
    requestAnimationFrame(this.animateMarker);
  };

  sendMapCoordinates = () => {
    this.props.onMapPositionChanged({
      bounds: this.map.getBounds(),
      zoom: this.map.getZoom().toFixed(2)
    });
  };

  loadMap = () => {
    // Add a source and layer displaying a point which will be animated in a circle.
    this.map.addSource('plane_source_id', {
      type: "geojson",
      data: {
        "type": "FeatureCollection",
        "features": []
      }
    });

    this.map.addLayer({
      id: "plane_layer_id",
      source: "plane_source_id",
      type: "circle",
      paint: {
        "circle-radius": 5,
        "circle-color": "#007cbf"
      }
    });

    this.map.addLayer({
      id: "plane_way_layer_id",
      source: "plane_source_id",
      type: "line",
      paint: {
        "line-color": '#ed6498',
        "line-width": 5,
        "line-opacity": .8
      },
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      }
    });

    // Start the animation.
    this.animateMarker();
  };

  mapClick = (event) => {
    const selectedLayers = this.map.queryRenderedFeatures(event.point, {layers: ['plane_layer_id']});
    if (selectedLayers[0] && selectedLayers[0].properties) {
      this.props.onPlaneSelected(JSON.parse(selectedLayers[0].properties.plane))
    }
  };

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [2, 45],
      zoom: 5
    });

    this.map.on('dragend', this.sendMapCoordinates);
    this.map.on('load', this.loadMap);
    this.map.on('click', this.mapClick);

    this.sendMapCoordinates();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.style !== this.props.style) {
      let mapstyle = newProps.style.source;
      if (!newProps.style.meta.vector) {
        mapstyle = {
          "version": 8,
          "sources": {
            "raster-tiles": {
              "type": "raster",
              "tiles": [newProps.style.source],
              "tileSize": newProps.style.meta.retina ? 512 : 256
            }
          },
          "layers": [{
            "id": newProps.style.meta.name,
            "type": "raster",
            "source": "raster-tiles",
            "minzoom": 0,
            "maxzoom": 21
          }]
        }
      }

      this.map.setStyle(mapstyle);
    }
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el}/>
    );
  }

}


export default injectIntl(Map);




