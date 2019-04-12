import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import HomePage from "../HomePage/HomePage"
import ProfilePage from "../ProfilePage/ProfilePage";
import CriminalPage from "../CriminalPage/CriminalPage";
import NavBar from "../../components/NavBar/NavBar";
import userService from "../../utils/userService";
import crimesService from "../../utils/crimesService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      crimes: [],
      randomPerp: null,
      perp: null
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

  handleUpdateUser = async () => {
    let user = await userService.getUserInfo(this.state.user._id);
    this.setState({ user });
  }

  getPerp = async (crime) => {
    await this.setState({perp: crime});
    console.log(this.state.perp)
  }

  // handleDeleteCrime = (e) => {
  //   let crimeList = [...this.state.crimes];
  //   let index = crimeList.indexOf(e.target.name)
  //   if (index !== -1) {
  //     crimeList.splice(index, 1);
  //     this.setState({crimes: crimeList});
  //     console.log(crimeList)
  //   }
  // }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  async componentDidMount() {
    const user = userService.getUser();
    const crimes = await crimesService.index();
    this.setState({ user, crimes });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Killing Time</header>
        <NavBar
            user={this.state.user} 
            handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path="/" render={() => (
              <HomePage 
                crimes={this.state.crimes} 
                randomPerp={this.state.randomPerp}
                genCrime={this.genCrime}
                removeCurrentPerp={this.removeCurrentPerp}
                addCurrentPerp={this.addCurrentPerp}/>
          )}/>
          <Route exact path="/profile" render={() => (
            <>
              <ProfilePage 
                handleUpdateUser={this.handleUpdateUser}
                getPerp={this.getPerp}
                user={this.state.user}
              />
            </>
          )}/>
          <Route exact path="/criminal" render={() => (
            <>
              <CriminalPage 
              perp={this.state.perp}
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
