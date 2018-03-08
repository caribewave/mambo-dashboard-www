import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import StylePicker from '../containers/StylePicker';
import PlaneDetail from '../containers/PlaneDetail';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './HomePage.scss';
import {loadPlanesAsync, selectPlane} from "../../../actions/mapData";


class HomePage extends Component {

  componentDidMount() {
    this.props.loadPlanesAsync();
  }

  onMapPositionChanged = (newPosition) => {
    // console.log(newPosition);
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
        <PlaneDetail/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    selectedStyle: state.style.selectedStyle,
    planes: state.mapData.planes
  });
};

const actions = {loadPlanesAsync, selectPlane};

export default withRouter(connect(mapStateToProps, actions)(HomePage))
