import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default {
  history: history,
  middleware: routerMiddleware(history)
}