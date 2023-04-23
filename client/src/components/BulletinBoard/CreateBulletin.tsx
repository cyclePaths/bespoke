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

    const handleBulletinSubmission = (e) => {
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
        <div id='topic'>
          <OutlinedInput
            style={{ backgroundColor: 'white', marginTop: '30px' }}
            multiline={false}
            rows='1'
            placeholder='enter topic'
            />
        </div>
    </ThemeProvider>
    </div>
  );
};
export default CreateBulletin;
