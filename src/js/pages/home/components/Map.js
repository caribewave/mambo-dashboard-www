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
    const lat = plane.location.coordinates[0][0] + Math.cos(angle) * 20;
    const lng = plane.location.coordinates[0][1] + Math.cos(angle) * 20;

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          lat,
          lng
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
    // Update the data to a new position based on the animation timestamp. The
    // divisor in the expression `timestamp / 1000` controls the animation speed.
    this.map.getSource('plane').setData(this.computeEstimatedPosition(0));

    // Request the next frame of the animation.
    requestAnimationFrame(this.animateMarker);
  };

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [2, 45],
      zoom: 5
    });

    this.map.on('move', () => {
      this.map.getBounds();
      this.props.onMapPositionChanged({
        bounds: this.map.getBounds(),
        zoom: this.map.getZoom().toFixed(2)
      });
    });


    this.map.on('load', () => {
      // Add a source and layer displaying a point which will be animated in a circle.
      this.map.addSource('plane', {
        type: "geojson",
        data: this.computeEstimatedPosition(0)
      });

      this.map.addLayer({
        id: "plane",
        source: "plane",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#007cbf"
        }
      });

      // Start the animation.
      this.animateMarker();
    });

    this.map.on('click', (event) => {
      const selectedLayers = this.map.queryRenderedFeatures(event.point, {layers: ['plane']});
      if (selectedLayers[0] && selectedLayers[0].properties) {
        this.props.onPlaneSelected(selectedLayers[0].properties.plane)
      }
    });

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

  render() {
    return (
      <div ref={el => this.mapContainer = el}/>
    );
  }

}


export default injectIntl(Map);




