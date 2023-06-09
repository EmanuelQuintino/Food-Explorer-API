import styled from "styled-components"

export const Container = styled.section`
  table {
    border-spacing: 0;
    border-radius: .8rem;
    border: .15rem solid ${({ theme }) => theme.colors.light600};
    width: 31.0rem;
    margin: 3.2rem auto;
  }

  tr {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  th {
    height: 7.2rem;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .8rem;
    font-family: 'Roboto';
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light100};
    border-bottom: solid ${({ theme }) => theme.colors.light600};
    cursor: pointer;

    :hover {
      background: ${({ theme }) => theme.colors.dark900};
    }
  }

  th:first-child {
    border-right: .14rem solid ${({ theme }) => theme.colors.light600};
    border-radius: .8rem 0 0 0;
  }

  th:last-child {
    border-left: .13rem solid ${({ theme }) => theme.colors.light600};
    border-radius: 0 .8rem 0 0;
  }

  .paymentActive {
    background: ${({ theme }) => theme.colors.dark900};
  }

  td {
    padding: 2.4rem;
    height: 32.0rem;
    display: grid;
    place-content: center;
  }

  .boxPaymentApproved {
    color: ${({ theme }) => theme.colors.light600};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    font-weight: 700;
    font-size: 2.0rem;
    line-height: 160%;
  }

  .boxPaymentApproved svg path{
    fill: ${({ theme }) => theme.colors.light600};
  }

  @media (min-width: 42.0rem) {
    table {
      width: 48.0rem;
    }

    .qrCodeExplorerIcon {
      svg {
        width: 20.0rem;
        height: 20.0rem;
      }
    }
  }
`;