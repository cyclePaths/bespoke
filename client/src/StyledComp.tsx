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

const DropdownLayout = styled.div`
  margin-bottom: 5px;
  margin-top: 5px;
`;

const RouteButtonContainer = styled.div`
  display: block;
  margin-bottom: 5px;
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
  DropdownLayout,
  RouteButtonContainer,
  ForecastRowContainer,
  ForecastEntry,
  WeatherIcon,
  StartRouteContainer,
  RouteCreatorComponent,
  PopoutSaveForm,
  // ToggleSwitch,
};
