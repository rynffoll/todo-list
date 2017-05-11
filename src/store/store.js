import reducers from '../reducers';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {createLogger} from "redux-logger";

const initialState = {
  tasks: {
    items: [
      {id: 0, title: "Task0", content: "Taks0 Content", done: false, category: 0},
      {id: 1, title: "Task1", content: "Taks1 Content", done: true, category: 0},
      {id: 2, title: "Task2", content: "Taks2 Content", done: false, category: 0},
      {id: 3, title: "Task3", content: "Taks3 Content", done: false, category: 1},
      {id: 4, title: "Task4", content: "Taks4 Content", done: false, category: 1},
    ]
  },
  categories: {
    roots: [0],
    items: [
      {id: 0, title: "Category0", childs: [1, 2, 3]},
      {id: 1, title: "Category1", childs: []},
      {id: 2, title: "Category2", childs: [4]},
      {id: 3, title: "Category3"},
      {id: 4, title: "Category4", childs: [5, 6]},
      {id: 5, title: "Category5"},
      {id: 6, title: "Category6"},
    ]
  },
  search: {
    done: false,
    query: ""
  }
};

export const history = createHistory();

export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  initialState,
  applyMiddleware(
    createLogger(),
    routerMiddleware(history)
  )
);
