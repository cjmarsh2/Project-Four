import React, { Component } from "react";

class ProfilePage extends Component {
  async componentDidMount() {
    await this.props.handleUpdateUser();
    console.log("this is the Yay user: ", this.props.user);
  }

  render() {
    return (
      <div className="ProfilePage">
        {this.props.user && this.props.user.user && this.props.user.user.crimes
          ? this.props.user.user.crimes.map((crime, idx) => (
              <div key={idx}>
                <p>{crime.name}</p>
                <p>{crime.type}</p>
              </div>
            ))
          : "nothing"}
      </div>
    );
  }
}

export default ProfilePage;
