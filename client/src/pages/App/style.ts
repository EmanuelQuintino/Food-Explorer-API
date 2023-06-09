import styled from "styled-components"

export const Container = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  main {
    padding: 0 2.4rem 2.8rem;
    flex: 1;
  }

  @media(min-width: 42.0rem) {
      overflow-y: auto;
      
      ::-webkit-scrollbar {
        width: .75rem;
      }
      
      ::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.dark800}; 
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.light750};
        border-radius: .8rem;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.light650}; 
      }
  }
`;