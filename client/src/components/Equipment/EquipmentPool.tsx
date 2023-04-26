import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import Equipment from './Equipment';


const EquipmentPool = () => {
    const context = useContext(UserContext);
    const [equipment, setEquipment] = useState([]);

    // Function to retrieve the equipment
  const getAllEquipment = () => {
    axios.get('/equipment')
    .then((bulletinData) => {
      setEquipment(bulletinData.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getAllEquipment();
  }, [context])

  return (
    <div>
      {equipment.map((bulletin, i) => (<Equipment equipment={equipment} key={ i }/>))}
    </div>
  );
};

export default EquipmentPool;




