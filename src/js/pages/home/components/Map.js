import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import ReactMapboxGl, {Feature, Layer} from 'react-mapbox-gl';
import {PROPS_TRAJECTORY} from "../constants";


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
        styleUrl: PropTypes.string,
        points: PropTypes.arrayOf(PROPS_TRAJECTORY)
    };

    render() {

        let layers;
        let mappedRoute;
        const layersinfo = [{type: "line", layout: lineLayout, paint: linePaint}, {
            type: "line",
            layout: lineLayout,
            paint: linePaint
        }];

        if (this.props.points) {
            mappedRoute = this.props.points.map(list => list.map(point => [point.lat, point.lng]));
        }


        if (mappedRoute) {
            layers = layersinfo.map((l, i) => (
                <Layer type={l.type} layout={l.layout} paint={l.paint} key={i}><Feature
                    coordinates={mappedRoute[i]}/></Layer>));
        }


        return this.props.styleUrl ? (
            <MapboxGL
                style={this.props.styleUrl}
                zoom={zoom}
                containerStyle={{
                    height: "500px",
                    width: "100%"
                }}>
                {layers}
            </MapboxGL>
        ) : (
            <div>Loading Map</div>
        );
    }
}


export default injectIntl(Map);




