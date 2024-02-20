import { DarkModeBtn } from './DarkModeBtn';

export const TopHeader = () => {
  return (
    <header className="h-16 w-full bg-white dark:bg-darkMode border-b border-solid border-gray-300 dark:border-darkBorder fixed z-50">
      <DarkModeBtn type="button">다크모드</DarkModeBtn>
    </header>
  );
};
