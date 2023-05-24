import styled, { createGlobalStyle, keyframes } from 'styled-components';

export type DarkModeHelperProps = {
  isDark: boolean;
};

export type InputProps = DarkModeHelperProps & {
  secondary?: boolean;
}

export type BrightnessProps = {
  bright: number;
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

const PopoutSaveForm = styled.form<DarkModeHelperProps>`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  flex-flow: column nowrap;
  align-items: center;
  margin: 30px;
  margin-top: 60px;
`;

const CategorySelector = styled.select<DarkModeHelperProps>`
  border-radius: 3px;
  background-color: ${({ isDark }) => (isDark ? '#707070' : '#ececec')};
  color: ${({ isDark }) => (isDark ? '#ececec' : '#000000')};
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
`;

const PrivacySelector = styled.div<DarkModeHelperProps>`
  display: flex;
  background-color: ${({ isDark }) => (isDark ? '#707070' : '#ececec')};
  padding: 3px;
  border-radius: 3px;
  border: 1px solid;
  border-color: rgb(118, 118, 118) rgb(133, 133, 133);
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  align-items: center;
  margin-left: 10px;
  color: ${({ isDark }) => (isDark ? '#e0e0e0' : '#000000')};
`;

const OptionsDiv = styled.div`
  display: flex;
  place-content: flex-start space-evenly;
  margin: 15px;
  flex-wrap: wrap;
  flex-direction: column;
`;

const InputLayout = styled.input<InputProps>`
  height: 30px;
  width: ${({ secondary }) => secondary ? '85%' : '75%'};
  margin: 5px;
  border-radius: 2px;
  background-color: ${({ isDark }) => (isDark ? '#707070' : '#ececec')};
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  border-style: hidden;
  text-align: center;
  color: ${({ isDark }) => (isDark ? '#ececec' : '#707070')};
  ::placeholder {
    color: ${({ isDark }) => (isDark ? '#ececec' : '#707070')};
  }
`;

const StartRouteContainer = styled.div`
  text-align: center;
  z-index: 1000;
  position: absolute;
  width: 100%;
  top: 1%;
`;

const RouteAlerts = styled.span<DarkModeHelperProps>`
  background-color: ${({ isDark }) => (isDark ? '#707070' : '#ececec')};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px;
  z-index: 1005;
  width: 130px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 83%;
  border-radius: 6px;
  padding: 5px;
  color: ${({ isDark }) => (isDark ? '#ececec' : 'black')};
`;

const AutoCompleteDropdownLayout = styled.div<DarkModeHelperProps>`
  text-align: center;
  position: absolute;
  top: 100%;
  left: 50%;
  background-color: ${({ isDark }) => (isDark ? '#707070' : '#ececec')};
  transform: translateX(-50%);
  z-index: 1000;
  border: 1px solid #d3d3d3;
  border-top: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

const LoadingDiv = styled.div<DarkModeHelperProps>`
  background-color: ${({ isDark }) => (isDark ? '#707070' : '#ececec')};
  color: ${({ isDark }) => (isDark ? '#ececec' : '#707070')};
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

// Home Page stuff //
const StatsWrapper = styled.span<DarkModeHelperProps>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 10px;
`;

const RecentRidesHeader = styled.header<DarkModeHelperProps>`
  color: ${({ isDark }) => (isDark ? '#ececec' : '#000000')};
`;

//Related to Badges and Achievements

const AchievementBadgeByName = styled.img`
  height: 1.875em;
  width: 1.875em;
`;

const AchievementBadgeTooltip = styled.span`
  visibility: hidden;
  padding: 0.3125em 0;
  border-radius: 0.375em;
  text-align: center;
  position: absolute;
  z-index: 1;
  width: 7.5em;
  bottom: 100%;
  left: 50%;
  margin-left: -3.75em;
  opacity: 0;
  transition: opacity 1s;
`;

const TooltipBox = styled.div<DarkModeHelperProps>`
  width: 9.375em;
  border: 0.625em solid green;
  padding: 1.5625em;
  margin: 0.625em;
  background-color: ${(props) =>
    props.isDark ? '#191a35' : 'rgb(133, 211, 255)'};
`;

const AchievementBadge = styled.img`
  height: 2.1875em;
  width: 2.1875em;
  margin-left: 0.75em;
  margin-right: 0.75em;
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
  margin-top: 2.1875em;
  margin-left: 2.1875em;
  margin-bottom: 1.3125em;
  width: 9.0625em;
  align-items: center;
  border-radius: 7px;
  box-shadow: ${(props) =>
    props.isDark
      ? '1.25em 1.25em 3.75em #171830, -0.625em -0.625em 0.3125em #1b1c3a'
      : '1.25em 1.25em 3.75em #8adbff, -0.625em -0.625em 0.3125em #80cbf5'};
  background: ${(props) =>
    props.isDark
      ? 'linear-gradient(145deg, rgb(63, 153, 82), #358145)'
      : 'linear-gradient(145deg, rgb(123, 231, 149), rgb(104, 194, 125))'};
`;

const WeatherIcon = styled.img`
  display: flex;
  height: 4.0625em;
  width: 4.0625em;
`;

const WeatherIconFrame = styled.div<DarkModeHelperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.6875em;
  width: 4.6875em;
  border-radius: 50%;
  background: ${(props) => (props.isDark ? '#3b8f4d' : '#73d88b')};
  box-shadow: ${(props) =>
    props.isDark
      ? 'inset 1.25em 1.25em 2.4375em #368246, inset -1.25em -1.25em 2.4375em #409c54, -5px -5px 15px #15162d,'
      : 'inset 1.25em 1.25em 1.4375em #65be7a, inset -1.25em -1.25em 1.4375em #81f29c, rgb(113, 179, 217) -5px -5px 15px'};
  margin-top: 0.625em;
  margin-left: -2.8125em;
`;

const ForecastBit = styled.div`
  display: flex;
  align-items: center;
  height: 1.25em;
  width: 7.1875em;
  margin-left: 0.9375em;
  margin-top: 0.4375em;
`;

const ForecastStatsBox = styled.div<DarkModeHelperProps>`
  height: 5.9375em;
  width: 9.375em;
  margin-left: 0em;
  margin-top: 4.0625em;
  margin-bottom: 1.5625em;
  border-radius: 30px;
`;

const ForecastStatHolder = styled.p`
  display: flex;
  position: relative;
  justify-content: flex-end;
  font-size: 0.6875em;
`;

// old ForecastStatsBox visual stuff
//    background: ${(props) => (props.isDark ? '#3b8f4d' : '#73d88b')};
//    box-shadow: ${(props) => props.isDark
//       ? 'inset 20px 20px 39px #368246, inset -20px -20px 39px #409c54'
//       : 'inset 20px 20px 23px #65be7a, inset -20px -20px 23px #81f29c'};

const ForecastStatHolderWithBuffer = styled.p`
  display: flex;
  position: relative;
  justify-content: flex-end;
  font-size: 0.6875em;
  margin-right: 0.4375em;
`;

const WeatherDescription = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 3.125em;
  width: 6.25em;
  margin-left: 1.9375em;
`;

const ForecastText = styled.p`
  margin-left: 0em;
  margin-right: auto;
  font-size: 0.6875em;
`;

const ForecastTime = styled.p`
  font-size: 1.25em;
  margin-left: 0.5em;
`;

const MainTemperature = styled.div`
  display: flex;
  margin-top: 0.85em;
  align-items: center;
  font-size: 2.125em;
`;

const MainTemperatureFrame = styled.div<DarkModeHelperProps>`
  height: 4.6875em;
  width: 4.6875em;
  margin-top: 3.8125em;
  margin-left: 1.25em;
  border-radius: 50%;
  background: ${(props) =>
    props.isDark
      ? 'linear-gradient(145deg, #3f9952, #358145)'
      : 'linear-gradient(145deg, #7be795, #68c27d)'};
`;

const MainTemperatureText = styled.p`
  margin: -0.3125em 0em -0.0625em 0.3025em;
`;

const AdjustedTemperature = styled.div`
  display: flex;
  margin-top: 2em;
  margin-left: 1.625em;
  align-items: center;
`;

const AdjustedTemperatureText = styled.p`
  margin: -0.3125em 0em -0.3125em 0.5em;
`;

const AdjustedTemperatureHelperIcon = styled.img<DarkModeHelperProps>`
  margin-top: 1.6875em;
  margin-left: -0.9375em;
  height: 1.875em;
  width: 2.8125em;
  filter: ${(props) =>
    props.isDark ? 'invert(100%) brightness(200%)' : 'none'};
`;

const ForecastHelperIcon = styled.img`
  margin-top: -0.3125em;
  margin-left: -0.625em;
  height: 1.875em;
  width: 2.1875em;
`;

const WindspeedHelperIcon = styled.img`
  margin-top: -0.3125em;
  margin-left: -0.625em;
  height: 2.1875em;
  width: 2.1875em;
`;

const ConditionalHelperIcon = styled.img<BrightnessProps>`
  position: absolute;
  margin-top: 2.1875em;
  margin-left: -1.875em;
  height: 1.875em;
  width: 3.125em;
  filter: ${(props) => (props.bright ? `contrast(${props.bright})` : 'none')};
`;

const BigTemperatureHelperIcon = styled.img<DarkModeHelperProps>`
  position: absolute;
  margin-left: 0.705882em;
  margin-top: -0.651765em;
  max-height: 1.47059em;
  max-width: 1.94118em;
  height: 100%;
  width: 100%;
  filter: ${(props) =>
    props.isDark ? 'invert(100%) brightness(200%)' : 'none'};
`;

// Misc styled components

// This is the start of the home page //

// home screen weather widget components

const ForecastRowContainerforHome = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  width: 52.7%;
`;

const HomeWeatherWidgetHolder = styled.div`
  width: 17em;
  height: 11em;
  border-radius: 8px;
  margin-top: 3em;
`;

const WeatherWidgetWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  scrollbar-width: thin;
  white-space: nowrap;
  flex-shrink: 0;
`;

const ForecastItem = styled.div`
  display: inline-block;
  padding: 10px;
  text-align: center;
  width: 70px;
  flex-shrink: 0;
`;

const ForecastHour = styled.div`
  font-weight: bold;
`;

const ForecastTemperature = styled.div`
  margin-top: 5px;
`;

//other home components

const HomePageCompWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: center;
`;

const LeaderBoardDirections = styled.div`
  display: flex;
  align-items: center;
`;

// Misc styled components

const NavBarTop = styled.span<DarkModeHelperProps>`
  background-color: ${(props) => (props.isDark ? '#707070' : '#ececec')};
  border-bottom: 1px solid;
  border-color: ${(props) => (props.isDark ? '#ececec' : 'black')};
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

//This is for the instruction text in the Scrollers in Profile //

const lightModeText = 'rgb(47, 132, 66)';
// const lightModeText = '#7e29d8';
// const darkModeText = '#ffffff';
// const darkModeText = '#ac7ede';
const darkModeText = 'rgb(123, 231, 149)';

const lightModeShadow = 'rgb(11, 11, 11)';
const darkModeShadow = 'rgb(112, 247, 143)';

const waveHighlightAnimation = keyframes`
  0% {
    text-shadow: 0 0 2px ${lightModeShadow};
  }
  50% {
    text-shadow: 0 0 10px ${lightModeShadow};
  }
  100% {
    text-shadow: 0 0 2px ${lightModeShadow};
  }
`;

const WaveHighlight = styled.div`
  position: relative;
  display: inline-block;
`;

const HighlightText = styled.h4`
  display: inline-block;
  margin-bottom: 30px;
  color: ${(props) => (props.theme === 'dark' ? darkModeText : lightModeText)};
  text-shadow: ${(props) =>
    props.theme === 'dark'
      ? `0 0 2px ${darkModeShadow}`
      : `0 0 2px ${lightModeShadow}`};

  animation: ${(props) => keyframes`
    0% {
      text-shadow: 0 0 2px ${
        props.theme === 'dark' ? darkModeShadow : lightModeShadow
      };
    }
    50% {
      text-shadow: 0 0 10px ${
        props.theme === 'dark' ? darkModeShadow : lightModeShadow
      };
    }
    100% {
      text-shadow: 0 0 2px ${
        props.theme === 'dark' ? darkModeShadow : lightModeShadow
      };
    }
  `}
    2s infinite;
`;

//Above is for the instruction text in the Scrollers in Profile //

const ProfileDisplays = styled.div`
  display: flex;
  justify-content: center;
`;

export {
  ForecastBit,
  ForecastStatsBox,
  ForecastStatHolder,
  ForecastStatHolderWithBuffer,
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
  RouteAlerts,
  HomePageCompWrapper,
  LeaderBoardDirections,
  ForecastRowContainerforHome,
  HomeWeatherWidgetHolder,
  WeatherWidgetWrapper,
  ForecastItem,
  ForecastHour,
  ForecastTemperature,
  ToastBuffer,
  WaveHighlight,
  HighlightText,
  ProfileDisplays,
  LoadingDiv,
  PrivacySelector,
  RecentRidesHeader,
  StatsWrapper,
};
