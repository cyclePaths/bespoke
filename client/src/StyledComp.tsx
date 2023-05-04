import styled, { createGlobalStyle } from 'styled-components';

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
  width: 255px;
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
  position: fixed;
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

const ForecastRowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ForecastEntry = styled.div`
  border-style: solid;
  justify-content: center;
  align-items: center;
  background-color: rgb(115, 216, 139); //this is the light mode color
`;
//this is the dark mode color for ForecastEntry: rgb(59, 143, 77)

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
  padding-top: 6.6vh;
  padding-bottom: 6.6vh;
`;

const AchievementBadgeByName = styled.img`
  height: 30px;
  width: 30px;
`;

const AchievementBadgeTooltip = styled.span`
  visibility: hidden;
  padding: 5px 0;
  border-radius: 6px;
  text-align: center
  position: absolute;
  z-index: 1;
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
  }
`;

const AchievementBadgeHolder = styled.span`
  display: none;
`;

export {
  ForecastBit,
  ForecastText,
  ForecastHelperIcon,
  InputLayout,
  AutoCompleteDropdownLayout,
  RouteButtonContainer,
  ForecastRowContainer,
  ForecastEntry,
  WeatherIcon,
  StartRouteContainer,
  RouteCreatorComponent,
  PopoutSaveForm,
  CategorySelector,
  OptionsDiv,
  RouteListOptions,
  RouteList,
  AchievementBadgeByName,
  AchievementBadgeTooltip,
  AchievementBadge,
  AchievementBadgeAndTooltipContainer,
  AchievementBadgeHolder,
  NavBarTop,
  BandAid,
  SaveAlert,
};
