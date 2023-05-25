import React, { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  NativeSelect,
  TextField,
} from '@mui/material';
import '../../styles.css';
import { SavePopoutProps } from './RouteM';
import { UserContext } from '../../Root';
import CheckBox from '@mui/material/Checkbox';

const SavePopout = ({
  openPopup,
  setOpenPopup,
  routeName,
  setRouteName,
  category,
  setCategory,
  isPrivate,
  setIsPrivate,
  directions,
  saveRoute,
  setSaveMessage,
}: SavePopoutProps) => {
  const { isDark } = useContext(UserContext);

  const handleSave = () => {
    saveRoute(routeName, category, isPrivate);
    setRouteName('');
    setCategory('None');
    setIsPrivate(false);
    setOpenPopup(false);
  };

  const handleCancel = () => {
    setCategory('None');
    setIsPrivate(false);
    setRouteName('');
    setOpenPopup(false);
  };

  return (
    <Dialog
      open={openPopup}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: isDark ? '#707070' : '#ececec',
          margin: '10px',
          padding: '10px',
        },
      }}
    >
      <DialogTitle sx={{ fontSize: '2rem', textAlign: 'center' }}>
        Save Route
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          sx={{
            height: '8vh',
            '& .MuiInputBase-root': {
              height: '5vh',
              backgroundColor: isDark ? '#ececec' : '#FFFFFF',
              boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          type='text'
          placeholder='Enter Name of Route...'
          inputProps={{ style: { color: isDark ? '#FFFFFF' : 'black' } }}
        />
        <FormControl
          fullWidth
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            style={{
              marginLeft: '10px',
              paddingBottom: '10px',
              paddingTop: '5px',
            }}
          >
            <InputLabel
              variant='standard'
              htmlFor='uncontrolled-native'
              sx={{ marginLeft: '10px', marginTop: '5px' }}
            >
              Category
            </InputLabel>
            <NativeSelect
              defaultValue={category}
              inputProps={{
                name: 'category',
                id: 'uncontrolled-native',
                style: {
                  color: isDark ? '#FFFFFF' : 'black',
                },
              }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={'None'}>None</option>
              <option value={'Casual'}>Casual</option>
              <option value={'Speedy'}>Speedy</option>
              <option value={'Scenic'}>Scenic</option>
            </NativeSelect>
          </div>
          <FormControlLabel
            control={
              <CheckBox
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                onClick={() => setIsPrivate(!isPrivate)}
              />
            }
            label='Private?'
            sx={{ marginLeft: '10px' }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SavePopout;
