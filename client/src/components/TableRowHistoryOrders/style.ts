import styled from "styled-components";

type ContainerProps = {
  isAdmin: boolean;
};

export const Container = styled.tr<ContainerProps>`  
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.light400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark900};
  }

  td, tr {
    padding: 1.6rem 2.4rem;
  }
  
  .statusIcon {
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    display: inline-block;
    margin-right: .8rem;
  }
  
  .Pendente {
    background: ${({ theme }) => theme.colors.tomato300};
  }

  .Preparando {
    background: ${({ theme }) => theme.colors.carrot100};
  }

  .Entregue {
    background: ${({ theme }) => theme.colors.mint100};
  }
`;