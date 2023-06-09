import styled from "styled-components"

export const Container = styled.section`
  form section {
    position: relative;
  }

  label {
    color: ${({ theme }) => theme.colors.light400};
    line-height: 5.6rem;
  }
  
  #boxIngredients {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    flex-wrap: wrap;
    width: 100%;
    border-radius: .8rem;
    padding: .6rem;
    background: ${({ theme }) => theme.colors.dark800};
  }

  .formButtons {
    margin: 3.2rem 0 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;

    > button:focus {
      border: 1px solid ${({ theme }) => theme.colors.light300};
    }

    > button:first-child {
      transition: filter 200ms;
    }

    > button:first-child:hover {
      filter: brightness(1.4);
    }
  }

  @media(min-width: 640px) {
    .formPart1 {
      display: flex;
      align-items: center;
      gap: 3.2rem;

      section:nth-child(1) {
        flex: 1;
      }

      section:nth-child(2) {
        flex: 5;
      }

      section:nth-child(3) {
        flex: 4;
      }
    }

    .formPart2 {
      display: flex;
      align-items: center;
      gap: 3.2rem;

      .containerIngredients {
        flex: 3;
      }

      .containerIngredients + section {
        flex:1;
      }
    }

    .formButtons {
      display: flex;
      justify-content: flex-end;
      
      > button {
        width: 17.2rem;
      }
      
      > button:focus {
        border: 1px solid ${({ theme }) => theme.colors.light300};
      }
    }
  }
`;