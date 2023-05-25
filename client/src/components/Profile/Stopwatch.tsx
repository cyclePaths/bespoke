import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../../Root';
import { interval, Subscription, Subject } from 'rxjs';
import { map, scan, takeUntil } from 'rxjs/operators';
import Button from '@mui/material/Button';
import StopwatchSelect from './StopwatchSelect';
import {
  exiledStopwatchStatsRedHeadedStepChildrenOptionGroups,
  exiledRedHeadedStepChildrenValueGroups,
} from '../../../profile-assets';
import StopwatchStats from './StopwatchStats';
import { Activity } from './StopwatchSelect';
import Fab from '@mui/material/Fab';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


export type StopwatchTime = {
  hours: number;
  minutes: number;
  seconds: number;
};

interface Option {
  value: string;
  label: string;
}

interface OptionGroup {
  [key: string]: Option[];
}

interface ValueGroup {
  [key: string]: string;
}

interface NavBarProps {
  openStopWatch?: boolean;
  setOpenStopWatch: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveWatch: React.Dispatch<React.SetStateAction<boolean>>;
  activity: string;
  setActivity: React.Dispatch<React.SetStateAction<string>>;
  activityValue: string;
  setActivityValue: React.Dispatch<React.SetStateAction<string>>;
  isDark: boolean;
}



const Stopwatch = ({ openStopWatch, setOpenStopWatch, setActiveWatch, activity, setActivity, activityValue, setActivityValue, isDark }: NavBarProps) => {
  const [time, setTime] = useState<StopwatchTime>({
    hours: 1,
    minutes: 36,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const intervalRef = useRef<Subscription | null>(null);
  const [swActivity, setSWActivity] = useState('');
  const [isStopwatchOpen, setIsStopwatchOpen] = useState(false);
  // const [appTheme, setAppTheme] =useState(false);

  const [optionGroups, setOptionGroups] = useState<OptionGroup>(
    exiledStopwatchStatsRedHeadedStepChildrenOptionGroups
  );

  const [valueGroups, setValueGroups] = useState<ValueGroup>(
    exiledRedHeadedStepChildrenValueGroups
  );

  useEffect(() => {
    console.log('isDark', isDark)
  }, [isDark])


  const handleChange = (exercise: string, value: string) => {
    setValueGroups((prevValueGroups) => ({
      ...prevValueGroups,
      [exercise]: value,
    }));
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        intervalRef.current.unsubscribe();
      }
    };
  }, []);

  const startStopwatch = () => {
    setIsRunning(true);
    setIsPickerVisible(false);
    intervalRef.current = interval(1000)
      .pipe(
        scan((acc) => {
          const { hours, minutes, seconds } = acc;
          return { seconds: seconds + 1, minutes, hours };
        }, time),
        map(({ seconds, minutes, hours }) => {
          const totalSeconds = seconds + minutes * 60 + hours * 3600;
          const newSeconds = totalSeconds % 60;
          const newMinutes = Math.floor(totalSeconds / 60) % 60;
          const newHours = Math.floor(totalSeconds / 3600);
          return { seconds: newSeconds, minutes: newMinutes, hours: newHours };
        }),
        takeUntil(stopwatchStop$)
      )
      .subscribe(setTime);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      intervalRef.current.unsubscribe();
    }
    setIsPickerVisible(true);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      intervalRef.current.unsubscribe();
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setValueGroups(exiledRedHeadedStepChildrenValueGroups);
    if (intervalRef.current) {
      intervalRef.current.unsubscribe();
    }
  };

  const toggleStopwatch = () => {
    if (isRunning) {
      pauseStopwatch();
    } else {
      resetStopwatch();
      setIsPickerVisible(false);
    }
  };

  const stopwatchStop$ = new Subject();

  const { hours, minutes, seconds } = time;


  useEffect(() => {
    setSWActivity(activityValue)
  }, [activityValue])

  const handleIconClick = () => {
    if (openStopWatch) {
      setOpenStopWatch(false);
    } else {
      setOpenStopWatch(true);
    }
  }


  return (


    <div>
  {openStopWatch && <div className="stopwatch-overlay" onClick={() => handleIconClick()} />}
  <div

    style={{
      position: 'fixed',
      top: 50,
      right: 32,
      transform: 'translateX(-50)',
      background: isDark ?
        'linear-gradient(145deg, #1e2062, #030312)' :
        'linear-gradient(145deg, #3cc6f6, #d8f1ff)',
      boxShadow: isDark ? '1.25em 1.25em 3.75em rgb(40, 43, 113), -0.625em -0.625em 1.3125em #282b71' : '-8px 2px 6px rgba(0, 0, 0, 0.3)',
      padding: '10px',
      width: '200px',
      borderRadius: '20px',
      zIndex: 1001,
      display: openStopWatch ? 'block' : 'none',

    }}
  >
    <div className='stopwatch-text-align'>
      <h3 className='stopwatch-text'
        style={{color: isDark ? 'white' : 'black',}}
      >
        {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} :{' '}
        {String(seconds).padStart(2, '0')}
      </h3>
      </div>
      <div className='stopwatch-button-align'>
      {!isRunning && (
        <Fab
        sx={{ left: 0, boxShadow: '6px 6px 6px rgba(0, 0, 0, 0.2)' }}
        color='secondary'
        size='small'
        aria-label='back'
          onClick={() => {
            startStopwatch();
            setActiveWatch(true);
          }}
        >
          <PlayCircleFilledWhiteIcon />
          </Fab>
      )}
      {isRunning && (
        <Fab
        sx={{ left: 0, boxShadow: '6px 6px 6px rgba(0, 0, 0, 0.2)' }}
        color='secondary'
        size='small'
        aria-label='back'
          onClick={() => {
            stopStopwatch();
            setActiveWatch(false);
          }}
        >
         <StopCircleIcon />
          </Fab>
      )}
      <Fab sx={{ left: 0, boxShadow: '6px 6px 6px rgba(0, 0, 0, 0.2)' }}
color='secondary'
size='small'
      onClick={toggleStopwatch}>
        {isRunning ? <PauseCircleFilledIcon /> : <RestartAltIcon />}
      </Fab>
      </div>
      {isPickerVisible && (
        <div>
          <StopwatchSelect
            activity={activity}
            setActivity={setActivity}
            activityValue={activityValue}
            setActivityValue={setActivityValue}
            isDark={isDark}
            />
        </div>
      )}
      <div>
        <StopwatchStats
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          swActivity={swActivity}
          isPickerVisible={isPickerVisible}
          setIsPickerVisible={setIsPickerVisible}
          setValueGroups={setValueGroups}
        />
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;