import React, { useState, useContext, useEffect } from 'react';
// import ClaimEquipment from './ClaimEquipment';
import { UserContext } from '../../Root';
const Equipment = (props) => {
  const context = useContext(UserContext);
  const [claimStatus, setClaimStatus] = useState('')


    const { equipmentOrigin, equipmentDescription, equipmentType } = props.equipment
    return (
        <div style={{  fontFamily: 'roboto', minWidth: '95%', maxWidth: '95%', border: '0.5px solid #000000',
        borderRadius: '4px', background: context.isDark
        ? 'linear-gradient(145deg, #1e2062, #030312)'
        : 'linear-gradient(145deg, #3cc6f6, #d8f1ff)',
        boxShadow: context.isDark
        ? '1.25em 1.25em 3.75em rgb(40, 43, 113)'
        : '-8px 2px 6px rgba(0, 0, 0, 0.3)',
        position: 'relative', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px',
        color: context.isDark ? '#FFFFFF' : '#000000'}}>

     {equipmentDescription} - <i>{equipmentType}</i> -- <i>{equipmentOrigin}</i>
    </div>
    )
}


export default Equipment