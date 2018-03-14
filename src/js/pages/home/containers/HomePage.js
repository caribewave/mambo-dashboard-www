import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import StylePicker from '../containers/StylePicker';
import SensorManager from '../containers/SensorManager';
import PlaneDetail from '../containers/PlaneDetail';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './HomePage.scss';
import {loadPlaneDetail, loadPlanesAsync} from "../../../actions/mapData";
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
    console.log("move");
    //if not all the current map is contained in the trigger box we reload data
    if (!contain(this.props.loadedBox, currentBoundingBox)) {
      console.log("refresh not contained");
      this.props.loadPlanesAsync(enlarge(currentBoundingBox, 2));
    }
  };

  onPlaneSelected = (planeId) => {
    this.props.loadPlaneDetail(planeId);
  };

  render() {
    return (
      <div>
        <div id="map-container">
          <Map layers={this.props.layers} planes={this.props.planes} selectedPlane={this.props.selectedPlane}
               onMapPositionChanged={this.onMapPositionChanged} onPlaneSelected={this.onPlaneSelected}/>
        </div>
        <StylePicker/>
        <SensorManager/>
        {this.props.selectedPlane ? <PlaneDetail/> : null}
      </div>
    );
  }

  timerRefresh = () => {
    this.props.loadPlanesAsync(this.props.loadedBox);
  };

}

const mapStateToProps = (state, ownProps) => {
  return ({
    layers: state.style.layers,
    planes: state.mapData.planes,
    selectedPlane: state.mapData.selectedPlane,
    loadedBox: state.mapData.loadedBox,
  });
};

const actions = {loadPlanesAsync, loadPlaneDetail};

export default withRouter(connect(mapStateToProps, actions)(HomePage))
