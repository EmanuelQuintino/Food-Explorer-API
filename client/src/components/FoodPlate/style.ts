import styled from "styled-components";

export const Container = styled.div`
  width: 21.0rem;
  height: 29.0rem;
  padding: 2.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  position: relative;
  scroll-snap-align: center;

  .editIcon, .favoriteIcon, .FavoriteIconMatch {
    position: absolute;
    top: 2.0rem;
    right: 2.0rem;
    width: 2.4rem;
  }

  /* .FavoriteIconMatch {
    animation: heartBeat .7s;
  } */

  @keyframes heartBeat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .boxImagePlate {
    width: 9.2rem;
    height: 9.2rem;
    margin: .8rem 2.4rem 0;
    display: grid;
    place-content: center;
  }
  
  .imagePlate {
    width: 100%;
    height: 100%;
  }
  
  .nameButton h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.4rem;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.light200};
  }

  .price {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.cake200};
  }

  .box {
    width: 100%;
  }

  @media (min-width: 640px) {    
    width: 32.0rem;
    height: 46.0rem;
    gap: 1.6rem;
    
    .boxImagePlate {
      width: 17.6rem;
      height: 17.6rem;
    }

    .nameButton h3 {
      font-size: 2.4rem;
    }

    .description {
      margin-top: -1.2rem;
      font-family: 'Poppins';
      font-size: 1.4rem;
      line-height: 140%;
      color: ${({ theme }) => theme.colors.light300};
    }

    .price {
      font-size: 2.8rem;
      color: ${({ theme }) => theme.colors.cake200};
    }

    .box {
      width: 100%;
    }
  }
`;