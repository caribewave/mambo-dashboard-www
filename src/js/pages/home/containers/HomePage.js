import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import StylePicker from '../containers/StylePicker';
import PlaneDetail from '../containers/PlaneDetail';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './HomePage.scss';
import {loadPlanesAsync, selectPlane} from "../../../actions/mapData";
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

  onPlaneSelected = (plane) => {
    this.props.selectPlane(plane);
  };

  render() {
    return (
      <div>
        <div id="map-container">
          <Map style={this.props.selectedStyle} planes={this.props.planes}
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
    selectedStyle: state.style.selectedStyle,
    planes: state.mapData.planes,
    selectedPlane: state.mapData.selectedPlane,
    loadedBox: state.mapData.loadedBox
  });
};

const actions = {loadPlanesAsync, selectPlane};

export default withRouter(connect(mapStateToProps, actions)(HomePage))
