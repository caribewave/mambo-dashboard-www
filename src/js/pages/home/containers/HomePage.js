import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import StylePicker from '../containers/StylePicker';
import PlaneDetail from '../containers/PlaneDetail';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './HomePage.scss';
import {loadPlaneDetail, loadPlanesAsync} from "../../../actions/mapData";
import {contain, enlarge} from './utils/boxUtils'

class HomePage extends Component {

  componentDidMount() {
  }

  onMapPositionChanged = (newPosition) => {
    const currentBoundingBox = newPosition.bounds;
    //if not all the current map is contained in the trigger box we reload data
    if (!contain(this.props.loadedBox, currentBoundingBox)) {
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
        {this.props.selectedPlane ? <PlaneDetail/> : null}
      </div>
    );
  }
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
