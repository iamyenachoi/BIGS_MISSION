import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Nanum Gothic', sans-serif;
    background: url('/background.jpg') no-repeat center center fixed;
    background-size: cover;
    color: white;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;