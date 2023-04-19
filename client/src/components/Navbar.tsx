import React, { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppProps } from './App';

export interface NavbarProps {
  appPropsObj: AppProps;
}

const Navbar = ({ appPropsObj }: NavbarProps) => {
  return (
    <nav>
      <div>NavbarNavbarNavbar</div>
      <Link to='/something'>Logo image link here</Link>

      <div id='navbar'>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/routes'>Routes</Link>
          </li>
          <li>
            <Link to='/createReport'>Create Report</Link>
          </li>
          <li>
            <Link to='/bulletinBoard'>Bulletin Board</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/weather'>Weather</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </nav>
  );
};

export default Navbar;
