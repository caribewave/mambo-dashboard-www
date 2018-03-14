import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import mapboxgl from 'mapbox-gl';
import {PROPS_PLANES, PROPS_POI, PROPS_TYPE_STYLE} from "../constants";
import './Map.scss';
import 'mapbox-gl-css';


class Map extends Component {

  static propTypes = {
    layers: PropTypes.arrayOf(PROPS_TYPE_STYLE),
    planes: PROPS_PLANES,
    selectedPlane: PropTypes.arrayOf(PROPS_POI),
    onMapPositionChanged: PropTypes.func,
    onPlaneSelected: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      mapElements: []
    }
  }

  //********************         Points        *************************//


  // a map element is :
  // "_id":"40732e",
  // "lastSpeed":373,
  // "direction":38
  //"coordinates":[2.449506,49.657412],
  // "time":"2018-
  // el

  mapPlaneFromApi = (plane) => {
    let poiState = {};
    poiState.id = plane._id;
    poiState.speed = plane.lastSpeed;
    poiState.heading = plane.direction;
    poiState.lng = plane.coordinates[0].value[0];
    poiState.lat = plane.coordinates[0].value[1];
    return poiState;
  };


  computeNextCoordinates = (elapsedTime, speedKn, headingDeg, lat, lng) => {
    // Earth radius in meters
    const R = 6378137;
    // Translate speed into meters per second
    const speedMs = speedKn * 1.852 / 3.600;
    // Distance flown in meters at current heading since elapsedTime
    const distanceFlown = speedMs * elapsedTime / 1000;
    const headingRad = headingDeg * (Math.PI / 180);
    const dn = distanceFlown * Math.cos(headingRad);
    const de = distanceFlown * Math.sin(headingRad);
    // Coordinate offsets in radians
    const dLat = dn / R / (Math.PI / 180);
    const dLon = de / (R * Math.cos(lat * (Math.PI / 180))) / (Math.PI / 180);
    // OffsetPosition, decimal degrees
    const latO = lat + dLat;
    const lonO = lng + dLon;
    return [lonO, latO];
  };

  mergeMarkers = (map, currentPoiStates, newPoiStates) => {
    let poiStates = [];
    newPoiStates.forEach((poiState) => {
      let previousPoiState = this.findPoiState(currentPoiStates, poiState.id);
      if (previousPoiState) {
        // The plane was already here. Update its position and content.
        this.updatePoiState(previousPoiState, poiState);
        poiStates.push(previousPoiState);
      } else {
        // The plane is new. Add marker on map.
        this.addPoiOnMap(map, poiState);
        poiStates.push(poiState);
      }
    });
    return poiStates;
  };

  findPoiState = (data, id) => {
    if (data) {
      data.forEach((d) => {
        if (d.id === id) {
          return d;
        }
      });
    }
  };


  updatePoiState = (poiState, previousPoiState) => {
    poiState.id = previousPoiState.id;

    poiState.speed = previousPoiState.speed;
    poiState.heading = previousPoiState.heading;
    poiState.lat = previousPoiState.lat;
    poiState.lng = previousPoiState.lng;

    poiState.marker.setLngLat(new mapboxgl.LngLat(poiState.lng, poiState.lat));
    this.rotateMarker(poiState.el.childNodes[0], poiState.heading);
    poiState.reset = true;
  };

  rotateMarker = (el, heading) => {
    el.style['-ms-transform'] = 'rotate(' + heading + 'deg)';
    el.style['-webkit-transform'] = 'rotate(' + heading + 'deg)';
    el.style['transform'] = 'rotate(' + heading + 'deg)';
  };

  addPoiOnMap = (map, poiState) => {
    poiState.el = this.getMarkerOnMap(poiState);
    poiState.marker = new mapboxgl.Marker(poiState.el)
      .setLngLat([poiState.lng, poiState.lat])
      .addTo(map);

    // Start the animation.
    this.animateMarker(0, poiState);
  };

  animateMarker = (timestamp, poiState) => {
    poiState.marker.setLngLat(this.computeNextCoordinates(timestamp, poiState.speed, poiState.heading, poiState.lat, poiState.lng));
    // Request the next frame of the animation.
    if (poiState.reset) {
      poiState.reset = false;
      this.animateMarker(0, poiState);
    } else {
      setTimeout(
        requestAnimationFrame((ts) => this.animateMarker(ts, poiState)), 500);
    }
  };

  getMarkerOnMap = (data) => {
    let el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(\'images/plane.png\')';
    el.style.width = '46px';
    el.style.height = '50px';

    let tooltip = document.createElement('span');
    tooltip.className = 'tooltiptext';
    tooltip.appendChild(document.createTextNode("Plane " + data.id));


    this.rotateMarker(el, data.heading);

    el.addEventListener('click', () => {
      this.props.onPlaneSelected(data.id)
    });

    let parent = document.createElement('div');
    parent.className = "tooltip";
    parent.appendChild(el);
    parent.appendChild(tooltip);
    return parent;
  };

//********************         Lines        *************************//

  computePlaneFeature = (planePoints) => {
    let line = [];
    if (planePoints) {
      // we will only draw the last 10 point
      planePoints.forEach((point) =>
        line.push(point.location.coordinates)
      );
    }

    console.log(line);
    return [{
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: line
      }
    }]
  };

  sendMapCoordinates = () => {
    this.props.onMapPositionChanged({
      bounds: this.map.getBounds(),
      zoom: this.map.getZoom().toFixed(2)
    });
  };

  loadMap = () => {
    this.setState({mapLoaded: true});
    this.updateLayers(this.props.layers);

    // Add a source and layer displaying a point which will be animated in a circle.
    this.map.addSource('plane_source_id', {
      type: "geojson",
      data: {
        "type": "FeatureCollection",
        "features": this.computePlaneFeature(this.props.selectedPlane)
      }
    });

    this.map.addLayer({
      id: "plane_way_layer_id",
      source: "plane_source_id",
      type: "line",
      paint: {
        "line-color": "#007cbf",
        "line-width": 5,
        "line-opacity": .8
      },
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      }
    });
  };


//******************** component life cycle *************************//

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [2, 45],
      zoom: 5
    });

    this.map.setStyle({
      "version": 8,
      "sources": {},
      "layers": []
    });
    this.map.on('dragend', this.sendMapCoordinates);
    this.map.on('load', this.loadMap);

    this.sendMapCoordinates();

  }

  updateLayers = (layers) => {
    for (let i in layers) {
      let l = layers[i];
      if (this.map.getLayer(l.meta.name)) {
        this.map.removeLayer(l.meta.name);
        this.map.removeSource(l.meta.name);
      }
      if (l.meta.display) {

        if (l.meta.vector) {
          // map.addSource()
          // TODO
        } else {
          console.log(l);
          this.map.addSource(l.meta.name, {
            "type": "raster",
            "tiles": [l.source],
            "tileSize": l.meta.retina ? 512 : 256
          });
          this.map.addLayer({
            "id": l.meta.name,
            "type": "raster",
            "source": l.meta.name,
            "minzoom": 0,
            "maxzoom": 21
          });
        }
      }
    }
  };

  componentWillReceiveProps(newProps) {

    if (this.state.mapLoaded && (this.props.layers !== newProps.layers)) {
      console.log("Old layers:")
      console.log(this.props.layers);
      console.log("New layers:")
      console.log(newProps.layers);
      // New styles available
      this.updateLayers(newProps.layers);
    }

    // Planes (points)

    if (newProps.planes !== this.props.planes) {
      const planes = [];

      newProps.planes.forEach((plane) => {
        planes.push(this.mapPlaneFromApi(plane));
      });

      this.setState({mapElements: this.mergeMarkers(this.map, this.state.mapElements, planes)});
    }

    if (newProps.selectedPlane !== this.props.selectedPlane) {
      let planeSource = this.map.getSource('plane_source_id');
      if (planeSource) {
        planeSource.setData({
            "type": "FeatureCollection",
            "features": this.computePlaneFeature(newProps.selectedPlane)
          }
        );
      }
    }

  }

  render() {
    return (
      <div ref={el => this.mapContainer = el}/>
    );
  }

}


export default injectIntl(Map);




