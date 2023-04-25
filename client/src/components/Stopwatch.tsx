import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../Root';
import { interval, Subscription, Subject } from 'rxjs';
import { map, scan, takeUntil } from 'rxjs/operators';
import Picker from 'react-scrollable-picker';
import {
  exiledStopwatchStatsRedHeadedStepChildrenOptionGroups,
  exiledRedHeadedStepChildrenValueGroups,
} from '../../profile-assets';
import StopwatchStats from '../components/Profile/StopwatchStats';

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

const Stopwatch = () => {
  const [time, setTime] = useState<StopwatchTime>({
    hours: 1,
    minutes: 5,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const intervalRef = useRef<Subscription | null>(null);

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
    setTime({ hours: 1, minutes: 5, seconds: 0 });
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
      setIsPickerVisible(false)
    }
  };

  const stopwatchStop$ = new Subject();

  const { hours, minutes, seconds } = time;

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, marginRight: '20px' }}>
      <h3>
        {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} :{' '}
        {String(seconds).padStart(2, '0')}
      </h3>
      {!isRunning && <button onClick={startStopwatch}>Start</button>}
      {/* {isRunning && <button onClick={() => stopwatchStop$.next({})}>Stop</button>} */}
      {isRunning && <button onClick={stopStopwatch}>Stop</button>}
      <button onClick={toggleStopwatch}>{isRunning ? 'Pause' : 'Reset'}</button>
      {/* <button onClick={resetStopwatch}>{isRunning ? 'Reset' : 'Clear'}</button> */}

      {isPickerVisible && (
  <div>
    <Picker
      optionGroups={optionGroups}
      valueGroups={valueGroups}
      onChange={handleChange}
    />
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
        isPickerVisible={isPickerVisible}
        setIsPickerVisible={setIsPickerVisible}
        setValueGroups={setValueGroups}
        />
      </div>
    </div>
  );
};

export default Stopwatch;
