import React from 'react';


const Equipment = (props) => {
    const { equipmentDescription, equipmentType } = props.equipment
    return (
        <div>
          <i>{equipmentDescription}</i>
          <b>{equipmentType}</b>
        </div>
    )
}


export default Equipment