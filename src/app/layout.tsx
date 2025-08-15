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
  const [isAuth, setIsAuth] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage =
    path === "/login" ||
    path === "/signUp"; 

  // Don't render until mounted (prevents SSR issues)
  if (!mounted) {
    return (
      <html lang="en">
        <body suppressHydrationWarning>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  // Login/Signup pages - no auth check needed
  if (isAuthPage) {
    return (
      <Provider store={store}>
        <Auth setIsAuth={setIsAuth} />
        <html lang="en">
          <body suppressHydrationWarning className="h-full">
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </body>
        </html>
      </Provider>
    );
  }

  // Not authenticated - show loading and check auth
  if (!isAuth) {
    return (
      <Provider store={store}>
        <Auth setIsAuth={setIsAuth} />
        <html lang="en">
          <body suppressHydrationWarning className="h-full">
            <div className="min-h-screen flex flex-col">
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-white">Loading...</div>
              </div>
            </div>
          </body>
        </html>
      </Provider>
    );
  }

  // Authenticated - show full app with navbar/footer
  return (
    <Provider store={store}>
      <Auth setIsAuth={setIsAuth} />
      <html lang="en">
        <body suppressHydrationWarning className="h-full">
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollArrows />
          </div>
        </body>
      </html>
    </Provider>
  );
}
