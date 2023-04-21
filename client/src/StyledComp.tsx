import styled from 'styled-components';

const InputLayout = styled.input`
  border-color: black;
  align-items: center;
  margin-bottom: 10px;
`;

const DropdownLayout = styled.div`
  box-shadow: black;
  margin-bottom: 10px;
`;

const RouteButton = styled.button`
  margin-left: 10px;
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
  height: 45px;
  width: 45px;
`;

export {
  ForecastBit,
  ForecastHelperIcon,
  InputLayout,
  DropdownLayout,
  RouteButton,
  ForecastRowContainer,
  WeatherIcon,
};
