import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl-redux';
import {Redirect, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

// Page Components
import aboutme from '../pages/home';

const Root = ({store}) => (
    <Provider store={store}>
      <Router>
        <IntlProvider>
          <div>
            <Switch>
              <Redirect path="*" to="/home" />
              <Route path="/home" component={aboutme.components.HomePage} />
            </Switch>
          </div>
        </IntlProvider>
      </Router>
    </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
