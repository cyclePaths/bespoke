import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SetHome from './SetHome';
import SetWeight from './SetWeight';
import Scrollers from './Scrollers';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

const ProfileNav = () => {
  const [value, setValue] = useState(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [weight, setWeight] = useState(0);
  const [showScrollers, setShowScrollers] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // setActiveTab(newValue);


    if (newValue === 2) {
      setShowScrollers(true);
    } else {
      setShowScrollers(false);
    }
  };



  const handleWeightChange = (value: number) => {
    setWeight(value);
  };




  return (
    <div>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Set Home' {...a11yProps(0)} />
          <Tab label='Weight' {...a11yProps(1)} />
          <Tab label='Add Ride' {...a11yProps(2)} />
          <Tab label='Stats' {...a11yProps(3)} />
        </Tabs>
      </Box>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <div hidden={value !== 0}>

        <SetHome />
      </div>
      <div hidden={value !== 1} style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
        <SetWeight weight={weight} onWeightChange={handleWeightChange} />
        </div>
      </div>
      <div hidden={value !== 2} />


      {showScrollers && <Scrollers />}
      <div hidden={value !== 3} />

      </div>
    </Box>
    </div>
  );
};

export default ProfileNav;
