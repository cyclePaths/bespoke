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
  display: block;
  margin-top: 25px;
  text-align: center;
`;

const PopoutSaveForm = styled.form`
  display: block;
  text-align: center;
`;

const CategorySelector = styled.select`
  border-color: black;
  margin-right: 10px;
`;

const OptionsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: space-evenly;
  align-items: center;
`;

const InputLayout = styled.input`
  height: 25px;
  width: 75%;
  margin-bottom: 5px;
`;

const StartRouteContainer = styled.div`
  display: block;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
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
  display: block;
  margin-bottom: 5px;
  margin-top: 10px;
`;

const RouteListOptions = styled.div`
  display: block;
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

const NavBarTop = styled.span`
  background-color: rgb(218, 220, 218);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: fixed;
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  height: 9vh;
  z-index: 1000;
`;

const BandAid = styled.div`
  padding-top: 9vh;
  padding-bottom: 9vh;
`;

const AchievementBadgeByName = styled.img`
  height: 30px;
  width: 30px;
`;

const AchievementBadge = styled.img`
  height: 35px;
  width: 35px;
  margin-left: 12px;
  margin-right: 12px;
`;

const AchievementBadgeHolder = styled.span`
  display: none;
`;

// const ToggleSwitch = styled.label`
//   position: relative;
//   display: inline-block;
//   width: 60px;
//   height: 34px;

//   input {
//     opacity: 0;
//     width: 0;
//     height: 0;
//   }

//   span {
//     position: absolute;
//     cursor: pointer;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: #ccc;
//     transition: background-color 0.2s;
//     border-radius: 34px;

//     &:before {
//       position: absolute;
//       content: "";
//       height: 26px;
//       width: 26px;
//       left: 4px;
//       bottom: 4px;
//       background-color: white;
//       transition: transform 0.2s;
//       border-radius: 50%;
//     }
//   }

//   input:checked + span {
//     background-color: #2196F3;
//   }

//   input:focus + span {
//     box-shadow: 0 0 1px #2196F3;
//   }

//   input:checked + span:before {
//     transform: translateX(26px);
//   }
// `;

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
  // ToggleSwitch,
  CategorySelector,
  OptionsDiv,
  RouteListOptions,
  RouteList,
  AchievementBadgeByName,
  AchievementBadge,
  AchievementBadgeHolder,
  NavBarTop,
  BandAid,
};
