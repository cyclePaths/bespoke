import styled, { createGlobalStyle } from 'styled-components';

type DarkModeHelperProps = {
  isDark: boolean;
};

const Button = styled.button`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-bottom: 16px;
`;

const RouteCreatorComponent = styled.div`
  text-align: center;
`;

const PopoutSaveForm = styled.form`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: white;
  border-radius: 4px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  width: 91%;
`;

const CategorySelector = styled.select`
  border-radius: 3px;
  background-color: #e0e0e0;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
`;

const OptionsDiv = styled.div`
  display: flex;
  place-content: flex-start space-evenly;
  margin: 15px;
  flex-wrap: wrap;
  flex-direction: column;
`;

const InputLayout = styled.input`
  height: 30px;
  width: 75%;
  margin: 5px;
  border-radius: 2px;
  background-color: #e0e0e0;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  border-style: hidden;
  text-align: center;
`;

const StartRouteContainer = styled.div`
  text-align: center;
  z-index: 1000;
  position: absolute;
  width: 100%;
  top: 12%;
`;

const SaveAlert = styled.span`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px;
  z-index: 1005;
  width: 141px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 88.5%;
  border-radius: 6px;
  padding: 5px;
  font-weight: bold;
`;

const AutoCompleteDropdownLayout = styled.div`
  text-align: center;
  position: absolute;
  top: 100%;
  left: 50%;
  background-color: #ffffff;
  transform: translateX(-50%);
  z-index: 1000;
  border: 1px solid #d3d3d3;
  border-top: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

const RouteButtonContainer = styled.div`
  position: fixed;
  bottom: 96px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  right: 4px;
`;

const RouteListOptions = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`;

const RouteList = styled.div`
  display: flex;
  border: 1px inset black;
  justify-content: space-evenly;
  align-content: space-between;
`;

const StatsDivs = styled.div`
  background-color: white;
  margin: 5px;
  /* box-shadow: 0px 1px 3px #121212; */
  border-radius: 2px;
`;

//Related to Badges and Achievements

const AchievementBadgeByName = styled.img`
  height: 30px;
  width: 30px;
`;

const AchievementBadgeTooltip = styled.span`
  visibility: hidden;
  padding: 5px 0;
  border-radius: 6px;
  text-align: center;
  position: absolute;
  z-index: 1;
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 1s;
`;

const TooltipBox = styled.div<DarkModeHelperProps>`
  width: 150px;
  border: 10px solid green;
  padding: 25px;
  margin: 10px;
  background-color: ${(props) =>
    props.isDark ? '#191a35' : 'rgb(133, 211, 255)'};
`;

const AchievementBadge = styled.img`
  height: 35px;
  width: 35px;
  margin-left: 12px;
  margin-right: 12px;
`;

const AchievementBadgeAndTooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${AchievementBadgeTooltip} {
    visibility: visible;
    opacity: 1;
  }
`;

const AchievementBadgeHolder = styled.span`
  display: none;
`;

//For use in Forecasts/Weather

const ForecastRowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ForecastEntry = styled.div<DarkModeHelperProps>`
  justify-content: center;
  margin-top: 35px;
  margin-left: 35px;
  margin-bottom: 5px;
  width: 145px;
  align-items: center;
  border-radius: 50px;
  box-shadow: ${(props) =>
    props.isDark
      ? '20px 20px 60px #171830, -10px -10px 5px #1b1c3a'
      : '20px 20px 60px #8adbff, -10px -10px 5px #80cbf5'};
  background: ${(props) =>
    props.isDark
      ? 'linear-gradient(145deg, #3f9952, #358145)'
      : 'linear-gradient(145deg, #7be795, #68c27d)'};
`;

const WeatherIcon = styled.img`
  display: flex;
  height: 65px;
  width: 65px;
`;

const WeatherIconFrame = styled.div<DarkModeHelperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 75px;
  border-radius: 50%;
  background: ${(props) => (props.isDark ? '#3b8f4d' : '#73d88b')};
  box-shadow: ${(props) =>
    props.isDark
      ? 'inset 20px 20px 39px #368246, inset -20px -20px 39px #409c54'
      : 'inset 20px 20px 23px #65be7a, inset -20px -20px 23px #81f29c'};
  margin-top: 10px;
  margin-left: -45px;
`;

const ForecastBit = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  width: 115px;
  margin-left: 15px;
  margin-top: 7px;
`;

const ForecastStatsBox = styled.div<DarkModeHelperProps>`
  height: 95px;
  width: 150px;
  margin-left: 0px;
  margin-top: 65px;
  margin-bottom: 15px;
  border-radius: 30px;
`;

const ForecastStatHolder = styled.p`
  display: flex;
  position: relative;
  justify-content: flex-end;
  font-size: 11px;
`;

// old ForecastStatsBox visual stuff
//    background: ${(props) => (props.isDark ? '#3b8f4d' : '#73d88b')};
//    box-shadow: ${(props) => props.isDark
//       ? 'inset 20px 20px 39px #368246, inset -20px -20px 39px #409c54'
//       : 'inset 20px 20px 23px #65be7a, inset -20px -20px 23px #81f29c'};

const WeatherDescription = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100px;
  margin-left: 31px;
`;

const ForecastText = styled.p`
  margin-left: 0px;
  margin-right: auto;
  font-size: 11px;
`;

const ForecastTime = styled.p`
  font-size: 20px;
  margin-left: 8px;
`;

const MainTemperature = styled.div`
  display: flex;
  margin-top: 22px;
  align-items: center;
  font-size: 34px;
`;

const MainTemperatureFrame = styled.div<DarkModeHelperProps>`
  height: 75px;
  width: 75px;
  margin-top: 61px;
  margin-left: 20px;
  border-radius: 50%;
  background: ${(props) =>
    props.isDark
      ? 'linear-gradient(145deg, #3f9952, #358145)'
      : 'linear-gradient(145deg, #7be795, #68c27d)'};
`;

const MainTemperatureText = styled.p`
  margin: -5px 0px -1px 9px;
`;

const AdjustedTemperature = styled.div`
  display: flex;
  margin-top: 32px;
  margin-left: 26px;
  align-items: center;
`;

const AdjustedTemperatureText = styled.p`
  margin: -5px 0px -5px 8px;
`;

const AdjustedTemperatureHelperIcon = styled.img`
  margin-top: 27px;
  margin-left: -15px;
  height: 30px;
  width: 45px;
`;

const ForecastHelperIcon = styled.img`
  margin-top: -5px;
  margin-left: -10px;
  height: 35px;
  width: 35px;
`;

const WindspeedHelperIcon = styled.img`
  margin-top: -5px;
  margin-left: -10px;
  height: 35px;
  width: 35px;
`;

const ConditionalHelperIcon = styled.img`
  position: absolute;
  margin-top: 26px;
  margin-left: -34px;
  height: 45px;
  width: 46px;
`;

const BigTemperatureHelperIcon = styled.img`
  position: absolute;
  margin-left: 24px;
  margin-top: -14px;
  max-height: 50px;
  max-width: 66px;
  height: 100%;
  width: 100%;
`;

// This is the start of the home page //

const ForecastRowContainerforHome = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  width: 52.7%;
`;

const HomePageCompWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
`;

const GoHomeIcon = styled.img`
  width: 77%;
  position: absolute;
  top: 59%;
`;

// Misc styled components

const NavBarTop = styled.span`
  background-color: rgb(218, 220, 218);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: fixed;
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  height: 6.6vh;
  z-index: 1000;
`;

const BandAid = styled.div`
  padding-top: 6.4vh;
  padding-bottom: 2vh;
`;

//tried to use this to get Toast notifications to display below
//the navbar, but it didn't work

const ToastBuffer = styled.div`
  padding-top: 30px;
`;

export {
  ForecastBit,
  ForecastStatsBox,
  ForecastStatHolder,
  WeatherDescription,
  ForecastText,
  ForecastTime,
  MainTemperature,
  MainTemperatureFrame,
  MainTemperatureText,
  AdjustedTemperature,
  AdjustedTemperatureText,
  AdjustedTemperatureHelperIcon,
  ForecastHelperIcon,
  WindspeedHelperIcon,
  ConditionalHelperIcon,
  BigTemperatureHelperIcon,
  InputLayout,
  AutoCompleteDropdownLayout,
  RouteButtonContainer,
  ForecastRowContainer,
  ForecastEntry,
  WeatherIcon,
  WeatherIconFrame,
  StartRouteContainer,
  RouteCreatorComponent,
  PopoutSaveForm,
  CategorySelector,
  OptionsDiv,
  RouteListOptions,
  RouteList,
  AchievementBadgeByName,
  AchievementBadgeTooltip,
  TooltipBox,
  AchievementBadge,
  AchievementBadgeAndTooltipContainer,
  AchievementBadgeHolder,
  NavBarTop,
  BandAid,
  SaveAlert,
  HomePageCompWrapper,
  GoHomeIcon,
  ForecastRowContainerforHome,
  StatsDivs,
  ToastBuffer,
};
