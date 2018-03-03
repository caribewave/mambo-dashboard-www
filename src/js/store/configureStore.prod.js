import {applyMiddleware, compose, createStore} from 'redux';

import api from '../client/api';
import reducers from '../reducers';
import history from '../store/history';
import i18n from '../i18n/index';
import thunk from 'redux-thunk';


const configureStore = preloadedState => {

    const initialState = Object.assign({}, preloadedState, i18n);

    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(thunk, api, history.middleware)
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/reducers').default;
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
};

export default configureStore;
