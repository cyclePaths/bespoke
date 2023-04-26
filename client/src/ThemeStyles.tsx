import styled, { createGlobalStyle } from 'styled-components';

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: background-color 0.2s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: transform 0.2s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #2196F3;
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;



const GlobalStyleDark = createGlobalStyle`
  html, body {
    background-color: #333;
    color: #fff;
  }

  .toggle-switch {
    position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: background-color 0.2s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      right: 4px;
      bottom: 4px;
      background-color: #2196F3;
      transition: transform 0.2s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #ccc;
  }

  input:focus + span {
    box-shadow: 0 0 1px #ccc;
  }

  input:checked + span:before {
    transform: translateX(-26px);
  }
  }
`;



const GlobalStyleLight = createGlobalStyle`
  html, body {
    background-color: #fff;
    color: #333;
  }

  .toggle-switch {
    position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: background-color 0.2s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: transform 0.2s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #2196F3;
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
  }

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
//     background-color: #2196F3;
//     transition: background-color 0.2s;
//     border-radius: 34px;

//     &:before {
//       position: absolute;
//       content: "";
//       height: 26px;
//       width: 26px;
//       right: 4px;
//       bottom: 4px;
//       background-color: white;
//       transition: transform 0.2s;
//       border-radius: 50%;
//     }
//   }

//   input:checked + span {
//     background-color: #ccc;
//   }

//   input:focus + span {
//     box-shadow: 0 0 1px #ccc;
//   }

//   input:checked + span:before {
//     transform: translateX(-26px);
//   }
// `;



export {
  GlobalStyleDark,
  GlobalStyleLight,
  ToggleSwitch,
}