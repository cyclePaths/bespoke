import React from 'react';


const Equipment = (props) => {
    const { equipmentOrigin, equipmentDescription, equipmentType } = props.equipment
    return (
        <div>
          <li>{equipmentDescription} - <i>{equipmentType}</i> -- <i>{equipmentOrigin}</i></li>
        </div>
    )
}


export default Equipment