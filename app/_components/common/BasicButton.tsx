interface ButtonProps {
  children: string;
  type?: 'reset' | 'button' | 'submit';
  style?: string;
  onClick?: () => void;
}

const BasicButton = ({ children, style, type, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-xl bg-black text-white  dark:bg-white dark:text-black  ${style} `}
    >
      {children}
    </button>
  );
};

export default BasicButton;
