import React, { Component } from 'react';
import crimesService from "../../utils/crimesService";

class HomePage extends Component {
  
  async componentDidMount() {
    await crimesService.index();
    await this.props.genCrime();
    console.log(this.props.randomKiller)
  }
  render() {
    return (
      <div className="HomePage">
        <button onClick={this.props.genCrime}>X</button>
        <button onClick={this.props.removeCurrentKiller}>Y</button>
        {this.props.randomKiller ? (
          <div>{this.props.randomKiller.name}</div>
        ) : (
          <p>choose a killer</p>
        )}
      </div>
    );
  }
}

export default HomePage;
