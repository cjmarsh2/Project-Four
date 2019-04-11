import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage"
import crimesService from "../../utils/crimesService";
import ProfilePage from "../ProfilePage/ProfilePage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      crimes: [],
      randomPerp: null,
    };
  }

  genCrime =() => {
    let crimeList = this.state.crimes;
    let randomPerp = crimeList[Math.floor(Math.random()*crimeList.length)];
    this.setState({randomPerp: randomPerp});
    return randomPerp;
  }

  removeCurrentPerp = () => {
    let crimeList = this.state.crimes;
    let updatedCrimeList = crimeList.filter((perp) => {
      return perp !== this.state.randomPerp
    })
    this.setState({ crimes: updatedCrimeList})
    this.genCrime();
    console.log(updatedCrimeList)
  }

  addCurrentPerp = async () => {
    let res = await userService.createList({randomPerp: this.state.randomPerp}, this.state.user._id)
    this.setState({user:{...this.state.user, crimes:res.crimes}})
    this.removeCurrentPerp();
    this.genCrime();
  }


  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
    let user = this.state.user;
    console.log(user)
  };

  async componentDidMount() {
    const crimes = await crimesService.index();
    const user = userService.getUser();
    console.log(user);
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
                randomPerp={this.state.randomPerp}
                genCrime={this.genCrime}
                removeCurrentPerp={this.removeCurrentPerp}
                addCurrentPerp={this.addCurrentPerp}/>
              </>
          )}/>
          <Route exact path="/profile" render={() => (
            <>
              <ProfilePage 
                user={this.state.user}
              />
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
