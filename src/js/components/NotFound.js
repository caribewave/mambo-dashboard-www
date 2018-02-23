import React, {Component} from 'react';
import {FormattedMessage, defineMessages} from 'react-intl';

const messages = defineMessages({
  msgError404: {
    id: 'msg.error-404',
    defaultMessage: '404 - Page not found'
  }
});

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div><FormattedMessage {...messages.msgError404}/></div>
    )
  }
}


export default NotFound