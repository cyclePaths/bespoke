import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Addresses from './Addresses';


//Setting state types
export type Address = string;
export type SelectedAddress = string;

export default function Profile() {


//setting state with hooks
const [address, setAddress] = useState('');
const [selectedAddress, setSelectedAddress] = useState('');


  useEffect(() => {
    axios
      .get('/profile/user')
      .then(() => {
        console.log('Successful GET of user');
      })
      .catch((err) => {
        console.log('Could not GET user', err);
      });
  }, []);



  return (
    <div>
      <div>Hello from Profile</div>
      <Addresses address={address} setAddress={setAddress} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}/>
    </div>

  )

}


