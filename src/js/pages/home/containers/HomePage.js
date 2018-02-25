import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import StylePicker from '../containers/StylePicker';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {loadHome} from '../actions';
import './HomePage.scss';
import {Redirect, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

<Router basename="/home"/>

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadAboutMe();
  }

  render() {
    return this.props.aboutme ? (
      <div>
        <Map style={this.props.style}/>
        <StylePicker style={this.props.style}/>
      </div>
    ) : (
      <div id='aboutme-container'>
      Loading // FIXME
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  aboutme: state.aboutme,
  style: state.style
});

export default withRouter(connect(mapStateToProps, {loadAboutMe: loadHome})(HomePage))
