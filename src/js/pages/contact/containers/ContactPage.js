import React, {Component} from 'react';
import {NavLink} from 'react-router';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

import './ContactPage.scss';
import {Redirect, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

<Router basename="/contact"/>

class ContactPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadContact();
  }

  render() {
    return (
      <div id='contact-container'>
      Hello
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  aboutme: state.aboutme
});

export default withRouter(connect(mapStateToProps)(ContactPage))
