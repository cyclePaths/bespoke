import React, { useState, useContext, useEffect } from 'react';
import ClaimEquipment from './ClaimEquipment';
import { UserContext } from '../../Root';


const Equipment = (props) => {
  const context = useContext(UserContext);
  const [claimStatus, setClaimStatus] = useState('')


    const { equipmentOrigin, equipmentDescription, equipmentType } = props.equipment
    return (
        <div>
  <li>{equipmentDescription} - <i>{equipmentType}</i> -- <i>{equipmentOrigin}</i></li>


        </div>
    )
}


export default Equipment