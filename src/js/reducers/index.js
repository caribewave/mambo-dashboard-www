import { combineReducers } from 'redux';
// Library Reducers
import { routerReducer } from 'react-router-redux';
// Own Reducers
import styleReducer from './style';
import mapDataReducer from './mapData';

// i18n
import { intlReducer as intl } from 'react-intl-redux';

const reducers = combineReducers({
    intl : intl,
    router : routerReducer,
    mapData : mapDataReducer,
    style: styleReducer
});

export default reducers;
