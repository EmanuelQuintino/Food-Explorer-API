import styled from "styled-components"

export const Container = styled.section`
  form {
    width: 100%;
  }

  form section {
    width: 100%;
    position: relative;
  }

  label {
    color: ${({ theme }) => theme.colors.light400};
    line-height: 3.2rem;
  }
  
  input {
    width: 100%;
    border-radius: .8rem;
    padding: 1.2rem 1.4rem;
    font-size: 1.6rem;
    background: ${({ theme }) => theme.colors.dark800};
    border: 1px solid transparent;

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.light300};
    }
  }

  .box {
    display: flex;
    gap: 1.6rem;
    margin-top: 2.4rem;
  }

  form button {
    margin: 3.6rem 0 1.6rem;
  }
`;