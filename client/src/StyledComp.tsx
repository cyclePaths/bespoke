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
  flex-wrap: wrap;
`;

const ForecastEntry = styled.div`
  border-style: solid;
  background-color: rgb(84, 191, 165);
`;

const WeatherIcon = styled.img`
  display: flex;
  height: 100px;
  width: 100px;
`;

const ForecastBit = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 200px;
`;

const ForecastText = styled.p`
  margin: 0;
`;

const ForecastHelperIcon = styled.img`
  margin-left: -13px;
  height: 45px;
  width: 46px;
`;

export {
  ForecastBit,
  ForecastText,
  ForecastHelperIcon,
  InputLayout,
  DropdownLayout,
  RouteButton,
  ForecastRowContainer,
  ForecastEntry,
  WeatherIcon,
};
