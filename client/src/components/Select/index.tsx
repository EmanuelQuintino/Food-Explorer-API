import { Container } from "./style";
import { UseFormRegisterReturn } from 'react-hook-form';

type SelectTypes = {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: string;
  options: string[];
}

export function Select({ label, id, register, options, error, ...rest }: SelectTypes) {
  return (
    <Container>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...register}
        {...rest}
      >
        {options?.map(option => {
          return <option key={option} value={option}>{option}</option>
        })}
      </select>
      {error && <span className='inputError'>{error}</span>}
    </Container>
  )
}
