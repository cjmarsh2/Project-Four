import React from "react";
import "./AboutPage.css";
import Container from "react-bootstrap/Container";

const AboutPage = props => {
  return (
    <Container className="AboutPage">
      <h1 className="AboutPage-title">About Killing Time</h1>
      <p className="AboutPage-content">Curious about the criminal mind? <br/>Sick of scrolling through social media only to see the exact same content over and over? <br/> <br/> Then you have come to the right, albiet dangerous, place. <br/> Killing Time is a new way to kill time, while learning about your favorite true crime. <br/>Enter at your own peril. </p>
    </Container>
  );
};

export default AboutPage;
