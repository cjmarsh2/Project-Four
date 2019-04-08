import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
    let nav = props.user ?
      <div className='nav-wrapper'>
        <Link to='' className='NavBar-link right' onClick={props.handleLogout}>LOG OUT</Link>
        <span className='NavBar-welcome'>WELCOME, {props.user.name}</span>
      </div>
      :
      <div>
        <Link to='/login' className='NavBar-link right'>LOG IN</Link>
        <Link to='/signup' className='NavBar-link right'>SIGN UP</Link>
      </div>;
  
    return (
      <div className='nav-wrapper'>
        {nav}
      </div>
    );
  };
  
  export default NavBar;