import React, { useState, useEffect, useContext } from 'react';
import CreateComment from './CreateComment';
import axios from 'axios';
import { UserContext } from '../../Root';
import Comment from './Comment';
//Styling
import Card from '@mui/material/Card';
import DeleteBulletin from './DeleteBulletin';



const Bulletin = (props) => {
   const context = useContext(UserContext);
   const { id, topic, creator, text, createdAt, getAllBulletins } = props.bulletin
   //below formats the comments so only a bulletin's comments show
   const comments = props.comments
   const updateComments = props.updateComments
   const filteredComments = comments.filter((comment) => (comment.bulletinOrigin === id))
   const formattedDate = `${createdAt.slice(6,10)}-${createdAt.slice(2, 4)} at ${createdAt.slice(11, 16)}`


useEffect(() => {
}, [context])

   return (
   <div style ={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '10px', paddingTop: '10px', minWidth: '50%', maxWidth: '100%'}}>
    <div  className='bulletin' style={{ fontFamily: 'roboto', maxWidth: '600px', minWidth: '50%',
          borderRadius: '5px', background: '#73d88b', boxShadow: '3px 3px 10px #62b876, -3px -3px 10px #84f8a0' }}>

      <h4 className='bulletinTopic' style={{ paddingLeft:'10px', paddingRight:'10px', paddingTop: '3px'}}>
         {topic} -- <i>{creator} -- {formattedDate}</i>
         <DeleteBulletin creator={creator} id={id} getAllBulletins={getAllBulletins}/></h4>
      <div style={{ display: 'inline-block', paddingLeft:'10px', paddingRight:'10px', overflowWrap:'break-word'}}  className='bulletinText'>{text}
      <CreateComment bulletinOrigin={ id } updateComments={updateComments}/>
      </div>
      {filteredComments.map((comment, i) => (<Comment comment={comment} key={ i }/>))}
    </div>
   </div>
   )
};

export default Bulletin;
