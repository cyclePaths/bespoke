import React, { useContext } from 'react';
import {
  PopoutSaveForm,
  InputLayout,
  CategorySelector,
  OptionsDiv,
} from '../../StyledComp';
import Button from '@mui/material/Button';
import '../../styles.css';
import { SaveProps } from './RouteM';
import { UserContext } from '../../Root';

const SaveForm = ({
  routeName,
  setRouteName,
  category,
  setCategory,
  isPrivate,
  setIsPrivate,
  setOpenPopup,
  directions,
  saveRoute,
  setSaveMessage,
}: SaveProps) => {
  const { isDark } = useContext(UserContext);

  const handleSave = () => {
    saveRoute(routeName, category, isPrivate);
    setRouteName('');
    setCategory('');
    setIsPrivate(false);
    setOpenPopup(false);
  };

  return (
    <div>
      <PopoutSaveForm>
        <header className='centered-header-Save'>Save Route:</header>
        <InputLayout
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          type='text'
          maxLength='10'
          placeholder='Enter Name of Route...'
        />
        <OptionsDiv>
          <div className='route-options'>
            <CategorySelector
              defaultValue='None'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled>None</option>
              <option>Casual</option>
              <option>Speedy</option>
              <option>Scenic</option>
            </CategorySelector>
            <div
              style={{
                display: 'flex',
                backgroundColor: isDark ? '#5f5f5f' : '#e0e0e0',
                padding: '3px',
                borderRadius: '3px',
                border: '1px solid',
                borderColor: 'rgb(118, 118, 118) rgb(133, 133, 133)',
                boxShadow: '0px 1px 0px rgba(0,0,0,0.2)',
                alignItems: 'center',
                marginLeft: '10px',
              }}
            >
              <div id='set-private'>Private?</div>
              <input
                type='checkbox'
                onClick={() => (setIsPrivate(true), console.log(isPrivate))}
              />
            </div>
          </div>
          <Button
            variant='contained'
            onClick={() => handleSave()}
            sx={{
              marginTop: '15px',
              backgroundColor: '#e0e0e0',
              color: 'black',
              height: '30px',
            }}
          >
            Save
          </Button>
        </OptionsDiv>
      </PopoutSaveForm>
    </div>
  );
};

export default SaveForm;
