import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Root';
import { ThemeProvider, Typography, OutlinedInput, Button} from'@mui/material'
import themeBulletin from './ThemeBulletin'
import axios from 'axios';



const CreateComment = (props) => {
    const context = useContext(UserContext)
    const bulletinOrigin = props.bulletinOrigin

    const [commentText, setCommentText] = useState('')

    const handleCommentText = (e) => {
      setCommentText(e.target.value)
    }

    const handleCommentSubmission = () => {
       if (commentText) {
         axios.post('/comment', {
            bulletinOrigin: bulletinOrigin,
            commentCreator: context.user.name,
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
    <div style={{ textAlign: 'left', marginBottom: '5px', maxHeight: '10px', minHeight: '10px' }}>
    <ThemeProvider theme={themeBulletin}>
        <div id='commentTextField' style={{ display: 'inline-block'}}>
        <OutlinedInput style={{ backgroundColor: 'rgb(115, 216, 138)', marginTop: '20px',
                                maxHeight: '20px', minHeight: '20px', maxWidth: '200px' }}
            multiline={false}
            rows='1'
            inputProps={{
              maxLength: 1000,
              onChange: (e) => handleCommentText(e),
              value: commentText,
            }}
            />
        </div>
        <div id="submitCommentButton" style={{ display: 'inline-block '}}>
         <Button style={{ maxWidth: '75px', maxHeight: '25px', backgroundColor: '#17332c',
                          minWidth: '75px', minHeight: '25px', marginBottom: '5px', marginLeft: '5px' }}
          onClick={() => handleCommentSubmission()}
          >
          <h5>Comment</h5>
          </Button>
        </div>
    </ThemeProvider>
    </div>
  );
};

export default CreateComment