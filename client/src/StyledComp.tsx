import styled from 'styled-components';

const MapLayout = styled.div`
  border-color: black;
  height: 250px;
  width: 395px;
  align-items: center;
`;

const ForecastRowContainer = styled.div`
  display: flex;
`;

const WeatherIcon = styled.img`
  display: flex;
  height: 100px;
  width: 100px;
`;

const ForecastBit = styled.div`
  display: flex;
  position: relative;
`;

const ForecastHelperIcon = styled.img`
  display: flex;
  height: 50px;
  width: 50px;
`;

export {
  MapLayout,
  ForecastRowContainer,
  WeatherIcon,
  ForecastBit,
  ForecastHelperIcon,
};
