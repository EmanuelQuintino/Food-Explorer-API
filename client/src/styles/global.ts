import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.colors.dark500};
    color: ${({ theme }) => theme.colors.light100};
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
  }

  .pageTitle {
    margin-top: 2.4rem;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 2.8rem;
  }
  
  input, select, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.light300};
  } 
  
  button {
    font-family: 'Poppins', sans-serif;
    background: none;
  }

  button:hover {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.light300};
  }

  .srOnly {
    position: absolute;
    width: 0.1rem;
    height: 0.1rem;
    margin: -0.1rem;
    border-width: 0;
    overflow: hidden;
    color: transparent;    
    clip: rect(0, 0, 0, 0);
  }

  .inputError {
    color: ${({ theme }) => theme.colors.carrot100};
    display: block;
    position: absolute;
    font-size: 1.0rem;
    margin-top: .4rem;
    right: 0;
  }

  .spinner {
    animation: spinnerRotate 1s linear infinite;
    font-size: 4.2rem;
    display: block;
    margin: 25% auto 100%;
    color: lightgray;
  }

  @keyframes spinnerRotate {
    to {
        transform: rotate(360deg);
    }
  }

  .queryError {
    color: ${({ theme }) => theme.colors.carrot100};
    text-align: center;
    margin-top: 1.6rem;
  }

  .backPageButton {
    font-size: 1.6rem;
    font-weight: 500;
    margin-top: 2.4rem;

    :hover {
      text-decoration: underline;
    }
  }

  .messageEmptyList {
    width: 100%;
    height: 30vh;
    font-weight: 700;
    font-size: 2.0rem;
    color: ${({ theme }) => theme.colors.light500};
    display: grid;
    place-content: center;
  }

  @media (min-width: 640px) {
    .inputError {
      font-size: 1.2rem;
    }
  }
`;