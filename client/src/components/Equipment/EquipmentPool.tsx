import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';


const EquipmentPool = () => {
    const context = useContext(UserContext);
    const [equipment, setEquipment] = useState([]);

    // Function to retrieve the equipment
  const getAllEquipment = () => {
    axios.get('/bulletin')
    .then((bulletinData) => {
      setEquipment(bulletinData.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };




}