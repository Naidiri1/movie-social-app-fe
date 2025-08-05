'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { restoreUserSession } from '../redux/reducers/authSlice';
import { AppDispatch } from "../redux/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  const { username, loading } = useSelector((state:any) => state.auth);

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');

    if (isAuthPage) return;

    if (!token) {
      router.push('/login');
      return;
    }

    if (!username) {
      dispatch(restoreUserSession())
        .unwrap()
        .catch(() => router.push('/login'));
    }
  }, [dispatch, router, pathname, username, isAuthPage]);

  if (!username && !isAuthPage && loading) {
    return <div className="text-white p-4">Loading session...</div>;
  }

  return <>{children}</>;
}
