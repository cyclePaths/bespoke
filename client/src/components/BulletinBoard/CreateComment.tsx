import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Root';
import { ThemeProvider, Typography, OutlinedInput, Button} from'@mui/material'
import themeBulletin from './ThemeBulletin'
import axios from 'axios';



const CreateComment = (props) => {
    const context = useContext(UserContext)
    const { bulletinOrigin } = props.bulletinOrigin

    const [commentText, setCommentText] = useState('')

    const handleCommentText = (e) => {
      setCommentText(e.target.value)
    }

    const handleCommentSubmission = () => {
       if (commentText) {
         axios.post('/comment', {
            //bulletinOrigin: bulletinOrigin,
            commentCreator: context.name,
            commentText: commentText
          })
          .then(() => {
            setCommentText('')
          })
          .catch(() => alert('Unable to make Comment!'));
       } else {
         alert('Add text to Comment!')
        }
    }




    return (
    <div style={{ textAlign: 'right', marginBottom: '5px', maxHeight: '10px', minHeight: '10px' }}>
    <ThemeProvider theme={themeBulletin}>
        <div id='commentTextField' style={{ display: 'inline-block'}}>
        <OutlinedInput style={{ backgroundColor: '#94edd7', marginTop: '20px',
                                maxHeight: '20px', minHeight: '20px' }}
            multiline={false}
            rows='1'
            placeholder="this will get moved"
            inputProps={{
              maxLength: 1000,
              onChange: (e) => handleCommentText(e),
              value: commentText,
            }}
            />
        </div>
        <div id="submitCommentButton" style={{ display: 'inline-block '}}>
         <Button style={{ maxWidth: '100px', maxHeight: '25px', backgroundColor: '#17332c',
                          minWidth: '100px', minHeight: '25px', }}
          onClick={() => handleCommentSubmission()}
          >
          <i>Comment</i>
          </Button>
        </div>
    </ThemeProvider>
    </div>
  );
};

export default CreateComment