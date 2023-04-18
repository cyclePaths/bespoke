
import React, { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CreateReport from './Reports/CreateReport';


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
          <Link to='/createReport'>
            Create Report
          </Link>
        </li>
        <li>
          <Link to='/bulletinBoard'>
            bulletinBoard
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            Profile
          </Link>
        </li>
      </ul>
    </div>
    <Outlet/>
   </nav>
  )

}


export default Navbar;
