import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import StylePicker from '../containers/StylePicker';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './HomePage.scss';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Map style={this.props.selectedStyle && this.props.selectedStyle.url}/>
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
