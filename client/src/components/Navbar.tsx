import React, { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppProps } from './App';
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CloudIcon from '@mui/icons-material/Cloud';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MessageIcon from '@mui/icons-material/Message';
import TimerIcon from '@mui/icons-material/Timer';
import Stopwatch from './Stopwatch';
import LeaderBoardPopout from './LeaderBoard/LeaderBoardPopout';
import LeaderBoard from './LeaderBoard/LeaderBoard';

export interface NavbarProps {
  appPropsObj: AppProps;
}

const Navbar = ({ appPropsObj }: NavbarProps) => {
  const [value, setValue] = useState<number>(0);

  const [openLeaderBoard, setOpenLeaderBoard] = useState<boolean>(false);

  const handleLeaderBoard = () => {
    setOpenLeaderBoard(true);
  };

  return (
    <div>
      <div>
        <Link style={{ fontSize: '50px' }} to='/home'>
          Bespoke
        </Link>
        <div>
          <IconButton onClick={() => handleLeaderBoard()}>
            <LeaderboardIcon />
          </IconButton>
          {/* <Stopwatch /> */}
          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton>
            <TimerIcon />
          </IconButton>
        </div>
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
      <LeaderBoardPopout
        openLeaderBoard={openLeaderBoard}
        setOpenLeaderBoard={setOpenLeaderBoard}
      >
        <LeaderBoard />
      </LeaderBoardPopout>
      <Outlet />
    </div>
  );
};

export default Navbar;
