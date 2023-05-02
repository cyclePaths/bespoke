import React from 'react';
import {
  PopoutSaveForm,
  InputLayout,
  CategorySelector,
  OptionsDiv,
} from '../../StyledComp';
import Button from '@mui/material/Button';
import '../../styles.css';

interface SaveProps {
  routeName: string;
  setRouteName: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  directions: google.maps.DirectionsResult | undefined;
  saveRoute: (name: string, category: string, privacy: boolean) => void;
}

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
}: SaveProps) => {
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
              backgroundColor: '#e0e0e0',
              padding: '3px',
              borderRadius: '3px',
              border: '1px solid',
              borderColor: 'rgb(118, 118, 118) rgb(133, 133, 133)',
              boxShadow: '0px 1px 0px rgba(0,0,0,0.2)',
              alignItems: 'center',
            }}
          >
            <div id='set-private'>Private?</div>
            <input
              type='checkbox'
              onClick={() => (setIsPrivate(true), console.log(isPrivate))}
            />
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
