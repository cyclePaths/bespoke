import React, { useState, useEffect, useRef } from 'react';
import { interval, Subscription, Subject } from 'rxjs';
import { map, scan, takeUntil } from 'rxjs/operators';

type StopwatchTime = {
  hours: number;
  minutes: number;
  seconds: number;
};

const Stopwatch = () => {
  const [time, setTime] = useState<StopwatchTime>({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<Subscription | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        intervalRef.current.unsubscribe();
      }
    };
  }, []);

  const startStopwatch = () => {
    setIsRunning(true);
    intervalRef.current = interval(1000).pipe(
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
    ).subscribe(setTime);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      intervalRef.current.unsubscribe();
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    if (intervalRef.current) {
      intervalRef.current.unsubscribe();
    }
  };

  const stopwatchStop$ = new Subject();

  const { hours, minutes, seconds } = time;

  return (
    <div>
      <h1>
        {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
      </h1>
      {!isRunning && <button onClick={startStopwatch}>Start</button>}
      {/* {isRunning && <button onClick={() => stopwatchStop$.next({})}>Stop</button>} */}
      {isRunning && <button onClick={stopStopwatch}>Stop</button>}
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
};

export default Stopwatch;







// type StopwatchTime = {
//   hours: number;
//   minutes: number;
//   seconds: number;
// };

// const Stopwatch = () => {
//   const [time, setTime] = useState<StopwatchTime>({ hours: 0, minutes: 0, seconds: 0 });
//   const [isRunning, setIsRunning] = useState<boolean>(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const startStopwatch = () => {
//     setIsRunning(true);
//     intervalRef.current = setInterval(() => {
//       setTime((prevTime) => {
//         const nextSeconds = prevTime.seconds + 1;
//         const nextMinutes = prevTime.minutes + Math.floor(nextSeconds / 60);
//         const nextHours = prevTime.hours + Math.floor(nextMinutes / 60);
//         return {
//           hours: nextHours,
//           minutes: nextMinutes,
//           seconds: nextSeconds % 60,
//         };
//       });
//     }, 1000);
//   };

//   const stopStopwatch = () => {
//     setIsRunning(false);
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   };

//   const resetStopwatch = () => {
//     setIsRunning(false);
//     setTime({ hours: 0, minutes: 0, seconds: 0 });
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   };

//   const { hours, minutes, seconds } = time;

//   return (
//     <div>
//       <h1>
//       {String(hours).padStart(2, "0")} : {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
//       </h1>
//       {!isRunning && (
//         <button onClick={startStopwatch}>Start</button>
//       )}
//       {isRunning && (
//         <button onClick={stopStopwatch}>Stop</button>
//       )}
//       <button onClick={resetStopwatch}>Reset</button>
//     </div>
//   );
// };

// export default Stopwatch;


