import React from 'react';

interface ButtonProps {
  children: string | React.ReactNode;
  type?: 'reset' | 'button' | 'submit';
  style?: string;
  onClick?: () => void;
}

const BasicButton = ({ children, style, type, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-xl bg-black text-white dark:bg-white dark:text-black border-solid border border-black dark:border-white ${style} `}
    >
      {children}
    </button>
  );
};

export default BasicButton;
