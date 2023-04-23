import React from 'react';




const Bulletin = (props) => {
   const { topic, creator, text, createdAt } = props.bulletinData
   return (
    <div className='bulletin' style={{ backgroundColor: '#94edd7'}}>
      <h1 className='bulletinTopic'><i>{topic}</i> --{creator} at {createdAt}</h1>
      <h3 className='bulletinText'>{text}</h3>
    </div>
   )
};

export default Bulletin;
