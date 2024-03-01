interface ButtonProps {
  children: string;
  type?: 'reset' | 'button' | 'submit';
  style?: string;
}

const BasicButton = ({ children, style, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`p-5 my-2 rounded-xl bg-black text-gray-600 dark:bg-white dark:text-gray-600 ${style}`}
    >
      {children}
    </button>
  );
};

export default BasicButton;
