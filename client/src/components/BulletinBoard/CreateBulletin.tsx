import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Root';
import { ThemeProvider, Typography, OutlinedInput, Button} from'@mui/material'
import themeBulletin from './ThemeBulletin'
import axios from 'axios';



const CreateBulletin = () => {
    const context = useContext(UserContext)

    const [topic, setTopic] = useState('')
    const [text, setText] = useState('')

    const handleTopic = (e) => {
        setTopic(e.target.value)
    };

    const handleText = (e) => {
      setText(e.target.value)
    }

    const handleBulletinSubmission = () => {
       if (topic && text) {
         axios.post('/bulletin', {
            creator: context.name,
            topic,
            text,
          })
          .then(() => {
            setTopic('');
            setText('')
          })
          .catch(() => alert('Unable to make Bulletin!'));
       } else {
         alert('Add topic and text to Bulletin!')
        }
    }




    return (
    <div>
    <ThemeProvider theme={themeBulletin}>
        <div id='topicField' style={{ display: 'inline-block '}}>
          <OutlinedInput
            style={{ backgroundColor: '#94edd7', marginTop: '30px' }}
            multiline={false}
            rows='1'
            placeholder='enter topic'
            inputProps={{
              maxLength: 100,
              onChange: (e) => handleTopic(e),
              value: topic,
            }}
            />
        </div>
        <div id='textField' style={{ display: 'inline-block '}}>
        <OutlinedInput style={{ backgroundColor: '#94edd7', marginTop: '20px' }}
            multiline={false}
            rows='1'
            placeholder='enter bulletin message'
            inputProps={{
              maxLength: 1000,
              onChange: (e) => handleText(e),
              value: text,
            }}
            />
        </div>
        <div id="submitButton" style={{ display: 'inline-block '}}>
         <Button style={{ maxWidth: '200px', maxHeight: '50px', backgroundColor: '#17332c',
                          minWidth: '200px', minHeight: '50px', marginLeft: '15px'}}
          onClick={() => handleBulletinSubmission()}
          >
          <i>Submit Bulletin</i>
          </Button>
        </div>
    </ThemeProvider>
    </div>
  );
};
export default CreateBulletin;
