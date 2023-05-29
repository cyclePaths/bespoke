import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { RouteInfoSpan, RouteInfoDiv, RouteDivBox } from '../../StyledComp';
import { UserContext } from '../../Root';

const RouteExpandedPopout = ({
  openRouteInfo,
  setOpenRouteInfo,
  routeInfo,
  info,
}) => {
  const { isDark } = useContext(UserContext);

  return (
    <Dialog
      open={openRouteInfo}
      onClose={() => {
        setOpenRouteInfo(false);
      }}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: isDark ? '#969696' : '#ececec',
          color: isDark ? '#ececec' : 'black',
          margin: '10px',
          width: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 700 }}
      >
        Route Info
      </DialogTitle>
      <DialogContent sx={{ padding: '10px' }}>
        {info ? (
          <RouteDivBox isDark={isDark}>
            <RouteInfoSpan>
              <h3 style={{ marginTop: '10px', marginBottom: '10px' }}>Name:</h3>
              <RouteInfoDiv>{routeInfo.name}</RouteInfoDiv>
            </RouteInfoSpan>
            <RouteInfoSpan>
              <h3 style={{ marginTop: '10px', marginBottom: '10px' }}>
                Distance:
              </h3>
              <RouteInfoDiv>{info.distance}</RouteInfoDiv>
            </RouteInfoSpan>
            <RouteInfoSpan>
              <h3 style={{ marginTop: '10px', marginBottom: '10px' }}>
                Duration:
              </h3>
              <RouteInfoDiv>{info.duration}</RouteInfoDiv>
            </RouteInfoSpan>
            <RouteInfoSpan>
              <h3 style={{ marginTop: '10px', marginBottom: '10px' }}>
                Start:
              </h3>
              <RouteInfoDiv>{info.startAddress}</RouteInfoDiv>
            </RouteInfoSpan>
            <RouteInfoSpan>
              <h3 style={{ marginTop: '10px', marginBottom: '10px' }}>End:</h3>
              <RouteInfoDiv>{info.endAddress}</RouteInfoDiv>
            </RouteInfoSpan>
            <div></div>
          </RouteDivBox>
        ) : (
          <RouteDivBox>Nothing</RouteDivBox>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RouteExpandedPopout;
