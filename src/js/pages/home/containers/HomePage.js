import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import LayerSettingsDialog from '../../layers/LayerSettingsDialog';
import SensorManager from '../containers/SensorManager';
import PlaneDetail from '../containers/PlaneDetail';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './HomePage.scss';
import {loadPlaneDetail, loadFeaturesAsync} from "../../../actions/mapData";
import {contain, enlarge} from './utils/boxUtils'

class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timer = setInterval(this.timerRefresh, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onMapPositionChanged = (newPosition) => {
    const currentBoundingBox = newPosition.bounds;
    //if not all the current map is contained in the trigger box we reload data
    if (!contain(this.props.loadedBox, currentBoundingBox)) {
      this.props.loadFeaturesAsync(enlarge(currentBoundingBox, 2));
    }
  };

  onGeomSelected = (planeId, geomStyle) => {
    switch (geomStyle) {
      case "plane" :
        this.props.loadPlaneDetail(planeId);
        break;

      case "boat" :
        //todo load boat detail
        console.log("on boatclcik");
        break;
    }
  };

  render() {
    return (
      <div>
        <div id="map-container">
          <Map layers={this.props.layers} features={this.props.features} selectedGeom={this.props.selectedGeom}
               onMapPositionChanged={this.onMapPositionChanged} onGeomSelected={this.onGeomSelected}/>
        </div>
        <LayerSettingsDialog/>
        <SensorManager/>
        {this.props.selectedGeom ? <PlaneDetail/> : null}
      </div>
    );
  }

  timerRefresh = () => {
    this.props.loadFeaturesAsync(this.props.loadedBox);
    if (this.props.selectedGeom) {
      console.log("selected plane");
      this.props.loadPlaneDetail(this.props.selectedGeom.data[0].hex);
    }
  };

}

const mapStateToProps = (state, ownProps) => {
  return ({
    layers: state.style.layers,
    features: state.mapData.features,
    selectedGeom: state.mapData.selectedGeom,
    loadedBox: state.mapData.loadedBox,
  });
};

const actions = {loadFeaturesAsync: loadFeaturesAsync, loadPlaneDetail};

export default withRouter(connect(mapStateToProps, actions)(HomePage))
