'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ScrollArrows from '../components/ScrollArrows';
import AuthGuard from '../utils/AuthGuard'; 

interface ClientProvidersProps {
  children: React.ReactNode;
  hasInitialToken?: boolean;
}

export default function ClientProviders({
  children,
  hasInitialToken,
}: ClientProvidersProps) {
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
    
    const token = sessionStorage.getItem('access_token');
    
    if (!token && !isAuthPage) {
      router.push('/login');
      return;
    }
    
    setIsAuth(!!token);
  }, [mounted, isAuthPage, router]); // Remove pathname from deps to avoid re-runs
  
  if (!mounted) {
    return (
      <Provider store={store}>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-white">Loading...</div>
        </div>
      </Provider>
    );
  }
  
  if (isAuth === null) {
    return (
      <Provider store={store}>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-white">Checking authentication...</div>
        </div>
      </Provider>
    );
  }
  
  const showNavFooter = isAuth && !isAuthPage;
  
  return (
    <Provider store={store}>
      {isAuth !== null && <AuthGuard setIsAuth={setIsAuth} />}
      <div className="min-h-screen flex flex-col">
        {showNavFooter && <Navbar />}
        <main className="flex-1">{children}</main>
        {showNavFooter && <Footer />}
        {showNavFooter && <ScrollArrows />}
      </div>
    </Provider>
  );
}