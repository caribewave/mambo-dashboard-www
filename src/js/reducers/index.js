import { combineReducers } from 'redux';
// Library Reducers
// FIXME when development is finished for router 4.0 import { routerReducer as routing } from 'react-router-redux';
import { intlReducer as intl } from 'react-intl-redux';
// Own Reducers
import style from './style.reducer';
import metadata from '../partials';

const reducers = combineReducers({
  // FIXME when development for router 4.0 is done routing: routing,
  intl,
  style,
  [metadata.constants.NAME]: metadata.reducer
});

export default reducers;
