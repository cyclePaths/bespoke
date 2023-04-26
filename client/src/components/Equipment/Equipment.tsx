import React from 'react';


const Equipment = (props) => {
    const { equipmentDescription, equipmentType } = props.bulletin
    return (
        <div>
          <p>{equipmentDescription}:</p>
          <p><i>{equipmentType}</i></p>
        </div>
    )
}


export default Equipment