import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Home from '../components/Home';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {loadHome} from '../actions';
import './HomePage.scss';
import {Redirect, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

<Router basename="/aboutme"/>

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadAboutMe();
  }

  render() {
    return this.props.aboutme ? (
        <Home text={this.props.aboutme.text}/>
    ) : (
      <div id='aboutme-container'>
      Loading // FIXME
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  aboutme: state.aboutme
});

export default withRouter(connect(mapStateToProps, {loadAboutMe: loadHome})(HomePage))
