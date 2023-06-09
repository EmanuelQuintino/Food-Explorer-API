import styled from "styled-components";

export const Container = styled.div`
  .boxMinusPlus {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.4rem;
  }

  .boxMinusPlus button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .boxButton {
    margin-top: 1.6rem;
  }

  .boxButton > button {
    border-radius: .5rem;
    height: 3.2rem;
  }

  @media(min-width: 640px) {    
    .containerCountOrderPlate {
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

    .boxButton > button {
      border-radius: .5rem;
      height: 3.8rem;
      width: 9.2rem;
      font-size: 1.2rem;
    }

    @media (min-width: 640px) {
     .boxButton > button {
        font-size: 1.4rem;
      } 
    }
  }
`;