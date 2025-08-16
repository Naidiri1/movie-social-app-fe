// app/(protected)/layout.tsx (SERVER)
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('access_token')?.value;
  if (!token) redirect('/login');
  return <>{children}</>;
}
