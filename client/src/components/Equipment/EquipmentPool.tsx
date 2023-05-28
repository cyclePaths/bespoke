import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import Card from '@mui/material/Card';
import Equipment from './Equipment';
import ViewEquipment from './ViewEquipment'
import AddEquipment from './AddEquipment';




const EquipmentPool = () => {
    const context = useContext(UserContext);
    const [equipment, setEquipment] = useState<object[]>([]);

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

  const updateEquipment = (submittedEquipment) => {
    setEquipment((previousEquipment) => [...previousEquipment, submittedEquipment])
  }

  useEffect(() => {
    getAllEquipment();
  }, [context])

  return (
    <div>
      <Card style={{ backgroundColor: context.isDark ? '#757575' : '#ECECEC', borderRadius: '4px'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft:'10px',
                      paddingTop: '3px'}}><div><b>Community Equipment:</b></div>
      <div style={{ display: 'flex'}}>
      <ViewEquipment equipment={equipment}/>
      <AddEquipment updateEquipment={updateEquipment}/>
      </div>
      </div>
      </Card>
    </div>
  );
};

export default EquipmentPool;




