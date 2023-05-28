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
   const { id, topic, creator, text, createdAt } = props.bulletin
   //below formats the comments so only a bulletin's comments show
   const comments = props.comments
   const updateComments = props.updateComments
   const getAllBulletins = props.getAllBulletins
   const filteredComments = comments.filter((comment) => (comment.bulletinOrigin === id))
   const formattedDate = `${createdAt.slice(6,10)}-${createdAt.slice(2, 4)}`
   //at ${createdAt.slice(11, 16)}


useEffect(() => {
}, [context])

let deleteHolder = <DeleteBulletin style={{ position: 'absolute', top: '0px', right: '5px'}} creator={creator} id={id} getAllBulletins={getAllBulletins}/>
   return (
   <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                 paddingBottom: '20px', paddingTop: '10px', minWidth: '50%', maxWidth: '100%'}}>
       <div  className='bulletin' style={{  fontFamily: 'roboto', minWidth: '93%', maxWidth: '93%', border: '0px solid #000000',
          borderRadius: '4px', background: context.isDark
          ? 'linear-gradient(145deg, #1e2062, #030312)'
          : 'linear-gradient(145deg, #3cc6f6, #d8f1ff)',
          boxShadow: context.isDark
          ? '1.25em 1.25em 3.75em rgb(40, 43, 113)'
          : '-8px 2px 6px rgba(0, 0, 0, 0.3)',
          position: 'relative',}}>
       <div className='bulletinTopic' style={{ display: 'flex', alignItems: 'center', paddingLeft:'10px', paddingRight:'10px', paddingTop: '3px'}}>
         <span><b>{topic} -- <i>{creator} -- {formattedDate}</i></b></span>
         <span style={{ marginLeft: 'auto' }}><div style={{paddingLeft:'5px'}}/>{deleteHolder}</span></div>
      <div className='bulletinText' style={{ display: 'inline-block', paddingLeft:'10px', paddingRight:'10px', paddingTop: '15px', overflowWrap:'break-word'}}>{text}
      <CreateComment bulletinOrigin={ id } updateComments={updateComments}/>
      </div>
      {filteredComments.map((comment, i) => (<Comment comment={comment} key={ i }/>))}
      <div style={{paddingTop:'5px'}}/>
    </div>
   </div>
   )
};

export default Bulletin;
