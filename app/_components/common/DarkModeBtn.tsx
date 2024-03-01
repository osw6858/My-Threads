'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';

interface ButtonProps {
  children: string;
  type: string;
}

const DarkModeBtn = ({ children }: ButtonProps) => {
  useEffect(() => {
    themeChange(false);
  });

  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    themeChange();
  };

  return <button onClick={handleTheme}>{children}</button>;
};

export default DarkModeBtn;
