import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Addresses, { Address, SelectedAddress, HomeAddress } from './Addresses';
// import ProfileNav from './ProfileNave';
import Profile from './Profile';


const SetHome = () => {
  // console.log("Rendering SetHome component");
  const [address, setAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [homeAddress, setHomeAddress] = useState('');


const saveHome = () => {
  if (address !== '') {
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
    {/* <Profile homeAddress={homeAddress} /> */}
    {/* <ProfileNav homeAddress={homeAddress} /> */}
  </div>
);
};

export default SetHome;
