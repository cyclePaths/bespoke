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
        <Link style={{ fontSize: '50px' }} to='/home'>
          Bespoke
        </Link>
      </div>

      <nav>
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
                <Link to='/bikeRoutes'>Create Bike Route</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to='/createReport'>Create Report</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to='/weather'>Weather</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to='/bulletinBoard'>Bulletin Board</Link>
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
