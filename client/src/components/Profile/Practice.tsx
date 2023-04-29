import React, { useState, useEffect, useContext, createContext } from 'react';
import Wheel from './Wheel';


const Practice = () => {
  const [leftValue, setLeftValue] = useState<number | string>('');
  const [rightValue, setRightValue] = useState<number | string>('');

  return (
    <div style={{ display: 'flex' }}>
      <Wheel
        width={100}
        length={24}
        loop
        perspective="center"
        column="hours"
        setSelectedValue={setLeftValue}
      />
      <Wheel
        width={100}
        length={60}
        loop
        perspective="center"
        column="minutes"
        setSelectedValue={setRightValue}
      />
    </div>
  )
}

export default Practice;