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
