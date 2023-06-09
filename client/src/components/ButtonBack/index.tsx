import { ButtonContainer } from "./style";
import { ButtonType } from "../Button";

export function ButtonBack({ name, disabled = false, ...rest }: ButtonType) {
  return (
    <ButtonContainer
      type="button"
      disabled={disabled}
      {...rest}
    >
      &lt; voltar
    </ButtonContainer>
  )
}