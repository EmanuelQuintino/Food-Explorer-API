import styled from "styled-components"

export const Container = styled.section`
  label {
    color: ${({ theme }) => theme.colors.light400};
    line-height: 5.6rem;
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
`;