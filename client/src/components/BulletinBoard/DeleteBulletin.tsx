import React, { useState, useContext } from 'react';
import { UserContext } from '../../Root';
import { Button} from'@mui/material'
import axios from 'axios';

const DeleteBulletin = (props) => {
    const context = useContext(UserContext)
    const bulletinOrigin = props.bulletinOrigin

    const handleBulletinDeletion = () => {
      if (bulletinOrigin === context) {
        axios.delete('/bulletin', {

         })
         .then((response) => {
         })
         .catch(() => alert('Unable to make Bulletin!'));
      } else {
        alert('Add topic and text to Bulletin!')
       }
    }


    return (
        <div>
        <Button style={{ maxWidth: '25px', maxHeight: '25px', backgroundColor: '#17332c',
                          minWidth: '25px', minHeight: '25px', marginLeft: '0px', marginTop: '5px'}}
          onClick={() => handleBulletinDeletion()}>
        <h5>Delete</h5>
        </Button>
        </div>
      )
   }

   export default DeleteBulletin
