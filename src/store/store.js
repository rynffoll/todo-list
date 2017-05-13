import reducers from '../reducers';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {createLogger} from "redux-logger";
import undoable from 'redux-undo';

export const history = createHistory();

export const store = createStore(
  combineReducers({
    categories: undoable(reducers.categories),
    tasks: undoable(reducers.tasks),
    routing: routerReducer
  }),
  applyMiddleware(
    createLogger(),
    routerMiddleware(history)
  )
);
