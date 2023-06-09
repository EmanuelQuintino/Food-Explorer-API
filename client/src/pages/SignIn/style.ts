import styled from "styled-components"

export const Container = styled.section`
  height: 100vh;
  display: grid;
  place-content: center;
  
  .formBox {
    display: grid;
    place-content: center;

    h2 {
      font-family: 'Poppins';
      font-weight: 500;
      font-size: 3.2rem;
      text-align: center;
    }
  }
  
  form {
    margin-top: 4.2rem;
    width: 30.0rem;
    display: grid;
    gap: 3.2rem;
    position: relative;
    
    label {
      margin-top: 13.2rem;
      color: ${({ theme }) => theme.colors.light400};
      line-height: 3.2rem;
    }
    
    input {
      width: 100%;
      border-radius: .8rem;
      padding: 1.2rem 1.4rem;
      font-size: 1.6rem;
      background: ${({ theme }) => theme.colors.dark900};
      border: .1rem solid transparent;
    }
    
    input:focus {
      border: .1rem solid ${({ theme }) => theme.colors.light300};
    }

    button {
      margin-top: 1.2rem;
    }
  }
    
  .buttonSignUp{
    margin-top: 3.2rem;
    font-size: 1.4rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.light300};
    font-family: 'Poppins', sans-serif;
    border: .1rem solid transparent;
    border-radius: .4rem;
  }

  .buttonSignUp:focus {
    border: .1rem solid ${({ theme }) => theme.colors.light300};
  }
  
  @media(min-width: 640px) {
    display: flex;
    align-items: center;
    gap: 2.0rem;
    
    .foodExplorerLogo {
      h1 {
        font-size: 4.8rem;
      }

      svg {
        width: 4.8rem;
      }
    }
    
    .formBox {
      background: ${({ theme }) => theme.colors.dark700};
      padding: 4.8rem;
    }
  }

  @media(min-width: 840px) {
    gap: 12.0rem;
  }

  @media(min-width: 1040px) {
    gap: 24.0rem;
  }
`;