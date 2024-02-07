'use client';

interface ButtonProps {
  children: string;
  type: string;
}

export const DarkModeBtn = ({ children }: ButtonProps) => {
  const handleTheme = () => {
    const theme = localStorage.getItem('theme');
    if (!theme) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }

    if (theme === 'dark') {
      localStorage.removeItem('theme');
      document.documentElement.classList.remove('dark');
    }
  };

  return <button onClick={handleTheme}>{children}</button>;
};
