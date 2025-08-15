'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// DO NOT EXPORT ClientProviders from here!
// DO NOT IMPORT this file in layout.tsx!

// Simple JWT decode
function decodeToken(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

interface AuthGuardProps {
  setIsAuth: (value: boolean) => void;
}

export default function AuthGuard({ setIsAuth }: AuthGuardProps) {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('access_token');
      
      if (!token) {
        setIsAuth(false);
        return;
      }
      
      const decoded = decodeToken(token);
      if (decoded && decoded.exp) {
        const isExpired = decoded.exp <= Date.now() / 1000;
        
        if (isExpired) {
          sessionStorage.removeItem('access_token');
          setIsAuth(false);
          router.push('/login');
        } else {
          setIsAuth(true);
        }
      }
    };
    
    checkAuth();
    intervalRef.current = setInterval(checkAuth, 60000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [setIsAuth, router]);
  
  return null;
}
