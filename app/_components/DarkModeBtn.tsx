'use client';
import { useTheme } from 'next-themes';

interface ButtonProps {
  children: string;
  type: string;
}

const DarkModeBtn = ({ children }: ButtonProps) => {
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return <button onClick={handleTheme}>{children}</button>;
};

export default DarkModeBtn;
