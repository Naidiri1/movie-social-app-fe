'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ScrollArrows from '@/components/ScrollArrows';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';


// Import Auth without SSR
const Auth = dynamic<any>(() => import('@/utils/AuthGuard'), { 
  ssr: false,
});
export default function ClientProviders({
  children,
  hasInitialToken,
}: {
  children: React.ReactNode;
  hasInitialToken?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const checkedRef = useRef(false);
  
  const isAuthPage = pathname === '/login' || pathname === '/signUp';
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted || checkedRef.current) return;
    checkedRef.current = true;
    
    // Check sessionStorage on client
    const token = sessionStorage.getItem('access_token');
    
    if (!token && !isAuthPage) {
      router.push('/login');
      return;
    }
    
    setIsAuth(!!token);
  }, [mounted, pathname, router, isAuthPage]);
  
  // Initial loading
  if (!mounted) {
    return (
      <Provider store={store}>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-white">Loading...</div>
        </div>
      </Provider>
    );
  }
  
  // Waiting for auth check
  if (isAuth === null) {
    return (
      <Provider store={store}>
        <Auth setIsAuth={setIsAuth} />
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-white">Checking authentication...</div>
        </div>
      </Provider>
    );
  }
  
  const showNavFooter = isAuth && !isAuthPage;
  
  return (
    <Provider store={store}>
      <Auth setIsAuth={setIsAuth} />
      <div className="min-h-screen flex flex-col">
        {showNavFooter && <Navbar />}
        <main className="flex-1">{children}</main>
        {showNavFooter && <Footer />}
        {showNavFooter && <ScrollArrows />}
      </div>
    </Provider>
  );
}
