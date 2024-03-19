import type { Metadata } from 'next';
import './globals.css';
import MainThemeProvider from './_providers/MainThemeProvider';
import QueryProviders from './_providers/QueryProvider';
import AuthStateProvider from './_providers/AuthStateProvider';
import SupabaseProvider from './_providers/SupabaseProvider';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'My-Threads',
  description:
    '스레드 서버스를 클론코딩 하여 나만의 스레드 서비스를 만들어 보았습니다.',
  icons: {
    icon: '/thread_logo.png',
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-darkMode dark:text-white`}
      >
        <QueryProviders>
          <SupabaseProvider>
            <MainThemeProvider>
              <AuthStateProvider>{children}</AuthStateProvider>
            </MainThemeProvider>
          </SupabaseProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
