import styled, { createGlobalStyle, keyframes } from 'styled-components';

export type DarkModeHelperProps = {
  isDark: boolean;
};

export type InputProps = DarkModeHelperProps & {
  secondary?: boolean;
};

export type BrightnessProps = {
  bright: number;
};

export type ShowProps = {
  show: boolean;
};

export type AllBlackProps = {
  allBlack: boolean;
};

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

const InputLayout = styled.input<InputProps>`
  height: 30px;
  width: ${({ secondary }) => (secondary ? '85%' : '75%')};
  margin: 5px;
  border-radius: 2px;
  background-color: ${({ isDark, secondary }) =>
    secondary
      ? isDark
        ? '#a6a6a6'
        : '#ffffff'
      : isDark
      ? '#707070'
      : '#ececec'};
  /* box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2); */
  border-style: hidden;
  text-align: center;
  color: ${({ isDark }) => (isDark ? '#ececec' : '#707070')};
  ::placeholder {
    color: ${({ isDark, secondary }) =>
      secondary ? '#000000' : isDark ? '#d3d3d3' : '#707070'};
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
  width: 85%;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 4px;
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

const SelectedBadge = styled.img`
  height: 3.875em;
  width: 3.875em;
  margin-top: 3.4375em;
  margin-left: -3.4375em;
`;

const AchievementBadgeByName = styled.img`
  height: 1.875em;
  width: 1.875em;
`;

const AchievementBadgeTooltip = styled.span<ShowProps>`
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  padding: 0.3125em 0;
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
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
  border: ${(props) =>
    props.isDark ? '0.05em solid black' : '0.05em solid white'};
  padding: 1em;
  background: ${(props) => (props.isDark ? '#191a35' : '#85d3ff')};
  box-shadow: ${(props) =>
    props.isDark
      ? 'inset 1.25em 1.25em 1.4375em #030312, inset -1.25em -1.25em 1.4375em #1e2062, #282b71 -5px -5px 15px'
      : 'inset 1.25em 1.25em 1.4375em #59bddf, inset -1.25em -1.25em 1.4375em #d8f1ff, #71b3d9 -5px -5px 15px'};
  border-radius: 7px;
`;

const AchievementBadge = styled.img<AllBlackProps>`
  height: 2.25em;
  width: 2.25em;
  margin-left: 0.75em;
  margin-right: 0.75em;
  transform: ${(props) =>
    props.allBlack ? 'invert(100%) brightness(200%)' : 'none'};
`;

const AchievementBadgeAndTooltipContainer = styled.div<ShowProps>`
  position: relative;
  display: inline-block;
  ${AchievementBadgeTooltip} {
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
    opacity: ${(props) => (props.show ? 1 : 0)};
    pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
    transition: opacity 0.5s;
  }
`;

const AchievementBadgeHolder = styled.div<DarkModeHelperProps>`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 40px;
  padding: 20px;
  border-radius: 7px;
  position: fixed;
  width: -webkit-fill-available;
  box-shadow: ${(props) =>
    props.isDark
      ? '1.25em 1.25em 3.75em #282b71, -0.625em -0.625em 1.3125em #282b71'
      : '1.25em 1.25em 3.75em #8adbff, -0.625em -0.625em 1.3125em #80cbf5'};
  background: ${(props) =>
    props.isDark
      ? 'linear-gradient(145deg, #1e2062, #030312);'
      : 'linear-gradient(145deg, #3cc6f6, #d8f1ff)'};
`;
// Darker: #171730 #78bee6
// Lighter: #1b1c39 #8ee2ff
//  background: ${(props) => (props.isDark ? '#1b1c39' : '#8ee2ff')};

const BadgeContainerLabel = styled.div`
  position: relative;
  margin-left: 6.5625em;
  margin-bottom: 0.9375em;
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
  display: flex;
  align-items: center;
  border-radius: 7px;
  box-shadow: ${(props) =>
    props.isDark
      ? '1.25em 1.25em 3.75em #282b71, -0.625em -0.625em 1.3125em #282b71'
      : '1.25em 1.25em 3.75em #8adbff, -0.625em -0.625em 1.3125em #80cbf5'};
  background: ${(props) =>
    props.isDark
      ? 'linear-gradient(145deg, #1b1c39, #171730);'
      : 'linear-gradient(145deg, #8ee2ff, #78bee6)'};
  margin-top: 2.1875em;
  margin-left: 2.1875em;
  margin-right: 2.1875em;
  margin-bottom: 1.3125em;
  height: 7em;
`;

const WeatherIcon = styled.img`
  display: flex;
  height: 4.0625em;
  width: 4.0625em;
`;

const WeatherIconFrame = styled.div<DarkModeHelperProps>`
  && {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4.6875em;
    width: 4.6875em;
    border-radius: 50%;
    background: ${(props) => (props.isDark ? '#191a35' : '#85d3ff')};
    box-shadow: ${(props) =>
      props.isDark
        ? 'inset 1.25em 1.25em 1.4375em #030312, inset -1.25em -1.25em 1.4375em #1e2062, #282b71 -5px -5px 15px'
        : 'inset 1.25em 1.25em 1.4375em #59bddf, inset -1.25em -1.25em 1.4375em #d8f1ff, #71b3d9 -5px -5px 15px'};
    margin-top: -5.375em;
    margin-left: -3.8125em;
  }
`;

const ForecastBit = styled.div`
  display: flex;
  align-items: center;
  height: 1em;
  width: 7.1875em;
  margin-left: 0.9375em;
  margin-top: 0.4375em;
`;

const ForecastStatsBox = styled.div<DarkModeHelperProps>`
  height: 5.9375em;
  position: absolute;
  margin-left: 13em;
  margin-right: 2em;
  margin-top: 1em;
  margin-bottom: 1.5625em;
  border-radius: 30px;
`;

const ForecastStatHolder = styled.p`
  display: flex;
  position: relative;
  justify-content: flex-end;
  font-size: 0.6875em;
`;

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
  margin-left: -13.0625em;
  margin-top: 1.5em;
`;

const ForecastText = styled.p`
  margin-left: 0em;
  margin-right: auto;
  font-size: 11px;
`;

const FeelsLikeText = styled.p`
  margin-left: -4em;
  margin-right: auto;
  width: 4.5em;
  font-size: 11px;
`;

const ForecastTime = styled.p`
  font-size: 1.25em;
  margin-left: -2.65em;
  margin-bottom: -2.5em;
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
  margin-top: -3.6875em;
  margin-left: -5.125em;
  border-radius: 50%;
  background: ${(props) =>
    props.isDark
      ? 'linear-gradient(145deg, #1e2062, #030312);'
      : 'linear-gradient(145deg, #3cc6f6, #d8f1ff)'};
`;

const MainTemperatureText = styled.p`
  margin: -0.3125em 0em -0.0625em 0.3025em;
`;

const AdjustedTemperature = styled.div`
  display: flex;
  position: absolute;
  margin-top: 2em;
  margin-left: -0.375em;
  align-items: center;
`;

const AdjustedTemperatureText = styled.p`
  margin: -0.3125em 0em -0.3125em -3.5em;
`;

const AdjustedTemperatureHelperIcon = styled.img<DarkModeHelperProps>`
  margin-top: 1.6875em;
  margin-left: -0.9625em;
  height: 1.875em;
  width: 1.8125em;
  filter: ${(props) =>
    props.isDark ? 'invert(100%) brightness(200%)' : 'none'};
`;

const ForecastHelperIcon = styled.img`
  margin-top: -0.3125em;
  margin-left: -0.625em;
  height: 1.875em;
  width: 2.1875em;
`;

const UVIHelperIcon = styled.img`
  margin-top: -0.3125em;
  margin-left: -0.625em;
  height: 1.875em;
  width: 6em;
`;

const WindspeedHelperIcon = styled.img`
  margin-top: -0.3125em;
  margin-left: -0.625em;
  height: 2.1875em;
  width: 2.1875em;
`;

const ConditionalHelperIcon = styled.img<BrightnessProps>`
  position: absolute;
  margin-top: -6.8125em;
  margin-left: -6.175em;
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

const WeatherWidgetLabel = styled.div`
  position: absolute;
  margin-top: 2.1875em;
  margin-right: 14.6875em;
`;

const SwipeIcon = styled.img<DarkModeHelperProps>`
  position: absolute;
  height: 3em;
  width: 3em;
  margin-top: 4.0625em;
  margin-right: 18.5625em;
  filter: ${(props) =>
    props.isDark ? 'invert(100%) brightness(200%)' : 'none'};
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
  justify-content: space-between;
  position: fixed;
  top: 75.5%;
  width: 85%;
  right: 7.5%;
`;

const RouteDivBox = styled.div<DarkModeHelperProps>`
  background-color: ${({ isDark }) => (isDark ? '#ececec' : '#fff')};
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  box-shadow: ${({ isDark }) =>
    isDark
      ? '0px 4px 4px rgba(0, 0, 0, 0.25)'
      : '0px 4px 4px rgba(0, 0, 0, 0.25)'};
`;

const RouteInfoSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RouteInfoDiv = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
`;

// Misc styled components

const NavBarTop = styled.span<DarkModeHelperProps>`
  background-color: ${(props) =>
    props.isDark ? 'rgb(112, 112, 112)' : '#ececec'};
  border-bottom: 1px solid;
  border-color: ${(props) => (props.isDark ? '#ececec' : 'black')};
  position: fixed;
  display: inline-flex;
  justify-content: space-between;
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

const lightModeText = 'rgb(50, 53, 50)';
// const lightModeText = '#7e29d8';
// const darkModeText = '#ffffff';
// const darkModeText = '#ac7ede';
const darkModeText = 'rgb(227, 239, 230)';

const lightModeShadow = 'rgb(11, 11, 11)';
/* const darkModeShadow = 'rgb(112, 247, 143)'; */
const darkModeShadow = 'rgb(255, 255, 255)';
// const darkModeShadow = '1.25em 1.25em 3.75em #282b71';

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
      ? `0 0 20px ${darkModeShadow}` // Increase the blur radius to create a glow effect
      : `10px 10px 20px ${lightModeShadow}`};

  animation: ${(props) => keyframes`
    0% {
      text-shadow: 0 0 20px ${
        props.theme === 'dark' ? darkModeShadow : lightModeShadow
      };
    }
    50% {
      text-shadow: 0 0 50px ${
        props.theme === 'dark' ? darkModeShadow : lightModeShadow
      };
    }
    100% {
      text-shadow: 0 0 20px ${
        props.theme === 'dark' ? darkModeShadow : lightModeShadow
      };
    }
  `}
    2s infinite;
`;

//Above is for the instruction text in the Scrollers in Profile //

const ProfileDisplays = styled.div`
  /* background-color: white; */
  display: flex;
  justify-content: center;
  /* margin: 10px; */
`;

const ProfileRideDisplay = styled.div`
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-bottom: 0px;
  }
`;

//Below are the styles for the default cards on the profile page//

const ProfileDefaultAddressDisplayDark = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin: 0.5rem;
  padding-bottom: 10px;
  border-radius: 7px;
  background: linear-gradient(145deg, #1e2062, #030312);
  box-shadow: 1.25em 1.25em 3.75em rgb(40, 43, 113),
    -0.625em -0.625em 1.3125em #282b71;
  font-size: 14px;
`;

const ProfileDefaultAddressDisplayLight = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin: 0.5rem;
  padding-bottom: 10px;
  border-radius: 7px;
  background: linear-gradient(145deg, #3cc6f6, #d8f1ff);
  box-shadow: -8px 2px 6px rgba(0, 0, 0, 0.3);
  font-size: 14px;
`;

const ProfileDefaultWeightDisplayDark = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin: 0.5rem;
  padding-bottom: 10px;
  border-radius: 7px;
  background: linear-gradient(145deg, #1e2062, #030312);
  box-shadow: 1.25em 1.25em 3.75em #282b71, -0.625em -0.625em 1.3125em #282b71;
  font-size: 14px;
`;

const ProfileDefaultWeightDisplayLight = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin: 0.5rem;
  padding-bottom: 10px;
  border-radius: 7px;
  background: linear-gradient(145deg, #3cc6f6, #d8f1ff);
  box-shadow: -8px 2px 6px rgba(0, 0, 0, 0.3);
  font-size: 14px;
`;

const ProfileDefaultLastRideDisplayDark = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin: 0.5rem;
  padding-bottom: 20px;
  border-radius: 7px;
  background: linear-gradient(145deg, #1e2062, #030312);
  box-shadow: 1.25em 1.25em 3.75em #282b71, -0.625em -0.625em 1.3125em #282b71;
  font-size: 14px;
`;

const ProfileDefaultLastRideDisplayLight = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin: 0.5rem;
  padding-bottom: 20px;
  border-radius: 7px;
  background: linear-gradient(145deg, #3cc6f6, #d8f1ff);
  box-shadow: -8px 2px 6px rgba(0, 0, 0, 0.3);
  font-size: 14px;
`;

//Above are the styles for the default cards on the profile page//

export {
  ForecastBit,
  ForecastStatsBox,
  ForecastStatHolder,
  ForecastStatHolderWithBuffer,
  WeatherDescription,
  ForecastText,
  FeelsLikeText,
  ForecastTime,
  MainTemperature,
  MainTemperatureFrame,
  MainTemperatureText,
  AdjustedTemperature,
  AdjustedTemperatureText,
  AdjustedTemperatureHelperIcon,
  ForecastHelperIcon,
  UVIHelperIcon,
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
  RouteListOptions,
  RouteList,
  SelectedBadge,
  AchievementBadgeByName,
  AchievementBadgeTooltip,
  TooltipBox,
  AchievementBadge,
  AchievementBadgeAndTooltipContainer,
  AchievementBadgeHolder,
  BadgeContainerLabel,
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
  WeatherWidgetLabel,
  SwipeIcon,
  ToastBuffer,
  WaveHighlight,
  HighlightText,
  ProfileDisplays,
  ProfileRideDisplay,
  LoadingDiv,
  RecentRidesHeader,
  StatsWrapper,
  ProfileDefaultAddressDisplayDark,
  ProfileDefaultAddressDisplayLight,
  ProfileDefaultWeightDisplayDark,
  ProfileDefaultWeightDisplayLight,
  ProfileDefaultLastRideDisplayDark,
  ProfileDefaultLastRideDisplayLight,
  RouteInfoSpan,
  RouteInfoDiv,
  RouteDivBox,
};
