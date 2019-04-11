import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
    let nav = props.user ?
      <div className="Navbar">
        <span className="Welcome">Welcome, {props.user.name}</span>
        <Link to='/profile' className="Link">Crimes</Link>
        <Link to='' className="Link" onClick={props.handleLogout}>LOG OUT</Link>
      </div>
      :
      <div className="Navbar">
        <Link to='/login' className="Link">LOG IN</Link>
        <Link to='/signup' className="Link">SIGN UP</Link>
      </div>;
  
    return (
      <div className="Navbar">
        {nav}
      </div>
    );
  };
  
  export default NavBar;