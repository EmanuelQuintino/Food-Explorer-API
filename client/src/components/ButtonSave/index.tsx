import { ButtonContainer } from "./style";
import { MouseEventHandler } from "react";

export type ButtonType = {
  icon?: string;
  name: string;
  disabled?: boolean;
  form: string;
  onClick?: MouseEventHandler;
}

export function ButtonSave({ icon, name, disabled = false, ...rest }: ButtonType) {
  return (
    <ButtonContainer
      disabled={disabled}
      {...rest}
    >
      {icon && <img src={icon} className="icon" alt="icon" />}
      {name}
    </ButtonContainer>
  )
}