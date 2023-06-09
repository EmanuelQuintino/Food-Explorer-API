import styled from "styled-components";

type HeaderContainerType = {
  menuActive: boolean;
}

export const HeaderContainer = styled.header<HeaderContainerType>`
  .boxHeader {
    display: flex;
    align-items: center;
    justify-content: ${({ menuActive }) => menuActive ? "flex-start" : "space-between"};
    gap: 1.6rem;
    width: 100%;
    height: 4.2rem;
    padding: 5.6rem 3.2rem 4.2rem;
    background: ${({ theme }) => theme.colors.dark700};
  }
  
  .toggleMenu svg {
    width: 2.2rem;
    height: 1.8rem;
  }

  h3 {
    font-size: 2.2rem;
    font-weight: 400;
    padding-bottom: .6rem;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: .8rem;
    padding: 0 0 .4rem;
  }
  
  .logo svg {
    width: 2.4rem;
  }

  h1 {
    font-size: 2.2rem;
  }
  
  .paragraphAdmin {
    font-size: 1.2rem;
    line-height: 160%;
    color: ${({ theme }) => theme.colors.cake200};
  }

  .orderContainer {
    position: relative;
  }

  .orderContainer svg {
    width: 2.4rem;
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

  @media(max-width: 42.0rem) {
    .toggleMenu {
      border: none;
    }  
  }
`;