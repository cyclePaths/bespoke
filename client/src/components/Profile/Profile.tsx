import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Addresses from './Addresses';

// export type Address = {
//   name: string;
//   streetNumber: number;
//   streetName:string;
//   city: String;
//   zipCode: number;
// }

// export type Address = {
// address: '';
// }

export type Address = string;
export type SelectedAddress = string;

export default function Profile() {

// const [address, setAddress] = useState<Address>({
//   name: '',
//   streetNumber: 0,
//   streetName: '',
//   city: '',
//   zipCode: 0
// })

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


  // const saveAddress = () => {

  // }

  return (
    <div>
      <div>Hello from Profile</div>
      <Addresses address={address} setAddress={setAddress} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}/>
    </div>

  )

}

// export default Profile;
