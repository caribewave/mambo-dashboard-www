import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {loadMetadata} from '../actions';
import { withRouter } from 'react-router-dom'

class AboutMePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadMetadata();
  }

  render() {
    return this.props.metadata ? (
      <div id='metadata-container'>
        <Header metadata={this.props.metadata}/>
      </div>
    ) : (
      <div id='metadata-container'>
      Loading // FIXME
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  metadata: state.metadata
});

export default withRouter(connect(mapStateToProps, {loadMetadata})(AboutMePage))
