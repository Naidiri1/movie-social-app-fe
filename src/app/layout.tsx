'use client';

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "../components/NavBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ScrollArrows from "../components/ScrollArrows";
import Auth from "../utils/AuthGuard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [isAuth, setIsAuth] = useState<boolean | null>(null); // Use null for loading state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage = path === "/login" || path === "/signUp";

  // Don't render until mounted (prevents SSR issues)
  if (!mounted) {
    return (
      <html lang="en">
        <body suppressHydrationWarning>
          <div className="min-h-screen flex items-center justify-center">
            <div>Loading...</div>
          </div>
        </body>
      </html>
    );
  }

  // IMPORTANT: Only ONE html/body tag structure
  return (
    <html lang="en">
      <body suppressHydrationWarning className="h-full">
        <Provider store={store}>
          {/* Auth component always mounted */}
          <Auth setIsAuth={setIsAuth} />
          
          <div className="min-h-screen flex flex-col">
            {/* Show loading while auth is being checked */}
            {isAuth === null ? (
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-white">Checking authentication...</div>
              </div>
            ) : (
              <>
                {/* Only show Navbar if authenticated and not on auth pages */}
                {isAuth && !isAuthPage && <Navbar />}
                
                {/* Main content */}
                <main className="flex-1">{children}</main>
                
                {/* Only show Footer and ScrollArrows if authenticated and not on auth pages */}
                {isAuth && !isAuthPage && (
                  <>
                    <Footer />
                    <ScrollArrows />
                  </>
                )}
              </>
            )}
          </div>
        </Provider>
      </body>
    </html>
  );
}
