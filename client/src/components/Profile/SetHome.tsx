import React, { useState } from 'react';
import axios from 'axios';
import Addresses, { Address, SelectedAddress, HomeAddress } from './Addresses';


const SetHome = () => {
  const [address, setAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [homeAddress, setHomeAddress] = useState('');


const saveHome = () => {
  axios.post('/profile/address', {
    address: selectedAddress
  })

    .then(() => {
        setHomeAddress(`Your home is ${selectedAddress}`);
        setSelectedAddress('');
    })
    .catch((err) => {
      console.log('Failed to post address', err);
    })

}
return (
  <div>
    <Addresses
      address={address}
      setAddress={setAddress}
      selectedAddress={selectedAddress}
      setSelectedAddress={setSelectedAddress}
      homeAddress={homeAddress}
      setHomeAddress={setHomeAddress}
      saveHome={saveHome}
    />
  </div>
);
};

export default SetHome;