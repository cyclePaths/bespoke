import React from 'react';
import {
  PopoutSaveForm,
  InputLayout,
  CategorySelector,
  OptionsDiv,
} from '../../StyledComp';
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
        <h2 className='centered-header'>Enter Name of Route:</h2>
        <InputLayout
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          type='text'
          maxLength='10'
        />
        <h2 className='centered-header'>Select Ride Options:</h2>
        <OptionsDiv>
          <CategorySelector onChange={(e) => setCategory(e.target.value)}>
            <option>Casual</option>
            <option>Speedy</option>
            <option>Scenic</option>
          </CategorySelector>
          <div>
            <strong id='set-private'>Private?</strong>
            <input
              type='checkbox'
              onClick={() => (setIsPrivate(true), console.log(isPrivate))}
            />
          </div>
          <button type='button' onClick={() => handleSave()}>
            Submit
          </button>
        </OptionsDiv>
      </PopoutSaveForm>
    </div>
  );
};

export default SaveForm;
