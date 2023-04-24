// import React, { useState, useEffect, useContext, createContext } from 'react';
// import axios from 'axios';
// import Addresses from './Addresses';
// import Picker, { PickerProps } from 'react-scrollable-picker';
// import { UserContext } from '../../Root';
// import {
//   exiledRedHeadedStepChildrenOptionGroups,
//   exiledRedHeadedStepChildrenValueGroups,
// } from '../../../profile-assets';

// interface TouchPosition {
//   x: number;
//   y: number;
// }

// interface CustomPickerProps extends PickerProps {
//   onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
//   onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
// }

// // ...

// const Profile: React.FC = () => {
//   // ...

//   const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);
//   const [touchMove, setTouchMove] = useState<TouchPosition | null>(null);

//   const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
//     setTouchStart({ x: event.touches[0].clientX, y: event.touches[0].clientY });
//   };

//   const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
//     setTouchMove({ x: event.touches[0].clientX, y: event.touches[0].clientY });
//   };

//   const handleTouchEnd = () => {
//     if (touchStart && touchMove) {
//       const deltaY = touchMove.y - touchStart.y;
//       const deltaX = touchMove.x - touchStart.x;

//       if (Math.abs(deltaX) < Math.abs(deltaY)) {
//         const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
//         const distance = deltaY / clientHeight;
//         const newPosition = valueGroups[0] + distance;
//         const maxPosition = optionGroups[0].length - 1;
//         const minPosition = 0;

//         setValueGroups((prevValueGroups) => ({
//           ...prevValueGroups,
//           0: Math.max(minPosition, Math.min(maxPosition, newPosition)),
//         }));
//       }
//     }

//     setTouchStart(null);
//     setTouchMove(null);
//   };

//   const CustomPicker = Picker as React.FC<CustomPickerProps>;

//   return (
//     <div onTouchEnd={handleTouchEnd}>
//       {/* ... */}
//       <CustomPicker
//         optionGroups={optionGroups}
//         valueGroups={valueGroups}
//         onChange={handleChange}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//       />
//       {/* ... */}
//     </div>
//   );
// };



























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

