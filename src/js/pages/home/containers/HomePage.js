import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import StylePicker from '../containers/StylePicker';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './HomePage.scss';
import {loadPointAsync} from "../../../actions/point.actions";


class HomePage extends Component {

  componentDidMount() {
    // this.props.loadPointAsync();
  }

  render() {
    return (
      <div id="home-container">
        <div id="map-container">
          <Map style={this.props.selectedStyle} points={this.props.points.point}/>
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
    points: state.point
  });
};

const actions = {loadPointAsync};

export default withRouter(connect(mapStateToProps, actions)(HomePage))
