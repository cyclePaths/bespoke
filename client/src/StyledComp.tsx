import styled from 'styled-components';

const RouteCreatorComponent = styled.div`
  display: block;
  margin-top: 100px;
  text-align: center;
`;

const InputLayout = styled.input`
  height: 25px;
  width: 75%;
  margin-bottom: 10px;
`;

const StartRouteContainer = styled.div`
  display: block;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
`;

const DropdownLayout = styled.div`
  box-shadow: black;
  margin-bottom: 10px;
`;

const RouteButtonContainer = styled.div`
  display: block;
`;

const ForecastRowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ForecastEntry = styled.div`
  border-style: solid;
  justify-content: center;
  align-items: center;
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
  RouteButtonContainer,
  ForecastRowContainer,
  ForecastEntry,
  WeatherIcon,
  StartRouteContainer,
  RouteCreatorComponent,
};
