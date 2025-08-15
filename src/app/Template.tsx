'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ScrollArrows from '@/components/ScrollArrows';

// Simple JWT decode - no library
function decodeToken(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const checkedRef = useRef(false);
  
  const isAuthPage = pathname === '/login' || pathname === '/signUp';
  
  useEffect(() => {
    // Only check once
    if (checkedRef.current) return;
    checkedRef.current = true;
    
    const checkAuth = () => {
      const token = sessionStorage.getItem('access_token');
      
      if (!token && !isAuthPage) {
        router.push('/login');
        return;
      }
      
      if (token) {
        const decoded = decodeToken(token);
        if (decoded && decoded.exp) {
          const isExpired = decoded.exp <= Date.now() / 1000;
          if (isExpired) {
            sessionStorage.removeItem('access_token');
            router.push('/login');
            return;
          }
        }
      }
      
      setIsAuth(!!token);
    };
    
    checkAuth();
    
    // Check every minute
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []); // Empty deps - run once
  
  if (isAuth === null) {
    return (
      <Provider store={store}>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-white">Loading...</div>
        </div>
      </Provider>
    );
  }
  const showNavFooter = isAuth && !isAuthPage;
  
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        {showNavFooter && <Navbar />}
        <main className="flex-1">{children}</main>
        {showNavFooter && <Footer />}
        {showNavFooter && <ScrollArrows />}
      </div>
    </Provider>
  );
}