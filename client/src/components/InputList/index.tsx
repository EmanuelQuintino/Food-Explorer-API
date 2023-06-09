import { Container } from "./style";
import { UseFormRegisterReturn } from 'react-hook-form';
import { FiPlus, FiX } from "react-icons/fi"

type InputTypes = {
  value: string;
  placeholder?: string;
  isNew?: boolean;
  register: UseFormRegisterReturn;
  onClick?: () => {};
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function InputList({ value, isNew=false, register, onClick, ...rest }: InputTypes) {
  function handleAddItem(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      event.preventDefault();
      onClick?.();
    }
  }
  
  return (
    <Container isNew={isNew}>      
      <input 
        type={"text"}
        value={value}
        readOnly={!isNew}
        onKeyDown={handleAddItem}
        {...register}
        {...rest}
      />

      <button type="button" onClick={onClick}>
        {isNew ? <FiPlus/> : <FiX/>}
      </button>
   </Container>
  )
}