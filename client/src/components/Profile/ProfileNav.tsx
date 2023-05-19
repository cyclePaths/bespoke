import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NightlightRoundTwoToneIcon from '@mui/icons-material/NightlightRoundTwoTone';
import SetHome from './SetHome';
import SetWeight from './SetWeight';
import Scrollers from './Scrollers';
import Stats from './Stats';
import BadgeDisplay from './BadgeDisplay';
import { ToggleSwitch } from '../../ThemeStyles';
import StatsDisplay from './StatsDisplay';
import { ThemeProvider } from './ThemeContext';
import { ProfileDisplays } from '../../StyledComp';
import { SocketContext } from '../../SocketContext';
import { Socket } from 'socket.io-client';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const LightModeIcon = (props) => {
  return <DarkModeIcon {...props} />;
};

const DarkMode = (props) => {
  return (
    <DarkModeIcon
      {...props}
      style={{
        color: '#5e89f0', // replace with your desired color
      }}
    />
  );
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ProfileNav = ({
  user,
  photo,
  saveTheme,
  handleToggleStyle,
  theme,
  homeAddress,
  weightForProfileDisplay,
  lastRideActivity,
  lastRideDuration,
  lastRideWeight,
  lastRideCalories,
}) => {
  const [value, setValue] = useState(-1);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [weight, setWeight] = useState(0);
  const [showScrollers, setShowScrollers] = useState(false);
  const [tabVisibility, setTabVisibility] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [stats, setStats] = useState([]);
  const [appTheme, setAppTheme] = useState(false);
  const [themeIcon, setThemeIcon] = useState(false);
  const [areTabsVisible, setAreTabsVisible] = useState(true);

  const socket = useContext(SocketContext).socket as Socket | undefined;

  // useEffect(() => {
  //   if (socket) {
  //     // Listen for incoming 'message' events
  //     socket.on('message', (newMessage) => {
  //       // Handle the incoming message
  //       console.log('Received message:', newMessage);
  //     });
  //   }
  // }, [socket]);

  const handleThemeIconClick = () => {
    setAppTheme(!appTheme);
    handleToggleStyle();
    saveTheme();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    toggleTabVisibility(newValue);

    if (newValue === 2) {
      setShowScrollers(!tabVisibility[2]);
    } else {
      setShowScrollers(false);
    }
  };

  const handleWeightChange = (value: number) => {
    setWeight(value);
  };

  useEffect(() => {
    setAppTheme(theme);
    setThemeIcon(theme);
  }, [theme]);

  const toggleTabVisibility = (tabIndex: number) => {
    setTabVisibility((prevState) => {
      const newState = prevState.map((visible, index) => {
        return index === tabIndex ? !visible : false;
      });

      const anyTabsVisible = newState.some((visible) => visible);
      setAreTabsVisible(!anyTabsVisible);

      return newState;
    });
  };

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            // sx={{ justifyContent: 'space-between' }}
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
            sx={{
              '& .MuiTabs-flexContainer': {
                justifyContent: 'space-evenly',
              },
            }}
          >
            <Tab
              label='Home'
              sx={{
                color: appTheme ? '#3c3636' : '#f1e2e2',
                minWidth: '0px',
              }}
              {...a11yProps(0)}
            />
            <Tab
              label='Weight'
              sx={{
                color: appTheme ? '#3c3636' : '#f1e2e2',
                minWidth: '0px',
              }}
              {...a11yProps(1)}
            />
            <Tab
              label='Rides'
              sx={{
                color: appTheme ? '#3c3636' : '#f1e2e2',
                minWidth: '0px',
              }}
              {...a11yProps(2)}
            />
            <Tab
              label='Stats'
              sx={{
                color: appTheme ? '#3c3636' : '#f1e2e2',
                minWidth: '0px',
              }}
              {...a11yProps(3)}
            />
            <Tab
              label='Badges'
              sx={{
                color: appTheme ? '#3c3636' : '#f1e2e2',
                minWidth: '0px',
              }}
              {...a11yProps(4)}
            />
          </Tabs>
        </Box>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          {/* Below is the Greeting and Profile Pic and Theme Selection*/}
          {/* <div>{`Hello ${user}!`}</div> */}

          <div className='profile-pic-Theme-icon'>
            <img className='profile-pic' src={photo} alt='avatar' />

            <ThemeProvider>
              <div id='profile' className='themeIcon'>
                <IconButton
                  // onClick={() => {
                  //   handleToggleStyle();
                  //   saveTheme();
                  // }}

                  onClick={handleThemeIconClick}
                >
                  {appTheme ? (
                    <LightModeIcon className='theme-icon' />
                  ) : (
                    <DarkMode className='theme-icon' />
                  )}
                  {/* <DarkModeIcon /> */}
                </IconButton>
              </div>
            </ThemeProvider>
          </div>

          {/* Above is the Greeting and Profile Pic and Theme Selection*/}

          <div hidden={!tabVisibility[0]}>
            <SetHome />
          </div>
          <div hidden={!tabVisibility[1]} style={{ width: '100%' }}>
            <div style={{ width: '100%' }}>
              {/* {`My current weight is ${weight} lbs`} */}
              <SetWeight weight={weight} onWeightChange={handleWeightChange} />
            </div>
          </div>
          <div hidden={!tabVisibility[2]} />

          {showScrollers && (
            <Scrollers
              setShowScrollers={setShowScrollers}
              theme={theme}
              saveTheme={saveTheme}
              appTheme={appTheme}
            />
          )}

          <div hidden={!tabVisibility[3]}>
            <Stats />
            {/* <StatsDisplay stats={stats} /> */}
          </div>
          <div hidden={!tabVisibility[4]}>
            <BadgeDisplay />
          </div>
        </div>
        <div className={`holder ${areTabsVisible ? '' : 'hidden'}`}>
          <ProfileDisplays>
            <h4>{homeAddress}</h4>
          </ProfileDisplays>
          <ProfileDisplays>
            <h4>{weightForProfileDisplay}</h4>
          </ProfileDisplays>
          <div>
            <ProfileDisplays>
              <h4>{lastRideActivity}</h4>
            </ProfileDisplays>
            <ProfileDisplays>
              <h4>{lastRideDuration}</h4>
            </ProfileDisplays>
            <ProfileDisplays>
              <h4>{lastRideWeight}</h4>
            </ProfileDisplays>
            <ProfileDisplays>
              <h4>{lastRideCalories}</h4>
            </ProfileDisplays>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ProfileNav;
