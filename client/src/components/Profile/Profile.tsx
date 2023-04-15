
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {


  useEffect(() => {
    axios.get('/profile/user')
      .then(() => {
        console.log('Successful GET of user');
      })
      .catch((err) => {
        console.log('Could not GET user', err);
      })
  }, [])
}



export default Profile;
