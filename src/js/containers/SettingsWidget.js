import React, {Component} from 'react';
import SettingsMenu from '../components/SettingsMenu';
import {NavLink} from 'react-router';
import {connect} from 'react-redux';
import registration from '../pages/registration';

class SettingsWidget extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(value) {
    console.log('Click on ' + value);
    var self = this;
    switch (value) {
      case 'logout':
        break;
    }
  }

  render() {
    return (
        <SettingsMenu onClick={this.onClick}/>
    )
  }
}

SettingsWidget.contextTypes = {
  router: React.PropTypes.object
};


const mapStateToProps = (state, ownProps) => ({
  onClick: ownProps.onClick
});

export default connect(mapStateToProps, {authenticate: registration.actions.authenticate, setCredentials: registration.actions.setCredentials})(SettingsWidget)