import { Container } from "./style";
import { UseFormRegisterReturn } from 'react-hook-form';

type InputTypes = {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  id: string;
  placeholder: string;
  value?: string;
  register: UseFormRegisterReturn;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function InputFile({ icon: Icon, label, placeholder, id, register, error, ...rest }: InputTypes) {
  return (
    <Container>
      <label htmlFor={id} className="labelBoxInputFile">{label}</label>
      <div className="boxInputFile">
        <label htmlFor={id}>
          {Icon && <Icon />}
          {placeholder}
        </label>

        <input
          id={id}
          type="file"
          className="srOnly"
          accept="image/*"
          {...register}
          {...rest}
        />
      </div>
      {error && <span className='inputError'>{error}</span>}
    </Container>
  )
}