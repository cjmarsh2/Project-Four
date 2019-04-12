import React, { Component } from "react";
import { Link } from 'react-router-dom';

class ProfilePage extends Component {
  async componentDidMount() {
    await this.props.handleUpdateUser();
  }

  render() {
    return (
      <div className="ProfilePage">
          {this.props.user && this.props.user.crimes ? 
        <div>
           <div>{this.props.user.name}</div> 
           <div>
               {this.props.user.crimes.map((crime, idx) => (
                    <div key={idx}>
                    <Link to='/criminal' onClick={()=> this.props.getPerp(crime)}>{crime.name}</Link>
                    <p>{crime.type}</p>
                    <button onClick={this.props.handleDeletePerp}name={crime._id}>Delete</button>
                    </div>
                ))}
           </div>
        </div>
        :
        <p>No Crimes Selected</p>}
      </div>
    );
  }
}

export default ProfilePage;
