import React from 'react';
import CreateComment from './CreateComment';




const Bulletin = (props) => {
   const { id, topic, creator, text, createdAt } = props.bulletin

const dateFormatter = (createdAt) => {


}

   return (
    <div className='bulletin' style={{ backgroundColor: '#94edd7'}}>
      <h3 className='bulletinTopic'><i>{topic}</i> --{creator} at {createdAt}</h3>
      <div style={{ display: 'flex' }} className='bulletinText'>{text}</div><CreateComment bulletinOrigin={ id }/>
    </div>
   )
};

export default Bulletin;
