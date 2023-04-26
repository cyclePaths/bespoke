import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
//Components
import Bulletin from './Bulletin'
import CreateBulletin from './CreateBulletin';
import EquipmentPool from '../Equipment/EquipmentPool';
//Styling
import Card from '@mui/material/Card';



const BulletinBoard = () => {
  const context = useContext(UserContext);
  const [bulletins, setBulletins] = useState([]);

  // Function to retrieve all bulletins
  const getAllBulletins = () => {
    axios.get('/bulletin')
    .then((bulletinData) => {
      setBulletins(bulletinData.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  //Function to display only the bulletin with ID matching the ID of click-selected bulletin
  const handleBulletinSelection = (e) => {
    axios.get('/bulletin')
    .then((bulletinData) => {
      setBulletins(bulletinData.data.filter((selected) => e.bulletinID === selected.bulletinID));
    })
    .catch((error) => {
      console.error(error);
    });
  };


    //useEffect hook populates with bulletins
    useEffect(() => {
    getAllBulletins();
  }, [context])

  return (
    <div>
      <Card style={{ backgroundColor: '#5555556e', borderRadius: '5px'}}><EquipmentPool/><CreateBulletin/>
      {bulletins.map((bulletin, i) => (<Bulletin bulletin={bulletin}
      handleBulletinSelection={ handleBulletinSelection } key={ i }/>))}
      </Card>
    </div>

  );
};

export default BulletinBoard;