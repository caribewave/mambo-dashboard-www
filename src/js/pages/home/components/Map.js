import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {defineMessages, injectIntl} from 'react-intl';
import ReactMapboxGl, {Feature, Layer} from 'react-mapbox-gl';
import {PROPS_TYPE_STYLE} from "../constants";


const MapboxGL = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoibmljb2ZhdiIsImEiOiJjaXNkNW0yNHYwMDB0MnVwZmFnYjRjaXpyIn0.uPzQVfOXDwEHHYQwV_RUgA'
});

const zoom = [8];

const messages = defineMessages({
  lblWelcome: {
    id: 'lbl.welcome',
    defaultMessage: 'Welcome'
  },
  lblIntroduction: {
    id: 'lbl.introduction',
    defaultMessage: 'Introduction'
  }
});

class Map extends Component {

  static propTypes = {
    style_url: PropTypes.string
  };


  render() {
    return (
      <MapboxGL
        style={this.props.style_url || "mapbox://styles/mapbox/streets-v8"}
        zoom={zoom}
        containerStyle={{
          height: "500px",
          width: "100%"
        }}>
        <Layer
          type="symbol"
          id="marker"
          layout={{"icon-image": "marker-15"}}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
        </Layer>
      </MapboxGL>
    );
  }
}


export default injectIntl(Map);




