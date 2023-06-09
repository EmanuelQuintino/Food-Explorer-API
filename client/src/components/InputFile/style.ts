import styled from "styled-components"

export const Container = styled.section`
  .labelInputFile {
    color: ${({ theme }) => theme.colors.light400};
    line-height: 5.6rem;
  }

  .boxInputFile {
    width: 100%;
    border-radius: .8rem;
    padding: 1.2rem 1.4rem 1.2rem 2.4rem;
    background: ${({ theme }) => theme.colors.dark800};
    border: .1rem solid transparent;

    > label {
      font-family: 'Poppins';
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.4rem;
      color: ${({ theme }) => theme.colors.light100};
      display: flex;
      align-items: center;
      gap: 1.2rem;
      white-space: nowrap;
      
      :hover {
        cursor: pointer;
      }

      > svg {
        width: 2.0rem;
        height: 2.0rem;
      }
    }
  }

  .boxInputFile:focus-within {
    border: .1rem solid ${({ theme }) => theme.colors.light300};
  }
`;