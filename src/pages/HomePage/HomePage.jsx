import React, { Component } from 'react';
import crimesService from "../../utils/crimesService";

class HomePage extends Component {
  
  async componentDidMount() {
    await crimesService.index();
    await this.props.genCrime();
  }
  render() {
    return (
      <div className="HomePage">
        <button onClick={this.props.removeCurrentPerp}>X</button>
        <button onClick={this.props.addCurrentPerp}>Y</button>
        {this.props.randomPerp ? (
          <div>{this.props.randomPerp.name}</div>
        ) : (
          <p>All crimes have been viewed!</p>
        )}
      </div>
    );
  }
}

export default HomePage;
