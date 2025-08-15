'use client';

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollArrows from "../components/ScrollArrows";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function RootLayoutClear({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');
  const hasChecked = useRef(false);
  
  const isAuthPage = path === "/login" || path === "/signUp";
  
  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;
    
    console.log('[Layout] Performing auth check...');
    
    const token = sessionStorage.getItem("access_token");
    
    if (token) {
      // Has token = authenticated
      console.log('[Layout] Token found - authenticated');
      setAuthStatus('authenticated');
    } else {
      // No token
      console.log('[Layout] No token found');
      setAuthStatus('unauthenticated');
      
      // If not on auth page, redirect
      if (!isAuthPage) {
        console.log('[Layout] Not on auth page, redirecting to login...');
        window.location.replace('/login');
      }
    }
  }, []);
  
  // Loading state
  if (authStatus === 'checking') {
    return (
      <html lang="en">
        <body suppressHydrationWarning className="h-full">
          <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="text-white">Loading...</div>
          </div>
        </body>
      </html>
    );
  }
  
  // Render based on auth status
  const showFullLayout = authStatus === 'authenticated' && !isAuthPage;
  
  return (
    <html lang="en">
      <body suppressHydrationWarning className="h-full">
        <Provider store={store}>
          <div className="min-h-screen flex flex-col">
            {showFullLayout && <Navbar />}
            <main className="flex-1">{children}</main>
            {showFullLayout && <Footer />}
            {showFullLayout && <ScrollArrows />}
          </div>
        </Provider>
      </body>
    </html>
  );
}
