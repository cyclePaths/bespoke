import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Root';
import { ThemeProvider, Typography, OutlinedInput, Button} from'@mui/material'
import themeBulletin from './ThemeBulletin'
import axios from 'axios';



const CreateComment = () => {
    const context = useContext(UserContext)

    const [commentText, setCommentText] = useState('')

    const handleCommentText = (e) => {
      setCommentText(e.target.value)
    }

    const handleCommentSubmission = () => {
       if (commentText) {
         axios.post('/comments', {
            creator: context.name,
            commentText,
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
    <div style={{ textAlign: 'center', marginBottom: '45px' }}>
    <ThemeProvider theme={themeBulletin}>
        <div id='commentTextField' style={{ display: 'inline-block '}}>
        <OutlinedInput style={{ backgroundColor: '#94edd7', marginTop: '20px' }}
            multiline={false}
            rows='1'
            placeholder='enter comment'
            inputProps={{
              maxLength: 1000,
              onChange: (e) => handleCommentText(e),
              value: commentText,
            }}
            />
        </div>
        <div id="submitCommentButton" style={{ display: 'inline-block '}}>
         <Button style={{ maxWidth: '100px', maxHeight: '25px', backgroundColor: '#17332c',
                          minWidth: '100px', minHeight: '25px', marginLeft: '15px'}}
          onClick={() => handleCommentSubmission()}
          >
          <i>Add Comment</i>
          </Button>
        </div>
    </ThemeProvider>
    </div>
  );
};

export default CreateComment