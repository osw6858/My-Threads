import { Control, useController } from 'react-hook-form';
import { InputName, InputValue } from '../../_types/inputType';

interface InputProps {
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  style?: string;
  name: InputName;
  control: Control<InputValue>;
}

const BasicInput = ({
  type,
  placeholder,
  style,
  name,
  control,
}: InputProps) => {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <input
      autoComplete="off"
      onChange={field.onChange}
      value={field.value}
      name={field.name}
      className={`my-1 p-5 w-full rounded-xl h-14 bg-lightInput dark:placeholder:text-darkFontColor dark:bg-darkInput dark:outline-darkBorder ${style}`}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default BasicInput;
