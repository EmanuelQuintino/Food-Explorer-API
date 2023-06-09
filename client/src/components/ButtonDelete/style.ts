import styled from "styled-components";

export const ButtonContainer = styled.button`
  width: 100%;
  height: 4.8rem;
  border-radius: .4rem;
  background: ${({ theme }) => theme.colors.dark800};
  
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.light100};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: .8rem;
  
  &:hover {
    filter: brightness(0.95);
  }
  
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .icon {
    width: 1.8rem;
    height: 1.4rem;
  }
`;