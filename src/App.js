import React, {Component} from 'react';
import {Provider} from "react-redux";
import {store, history} from "./store/store";
import {Redirect, Route} from "react-router";
import {ConnectedRouter} from 'react-router-redux';
import ConnectedHomePage from "./containers/ConnectedHomePage";
import ConnectedEditPage from "./containers/ConnectedEditPage";
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Redirect from='/' to='/category/0'/>
            <Route exact path="/category/:categoryId" component={ConnectedHomePage}/>
            <Route path="/category/:categoryId/task/:taskId/edit" component={ConnectedEditPage}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
