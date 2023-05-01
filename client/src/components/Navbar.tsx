import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppProps } from './App';
import { UserContext } from '../Root';
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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MessageIcon from '@mui/icons-material/Message';
import TimerIcon from '@mui/icons-material/Timer';
import Stopwatch from './Profile/Stopwatch';
import LeaderBoardPopout from './LeaderBoard/LeaderBoardPopout';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import { NavBarTop } from '../StyledComp';
import DirectMessages from './DirectMessages/DirectMessages';

export interface NavbarProps {
  appPropsObj: AppProps;
}

const Navbar = ({ appPropsObj }: NavbarProps) => {
  const [value, setValue] = useState<any>(null);
  const [openLeaderBoard, setOpenLeaderBoard] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const [userProfilePic, setUserProfilePic] = useState<any>(
    <AccountCircleIcon />
  );
  const [openStopWatch, setOpenStopWatch] = useState<boolean>(false);
  const [activeWatch, setActiveWatch] = useState<boolean>(false);

  const handleLeaderBoard = () => {
    setOpenLeaderBoard(true);
  };

  useEffect(() => {
    if (user) {
      setUserProfilePic(<img src={user.thumbnail} id='profilePic' />);
    }
  }, [user]);

  return (
    <div>
      <NavBarTop>
        <Link
          style={{ fontSize: '35px' }}
          to='/home'
          onClick={() => setValue(null)}
        >
          Bespoke
        </Link>
        <span style={{ display: 'contents' }}>
          <IconButton onClick={() => handleLeaderBoard()}>
            <EmojiEventsIcon sx={{ color: '#ffff00' }} />
          </IconButton>
          <Link to='/directMessages'>
            <IconButton onClick={() => setValue(null)}>
              <MessageIcon sx={{ color: '#673ab7' }} />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => {
              if (openStopWatch) {
                setOpenStopWatch(false);
              } else {
                setOpenStopWatch(true);
              }
            }}
          >
            <TimerIcon sx={{ color: activeWatch ? '#d81b60' : '#757575' }} />
          </IconButton>
        </span>
      </NavBarTop>

      <div
        id='navbar'
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{
            backgroundColor: '#dadcda',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            zIndex: 1000,
          }}
        >
          <BottomNavigationAction
            label='Navigate'
            style={{ minWidth: '0px', color: '#f44336' }}
            icon={<PlaceIcon sx={{ color: '#f44336' }} />}
            component={Link}
            to='/bikeRoutes'
          />
          <BottomNavigationAction
            label='Weather'
            style={{ minWidth: '0px', color: 'black' }}
            icon={<CloudIcon sx={{ color: '#fafafa' }} />}
            component={Link}
            to='/weather'
          />
          <BottomNavigationAction
            label='Report'
            style={{ minWidth: '0px', color: '#f9a825' }}
            icon={<ReportProblemIcon sx={{ color: '#f9a825' }} />}
            component={Link}
            to='/createReport'
          />
          <BottomNavigationAction
            label='Bulletin'
            style={{ minWidth: '0px', color: '#81c784' }}
            icon={<FormatListBulletedIcon sx={{ color: '#81c784' }} />}
            component={Link}
            to='/bulletinBoard'
          />
          <BottomNavigationAction
            label='Profile'
            style={{ minWidth: '0px' }}
            icon={userProfilePic}
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
      <Stopwatch
        openStopWatch={openStopWatch}
        setActiveWatch={setActiveWatch}
      />
      <Outlet />
    </div>
  );
};

export default Navbar;
