import { combineReducers } from 'redux';
// Library Reducers
import { routerReducer } from 'react-router-redux';
// Own Reducers
import styleReducer from './style';
import mapDataReducer from './mapData';
import sensorReducer from './sensor';

// i18n
import { intlReducer as intl } from 'react-intl-redux';

const reducers = combineReducers({
    intl : intl,
    router : routerReducer,
    mapData : mapDataReducer,
    style: styleReducer,
    sensor: sensorReducer
});

export default reducers;
