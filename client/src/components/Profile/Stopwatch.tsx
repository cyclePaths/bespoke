import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../../Root';
import { interval, Subscription, Subject } from 'rxjs';
import { map, scan, takeUntil } from 'rxjs/operators';
import Picker from 'react-scrollable-picker';
import Button from '@mui/material/Button';
import StopwatchSelect from './StopwatchSelect';
import {
  exiledStopwatchStatsRedHeadedStepChildrenOptionGroups,
  exiledRedHeadedStepChildrenValueGroups,
} from '../../../profile-assets';
import StopwatchStats from './StopwatchStats';
import { Activity } from './StopwatchSelect';

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
}



const Stopwatch = ({ openStopWatch, setOpenStopWatch, setActiveWatch, activity, setActivity, activityValue, setActivityValue }: NavBarProps) => {
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

  const [optionGroups, setOptionGroups] = useState<OptionGroup>(
    exiledStopwatchStatsRedHeadedStepChildrenOptionGroups
  );

  const [valueGroups, setValueGroups] = useState<ValueGroup>(
    exiledRedHeadedStepChildrenValueGroups
  );

  const user = useContext(UserContext);
  if (user) {
    const { weight } = user;
  }

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
    // setIsPickerVisible(true);
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
  className='stopwatch'
    style={{
      position: 'fixed',
      top: 40,
      right: 32,
      transform: 'translateX(-50)',
      backgroundColor: 'white',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      padding: '10px',
      borderRadius: '20px',
      zIndex: 1001,
      display: openStopWatch ? 'block' : 'none',

    }}
  >

      <h3 className='stopwatch-text'>
        {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} :{' '}
        {String(seconds).padStart(2, '0')}
      </h3>
      {!isRunning && (
        <Button
      size="small"
          onClick={() => {
            startStopwatch();
            setActiveWatch(true);
          }}
        >
          Start
        </Button>
      )}
      {/* {isRunning && <button onClick={() => stopwatchStop$.next({})}>Stop</button>} */}
      {isRunning && (
        <Button
        size="small"
          onClick={() => {
            stopStopwatch();
            setActiveWatch(false);
          }}
        >
          Stop
        </Button>
      )}
      <Button size="small" onClick={toggleStopwatch}>
        {isRunning ? 'Pause' : ' Reset '}
      </Button>
      {/* <button onClick={resetStopwatch}>{isRunning ? 'Reset' : 'Clear'}</button> */}

      {isPickerVisible && (
        <div>
          {/* <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            onChange={handleChange}
          /> */}
          <StopwatchSelect activity={activity} setActivity={setActivity} activityValue={activityValue} setActivityValue={setActivityValue} />
          {/* <button type='button' onClick={() => workoutStats()}>
      Get Stats
    </button> */}
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