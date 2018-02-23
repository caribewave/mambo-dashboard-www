import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';
import api from '../client/api';
import {addLocaleData} from 'react-intl';
import merge from 'lodash.merge';
import en from 'react-intl/locale-data/en';
import enLocaleData from '../i18n/en';
// i18n
addLocaleData([...en]);

const configureStore = preloadedState => {
  const reducers = rootReducer;
  const store = createStore(
      reducers,
      merge(preloadedState, {intl: enLocaleData}),
      compose(
          applyMiddleware(thunk, api, createLogger()),
          DevTools.instrument()
      )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
};

export default configureStore;
