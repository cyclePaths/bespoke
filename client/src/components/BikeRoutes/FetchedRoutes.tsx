import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Root';
import {
  InputLabel,
  FormControl,
  NativeSelect,
  Switch,
  FormControlLabel,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
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
  const { isDark } = useContext(UserContext);
  const [searched, setSearched] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<string>('');

  const handleSelectedChange = (
    event: React.MouseEvent<HTMLElement>,
    value
  ) => {
    if (value !== null) setSelectedCat(value);
  };

  const deleteRoute = (routeNum: number, likesCount: number) => {
    axios
      .delete(`bikeRoutes/deleteRoute/${routeNum}`, { data: { likesCount } })
      .then(() => {
        setRouteList(() => routeList.filter((route) => route.id !== routeNum));
      })
      .catch((err) => console.error('Failed Delete Request: ', err));
  };

  useEffect(() => {
    if (selectedCat === '') {
      return;
    } else {
      if (selectedCat !== 'User') {
        fetchRoutes(false, selectedCat);
        setSearched(true);
      } else {
        fetchRoutes(true, selectedCat);
        setSearched(true);
      }
    }
  }, [selectedCat]);

  return (
    <div>
      <header id='list'>Search Routes</header>
      <ToggleButtonGroup
        value={selectedCat}
        exclusive
        onChange={handleSelectedChange}
        sx={{
          marginTop: '55px',
          '& .MuiToggleButton-root': {
            color: isDark ? '#7dc5e3' : '#2e5b70',
            backgroundColor: isDark ? '#757575' : '#ececec',
          },
          '& .MuiToggleButton-root.Mui-selected': {
            color: '#7dc5e3',
            backgroundColor: '#757575',
          },
          boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.2)',
        }}
      >
        <ToggleButton value='All'>All</ToggleButton>
        <ToggleButton value='Casual'>Casual</ToggleButton>
        <ToggleButton value='Speedy'>Speedy</ToggleButton>
        <ToggleButton value='Scenic'>Scenic</ToggleButton>
        <ToggleButton value='User'>User</ToggleButton>
      </ToggleButtonGroup>
      {searched ? (
        routeList.length === 0 ? (
          <div
            id='no-list'
            style={{ backgroundColor: isDark ? '#c5c5c5' : '#fff' }}
          >
            No Routes Found
          </div>
        ) : (
          <div
            id='searched-list'
            style={{ backgroundColor: isDark ? '#c5c5c5' : '#fff' }}
          >
            {routeList.map((route, i) => {
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
            })}
          </div>
        )
      ) : (
        <div
          id='nothing-searched'
          style={{ backgroundColor: isDark ? '#c5c5c5' : '#fff' }}
        >
          Routes Display Here ...
        </div>
      )}
    </div>
  );
};

export default FetchedRoutes;
