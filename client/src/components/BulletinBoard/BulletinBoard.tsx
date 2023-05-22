import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
//Components
import Bulletin from './Bulletin';
import CreateBulletin from './CreateBulletin';
import EquipmentPool from '../Equipment/EquipmentPool';
//Styling
import Card from '@mui/material/Card';
import { BandAid } from '../../StyledComp';

const BulletinBoard = () => {
  const context = useContext(UserContext);
  const [bulletins, setBulletins] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  let orderedBulletins: object[] = []
  for (let i = bulletins.length -1; i >= 0; i--) {
    orderedBulletins.push(bulletins[i])
  }


  // Function to retrieve all bulletins
  const getAllBulletins = () => {
    axios
      .get('/bulletin')
      .then((bulletinData) => {
        setBulletins(bulletinData.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Function to display only the bulletin with ID matching the ID of click-selected bulletin
  const handleBulletinSelection = (e) => {
    axios
      .get('/bulletin')
      .then((bulletinData) => {
        setBulletins(
          bulletinData.data.filter(
            (selected) => e.bulletinID === selected.bulletinID
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to retrieve all comments
  const getAllComments = () => {
    axios
      .get('/comment')
      .then((commentData) => {
        setComments(commentData.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateBulletins = (submittedBulletin) => {
    setBulletins((previousBulletins) => [...previousBulletins, submittedBulletin])
  }

  const updateComments = (submittedComment) => {
    setComments((previousComments) => [...previousComments, submittedComment])
  }

  //useEffect hook populates with bulletins
  useEffect(() => {
    getAllBulletins();
    getAllComments();
  }, [context]);

  return (
    <BandAid>
      <Card style={{ backgroundColor: 'rgb(133, 211, 255)', borderRadius: '5px' }}>
        <EquipmentPool />
        <CreateBulletin bulletins={bulletins} setBulletins={setBulletins}
                        updateBulletins={updateBulletins}/>
        {orderedBulletins.map((bulletin, i) => (
          <Bulletin
            bulletin={bulletin}
            comments={comments}
            handleBulletinSelection={handleBulletinSelection}
            updateComments={updateComments}
            key={i}
            bulletins={bulletins}
            setBulletins={setBulletins}
            getAllBulletins={getAllBulletins}
          />
        ))}
      </Card>
    </BandAid>
  );
};

export default BulletinBoard;
