import React, { useState, useEffect } from 'react';
import CreateComment from './CreateComment';
import axios from 'axios';
import Comment from './Comment';
//Styling
import Card from '@mui/material/Card';



const Bulletin = (props) => {
   const { id, topic, creator, text, createdAt } = props.bulletin
   const [comments, setComments] = useState([])

const dateFormatter = (createdAt) => {

}

// Function to retrieve all comments
const getAllComments = () => {
   axios.get('/comment')
   .then((commentData) => {
     setComments(commentData.data.filter((comment) => commentData.data.id === id))
   })
   .catch((error) => {
     console.error(error);
   });
 };

 //useEffect hook populates with comments
 useEffect(() => {
   getAllComments();
 }, [])


   return (
    <div  className='bulletin' style={{ backgroundColor: '#94edd7', fontFamily: 'roboto'}}>
      <h4 className='bulletinTopic'><i>{topic}</i> --{creator} at {createdAt}</h4>
      <div style={{ display: 'inline-block' }} className='bulletinText'>{text}
      <CreateComment bulletinOrigin={ id } style={{ display: 'flex'}}/>
      </div>
      {comments.map((comment, i) => (<Comment comment={comment} key={ i }/>))}
    </div>
   )
};

export default Bulletin;
