import type { Metadata } from 'next';
import './globals.css';
// import ClientProviders from '../components/ClientProviders'
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Movie Social App',
  description: 'Your movie social platform',
};

// Force dynamic to avoid SSR issues
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');
  console.log(token)
  return (
    <html lang="en">
      <body suppressHydrationWarning className="h-full">
        {children}
      </body>
    </html>
  );
}