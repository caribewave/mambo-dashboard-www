import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import StylePicker from '../containers/StylePicker';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './HomePage.scss';
import {loadPlanesAsync} from "../../../actions/mapData";


class HomePage extends Component {

  componentDidMount() {
    this.props.loadPointAsync();
  }

  onMapPositionChanged = (newPosition) => {
    // console.log(newPosition);
  };

  render() {
    return (
      <div id="home-container">
        <div id="map-container">
          <Map style={this.props.selectedStyle} planes={this.props.planes}
               onMapPositionChanged={this.onMapPositionChanged}/>
        </div>
        <div id="overlay-container">
          <StylePicker/>
        </div>
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

const actions = {loadPointAsync: loadPlanesAsync};

export default withRouter(connect(mapStateToProps, actions)(HomePage))
