import React, { useState, useEffect } from 'react';
import CreateComment from './CreateComment';
import axios from 'axios';
import Comment from './Comment';



const Bulletin = (props) => {
   const { id, topic, creator, text, createdAt } = props.bulletin
   const [comments, setComments] = useState([])

const dateFormatter = (createdAt) => {

}

// Function to retrieve all comments
const getAllComments = () => {
   axios.get('/bulletin')
   .then((bulletinData) => {
     setComments(bulletinData.data);
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
    <div className='bulletin' style={{ backgroundColor: '#94edd7'}}>
      <h3 className='bulletinTopic'><i>{topic}</i> --{creator} at {createdAt}</h3>
      <div style={{ display: 'inline-block' }} className='bulletinText'>{text}
      <CreateComment bulletinOrigin={ id } style={{ display: 'flex'}}/>
      </div>
      {comments.map((comment, i) => (<Comment comment={comment} key={ i }/>))}
    </div>
   )
};

export default Bulletin;
