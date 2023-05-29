import React, { useContext } from 'react';
import { UserContext } from '../../Root';

const Comment = (props) => {
  const context = useContext(UserContext);
  const { bulletinOrigin, commentCreator, commentText, createdAt } = props.comment
  const formattedDate = `${createdAt.slice(6,10)}-${createdAt.slice(2, 4)}`
  //at ${createdAt.slice(11, 16)}

  return (
    <div className='bulletin' style={{backgroundColor: context.isDark ? '#757575' : '#ECECEC', marginTop: '5px', borderRadius: '4px'}}>
      <div className='bulletinTopic' style={{ paddingLeft:'10px'}}><i>{commentCreator} -- {formattedDate}</i></div>
      <div style={{ display: 'inline-block', marginTop: '5px', paddingLeft:'10px', paddingRight:'10px', }} className='commentText'>{commentText}</div>
    </div>
  );
};

export default Comment;