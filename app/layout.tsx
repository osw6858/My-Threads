import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from './_components/Provider';
import QueryProviders from './_utills/QueryProvider';

export const metadata: Metadata = {
  title: 'STO',
  description: 'study together online',
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
          <Provider>{children}</Provider>
        </QueryProviders>
      </body>
    </html>
  );
}
