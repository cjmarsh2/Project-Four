import React, { Component } from 'react';


class ProfilePage extends Component {

    async componentDidMount() {
        await this.props.handleUpdateUser();
        console.log("this is the Yay user: ", this.props.user)
    }


  render() {
    return (
      <div className="ProfilePage">
        <div>{this.props.user.name}</div>
      {this.props.user ?
         <div>{this.props.user.crimes.map((crime,idx) => (
          <div key={idx}>{crime}</div>
            ))}
        </div>
        :
        <div>no data to show</div>
    
        }
      </div>
    );
  }
}

export default ProfilePage;