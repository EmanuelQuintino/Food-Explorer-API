import styled from "styled-components"

export const Container = styled.section`  
  width: 28.0rem;
  padding: 1.6rem 0;
  display: flex;
  align-items: center;
  gap: 1.2rem;

  .imagePlate {
    width: 7.6rem;
  }

  .plateName {
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 3.2rem;
    color: ${({ theme }) => theme.colors.light300};
    line-height: 120%;
  }
  
  .platePrice{
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.light400};
  }
  
  .removeOrderPlate {
    margin-top: .8rem;
    font-size: 1.3rem;
    font-weight: 500;
    font-family: 'Roboto';
    color: ${({ theme }) => theme.colors.tomato400};
  }

  @media (min-width: 960px) {
    .plateNamePrice {
      width: 28.0rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .imagePlate {
      width: 9.6rem;
    }

    .plateName {
      font-size: 2.0rem;
    }
  
    .platePrice{
      font-size: 1.4rem;
    }
    
    .removeOrderPlate {
      font-size: 1.4rem;
    }
  }

  @media (min-width: 990px) {
    .plateNamePrice {
      width: 32.0rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .imagePlate {
      width: 10.0rem;
    }

    .plateName {
      font-size: 2.2rem;
    }
  
    .platePrice{
      font-size: 1.6rem;
    }
    
    .removeOrderPlate {
      font-size: 1.6rem;
    }
  }
`;