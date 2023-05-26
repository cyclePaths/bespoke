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
import MessageIcon from '@mui/icons-material/Message';
import TimerIcon from '@mui/icons-material/Timer';
import Stopwatch from './Profile/Stopwatch';
import { NavBarTop } from '../StyledComp';

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
  const [messages, setMessages] = useState<boolean>(false);
  const [openStopWatch, setOpenStopWatch] = useState<boolean>(false);
  const [activeWatch, setActiveWatch] = useState<boolean>(false);
  const [pauseWatch, setPauseWatch] = useState<boolean>(false);
  const [activity, setActivity] = useState('');
  const [activityValue, setActivityValue] = useState('');

  // User Context //
  const { user, isDark } = useContext(UserContext);

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

  let color;

  if (isDark) {
    color = '#ececec';
  } else {
    color = '#757575'
  }

if (activeWatch) {
  color = '#d81b60';
} else if (pauseWatch) {
  color = '#ff9800';
}

  return (
    <div>
      <NavBarTop isDark={isDark}>
        <Link
          to='/home'
          onClick={() => clickHome()}
          style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '50%',
          }}
        >
          <img
            src='https://res.cloudinary.com/dcecaxmxv/image/upload/v1684942437/nfajohsbfczwqlykn6jk.svg'
            alt='Bespoke Image'
            style={{
              width: '90%',
            }}
          />
        </Link>
        <span
          style={{
            display: 'flex',
            width: '45%',
            justifyContent: 'space-around',
          }}
        >
          <Link to='/directMessages'>
            <IconButton
              onClick={() => toMessages()}
              sx={{ color: messages ? '#673ab7' : '#757575', marginLeft: '40px', }}
            >
              <MessageIcon
                sx={{
                  color: isDark
                    ? messages
                      ? '#85d3ff'
                      : '#ececec'
                    : messages
                    ? '#191a35'
                    : '#757575',
                }}
              />
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
            <TimerIcon
            style={{ color }}
            />
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
            style={{
              minWidth: '0px',
              color: isDark
                ? navigate
                  ? '#f8827a'
                  : '#ececec'
                : navigate
                ? '#f44336'
                : '#757575',
            }}
            icon={
              <PlaceIcon
                sx={{
                  color: isDark
                    ? navigate
                      ? '#f8827a'
                      : '#ececec'
                    : navigate
                    ? '#f44336'
                    : '#757575',
                }}
              />
            }
            component={Link}
            onClick={() => toNav()}
            to='/bikeRoutes'
          />
          <BottomNavigationAction
            label='Weather'
            style={{
              minWidth: '0px',
              color: isDark
                ? weather
                  ? '#fafafa'
                  : '#757575'
                : weather
                ? 'black'
                : '#757575',
            }}
            icon={
              <CloudIcon
                sx={{
                  color: isDark
                    ? weather
                      ? '#fafafa'
                      : '#ececec'
                    : weather
                    ? '#9c9c9c'
                    : '#757575',
                }}
              />
            }
            component={Link}
            onClick={() => toWeather()}
            to='/weather'
          />
          <BottomNavigationAction
            label='Report'
            style={{ minWidth: '0px', color: report ? '#f44336' : '#757575' }}
            icon={
              <ReportProblemIcon
                sx={{
                  color: isDark
                    ? report
                      ? '#f44336'
                      : '#ececec'
                    : report
                    ? '#f44336'
                    : '#757575',
                }}
              />
            }
            component={Link}
            onClick={() => toReport()}
            to='/reportsMap'
          />
          <BottomNavigationAction
            label='Bulletin'
            style={{
              minWidth: '0px',
              color: isDark
                ? bulletin
                  ? '#7be795'
                  : '#ececec'
                : bulletin
                ? '#20a03e'
                : '#757575',
            }}
            icon={
              <FormatListBulletedIcon
                sx={{
                  color: isDark
                    ? bulletin
                      ? '#7be795'
                      : '#ececec'
                    : bulletin
                    ? '#20a03e'
                    : '#757575',
                }}
              />
            }
            component={Link}
            onClick={() => toBulletin()}
            to='/bulletinBoard'
          />
          <BottomNavigationAction
            label='Profile'
            style={{ minWidth: '0px', color: isDark ? '#ececec' : '#1753f7' }}
            icon={userProfilePic}
            component={Link}
            onClick={() => toProfile()}
            to='/profile'
          />
        </BottomNavigation>
      </div>
      <Stopwatch
        openStopWatch={openStopWatch}
        setOpenStopWatch={setOpenStopWatch}
        setActiveWatch={setActiveWatch}
        setPauseWatch={setPauseWatch}
        activity={activity}
        setActivity={setActivity}
        activityValue={activityValue}
        setActivityValue={setActivityValue}
        isDark={isDark}
      />
      <Outlet />
    </div>
  );
};

export default Navbar;
