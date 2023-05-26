import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Root';
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
import { AchievementBadgeByName, SelectedBadge } from '../../StyledComp';
import Stats from './Stats';
import BadgeDisplay from './BadgeDisplay';
import { ToggleSwitch } from '../../ThemeStyles';
import StatsDisplay from './StatsDisplay';
import { ThemeProvider } from './ThemeContext';
import { ProfileDisplays, ProfileRideDisplay } from '../../StyledComp';
import { SocketContext } from '../../SocketContext';
import { Socket } from 'socket.io-client';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const LightModeIcon = (props) => {
  return (
    <DarkModeIcon
      {...props}
      style={{
        color: '#97999e', // replace with your desired color
      }}
    />
  );
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
  selectedBadge,
  //user,
  photo,
  saveTheme,
  handleToggleStyle,
  theme,
  homeAddress,
  // weightForProfileDisplay,
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
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(true);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const socket = useContext(SocketContext).socket as Socket | undefined;

  const displayNoBadgeIfEmpty = () => {
    if (
      selectedBadge &&
      selectedBadge !==
        'https://www.baptistpress.com/wp-content/uploads/images/IMG201310185483HI.jpg'
    ) {
      return <SelectedBadge src={selectedBadge} />;
    }
  };

  const user = useContext(UserContext);

  useEffect(() => {
    const { user: { homeAddress, weight } = {} as any } = user;
    if (homeAddress !== null || homeAddress !== undefined) {
      setAddress(homeAddress);
    } else {
      const myHomeAddress = homeAddress.slice(0, -5);
      setAddress(`Your home is ${myHomeAddress}`);
    }

    if (weight === null || weight === undefined) {
      setWeight(0);
    } else {
      setWeight(weight);
    }
  }, [user]);

  useEffect(() => {
    if (homeAddress) {
      setAddress(homeAddress);
    } else {
      setAddress('No Address Saved');
    }
  }, [homeAddress]);

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
      <Backdrop
        sx={{
          backgroundColor: appTheme
            ? 'rgba(133, 211, 255, 1)'
            : 'rgba((25, 26, 53, 1)',
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        //  onClick={handleClose}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <div style={{ visibility: open ? 'hidden' : 'visible' }}>
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
              {displayNoBadgeIfEmpty()}
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
                <SetWeight
                  weight={weight}
                  onWeightChange={handleWeightChange}
                />
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
            </div>
            <div hidden={!tabVisibility[4]}>
              <BadgeDisplay />
            </div>
          </div>

          <div
            className={`holder ${
              areTabsVisible ? '' : 'hidden'
            } default-profile-display`}
          >
            <ProfileDisplays>
              <h4>
                {address === undefined || address === null
                  ? 'No Address Saved'
                  : `Your home is ${address}`}
              </h4>
            </ProfileDisplays>
            <ProfileDisplays>
              <h4>
                {weight === 0
                  ? 'No Weight Saved'
                  : `Your current weight is ${weight} lbs`}
              </h4>
            </ProfileDisplays>

            <ProfileRideDisplay>
              <h4>
                {lastRideActivity === undefined
                  ? 'No Saved Rides'
                  : `Your most recent ride was ${lastRideActivity}`}
              </h4>
              <h4>
                {lastRideDuration === undefined
                  ? null
                  : `You rode for ${Math.floor(
                      lastRideDuration / 60
                    )} hours and ${lastRideDuration % 60} minutes`}
              </h4>
              <h4>
                {lastRideWeight === undefined
                  ? null
                  : `Your weight for this ride was ${lastRideWeight} lbs`}
              </h4>
              <h4>
                {lastRideCalories === undefined
                  ? null
                  : `You burned ${lastRideCalories} calories!`}
              </h4>
            </ProfileRideDisplay>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default ProfileNav;
