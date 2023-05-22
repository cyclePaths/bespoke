import React, { useState, useContext } from 'react';
import { UserContext } from '../../Root';
import { Button, ThemeProvider } from'@mui/material'
import axios from 'axios';
import themeBulletin from './ThemeBulletin'

const DeleteBulletin = (props) => {
    const { creator, id, getAllBulletins } = props
    const context = useContext(UserContext)



    const handleBulletinDeletion = () => {
      if (creator === context.user.name) {
        axios.delete(`/bulletin/${id}`, {
         })
         .then(() => {
          alert('bulletin deleted')
          getAllBulletins()
         })
         .catch(() => alert('Unable to delete bulletin!'));
      } else {
        alert('Not authorized to delete this bulletin')
        console.log(context.user.name)
        console.log(creator)
       }
    }


    return (
        <div>
        <ThemeProvider theme={themeBulletin}>
        <Button style={{ maxWidth: '25px', maxHeight: '25px', backgroundColor: '#17332c',
                          minWidth: '25px', minHeight: '25px', marginLeft: '0px', marginTop: '5px'}}
          onClick={() => handleBulletinDeletion()}>
        <h5>X</h5>
        </Button>
        </ThemeProvider>
        </div>
      )
   }

   export default DeleteBulletin
