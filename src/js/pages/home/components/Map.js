import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {defineMessages, injectIntl} from 'react-intl';
import ReactMapboxGl, {Feature, Layer} from 'react-mapbox-gl';
import {PROPS_COORDINATE} from "../constants";


const MapboxGL = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoibmljb2ZhdiIsImEiOiJjaXNkNW0yNHYwMDB0MnVwZmFnYjRjaXpyIn0.uPzQVfOXDwEHHYQwV_RUgA'
});

const zoom = [8];


const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round'
};

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 12
};

class Map extends Component {

  static propTypes = {
    style_url: PropTypes.string,
    points: PropTypes.arrayOf(PROPS_COORDINATE)
  };


  render() {

    const layersinfo = [{type: "line", layout: lineLayout, paint: linePaint}];

    const mappedRoute = this.props.points.map(point => [point.lat, point.lng]);

    const layers = layersinfo.map((l, i) => (
      <Layer type={l.type} layout={l.layout} paint={l.paint} key={i}><Feature coordinates={mappedRoute}/></Layer>));


    return (
      <MapboxGL
        style={this.props.style_url || "mapbox://styles/mapbox/streets-v8"}
        zoom={zoom}
        containerStyle={{
          height: "500px",
          width: "100%"
        }}>
        {layers}
      </MapboxGL>
    );
  }
}


export default injectIntl(Map);




