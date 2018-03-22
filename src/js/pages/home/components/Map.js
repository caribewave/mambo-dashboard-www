import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import mapboxgl from 'mapbox-gl';
import {PROPS_FEATURES, PROPS_TYPE_STYLE, PROPS_SELECTED_GEOM} from "../constants";
import './Map.scss';
import 'mapbox-gl-css';


class Map extends Component {

  static propTypes = {
    layers: PropTypes.arrayOf(PROPS_TYPE_STYLE),
    features: PROPS_FEATURES,
    selectedGeom: PROPS_SELECTED_GEOM,
    onMapPositionChanged: PropTypes.func,
    onGeomSelected: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      features: []
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

  mapPlanesFromApi = (planesDto) => {
    const planes = [];
    planesDto.forEach((planeDto) => {
      planes.push(this.mapPlaneFromApi(planeDto));
    });
    return planes;
  };

  mapPlaneFromApi = (plane) => {
    let poiState = {};
    poiState.id = plane._id;
    poiState.type = "plane";
    poiState.speed = plane.lastSpeed;
    poiState.heading = plane.direction;
    poiState.lng = plane.coordinates[0].value[0];
    poiState.lat = plane.coordinates[0].value[1];
    poiState.lastUpdateTime = plane.coordinates[0].time;
    return poiState;
  };

  mapBoatsFromApi = (boatsDto) => {
    const boats = [];
    boatsDto.forEach((boatDto) => {
      boats.push(this.mapBoatFromApi(boatDto));
    });
    return boats;
  };

  mapBoatFromApi = (boat) => {
    let poiState = {};
    poiState.id = boat._id;
    poiState.type = "boat";
    poiState.speed = boat.lastSpeed;
    poiState.heading = boat.direction;
    poiState.lng = boat.location.coordinates[0] + 0.01;
    poiState.lat = boat.location.coordinates[1]+ 0.01;
    poiState.lastUpdateTime = boat.time;
    console.log("boats");
    return poiState;
  };


  getIcon = (geomState) => {
    let isSelected = this.props.selectedGeom
      && this.props.selectedGeom.type === geomState.type
      && this.props.selectedGeom.data[0] && this.props.selectedGeom.data[0].id === geomState.id;

    return this.getIcon(geomState.type, isSelected);
  };

  getIcon = (type, isSelected) => {

    switch (type) {
      case "plane":
        return isSelected ? 'url(\'images/icon_plane_generic_accentColors.svg\')' : 'url(\'images/icon_plane_generic_primaryColors.svg\')';

      case "boat":
        //todo find a svg for the selected plane
        return isSelected ? 'url(\'images/icon_boat_generic.svg\')' : 'url(\'images/icon_boat_generic.svg\')';
    }
  };

  //********************         Points        *************************//


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

  mergeFeatures = (map, currentFeatures, distantFeatures) => {
    let updatedFeatures = [];

    //we loop on feature for now just planes and boats
    distantFeatures.forEach((feature) => {
      const updatedGeoms = [];
      //we loop on every geometry like a plane, a boat
      feature.geoms.forEach((geom) => {
        const previousGeomState = this.findGeomState(currentFeatures, geom.id, feature.type);
        if (previousGeomState) {
          // The geometry (ex: a plane) was already here. Update its position and content.
          this.updateGeomState(previousGeomState, geom);
          updatedGeoms.push(previousGeomState);
        } else {
          // The geometry is new. Add it on map.
          this.addPoiOnMap(map, geom);
          updatedGeoms.push(geom);
        }
      });

      updatedFeatures.push({type: feature.tyoe, geoms: updatedGeoms});

      this.removeOldGeoms(feature.geoms, updatedGeoms);
    });

    return updatedFeatures;
  };

  findGeomState = (features, id, type) => {
    let found = null;
    if (features) {
      features.forEach((feature) => {
        if (feature.type === type) {
          feature.geoms.forEach((geom) => {
            if (geom.id === id) {
              found = d;
            }
          });
        }
      });
    }
    return found;
  };

  removeOldGeoms = (oldGeomStates, updatedGeomState) => {
    Array.prototype.diff = function (a) {
      return this.filter(function (i) {
        return a.indexOf(i) < 0;
      });
    };

    let toRemove = oldGeomStates.diff(updatedGeomState);
    toRemove.forEach((poiState) => {
      poiState.marker.remove();
    });
  };


  updateGeomState = (previousGeomState, geomState) => {
    previousGeomState.speed = geomState.speed;
    previousGeomState.heading = geomState.heading;
    previousGeomState.lat = geomState.lat;
    previousGeomState.lng = geomState.lng;
    previousGeomState.lastUpdateTime = geomState.lastUpdateTime;

    previousGeomState.marker.setLngLat(new mapboxgl.LngLat(geomState.lng, geomState.lat));
    this.rotateMarker(previousGeomState.el.childNodes[0], geomState.heading);
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
  };

  animateMarkers = (timestamp) => {

    if (this.state.features) {
      this.state.features.forEach((feature) => {
        if (feature.geoms) {
          feature.geoms.forEach((geomState) => {
            let lastUpdatedDate = Date.parse(geomState.lastUpdateTime);
            const elapsedTime = (new Date()).getTime() - lastUpdatedDate;
            if ((elapsedTime / 1000) / 60 < 15) {
              geomState.marker.setLngLat(this.computeNextCoordinates(elapsedTime, geomState.speed, geomState.heading, geomState.lat, geomState.lng));
            }
          });
        }
      });
    }

    setTimeout(
      requestAnimationFrame((ts) => this.animateMarkers(ts)), 1000);
  };

  getMarkerOnMap = (geomState) => {
    let el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = this.getIcon(geomState.type);
    el.style.width = '48px';
    el.style.height = '48px';
    el.id = geomState.id;

    let tooltip = document.createElement('span');
    tooltip.className = 'tooltiptext';

    //todo improve the message in the toolbox dependig if boat or plane
    tooltip.appendChild(document.createTextNode(geomState.id));

    this.rotateMarker(el, geomState.heading);

    el.addEventListener('click', () => {
      this.props.onGeomSelected(geomState.id, geomState.type)
    });

    let parent = document.createElement('div');
    parent.className = "tooltip";
    parent.appendChild(el);
    parent.appendChild(tooltip);
    return parent;
  };

//********************         Lines        *************************//

  computePlaneFeature = (plane) => {
    let line = [];
    if (plane && plane.data) {
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
    this.map.addSource('line_source_id', {
      type: "geojson",
      data: {
        "type": "FeatureCollection",
        "features": this.computePlaneFeature(this.props.selectedGeom)
      }
    });

    this.map.addLayer({
      id: "line_way_layer_id",
      source: "line_source_id",
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

//********************      Markers       *************************//


  selectMarkerUI(selectedPlane) {
    // select the new icon
    if (selectedPlane) {
      let elementById = document.getElementById(selectedPlane.data[0].hex);
      if (elementById) {
        elementById.style.backgroundImage = this.getIcon("plane", true);
      }
    }
  }

  unselectMarkerUI() {// change the old marker image
    if (this.props.selectedGeom) {
      let elementById = document.getElementById(this.props.selectedGeom.data[0].hex);
      if (elementById) {
        elementById.style.backgroundImage = this.getIcon("plane", false);
      }
    }
  }


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

  componentWillReceiveProps(newProps) {

    if (this.state.mapLoaded && (this.props.layers !== newProps.layers)) {
      // New styles available
      this.updateLayers(newProps.layers);
    }

    // Planes (points)

    if (newProps.features !== this.props.features) {
      const distantFeatures = [];

      // we map all the distant data
      newProps.features.forEach((feature) => {
        if(feature.geoms) {
          switch (feature.type) {
            case "planes" :
              distantFeatures.push({
                type: "planes",
                geoms: this.mapPlanesFromApi(feature.geoms)
              });
              break;
            case "boats" :
              distantFeatures.push({
                type: "boats",
                geoms: this.mapBoatsFromApi(feature.geoms)
              });
              break;
          }
        }
      });

      // we manually update the content of the all elements draw on the map and put it back in the state.
      this.setState({features: this.mergeFeatures(this.map, this.state.features, distantFeatures)});
    }

    // selected plane changes
    if (newProps.selectedGeom !== this.props.selectedGeom) {
      let planeSource = this.map.getSource('line_source_id');
      if (planeSource) {
        planeSource.setData({
            "type": "FeatureCollection",
            "features": this.computePlaneFeature(newProps.selectedGeom)
          }
        );
      }

      this.unselectMarkerUI();
      this.selectMarkerUI(newProps.selectedGeom);
    }
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el}/>
    );
  }

}


export default injectIntl(Map);




