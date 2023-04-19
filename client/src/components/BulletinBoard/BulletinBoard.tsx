import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
//import { UserContext } from '../../index';
//Components
import Bulletin from './Bulletin'



const BulletinBoard = () => {
  //const context = useContext(UserContext);
  const [bulletins, setBulletins] = useState([]);

  // Function to retrieve all bulletins
  const getAllBulletins = () => {
    axios.get('/api/bulletins')
    .then((bulletinData) => {
      setBulletins(bulletinData.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  //Function to display only the bulletin with ID matching the ID of click-selected bulletin
  const handleBulletinSelection = (e) => {
    axios.get('/api/bulletins')
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
  })

  return (
    <div>
      <div>Bulletins</div>
      {bulletins.map((bulletin, i) => (<Bulletin bulletinData={bulletin}
      handleBulletinSelection={ handleBulletinSelection } class='bulletin'/>))}
    </div>
  );
};

export default BulletinBoard;