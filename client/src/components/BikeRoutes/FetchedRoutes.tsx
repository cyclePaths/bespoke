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
import RouteInfo from './RouteInfo';

interface Props {
  fetchRoutes: (privacy: boolean, category: string) => void;
  routeList: any[];
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  isPrivate: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setRouteList: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface Route {
  category: string;
  createdAt: Date;
  userId: number;
  destination: string[];
  origin: string[];
  likes: number;
  isPrivate: boolean;
}

const FetchedRoutes = ({
  fetchRoutes,
  routeList,
  setIsPrivate,
  isPrivate,
  setOpenSearch,
  category,
  setCategory,
  setRouteList,
}: Props) => {
  const user = useContext(UserContext);

  const handleNewRoutes = () => {
    const searchBar = document.getElementById('route-searcher');
    const findHeader = document.getElementById('list');
    const resultHeader = document.getElementById('results');

    fetchRoutes(isPrivate, category);
    findHeader!.style.display = 'none';
    searchBar!.style.display = 'none';
    resultHeader!.style.display = '';
  };

  return (
    <div className='search-form'>
      <RouteListOptions id='route-searcher' style={{ display: '' }}>
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
      {routeList.map((route, i) => (
        <RouteInfo key={i} route={route} />
      ))}
    </div>
  );
};

export default FetchedRoutes;
