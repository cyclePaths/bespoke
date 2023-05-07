import React, { useState, useEffect, useContext } from 'react';
import CreateComment from './CreateComment';
import axios from 'axios';
import { UserContext } from '../../Root';
import Comment from './Comment';
//Styling
import Card from '@mui/material/Card';



const Bulletin = (props) => {
   const context = useContext(UserContext);
   const { id, topic, creator, text, createdAt } = props.bulletin
   //below formats the comments so only a bulletin's comments show
   const comments = props.comments
   const filteredComments = comments.filter((comment) => (comment.bulletinOrigin === id))
   const formattedDate = `${createdAt.slice(6,10)}-${createdAt.slice(2, 4)} at ${createdAt.slice(11, 16)}`


useEffect(() => {
}, [context])

   return (
    <div  className='bulletin' style={{ fontFamily: 'roboto',
          borderRadius: '5px', background: '#73d88b', boxShadow: '3px 3px 10px #62b876, -3px -3px 10px #84f8a0' }}>

      <h4 className='bulletinTopic' style={{ paddingLeft:'10px', paddingRight:'10px', paddingTop: '3px'}}>{topic} -- <i>{creator} -- {formattedDate}</i></h4>
      <div style={{ display: 'inline-block', paddingLeft:'10px', paddingRight:'10px' }}  className='bulletinText'>{text}
      <CreateComment bulletinOrigin={ id }/>
      </div>
      {filteredComments.map((comment, i) => (<Comment comment={comment} key={ i }/>))}
    </div>
   )
};

export default Bulletin;
