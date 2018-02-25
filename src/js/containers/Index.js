import React, {Component} from 'react';
import {HeaderPartial} from '../partials/containers/index';
import {connect} from 'react-redux';
import '../../stylesheets/main.scss';


class Index extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
      <HeaderPartial/>
      <div id="main" className="main-container">
        {this.props.children}
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    errorMessage: state.profile,
  };
};

export default connect(mapStateToProps)(Index)
