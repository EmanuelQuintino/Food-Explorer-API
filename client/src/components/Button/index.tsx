import { ButtonContainer } from "./style";

export type ButtonType = {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({ icon: Icon, name, disabled = false, ...rest }: ButtonType) {
  return (
    <ButtonContainer
      disabled={disabled}
      {...rest}
    >
      {Icon && <Icon />}
      {name}
    </ButtonContainer>
  )
}