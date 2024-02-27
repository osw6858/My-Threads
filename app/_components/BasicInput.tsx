interface InputProps {
  type: 'text' | 'number' | 'email';
  placeholder?: string;
  style?: string;
}

const BasicInput = ({ type, placeholder, style }: InputProps) => {
  return (
    <input
      className={`my-1 p-5 w-full rounded-xl h-14 bg-lightInput dark:placeholder:text-darkFontColor dark:bg-darkInput dark:outline-darkBorder ${style}`}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default BasicInput;
