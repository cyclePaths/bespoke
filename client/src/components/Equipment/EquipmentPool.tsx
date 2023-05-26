import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import Card from '@mui/material/Card';
import Equipment from './Equipment';


const EquipmentPool = () => {
    const context = useContext(UserContext);
    const [equipment, setEquipment] = useState([]);
    const [expansion, setExpansion] = useState(false)

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

  const handleEquipmentPoolClick = () => {
    getAllEquipment()
    setExpansion(!expansion)
  }

  useEffect(() => {
    getAllEquipment();
  }, [context])

  return (
    <div>
      <Card onClick={handleEquipmentPoolClick} style={{ backgroundColor: 'rgb(115, 216, 139)', borderRadius: '5px'}}>
        <div style={{paddingLeft:'10px', paddingTop: '3px'}} ><b>View Community Parts:</b>
      {expansion && equipment.map((equipment, i) => (<Equipment equipment={equipment} key={ i }/>))}
      </div>
      </Card>
    </div>
  );
};

export default EquipmentPool;




