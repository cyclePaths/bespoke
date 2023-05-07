import React from 'react';

const Comment = (props) => {
  const { bulletinOrigin, commentCreator, commentText, createdAt } = props.comment
  const formattedDate = `${createdAt.slice(6,10)}-${createdAt.slice(2, 4)} at ${createdAt.slice(11, 16)}`

  return (
    <div className='bulletin' style={{backgroundColor: 'rgb(87, 161, 103)', marginTop: '5px'}}>
      <div className='bulletinTopic' style={{ paddingLeft:'10px'}}><i>{commentCreator}</i> -- {formattedDate}</div>
      <div style={{ display: 'inline-block', marginTop: '5px', paddingLeft:'10px', paddingRight:'10px'}} className='commentText'>{commentText}</div>
    </div>
  );
};

export default Comment;