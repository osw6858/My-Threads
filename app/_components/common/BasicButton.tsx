interface ButtonProps {
  children: string;
  type?: 'reset' | 'button' | 'submit';
  style?: string;
}

const BasicButton = ({ children, style, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`rounded-xl bg-black text-gray-600 dark:bg-white dark:text-black ${style}`}
    >
      {children}
    </button>
  );
};

export default BasicButton;
