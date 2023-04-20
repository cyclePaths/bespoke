import React, { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppProps } from './App';

export interface NavbarProps {
  appPropsObj: AppProps;
}

const Navbar = ({ appPropsObj }: NavbarProps) => {
  return (
    <div>
      <div>
        <Link to='/something'>Logo image link here</Link>
      </div>

      <nav>
        <div>NavbarNavbarNavbar</div>

        <div
          id='navbar'
          style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
            }}
          >
            <ul
              style={{
                display: 'flex',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              <li style={{ margin: '0 10px' }}>
                <Link to='/home'>Home</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to='/bikeRoutes'>Create Routes</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to='/createReport'>Create Report</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to='/bulletinBoard'>bulletinBoard</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to='/profile'>Profile</Link>
              </li>
            </ul>
          </div>
        </div>
        <Outlet />
      </nav>
    </div>
  );
};

export default Navbar;
