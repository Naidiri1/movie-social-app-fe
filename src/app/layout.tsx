import type { Metadata } from 'next';
import './globals.css';
import ClientProviders from '../utils/AuthGuard';

export const metadata: Metadata = {
  title: 'Movie Social App',
  description: 'Your movie social platform',
};

// This makes it dynamic without needing 'force-dynamic'
import { cookies } from 'next/headers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Just calling cookies() makes this dynamic
  const cookieStore = cookies();
  // You can check for token if you want initial state
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
