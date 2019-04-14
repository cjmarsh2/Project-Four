import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css';

const NavBar = (props) => {
    let nav = props.user ?
      <Navbar className="Navbar">
        <Link to='' className="Logo">Killing Time</Link>
        <Nav className="justify-content-end">
          <Nav.Item>
            <Link to='' className="Link">Find Crimes</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/profile' className="Link">My Crimes</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='' className="Link" onClick={props.handleLogout}>Log Out</Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      :
      <Navbar className="Navbar">
        <Link to='' className="Logo">Killing Time</Link>
        <Link to='/login' className="Link">LOG IN</Link>
        <Link to='/signup' className="Link">SIGN UP</Link>
      </Navbar>;
  
    return (
      <div>
        {nav}
      </div>
    );
  };
  
  export default NavBar;