import styled from "styled-components"

export const Container = styled.section`    
  .platesContainer {
    margin-top: 1.6rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0 4.8rem;
  }

  .titlePayment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3.2rem;
  }
  
  .orderTotalPrice {
    margin-top: 2.4rem;
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.light300};
  }

  .paymentContainer table {
    margin-top: 3.6rem;
  }
  
  @media (min-width: 640px) {
    .orderPaymentContainer {
      display: flex;
      align-items: first baseline;
      gap: 3.2rem
    }

    .orderContainer {
      width: 54.0rem;
    }

    .orderTotalPrice {
      font-size: 2.8rem;
      color: ${({ theme }) => theme.colors.light300};
    }
  }
`;  