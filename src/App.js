import React, {Component} from 'react';
import {Provider} from "react-redux";
import {store, history} from "./store/store";
import {Route} from "react-router";
import {ConnectedRouter} from 'react-router-redux';
import ConnectedHomePage from "./containers/ConnectedHomePage";
import ConnectedEditPage from "./containers/ConnectedEditPage";
import ConnectedUndoRedo from "./containers/ConnectedUndoRedo";
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <ConnectedUndoRedo/>
            <Route exact path="/" component={ConnectedHomePage}/>
            <Route exact path="/category/:categoryId" component={ConnectedHomePage}/>
            <Route exact path="/category/:categoryId/task/:taskId/edit" component={ConnectedEditPage}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
