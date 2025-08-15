'use client';

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollArrows from "../components/ScrollArrows";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

// ===================================
// FIX 1: Prevent redirect loop with ref
// ===================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const hasChecked = useRef(false);
  const isRedirecting = useRef(false);
  
  const isAuthPage = path === "/login" || path === "/signUp";
  
  useEffect(() => {
    // Only check once, not on every path change
    if (hasChecked.current || isRedirecting.current) {
      console.log('[Layout] Already checked or redirecting, skipping...');
      return;
    }
    
    hasChecked.current = true;
    console.log('[Layout] Checking auth for path:', path);
    
    const token = sessionStorage.getItem("access_token");
    console.log('[Layout] Token exists:', !!token, 'isAuthPage:', isAuthPage);
    
    if (!token && !isAuthPage) {
      console.log('[Layout] No token, need to redirect to login');
      isRedirecting.current = true;
      setIsAuth(false);
      
      // Use replace to avoid history issues
      window.location.replace('/login');
      return;
    }
    
    console.log('[Layout] Setting auth to:', !!token);
    setIsAuth(!!token || isAuthPage); // Allow auth pages even without token
  }, []); // Empty deps - only run once!
  
  // Loading state
  if (isAuth === null) {
    return (
      <html lang="en">
        <body suppressHydrationWarning className="h-full">
          <Provider store={store}>
            <div className="min-h-screen flex items-center justify-center">
              <div>Checking authentication...</div>
            </div>
          </Provider>
        </body>
      </html>
    );
  }
 const showNavFooter = isAuth && !isAuthPage;
  
  return (
    <html lang="en">
      <body suppressHydrationWarning className="h-full">
        <Provider store={store}>
          <div className="min-h-screen flex flex-col">
            {showNavFooter && <Navbar />}
            <main className="flex-1">{children}</main>
            {showNavFooter && <Footer />}
            {showNavFooter && <ScrollArrows />}
          </div>
        </Provider>
      </body>
    </html>
  );
}