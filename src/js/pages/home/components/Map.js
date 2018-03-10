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


  computeSinglePoint = (plane, angle) => {
    const lat = plane.coordinates[0][0];
    const lng = plane.coordinates[0][1];

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          lng,
          lat
        ]
      },
      properties: {plane: plane}
    }
  };

  computeEstimatedPosition = (angle) => {
    return {
      type: "FeatureCollection",
      features: (this.props.planes ? this.props.planes.map((plane) =>
          this.computeSinglePoint(plane, angle)) : []
      )
    }
  };

  animateMarker = (timestamp) => {
    // Update the data to a new position based on the animation timestamp.
    this.map.getSource('plane_source_id').setData(this.computeEstimatedPosition(timestamp));
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
      data: this.computeEstimatedPosition(0)
    });

    this.map.addLayer({
      id: "plane_layer_id",
      source: "plane_source_id",
      type: "circle",
      paint: {
        "circle-radius": 10,
        "circle-color": "#007cbf"
      }
    });

    // Start the animation.
    this.animateMarker();
  };

  mapClick = (event) => {
    const selectedLayers = this.map.queryRenderedFeatures(event.point, {layers: ['plane_layer_id']});
    if (selectedLayers[0] && selectedLayers[0].properties) {
      this.props.onPlaneSelected(selectedLayers[0].properties.plane)
    }
  };

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [2, 45],
      zoom: 5
    });

    this.map.on('move', this.sendMapCoordinates);
    this.map.on('load', this.loadMap);
    this.map.on('click', this.mapClick);

    this.sendMapCoordinates();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.style !== this.props.style) {
      let mapstyle = newProps.style.source;
      if (!newProps.style.vector) {
        mapstyle = {
          "version": 8,
          "sources": {
            "raster-tiles": {
              "type": "raster",
              "tiles": [newProps.style.source],
              "tileSize": newProps.style.retina ? 512 : 256
            }
          },
          "layers": [{
            "id": newProps.style.name,
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

  componentWillUpdate() {
    if (this.props.planes && this.map && this.map.getSource('plane_source_id')) {
      this.map.getSource('plane_source_id').setData(
        this.computeEstimatedPosition(0)
      );
    }
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el}/>
    );
  }

}


export default injectIntl(Map);




