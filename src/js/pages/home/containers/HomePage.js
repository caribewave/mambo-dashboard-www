import React, {Component} from 'react';
import {NavLink} from 'react-router';
import Map from '../components/Map';
import StylePicker from '../containers/StylePicker';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './HomePage.scss';
import {loadPointAsync} from "../../../actions/point.actions";



class HomePage extends Component {

  componentDidMount(){
      this.props.loadPointAsync();
  }

  render() {
    return (
      <div>
        <Map style_url={this.props.selectedStyle && this.props.selectedStyle.url} points={this.props.points.point}/>
        <StylePicker/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    selectedStyle: state.style.selectedStyle,
    points : state.point
  });
};

const actions = {loadPointAsync};

export default withRouter(connect(mapStateToProps, actions)(HomePage))
