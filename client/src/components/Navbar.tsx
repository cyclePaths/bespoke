import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
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

const Navbar = () => {
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
  const [activity, setActivity] = useState('');
  const [activityValue, setActivityValue] = useState('');

  // User Context //
  const { user, isDark } = useContext(UserContext);

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
      <NavBarTop isDark={isDark}>
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
              sx={{ color: isDark ? (leaderBoard ? '#ffff00' : '#ececec') : (leaderBoard ? '#ffff00' : '#757575') }}
            />
          </IconButton>
          <Link to='/directMessages'>
            <IconButton
              onClick={() => toMessages()}
              sx={{ color: messages ? '#673ab7' : '#757575' }}
            >
              <MessageIcon sx={{ color: isDark ? (messages ? '#673ab7' : '#ececec') : (messages ? '#673ab7' : '#757575') }} />
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
            <TimerIcon sx={{ color: isDark ? (activeWatch ? '#d81b60' : '#ececec') : (activeWatch ? '#d81b60' : '#757575') }} />
          </IconButton>
        </span>
      </NavBarTop>

      <div
        id='navbar'
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{
            backgroundColor: isDark ? '#707070' : '#ececec',
            borderTop: `1px solid`,
            borderColor: isDark ? '#ececec' : 'black',
            height: '6.6vh',
            zIndex: 1000,
          }}
        >
          <BottomNavigationAction
            label='Navigate'
            style={{ minWidth: '0px', color: navigate ? '#f44336' : '#757575' }}
            icon={
              <PlaceIcon sx={{ color: isDark ? (navigate ? '#f44336' : '#ececec') : (navigate ? '#f44336' : '#757575') }} />
            }
            component={Link}
            onClick={() => toNav()}
            to='/bikeRoutes'
          />
          <BottomNavigationAction
            label='Weather'
            style={{ minWidth: '0px', color: isDark ? (weather ? '#fafafa' : '#757575') : (weather ? 'black' : '#757575') }}
            icon={<CloudIcon sx={{ color: isDark ? (weather ? '#fafafa' : '#ececec') : (weather ? '#fafafa' : '#757575') }} />}
            component={Link}
            onClick={() => toWeather()}
            to='/weather'
          />
          <BottomNavigationAction
            label='Report'
            style={{ minWidth: '0px', color: report ? '#f44336' : '#757575' }}
            icon={
              <ReportProblemIcon
                sx={{ color: isDark ? (report ? '#f44336' : '#ececec') : (report ? '#f44336' : '#757575') }}
              />
            }
            component={Link}
            onClick={() => toReport()}
            to='/reportsMap'
          />
          <BottomNavigationAction
            label='Bulletin'
            style={{ minWidth: '0px', color: bulletin ? '#7be795' : '#757575' }}
            icon={
              <FormatListBulletedIcon
                sx={{ color: isDark ? (bulletin ? '#7be795' : '#ececec') : (bulletin ? '#7be795' : '#757575') }}
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
        setOpenStopWatch={setOpenStopWatch}
        setActiveWatch={setActiveWatch}
        activity={activity}
        setActivity={setActivity}
        activityValue={activityValue}
        setActivityValue={setActivityValue}
      />
      <Outlet />
    </div>
  );
};

export default Navbar;
