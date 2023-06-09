import { Container } from "./style";
import { UseFormRegisterReturn } from 'react-hook-form';

type InputTypes = {
  label: string;
  id: string;
  value?: string;
  type: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input({ label, id, type, placeholder, register, error, ...rest }: InputTypes) {
  return (
    <Container>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        {...rest}
      />
      {error && <span className='inputError'>{error}</span>}
    </Container>
  )
}