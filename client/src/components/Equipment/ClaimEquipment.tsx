// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { UserContext } from '../../Root';
// import { Button } from '@mui/material'
// import ClaimPopup from './EquipmentPopup'

// const ClaimEquipment = () => {
//   const context = useContext(UserContext)
//   const [openEquipmentClaim, setOpenEquipmentClaim] = useState(false);


//   const exitPopup = () => {
//     setOpenEquipmentClaim(false);
//   };

//   const handleClaimEquipment = () => {
//     alert('Equipment Claimed!')
//   }

//   //<ClaimPopup openEquipmentClaim={openEquipmentClaim} setOpenEquipmentClaim={setOpenEquipmentClaim}>
//   //</ClaimPopup>
//   return (
//   <div>
//     <Button style={{backgroundColor: '#17332c', marginTop: '5px', maxHeight: '20px'}} onClick={() => setOpenEquipmentClaim(true)}>
//         <h5>Claim Part</h5>
//     </Button>
//     <div style={{textAlign: 'center'}}>
//     <Button style={{backgroundColor: '#17332c', marginTop: '5px'}}
//               onClick={() => handleClaimEquipment()}>Claim Equipment
//     </Button>
//     <Button style={{backgroundColor: '#17332c', marginTop: '5px'}}
//               onClick={() => exitPopup()}>Close
//     </Button>
//     </div>
//   </div>
//   )
// }

// export default ClaimEquipment