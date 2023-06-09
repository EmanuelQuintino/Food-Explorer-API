import styled from "styled-components";

export const ButtonContainer = styled.button`
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.light100};
  
  &:disabled {
    opacity: 0.5;
    cursor: auto;;
  }
`;