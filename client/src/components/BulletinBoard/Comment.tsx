import React from 'react';

const Comment = (props) => {
  const { bulletinOrigin, commentCreator, commentText, createdAt } = props.comment
  const formattedDate = `${createdAt.slice(6,10)}-${createdAt.slice(2, 4)} at ${createdAt.slice(11, 16)}`

  return (
    <div className='bulletin' style={{ backgroundColor: '#2b6355'}}>
      <p className='bulletinTopic'><i>{commentCreator}</i> -- {formattedDate}</p>
      <p style={{ display: 'inline-block' }} className='commentText'>{commentText}</p>
    </div>
  );
};

export default Comment;