import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import HomePage from "../HomePage/HomePage"
import ProfilePage from "../ProfilePage/ProfilePage";
import CriminalPage from "../CriminalPage/CriminalPage";
import AboutPage from "../AboutPage/AboutPage";
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
  }

  addCurrentPerp = async () => {
    let res = await userService.createList({randomPerp: this.state.randomPerp}, this.state.user._id)
    this.setState({user:{...this.state.user, crimes:res.crimes}})
    this.removeCurrentPerp();
    this.genCrime();
  }

  handleUpdateUser = async () => {
    try {
      let userId = this.state.user._id;
      let user = await userService.getUserInfo(userId);
      this.setState({ user });

    } catch (err) {
      console.log(err);
    }
  }
  
  getPerp = async (crime) => {
    await this.setState({perp: crime});
  }
  
  handleDeletePerp = async (e) => {
    const deletePerp = e.target.name;
    let userId = this.state.user._id;
    await userService.deletePerp(deletePerp, userId).then( async () => {
      let user = await userService.getUserInfo(userId);
      this.setState({ user });
    })
  }

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
        <NavBar
            user={this.state.user} 
            handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path="/" render={() => (
            userService.getUser() ?
              <HomePage 
                crimes={this.state.crimes} 
                randomPerp={this.state.randomPerp}
                genCrime={this.genCrime}
                removeCurrentPerp={this.removeCurrentPerp}
                addCurrentPerp={this.addCurrentPerp}/>
              :
              <AboutPage />
          )}/>
          <Route exact path="/profile" render={() => (
              userService.getUser() ?
              <ProfilePage 
                handleUpdateUser={this.handleUpdateUser}
                handleDeletePerp={this.handleDeletePerp}
                getPerp={this.getPerp}
                user={this.state.user}
              />
              :
              <Redirect to='/login'/>
          )}/>
          <Route exact path="/criminal" render={() => (
              userService.getUser() ?
              <CriminalPage 
              perp={this.state.perp}
              />
              :
              <Redirect to='/login'/>
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
        <footer className="App-footer">
          <div>All Rights Reserved, &copy; 2019 </div>
        </footer>
      </div>
    );
  }
}

export default App;
