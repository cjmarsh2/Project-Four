import React, { Component } from "react";
import { Link } from "react-router-dom";
import FavPerp from "../../components/FavPerp/FavPerp";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import "./ProfilePage.css";

class ProfilePage extends Component {
  async componentDidMount() {
    await this.props.handleUpdateUser();
  }

  render() {
    let favPerp = this.props.user ? this.props.user.favPerp : null
    return (
      <div className="ProfilePage">
        {this.props.user && this.props.user.crimes ? (
          <Container>
            <Row>
              <Col sm={4}>
              <h3>{this.props.user.name}</h3>
              { favPerp && <FavPerp perp={favPerp}/>}
              </Col>
              <Col sm={8}>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Mugshot</th>
                      <th>Perpetrator Name</th>
                      <th>Offense</th>
                      <th />
                    </tr>
                  </thead>
                  {this.props.user.crimes.map((crime, idx) => (
                    <tbody key={idx}>
                      <tr>
                        <td>
                        <img className="Table-img" src={crime.img} alt="Mugshot"/>
                        </td>
                        <td>
                          <Link className="Table-link"
                            to="/criminal" onClick={() => this.props.getPerp(crime)}>{crime.name}
                          </Link>
                        </td>
                        <td>
                          <p>{crime.type}</p>
                        </td>
                        <td>
                          <button className="Delete-btn" onClick={this.props.handleDeletePerp} name={crime._id}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Col>
            </Row>
          </Container>
        ) : (
          <p>No Crimes Selected</p>
        )}
      </div>
    );
  }
}

export default ProfilePage;
