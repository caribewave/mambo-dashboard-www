import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import mapboxgl from 'mapbox-gl';
import {PROPS_PLANES, PROPS_PLANE_DETAIL, PROPS_TYPE_STYLE} from "../constants";
import './Map.scss';
import 'mapbox-gl-css';


class Map extends Component {

  static propTypes = {
    layers: PropTypes.arrayOf(PROPS_TYPE_STYLE),
    planes: PROPS_PLANES,
    selectedPlane: PROPS_PLANE_DETAIL,
    onMapPositionChanged: PropTypes.func,
    onPlaneSelected: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      mapElements: []
    }
  }

  //********************         Mapper        *************************//


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
    poiState.lastUpdateTime = plane.coordinates[0].time;
    return poiState;
  };

  //********************      Points Life Cycle     *************************//

  // Poi has changed, we are gonna create the missing points, update the existing ones and delete the old ones.
  mergeMarkers = (map, currentPoiStates, newPoiStates) => {
    // this variable will contain all the updated and new data to display on the map
    let poiStates = [];
    newPoiStates.forEach((poiState) => {
      const previousPoiState = this.findPoiState(currentPoiStates, poiState.id);
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

    //all points not return by the api will be remove from the map
    this.removeMarker(currentPoiStates, poiStates);

    return poiStates;
  };

  findPoiState = (data, id) => {
    let found = null;
    if (data) {
      data.forEach((d) => {
        if (d.id === id) {
          found = d;
        }
      });
    }
    return found;
  };

  removeMarker = (oldPoiStates, newPoiStates) => {
    Array.prototype.diff = function (a) {
      return this.filter(function (i) {
        return a.indexOf(i) < 0;
      });
    };

    let toRemove = oldPoiStates.diff(newPoiStates);
    this.removeFromMark(toRemove);
  };

  updatePoiState = (previousPoiState, poiState) => {
    previousPoiState.speed = poiState.speed;
    previousPoiState.heading = poiState.heading;
    previousPoiState.lat = poiState.lat;
    previousPoiState.lng = poiState.lng;
    previousPoiState.lastUpdateTime = poiState.lastUpdateTime;
    previousPoiState.marker.setLngLat(new mapboxgl.LngLat(poiState.lng, poiState.lat));
    this.rotateMarker(previousPoiState.el.childNodes[0], poiState.heading);
  };

//********************     UI Map call     *************************//

  addPoiOnMap = (map, poiState) => {
    poiState.el = this.createMarkerOnMap(poiState);
    poiState.marker = new mapboxgl.Marker(poiState.el)
      .setLngLat([poiState.lng, poiState.lat])
      .addTo(map);
  };

  removeFromMark(toRemove) {
    toRemove.forEach((poiState) => {
      poiState.marker.remove();
    });
  }

  rotateMarker = (el, heading) => {
    el.style['-ms-transform'] = 'rotate(' + heading + 'deg)';
    el.style['-webkit-transform'] = 'rotate(' + heading + 'deg)';
    el.style['transform'] = 'rotate(' + heading + 'deg)';
  };

  createMarkerOnMap = (data) => {
    let el = document.createElement('div');
    el.className = 'marker';

    let isSelected = this.props.selectedPlane && this.props.selectedPlane.data[0] && this.props.selectedPlane.data[0].hex === data.id;

    el.style.backgroundImage = isSelected ? 'url(\'images/icon_plane_generic_accentColors.svg\')' : 'url(\'images/icon_plane_generic_primaryColors.svg\')';
    el.style.width = '48px';
    el.style.height = '48px';
    el.id = data.id;

    this.rotateMarker(el, data.heading);

    el.addEventListener('click', () => {
      this.props.onPlaneSelected(data.id)
    });

    let parent = document.createElement('div');
    parent.className = "tooltip";
    parent.appendChild(el);
    parent.appendChild(this.createToolTip(data));
    return parent;
  };


  createToolTip(data) {
    let tooltip = document.createElement('span');
    tooltip.className = 'tooltiptext';
    tooltip.appendChild(document.createTextNode("Plane " + data.id));
    return tooltip;
  }

  selectMarkerOnMap(selectedPlane) {
    // select the new icon
    if (selectedPlane) {
      let elementById = document.getElementById(selectedPlane.data[0].hex);
      if (elementById) {
        elementById.style.backgroundImage = 'url(\'images/icon_plane_generic_accentColors.svg\')';
      }
    }
  }

  unselectMarkerOnMap() {// change the old marker image
    if (this.props.selectedPlane) {
      let elementById = document.getElementById(this.props.selectedPlane.data[0].hex);
      if (elementById) {
        elementById.style.backgroundImage = 'url(\'images/icon_plane_generic_primaryColors.svg\')';
      }
    }
  }

//********************     Animate     *************************//

  animateMarkers = (timestamp) => {
    if (this.state.mapElements) {
      this.state.mapElements.forEach((poiState) => {
        let lastUpdatedDate = Date.parse(poiState.lastUpdateTime);
        const elapsedTime = (new Date()).getTime() - lastUpdatedDate;
        if ((elapsedTime / 1000) / 60 < 15) {
          poiState.marker.setLngLat(this.computeNextCoordinates(elapsedTime, poiState.speed, poiState.heading, poiState.lat, poiState.lng));
        }
      })
    }

    setTimeout(
      requestAnimationFrame((ts) => this.animateMarkers(ts)), 1000);
  };

//********************         Lines        *************************//

  computePlaneFeature = (plane) => {
    let line = [];
    if (plane && plane.data) {
      // we will only draw the last 10 point
      plane.data.forEach((point) =>
        line.push(point.location.coordinates)
      );
    }

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

    // Start the animation.
    this.animateMarkers(0);
  };

  //******************** Layers *************************//

  updateLayers = (layers) => {
    layers.forEach((l) => {
      if (this.map.getLayer(l.meta.name)) {
        this.map.removeLayer(l.meta.name);
        this.map.removeSource(l.meta.name);
      }
      if (l.meta.display) {

        if (l.meta.vector) {
          // map.addSource()
          // TODO
        } else {
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
    });
  };


  //******************** component life cycle *************************//

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [-62, 15],
      zoom: 6
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


  componentWillReceiveProps(newProps) {
    // Layers

    if (this.state.mapLoaded && (this.props.layers !== newProps.layers)) {
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

    // Selected plane changes

    if (newProps.selectedPlane !== this.props.selectedPlane) {
      let planeSource = this.map.getSource('plane_source_id');
      if (planeSource) {
        planeSource.setData({
            "type": "FeatureCollection",
            "features": this.computePlaneFeature(newProps.selectedPlane)
          }
        );
      }
      this.unselectMarkerOnMap();
      this.selectMarkerOnMap(newProps.selectedPlane);
    }
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el}/>
    );
  }

}


export default injectIntl(Map);




