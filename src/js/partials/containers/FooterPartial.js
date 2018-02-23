import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Footer from '../components/Footer';
import {connect} from 'react-redux';
import {loadMetadata} from '../actions';

class FooterPartial extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id='footer-container'>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  metadata: state.metadata
});

export default connect(mapStateToProps, {loadMetadata})(FooterPartial)
