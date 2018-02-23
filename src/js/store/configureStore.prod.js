import {createStore, combineReducers, applyMiddleware} from 'redux';
import rootReducers from '../reducers';
import thunk from 'redux-thunk';
import api from '../client/api';
import {addLocaleData} from 'react-intl';
import merge from 'lodash.merge';
import en from 'react-intl/locale-data/en';
import enLocaleData from '../i18n/en';
// i18n
addLocaleData([...en]);

const reducers = rootReducers;

const configureStore = preloadedState => createStore(
    reducers,
    merge(preloadedState, {intl: enLocaleData}),
    applyMiddleware(thunk, api)
);

export default configureStore;