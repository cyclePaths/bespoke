import React from 'react';

const Comment = (props) => {
  const { bulletinOrigin, commentCreator, commentText, createdAt } = props.comment

const dateFormatter = (createdAt) => {

}

  return (
    <div className='bulletin' style={{ backgroundColor: '#2b6355'}}>
      <p className='bulletinTopic'><i>{commentCreator}</i> at {createdAt}:</p>
      <p style={{ display: 'inline-block' }} className='commentText'>{commentText}</p>
    </div>
  );
};

export default Comment;