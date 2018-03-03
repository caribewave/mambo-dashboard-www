import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import StylePicker from '../containers/StylePicker';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './HomePage.scss';

const points = [
  {
    "lat": -0.018423,
    "lng": 51.473246
  },
  {
    "lat": -0.018819,
    "lng": 51.47334
  },
  {
    "lat": -0.019222,
    "lng": 51.47347
  },
  {
    "lat": -0.021195,
    "lng": 51.474258
  },
  {
    "lat": -0.02127,
    "lng": 51.474269
  },
  {
    "lat": -0.02153,
    "lng": 51.474258
  },
  {
    "lat": -0.021792,
    "lng": 51.474267
  },
  {
    "lat": -0.02278,
    "lng": 51.474391
  },
  {
    "lat": -0.022848,
    "lng": 51.474397
  },
  {
    "lat": -0.023231,
    "lng": 51.474495
  },
  {
    "lat": -0.02381,
    "lng": 51.474575
  },
  {
    "lat": -0.023894,
    "lng": 51.474601
  },
  {
    "lat": -0.024023,
    "lng": 51.474669
  },
  {
    "lat": -0.02403,
    "lng": 51.474703
  },
  {
    "lat": -0.023043,
    "lng": 51.47606
  },
  {
    "lat": -0.022916,
    "lng": 51.476241
  },
  {
    "lat": -0.022945,
    "lng": 51.476266
  },
  {
    "lat": -0.022956,
    "lng": 51.476323
  },
  {
    "lat": -0.022938,
    "lng": 51.476352
  },
  {
    "lat": -0.022826,
    "lng": 51.476395
  },
  {
    "lat": -0.022735,
    "lng": 51.476547
  },
  {
    "lat": -0.022643,
    "lng": 51.47675
  },
  {
    "lat": -0.022609,
    "lng": 51.476909
  },
  {
    "lat": -0.02264,
    "lng": 51.477274
  }];


class HomePage extends Component {
  render() {
    return (
      <div>
        <Map style_url={this.props.selectedStyle && this.props.selectedStyle.url} points={points}/>
        <StylePicker/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedStyle: state.style.selectedStyle
});

const actions = {};

export default withRouter(connect(mapStateToProps, actions)(HomePage))
