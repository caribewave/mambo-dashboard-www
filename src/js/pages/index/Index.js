import React, {Component} from 'react';
import {Header} from '../../partials/components';
import {connect} from 'react-redux';
import '../../../stylesheets/main.scss';


class Index extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
      <Header/>
      <div id="main" className="main-container">
        {this.props.children}
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.router.location,
    errorMessage: state.profile
  };
};

export default connect(mapStateToProps)(Index)
