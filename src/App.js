import React, {Component} from 'react';
import {Provider} from "react-redux";
import {store, history} from "./store/store";
import {Redirect, Route} from "react-router";
import {ConnectedRouter} from 'react-router-redux';
import ConnectedHomePage from "./containers/ConnectedHomePage";
import {MuiThemeProvider} from "material-ui/styles";
import EditPage from "./components/EditPage";
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <div className="App">
              <Redirect from='/' to='/category/0' />
              <Route exact path="/category/:categoryId" component={ConnectedHomePage}/>
              <Route path="/category/:categoryId/task/:taskId/edit" component={EditPage}/>
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
