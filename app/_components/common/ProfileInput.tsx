import { ProfileData, ProfileName } from '@/app/_types/inputType';
import { Control, useController } from 'react-hook-form';

interface InputProps {
  type: 'text';
  placeholder?: string;
  style?: string;
  name: ProfileName;
  control: Control<ProfileData>;
}

const ProfileInput = ({
  type,
  placeholder,
  style,
  name,
  control,
}: InputProps) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <input
      autoComplete="off"
      onChange={field.onChange}
      value={field.value}
      name={field.name}
      className={`my-1 p-5 w-4/6 rounded-xl h-12 bg-lightInput dark:placeholder:text-darkFontColor dark:bg-darkInput dark:outline-darkBorder ${style}`}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default ProfileInput;
