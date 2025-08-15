import type { Metadata } from 'next';
import './globals.css';
import ClientProviders from '../components/ClientProviders'
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Movie Social App',
  description: 'Your movie social platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');
  
  return (
    <html lang="en">
      <body suppressHydrationWarning className="h-full">
        <ClientProviders hasInitialToken={!!token?.value}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
