import styled from "styled-components";

export const HeaderContainer = styled.header`
  .boxHeader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    width: 100%;
    height: 4.2rem;
    padding: 5.6rem 3.2rem 4.2rem;
    background: ${({ theme }) => theme.colors.dark700};
  }
  
  .logo {
    width: 36.0rem;
    display: flex;
    align-items: center;
    gap: .8rem;
    padding: 0 0 .4rem;
    cursor: pointer;
    position: relative;
    
    svg {
      width: 3.0rem;
    }
    
    h1 {
      font-size: 2.8rem;
      white-space: nowrap;
    }
  }
  
  .paragraphAdmin {
    font-size: 1.2rem;
    text-align: right;
    color: ${({ theme }) => theme.colors.cake200};
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .boxButtons {
    display: flex;
    gap: .8rem;
    
    button {
      white-space: nowrap;
      padding: 1.2rem;
      border-radius: .8rem;
    }

    button:hover {
      background-color: ${({ theme }) => theme.colors.dark900};
    }
  }

  .orderContainer {
    position: relative;
    
    svg {
      width: 2.2rem;
      height: 2.2rem;
    }

    button {
      height: 4.6rem;
      padding: 0 2.4rem;
      font-size: 1.2rem;
      white-space: nowrap;
    }
  }

  .orderTotal {
    background: ${({ theme }) => theme.colors.tomato100};
    display: grid;
    place-content: center;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.7rem;
    font-size: 1.2rem;
    position: absolute;
    bottom: 1.4rem;
    left: 1.4rem;
  }

  .logoutIconButton {
    svg {
      width: 2.4rem;
    }
  }

  @media(max-width: 42.0rem) {
    .toggleMenu {
      border: none;
    }  
  }
`;