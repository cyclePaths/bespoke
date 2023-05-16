import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Root';
import {
  InputLabel,
  FormControl,
  NativeSelect,
  Switch,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { RouteListOptions } from '../../StyledComp';
import RouteInfo from './RouteInfo';
import { FetchedRoutesProps } from './RouteM';
import axios from 'axios';

const FetchedRoutes = ({
  fetchRoutes,
  routeList,
  setIsPrivate,
  isPrivate,
  setOpenSearch,
  category,
  setCategory,
  setRouteList,
  handleRouteClick,
  fetchDirections,
  likeList,
  setMarkers,
}: FetchedRoutesProps) => {

  const [searched, setSearched] = useState(false);

  const handleNewRoutes = () => {
    const searchBar = document.getElementById('route-searcher');
    const findHeader = document.getElementById('list');
    const resultHeader = document.getElementById('results');

    fetchRoutes(isPrivate, category);
    setSearched(true);

    findHeader!.style.display = 'none';
    searchBar!.style.display = 'none';
    resultHeader!.style.display = '';
  };

  const deleteRoute = (routeNum: number, likesCount: number) => {
    axios
      .delete(`bikeRoutes/deleteRoute/${routeNum}`, { data: { likesCount } })
      .then(() => {
        setRouteList(() => routeList.filter((route) => route.id !== routeNum));
      })
      .catch((err) => console.error('Failed Delete Request: ', err));
  };

  return (
    <div className='search-form'>
      <RouteListOptions id='route-searcher' style={{ display: '' }}>
        <FormControl>
          <div id='search-criteria'>
            <div id='category'>
              <InputLabel
                id='Search-by-category'
                variant='standard'
                htmlFor='uncontrolled-native'
              >
                Category
              </InputLabel>
              <NativeSelect
                defaultValue='None'
                inputProps={{ name: 'category', id: 'uncontrolled-native' }}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='None'>None</option>
                <option value='Casual'>Casual</option>
                <option value='Speedy'>Speedy</option>
                <option value='Scenic'>Scenic</option>
              </NativeSelect>
            </div>
            <IconButton
              aria-label='Search'
              onClick={() => handleNewRoutes()}
              sx={{ marginLeft: '20px' }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </FormControl>
        <FormControlLabel
          control={<Switch onChange={(e) => setIsPrivate(e.target.checked)} />}
          sx={{ marginTop: '10px' }}
          label='User Routes Only'
        />
      </RouteListOptions>
      {searched ? (routeList.length === 0 ? <div id='no-list'>No Routes Found</div> : routeList.map((route, i) => {
        const index = i;
        return (
          <RouteInfo
            key={i}
            route={route}
            index={index}
            handleRouteClick={handleRouteClick}
            setOpenSearch={setOpenSearch}
            fetchDirections={fetchDirections}
            routeList={routeList}
            setRouteList={setRouteList}
            likeList={likeList}
            setMarkers={setMarkers}
            deleteRoute={deleteRoute}
          />
        );
      })) : <></>}
    </div>
  );
};

export default FetchedRoutes;
