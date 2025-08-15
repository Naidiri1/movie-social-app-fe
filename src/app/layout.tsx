'use client';

import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "../components/NavBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ScrollArrows from "../components/ScrollArrows";
import { Providers } from "../components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage =
    path === "/login" ||
    path === "/signup" ||
    path === "/forgot-password" ||
    path === "/reset-password";

  const isPublicShare = path?.startsWith("/share/");
  const hideNavbarFooter = isAuthPage || isPublicShare;

  // Return early if not mounted (during build)
  if (!mounted) {
    return (
      <html lang="en">
        <body suppressHydrationWarning className="h-full">
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </body>
      </html>
    );
  }

  if (isAuthPage || isPublicShare) {
    return (
      <html lang="en">
        <body suppressHydrationWarning className="h-full">
          <Providers>
            <ThemeProvider>
              <div className="min-h-screen flex flex-col">
                <main className="flex-1">{children}</main>
              </div>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning className="h-full">
        <Provider store={store}>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollArrows />
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}