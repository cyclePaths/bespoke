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

   const dateFormatter = (createdAt) => {
    let formattedString = `${createdAt.slice(6,7)}`
}

useEffect(() => {
}, [context])
console.log(comments)
 //(<Comment comment={comment} key={ i }/>))}
   return (
    <div  className='bulletin' style={{ backgroundColor: '#94edd7', fontFamily: 'roboto'}}>
      <h4 className='bulletinTopic'><i>{topic}</i> --{creator} at {createdAt}</h4>
      <div style={{ display: 'inline-block' }} className='bulletinText'>{text}
      <CreateComment bulletinOrigin={ id } style={{ display: 'flex'}}/>
      </div>
      {filteredComments.map((comment, i) => (<Comment comment={comment} key={ i }/>))}
    </div>
   )
};

export default Bulletin;
