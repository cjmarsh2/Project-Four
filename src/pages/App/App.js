import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage"
import crimesService from "../../utils/crimesService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      crimes: [],
      randomKiller: null
    };
  }

  genCrime =() => {
    let crimeList = this.state.crimes;
    let randomKiller = crimeList[Math.floor(Math.random()*crimeList.length)];
    this.setState({randomKiller: randomKiller});
    return randomKiller;
  }

  removeCurrentKiller = () => {
    let crimeList = this.state.crimes;
    let updatedCrimeList = crimeList.filter((killer) => {
      return killer !== this.state.randomKiller
    })
    this.setState({ crimes: updatedCrimeList})
    this.genCrime();
    console.log(updatedCrimeList)
  }


  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  async componentDidMount() {
    const crimes = await crimesService.index();
    const user = userService.getUser();
    this.setState({ user, crimes });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Killing Time</header>
        <Switch>
          <Route exact path="/" render={() => (
            <>
              <NavBar
                user={this.state.user} 
                handleLogout={this.handleLogout}
              />
              <HomePage 
              crimes={this.state.crimes} 
              randomKiller={this.state.randomKiller}
              genCrime={this.genCrime}
              removeCurrentKiller={this.removeCurrentKiller}/>
              </>
          )}/>
          <Route exact path="/signup" render={({ history }) => (
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
          )}/>
          <Route exact path="/login" render={({ history }) => (
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
