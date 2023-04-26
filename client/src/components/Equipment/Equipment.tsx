import React from 'react';


const Equipment = (props) => {
    const { equipmentDescription, equipmentType } = props.equipment
    return (
        <div>
          <div>{equipmentDescription}</div>
          <div><i>{equipmentType}</i></div>
        </div>
    )
}


export default Equipment