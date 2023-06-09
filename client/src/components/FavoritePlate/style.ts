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

  .namePlateButton {
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 3.2rem;
    color: ${({ theme }) => theme.colors.light300};
  }

  .removeFavoriteButton {
    font-size: 1.3rem;
    font-family: 'Roboto';
    color: ${({ theme }) => theme.colors.tomato400};
  }

  @media (min-width: 930px) {
    width: 36.0rem;

    .imagePlate {
      width: 10.0rem;
    }

    .namePlateButton {
      font-size: 2.2rem;
    }

    .removeFavoriteButton {
      font-size: 1.6rem;
    }
  }
`;