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
  IconButton,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { RouteListOptions } from '../../StyledComp';

interface Props {
  fetchRoutes: (privacy: boolean, category: string) => void;
  routeList: any;
  setRouteList: React.Dispatch<any>;
  // reportsList: any;
  // setReportsList: React.Dispatch<any>;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  isPrivate: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const FetchedRoutes = ({
  fetchRoutes,
  routeList,
  setRouteList,
  // reportsList,
  // setReportsList,
  setIsPrivate,
  isPrivate,
  setOpenSearch,
  category,
  setCategory,
}: Props) => {
  const user = useContext(UserContext);

  const handleNewRoutes = () => {
    fetchRoutes(isPrivate, category);
  };

  return (
    <div className='search-form'>
      <RouteListOptions>
        <FormControl>
          <div>
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
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='None'>None</option>
              <option value='Casual'>Casual</option>
              <option value='Speedy'>Speedy</option>
              <option value='Scenic'>Scenic</option>
            </NativeSelect>
            <IconButton aria-label='Search' onClick={() => handleNewRoutes()}>
              <SearchIcon />
            </IconButton>
          </div>
        </FormControl>
        <FormControlLabel
          control={<Switch onChange={(e) => setIsPrivate(e.target.checked)} />}
          sx={{ width: 50, display: 'table-header-group' }}
          label='User Routes Only'
        />
      </RouteListOptions>
      <button onClick={() => setOpenSearch(false)}>Exit</button>
    </div>
  );
};

export default FetchedRoutes;
