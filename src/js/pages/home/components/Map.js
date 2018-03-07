import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import mapboxgl from 'mapbox-gl';
import {PROPS_TRAJECTORY, PROPS_TYPE_STYLE} from "../constants";
import './Map.scss';
import 'mapbox-gl-css';


class Map extends Component {

  static propTypes = {
    style: PROPS_TYPE_STYLE,
    points: PropTypes.arrayOf(PROPS_TRAJECTORY),
    onMapPositionChanged: PropTypes.func
  };

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [2, 45],
      zoom: 5
    });

    this.map.on('move', () => {
      const center = this.map.getCenter();
      this.props.onMapPositionChanged({
        lng: center.lng.toFixed(4),
        lat: center.lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
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




