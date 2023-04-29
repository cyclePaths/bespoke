import React, { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppProps } from './App';
import {
  Box,
  CssBaseline,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CloudIcon from '@mui/icons-material/Cloud';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export interface NavbarProps {
  appPropsObj: AppProps;
}

const Navbar = ({ appPropsObj }: NavbarProps) => {
  const [value, setValue] = useState<number>(0);

  return (
    <div>
      <div>
        <Link style={{ fontSize: '50px' }} to='/home'>
          Bespoke
        </Link>
      </div>
      <div
        id='navbar'
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          // style={{ backgroundColor: '#25acda' }}
        >
          <BottomNavigationAction
            label='Navigate'
            style={{ minWidth: '0px' }}
            icon={<PlaceIcon />}
            component={Link}
            to='/bikeRoutes'
          />
          <BottomNavigationAction
            label='Weather'
            style={{ minWidth: '0px' }}
            icon={<CloudIcon />}
            component={Link}
            to='/weather'
          />
          <BottomNavigationAction
            label='Report'
            style={{ minWidth: '0px' }}
            icon={<ReportProblemIcon />}
            component={Link}
            to='/createReport'
          />
          <BottomNavigationAction
            label='Bulletin'
            style={{ minWidth: '0px' }}
            icon={<FormatListBulletedIcon />}
            component={Link}
            to='/bulletinBoard'
          />
          <BottomNavigationAction
            label='Profile'
            style={{ minWidth: '0px' }}
            icon={<AccountCircleIcon />}
            component={Link}
            to='/profile'
          />
        </BottomNavigation>
      </div>
      <Outlet />
      {/* <nav>
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
                <Link to='/bikeRoutes'>Create Route</Link>
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
              <li style={{ margin: '0 10px' }}>
                <Link to='/directMessages'>Messages</Link>
              </li>
            </ul>
          </div>
        </div>
        <Outlet />
      </nav> */}
    </div>
  );
};

export default Navbar;
