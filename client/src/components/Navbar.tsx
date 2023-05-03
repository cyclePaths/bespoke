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
  const [userProfilePic, setUserProfilePic] = useState<any>(
    <AccountCircleIcon />
  );
  // A bunch of watchers that change the colors of buttons on click //
  /// BOTTOM NAV ///
  const [navigate, setNavigate] = useState<boolean>(false);
  const [weather, setWeather] = useState<boolean>(false);
  const [report, setReport] = useState<boolean>(false);
  const [bulletin, setBulletin] = useState<boolean>(false);
  /// TOP NAV ///
  const [leaderBoard, setLeaderBoard] = useState<boolean>(false);
  const [openLeaderBoard, setOpenLeaderBoard] = useState<boolean>(false);
  const [messages, setMessages] = useState<boolean>(false);
  const [openStopWatch, setOpenStopWatch] = useState<boolean>(false);
  const [activeWatch, setActiveWatch] = useState<boolean>(false);

  // User Context //
  const { user } = useContext(UserContext);

  const handleLeaderBoard = () => {
    setOpenLeaderBoard(true);
    setLeaderBoard(true);
  };

  const clickHome = () => {
    setValue(null);
    setNavigate(false);
    setWeather(false);
    setReport(false);
    setBulletin(false);
    setMessages(false);
  };

  const toNav = () => {
    setNavigate(true);
    setWeather(false);
    setReport(false);
    setBulletin(false);
    setMessages(false);
  };

  const toWeather = () => {
    setNavigate(false);
    setWeather(true);
    setReport(false);
    setBulletin(false);
    setMessages(false);
  };

  const toReport = () => {
    setNavigate(false);
    setWeather(false);
    setReport(true);
    setBulletin(false);
    setMessages(false);
  };

  const toBulletin = () => {
    setNavigate(false);
    setWeather(false);
    setReport(false);
    setBulletin(true);
    setMessages(false);
  };

  const toProfile = () => {
    setNavigate(false);
    setWeather(false);
    setReport(false);
    setBulletin(false);
    setMessages(false);
  };

  const toMessages = () => {
    setValue(null);
    setMessages(true);
    setNavigate(false);
    setWeather(false);
    setReport(false);
    setBulletin(false);
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
          onClick={() => clickHome()}
        >
          Bespoke
        </Link>
        <span style={{ display: 'contents' }}>
          <IconButton onClick={() => handleLeaderBoard()}>
            <EmojiEventsIcon
              sx={{ color: leaderBoard ? '#ffff00' : '#757575' }}
            />
          </IconButton>
          <Link to='/directMessages'>
            <IconButton
              onClick={() => toMessages()}
              sx={{ color: messages ? '#673ab7' : '#757575' }}
            >
              <MessageIcon sx={{ color: messages ? '#673ab7' : '#757575' }} />
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
            height: '6.6vh',
            zIndex: 1000,
          }}
        >
          <BottomNavigationAction
            label='Navigate'
            style={{ minWidth: '0px', color: navigate ? '#f44336' : '#757575' }}
            icon={
              <PlaceIcon sx={{ color: navigate ? '#f44336' : '#757575' }} />
            }
            component={Link}
            onClick={() => toNav()}
            to='/bikeRoutes'
          />
          <BottomNavigationAction
            label='Weather'
            style={{ minWidth: '0px', color: weather ? 'black' : '#757575' }}
            icon={<CloudIcon sx={{ color: weather ? '#fafafa' : '#757575' }} />}
            component={Link}
            onClick={() => toWeather()}
            to='/weather'
          />
          <BottomNavigationAction
            label='Report'
            style={{ minWidth: '0px', color: report ? '#f9a825' : '#757575' }}
            icon={
              <ReportProblemIcon
                sx={{ color: report ? '#f9a825' : '#757575' }}
              />
            }
            component={Link}
            onClick={() => toReport()}
            to='/createReport'
          />
          <BottomNavigationAction
            label='Bulletin'
            style={{ minWidth: '0px', color: bulletin ? '#81c784' : '#757575' }}
            icon={
              <FormatListBulletedIcon
                sx={{ color: bulletin ? '#81c784' : '#757575' }}
              />
            }
            component={Link}
            onClick={() => toBulletin()}
            to='/bulletinBoard'
          />
          <BottomNavigationAction
            label='Profile'
            style={{ minWidth: '0px' }}
            icon={userProfilePic}
            component={Link}
            onClick={() => toProfile()}
            to='/profile'
          />
        </BottomNavigation>
      </div>
      <LeaderBoardPopout
        openLeaderBoard={openLeaderBoard}
        setOpenLeaderBoard={setOpenLeaderBoard}
        setLeaderBoard={setLeaderBoard}
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
