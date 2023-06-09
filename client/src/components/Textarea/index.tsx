import { Container } from "./style";
import { UseFormRegisterReturn } from 'react-hook-form';

type InputTypes = {
  label: string;
  id: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  maxLength?: number;
}

export function Textarea({ label, id, placeholder, maxLength, register, error, ...rest }: InputTypes) {
  return (
    <Container>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        maxLength={maxLength || 255}
        {...register}
        {...rest}
      />
      {error && <span className='inputError'>{error}</span>}
    </Container>
  )
}