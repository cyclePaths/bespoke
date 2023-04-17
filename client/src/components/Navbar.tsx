
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {

  return (

    <nav>
      <div>NavbarNavbarNavbar</div>
    <Link to='/something'>
     Logo image link here
    </Link>

    <div id="navbar">
      <ul>
      <li>
          <Link to='/home'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/Andrew'>
            Andrew
          </Link>
        </li>
        <li>
          <Link to='/Ernest'>
            Ernest
          </Link>
        </li>
        <li>
          <Link to='/Brendan'>
            Brendan
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            Profile
          </Link>
        </li>
      </ul>
    </div>
   </nav>
  )

}


export default Navbar;
