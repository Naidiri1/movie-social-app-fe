'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import decodeJWT from 'jwt-decode';

 const AuthWindowLocation = ({ setIsAuth }: any) => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/signUp';
  const hasChecked = useRef(false);
  
  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;
    
    console.log('[AuthWindow] Checking auth...');
    
    const token = sessionStorage.getItem("access_token");
    
    if (!token && !isAuthPage) {
      console.log('[AuthWindow] No token, using window.location...');
      setIsAuth(false);
      // This will work even if component unmounts
      window.location.href = '/login';
      return;
    }
    
    if (token) {
      try {
        const decodedToken = decodeJWT(token) as any;
        if (decodedToken.exp <= Date.now() / 1000) {
          sessionStorage.removeItem('access_token');
          setIsAuth(false);
          if (!isAuthPage) {
            window.location.href = '/login';
          }
        } else {
          setIsAuth(true);
        }
      } catch {
        sessionStorage.removeItem('access_token');
        setIsAuth(false);
        if (!isAuthPage) {
          window.location.href = '/login';
        }
      }
    }
  }, [pathname, isAuthPage, setIsAuth]);
  
  return null;
};

export default AuthWindowLocation;