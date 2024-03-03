import type { Metadata } from 'next';
import './globals.css';
import MainThemeProvider from './_providers/MainThemeProvider';
import QueryProviders from './_providers/QueryProvider';
import AuthStateProvider from './_providers/AuthStateProvider';
import SupabaseProvider from './_providers/SupabaseProvider';

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
    <html lang="ko">
      <body className="bg-white dark:bg-darkMode dark:text-white">
        <SupabaseProvider>
          <QueryProviders>
            <MainThemeProvider>
              <AuthStateProvider>{children}</AuthStateProvider>
            </MainThemeProvider>
          </QueryProviders>
        </SupabaseProvider>
      </body>
    </html>
  );
}
