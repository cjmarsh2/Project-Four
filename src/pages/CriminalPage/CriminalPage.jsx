import React from 'react';
import './CriminalPage.css';
import Container from 'react-bootstrap/Container';

const CriminalPage = (props) => {
    return (
      <div className="CriminalPage">
      <h1 className="Name">{props.perp.name}</h1>
      <img className="CriminalPage-img" src={props.perp.img} alt="Criminal"></img>
      <h3 className="Type">{props.perp.type}</h3>
      <div>{props.perp.born}</div>
      <div>{props.perp.death}</div>
      <Container className="Content">
      <div>{props.perp.content}</div>
      </Container>
      </div>
    );
  };
  
  export default CriminalPage;