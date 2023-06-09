import styled from "styled-components"

export const Container = styled.section`
  .inputSearchForm {
    position: relative;
    width: 100%;
    margin-top: 2.0rem;
  }
  
  .inputSearchForm label {
    width: 100%;
  }

  .inputSearchForm svg {
    width: 2.4rem;
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
  }
  
  .inputSearchForm input {
    width: 100%;
    border-radius: .8rem;
    padding: 1.2rem 1.4rem 1.4rem 4.2rem;
    font-size: 1.6rem;
    background: ${({ theme }) => theme.colors.dark900};
  }
  
  .OrdersContainer {
    margin-top: 2.8rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1.6rem;
  }
  
  .tableOrderPlates {
    border-spacing: 0;
    border-radius: .8rem .8rem 0 0;
    border: .1rem solid ${({ theme }) => theme.colors.dark1000};
    margin: .8rem auto;
    width: 100%;

    th {
      text-align: left;
      height: 6.4rem;
      padding: 2.4rem;
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.light200};
      border-right: .1rem solid ${({ theme }) => theme.colors.dark1000};
    }
    
    th:first-child {
      border-radius: .8rem 0 0 0;
      width: 22.0rem;
    }
    
    th:nth-child(2) {
      width: 11.5rem; 
    }

    th:nth-child(3) {
      flex: 1;
    }
    
    th:last-child {
      border-right: 0;
      border-radius: 0 .8rem 0 0;
      width: 16.0rem;
    }

    td {
      border-top: .1rem solid ${({ theme }) => theme.colors.dark1000};
      border-right: .1rem solid ${({ theme }) => theme.colors.dark1000};
    }

    td:last-child {
      border-right: 0;
    }
  }
`;