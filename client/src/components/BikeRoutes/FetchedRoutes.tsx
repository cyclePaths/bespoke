import React, { useContext } from 'react';
import { CategorySelector } from '../../StyledComp';
import { UserContext } from '../../Root';
import {
  InputLabel,
  MenuItem,
  FormControl,
  NativeSelect,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  fetchMaps: (user_id: number | undefined) => void;
  routeList: any;
  setRouteList: React.Dispatch<any>;
  reportsList: any;
  setReportsList: React.Dispatch<any>;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  isPrivate: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const FetchedRoutes = ({
  fetchMaps,
  routeList,
  setRouteList,
  reportsList,
  setReportsList,
  setIsPrivate,
  isPrivate,
  setOpenSearch,
}: Props) => {
  const user = useContext(UserContext);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 100 }} size='small'>
        <InputLabel
          id='Search-by-category'
          variant='standard'
          htmlFor='uncontrolled-native'
        >
          Category
        </InputLabel>
        <NativeSelect
          defaultValue='Category'
          inputProps={{ name: 'category', id: 'uncontrolled-native' }}
        >
          <option value='Casual'>Casual</option>
          <option value='Speedy'>Speedy</option>
          <option value='Scenic'>Scenic</option>
        </NativeSelect>
      </FormControl>
      <FormControlLabel
        control={<Switch />}
        label='Show Private'
        onClick={() => setIsPrivate(!!isPrivate)}
      />
      <button onClick={() => setOpenSearch(false)}>Exit</button>
    </div>
  );
};

export default FetchedRoutes;
