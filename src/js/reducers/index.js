import { combineReducers } from 'redux';
// Library Reducers
import { routerReducer } from 'react-router-redux';
// Own Reducers
import styleReducer from './style';
import pointReducer from './map';

// i18n
import { intlReducer as intl } from 'react-intl-redux';

const reducers = combineReducers({
    intl: intl,
    router: routerReducer,
    point:pointReducer,
    style: styleReducer
});

export default reducers;
