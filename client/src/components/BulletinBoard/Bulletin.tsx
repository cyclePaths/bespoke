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
   <div style ={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                 paddingBottom: '20px', paddingTop: '10px', minWidth: '50%', maxWidth: '100%'}}>
       <div  className='bulletin' style={{  fontFamily: 'roboto', minWidth: '95%', maxWidth: '95%', border: '1px solid #000000',
          borderRadius: '4px', background: context.isDark
          ? '1.25em 1.25em 3.75em #282b71, -0.625em -0.625em 1.3125em #282b71'
          : '1.25em 1.25em 3.75em #8adbff, -0.625em -0.625em 1.3125em #80cbf5',
          boxShadow: context.isDark
          ? 'inset 1.25em 1.25em 1.4375em #030312, inset -1.25em -1.25em 1.4375em #1e2062, #282b71 -5px -5px 15px'
          : 'inset 1.25em 1.25em 1.4375em #59bddf, inset -1.25em -1.25em 1.4375em #71b3d9, #71b3d9 -5px -5px 15px',
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
