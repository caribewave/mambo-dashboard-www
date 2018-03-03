import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Header from './Header';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

class AboutMePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Header/>;
  }
}

const mapStateToProps = (state) => ({
});

export default withRouter(connect(mapStateToProps)(AboutMePage))
