'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

const MainThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default MainThemeProvider;
