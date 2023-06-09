import styled from "styled-components"

export const Container = styled.section`
  width: 100%;
  
  .plateContainer {
    text-align: center;
    max-width: 28.0rem;
    margin: 1.0rem auto 0;
  }

  .imagePlate {
    width: 21.0rem;
    margin: 1.6rem 2.6rem;
  }

  .namePlateButton {
    font-family: 'Poppins', sans-serif;
    font-size: 2.0rem;
    font-weight: 500;
  }

  .description {
    margin: .4rem 0 2.0rem;
    font-family: 'Poppins';
    font-size: 1.4rem;
    line-height: 140%;
    color: ${({ theme }) => theme.colors.light300};
  }

  .ingredients {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2.4rem 2.4rem;
  }

  .ingredient {
    padding: .4rem .8rem;
    background: ${({ theme }) => theme.colors.dark1000};
    border-radius: .5rem;
  }

  .containerCountOrderPlate {
    margin-top: 2.4rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
  }

  .boxMinusPlus {
    font-size: 2.2rem;
    font-weight: 500;
    gap: 1.6rem;
  }

  .boxMinusPlus img {
    width: 2.0rem;
    height: 2.0rem;
  }

  .boxButton {
    margin-top: 0;
  }

  .buttonToEdit button {
    margin-top: 2.4rem;
  }

  .boxButton > button {
    border-radius: .5rem;
    height: 3.8rem;
    width: 18.8rem;
    font-size: 1.2rem;
  }

  @media(min-width: 640px) { 
    .plateContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3.2rem;
      max-width: 100%;
      margin: 2.0rem auto 0;
    }

    .imagePlate {
      width: 24.0rem;
    }

    .plateContainerPart2 {
      width: 48.0rem;
      text-align: left;
    }

    .namePlateButton {
      font-size: 3.2rem;
    }

    .description {
      font-size: 1.8rem;
    }

    .ingredients {
      justify-content: flex-start;
    }

    .boxCountOrderPlate {
      display: flex;
      place-content: flex-start;
    }

    .containerCountOrderPlate {
      margin-top: 3.6rem;
    }
    
    .boxButton > button {
      border-radius: .5rem;
      height: 3.8rem;
      width: 18.8rem;
      font-size: 1.4rem;

      svg {
        width: 2.0rem;
        height: 2.0rem;
      }
    }
    
    .buttonToEdit button {
      width: 18.8rem;
      font-size: 1.4rem;
    }
  }

  @media(min-width: 840px) { 
    .plateContainer {
      max-width: 90%;
    }

    .imagePlate {
      width: 31.0rem;
    }

    .plateContainerPart2 {
      width: 64.0rem;
      text-align: left;
    }

    .namePlateButton {
      font-size: 3.6rem;
    }

    .description {
      font-size: 2.0rem;
    }
  }

  @media(min-width: 1040px) { 
    .plateContainer {
      max-width: 80%;
    }
  }

`;