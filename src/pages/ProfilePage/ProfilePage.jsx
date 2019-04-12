import React, { Component } from "react";
import { Link } from 'react-router-dom';

class ProfilePage extends Component {
  async componentDidMount() {
    await this.props.handleUpdateUser();
  }

  render() {
    return (
      <div className="ProfilePage">
          {this.props.user && this.props.user.user && this.props.user.user.crimes ? 
        <div>
           <div>{this.props.user.user.name}</div> 
           <div>
               {this.props.user.user.crimes.map((crime, idx) => (
                    <div key={idx}>
                    <Link to='/criminal' onClick={()=> this.props.getPerp(crime)}>{crime.name}</Link>
                    <p>{crime.type}</p>
                    <button name={crime._id}>Delete</button>
                    </div>
                ))}
           </div>
        </div>
        :
        <p>No Crimes Selected</p>}
        {/* {profile} */}
        {/* {this.props.user && this.props.user.user && this.props.user.user.crimes 
        //   ? 
        //   this.props.user.user.crimes.map((crime, idx) => (
        //       <div key={idx}>
        //       <Link to='/criminal' onClick={()=> this.props.getPerp(crime)}>{crime.name}</Link>
        //         <p>{crime.type}</p>
        //         <button name={crime._id}>Delete</button>
        //       </div>
        //     ))
        //   : "nothing"}
        */}
      </div>
    );
  }
}

export default ProfilePage;
