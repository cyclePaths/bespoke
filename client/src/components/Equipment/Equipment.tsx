import React from 'react';


const Equipment = (props) => {
    const { equipmentOrigin, equipmentDescription, equipmentType } = props.equipment
    return (
        <div>
          <i>{equipmentDescription} -- </i>
          <b>{equipmentType}</b>
          <b>     -- {equipmentOrigin}</b>
        </div>
    )
}


export default Equipment