import styled from "styled-components";

export const Container = styled.section`
  padding: 2.4rem;

  .boxButtons {
    margin-top: 2.0rem;
  }

  .boxButtons button {
    font-size: 2.2rem;
    font-weight: 300;
    padding: 1.0rem;
    width: 100%;
    text-align: left;
    border-bottom: .1rem solid ${({ theme }) => theme.colors.dark1000}
  }

  .boxButtons button:hover {
    background-color: ${({ theme }) => theme.colors.dark900};
  }
`;