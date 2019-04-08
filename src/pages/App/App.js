import React, { Component } from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Killing Time</header>
        <Switch>
          <Route exact path='/' render={() =>
          <h1>Hello World</h1>
          }/>
          <Route exact path='/signup' render={({ history }) =>
          <SignupPage
            history={history}
            />
        }/>
        </Switch>
      </div>
    );
  }
}

export default App;
