import React, {Component} from 'react';
import './Footer.scss';
import PropTypes from 'prop-types';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';


const messages = defineMessages({
  lblWelcome: {
    id: 'lbl.welcome',
    defaultMessage: 'Welcome'
  },
  lblIntroduction: {
    id: 'lbl.introduction',
    defaultMessage: 'Introduction'
  }
});

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }


  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
        <footer id='footer'>Copyright © 2018 From Resourcepool with Love.</footer>
      );
  }
}

// TypeChecking for properties
Footer.propTypes = {
  text: PropTypes.string
};

export default injectIntl(Footer);
