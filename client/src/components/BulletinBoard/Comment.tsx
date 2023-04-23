import React from 'react';

const Comment = (props) => {
  const { bulletinOrigin, commentCreator, commentText, createdAt } = props.comment

const dateFormatter = (createdAt) => {

}

  return (
    <div className='bulletin' style={{ backgroundColor: '#17332c'}}>
      <h3 className='bulletinTopic'><i>{commentCreator}</i> at {createdAt}:</h3>
      <div style={{ display: 'inline-block' }} className='commentText'>{commentText}
      </div>
    </div>
  );
};

export default Comment;