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
   const [comments, setComments] = useState([])

const dateFormatter = (createdAt) => {

}

 //(<Comment comment={comment} key={ i }/>))}
   return (
    <div  className='bulletin' style={{ backgroundColor: '#94edd7', fontFamily: 'roboto'}}>
      <h4 className='bulletinTopic'><i>{topic}</i> --{creator} at {createdAt}</h4>
      <div style={{ display: 'inline-block' }} className='bulletinText'>{text}
      <CreateComment bulletinOrigin={ id } style={{ display: 'flex'}}/>
      </div>
      {comments.map((comment, i) => <div>tester!!!!!</div>)}
    </div>
   )
};

export default Bulletin;
