import React, { useState, useContext } from 'react';
import { UserContext } from '../../Root';
import { ThemeProvider, OutlinedInput, Button} from'@mui/material'
import themeBulletin from './ThemeBulletin'
import axios from 'axios';



const CreateBulletin = (props) => {
    const { bulletins, setBulletins } = props
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
          .then((response) => {
            let submittedBulletin = response.data
            setTopic('');
            setText('')
            props.updateBulletins(submittedBulletin)
          })
          .catch(() => alert('Unable to make Bulletin!'));
       } else {
         alert('Add topic and text to Bulletin!')
        }
    }




    return (
    <div style={{ textAlign: 'center' }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div id='topicField' style={{ display: 'inline-block', textAlign: 'left'}}>
          <OutlinedInput
            style={{ color: context.isDark ? '#FFFFFF' : '#000000', backgroundColor: context.isDark ? '#757575' : '#ECECEC', marginTop: '10px',
                     maxWidth: '175px', maxHeight: '25px', minWidth: '175px', minHeight: '25px' }}
            multiline={false}
            rows='1'
            placeholder='bulletin topic'
            inputProps={{
              maxLength: 100,
              onChange: (e) => handleTopic(e),
              value: topic,
            }}
            />
        </div>
        <div id='textField' style={{ display: 'inline-block ', marginTop: '10px'}}>
        <OutlinedInput style={{ color: context.isDark ? '#FFFFFF' : '#000000',backgroundColor: context.isDark ? '#757575' : '#ECECEC', marginTop: '5px',
                               maxWidth: '275px', maxHeight: '75px', minWidth: '275px', minHeight: '75px' }}
            multiline={true}
            rows='3'
            placeholder='bulletin message'
            inputProps={{
              maxLength: 1000,
              onChange: (e) => handleText(e),
              value: text,
            }}
            />
        </div>
        </div>
        <Button variant='contained' color='success' style={{ maxWidth: '75px', maxHeight: '25px',
               minWidth: '75px', minHeight: '25px', marginLeft: '0px', marginTop: '5px', marginBottom: '5px'}}
          onClick={() => handleBulletinSubmission()}
          >
          <h5>Submit</h5>
          </Button>

    </div>
  );
};
export default CreateBulletin;
