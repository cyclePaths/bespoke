import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import Card from '@mui/material/Card';
import Equipment from './Equipment';


const EquipmentPool = () => {
    const context = useContext(UserContext);
    const [equipment, setEquipment] = useState([]);

    // Function to retrieve the equipment
  const getAllEquipment = () => {
    axios.get('/equipment')
    .then((equipmentData) => {
      setEquipment(equipmentData.data);
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
      <Card style={{ backgroundColor: '#87BBDC', borderRadius: '5px'}}><div>EQUIPMENT POOL:
      {equipment.map((equipment, i) => (<Equipment equipment={equipment} key={ i }/>))}
      </div>
      </Card>
    </div>
  );
};

export default EquipmentPool;




