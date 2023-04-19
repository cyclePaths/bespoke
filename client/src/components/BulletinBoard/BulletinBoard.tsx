import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
//import { UserContext } from '../../index';
//Components
import Bulletin from './Bulletin'


//Request to retrieve all Bulletin Board Posts from the database

const BulletinBoard = () => {

  //const context = useContext(UserContext);
  const [bulletins, setBulletins] = useState([]);

  const getAllBulletins = () => {
    axios.get('/api/bulletins')
    .then((bulletinData) => {
      setBulletins(bulletinData.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getAllBulletins();
  })

  return (
    <div>
      <div>Bulletins</div>
      {bulletins.map((bulletin, i) => (<Bulletin bulletinData={bulletin} class='bulletin'/>))}
    </div>
  );
};

export default BulletinBoard;