import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import ReactMapboxGl, {Feature, Layer} from 'react-mapbox-gl';
import {PROPS_TRAJECTORY, PROPS_TYPE_STYLE} from "../constants";
import './Map.scss';

const MapboxGL = ReactMapboxGl({
    accessToken: 'pk.tup'
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
        style: PROPS_TYPE_STYLE,
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
        
        if (this.props.style) {
            let style = this.props.style.source;
            if (!this.props.style.vector) {
                
                style = {
                    "version": 8,
                        "sources": {
                        "raster-tiles": {
                            "type": "raster",
                                "tiles": [this.props.style.source],
                                "tileSize": this.props.style.retina ? 512 : 256
                        }
                    },
                    "layers": [{
                        "id": this.props.style.name,
                        "type": "raster",
                        "source": "raster-tiles",
                        "minzoom": 0,
                        "maxzoom": 21
                    }]
                }
            }
            return (
              <MapboxGL
                    style={style}
                    zoom={zoom}
                    containerStyle={{ width: '100%', height: '100%' }}>
                    {layers}
            </MapboxGL>
            );
        }
        return (
            <div>Loading Map</div>
        );
    }
}


export default injectIntl(Map);




