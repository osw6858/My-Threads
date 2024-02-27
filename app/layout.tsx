import type { Metadata } from 'next';
import './globals.css';
import MainThemeProvider from './_utills/MainThemeProvider';
import QueryProviders from './_utills/QueryProvider';
import AuthProvider from './_utills/AuthProvider';

export const metadata: Metadata = {
  title: 'MySNS',
  description: 'Our SNS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-darkMode dark:text-white">
        <QueryProviders>
          <MainThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </MainThemeProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
