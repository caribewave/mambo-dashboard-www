import React, {Component} from 'react';
import { injectIntl} from 'react-intl';
import Menu from '../menu/Menu';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <header id='header'>
          <Menu/>
        </header>
    );
  }
}

export default injectIntl(Header);
