import React, {Component} from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Menu from './Menu';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <header id='header'>
          <Menu/>
          <div id='header-meta-container'>
            <div id='metadata'>
              <Avatar
                  src="images/profile-default.png"
                  className="avatar"/>
              <div className="name">{this.props.metadata.firstName} {this.props.metadata.lastName}</div>
              <div className="catchline">{this.props.metadata.catchline}</div>
            </div>
          </div>
        </header>
    );
  }
}

// TypeChecking for properties
Header.propTypes = {
  text: PropTypes.string
};

export default injectIntl(Header);
