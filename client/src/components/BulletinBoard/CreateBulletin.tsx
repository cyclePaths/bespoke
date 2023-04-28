import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Root';
import { ThemeProvider, Typography, OutlinedInput, Button} from'@mui/material'
import themeBulletin from './ThemeBulletin'
import AddEquipment from '../Equipment/AddEquipment'
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
            creator: context.user.name,
            topic,
            text
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
    <div style={{ textAlign: 'center' }}>
    <ThemeProvider theme={themeBulletin}>
        <div id='topicField' style={{ display: 'inline-block '}}>
          <OutlinedInput
            style={{ backgroundColor: '#94edd7', marginTop: '10px',
                     maxWidth: '175px', maxHeight: '25px', minWidth: '175px', minHeight: '25px' }}
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
        <OutlinedInput style={{ backgroundColor: '#94edd7', marginTop: '5px',
                               maxWidth: '175px', maxHeight: '25px', minWidth: '175px', minHeight: '25px' }}
            multiline={false}
            rows='1'
            placeholder='bulletin message'
            inputProps={{
              maxLength: 1000,
              onChange: (e) => handleText(e),
              value: text,
            }}
            />
        </div>
        <AddEquipment/>
        <div id="submitButton" style={{ display: 'inline-block '}}>
         <Button style={{ maxWidth: '75px', maxHeight: '25px', backgroundColor: '#17332c',
                          minWidth: '75px', minHeight: '25px', marginLeft: '15px'}}
          onClick={() => handleBulletinSubmission()}
          >
          <i>Submit</i>
          </Button>
        </div>
    </ThemeProvider>
    </div>
  );
};
export default CreateBulletin;
