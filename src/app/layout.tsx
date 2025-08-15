"use client";
export const dynamic = 'force-dynamic';

import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "../components/NavBar";
import { usePathname } from "next/navigation";
import AuthGuard from "../utils/AuthGuard";
import Footer from "../components/Footer";
import ScrollArrows from "../components/ScrollArrows";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "";

  const isAuthPage =
    path === "/login" ||
    path === "/signup" ||
    path === "/forgot-password" ||
    path === "/reset-password";

  const isPublicShare = path.startsWith("/share/");

  const hideNavbarFooter = isAuthPage || isPublicShare;

  const content = (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideNavbarFooter && <Footer />}
      {!hideNavbarFooter && <ScrollArrows />}
    </div>
  );

  return (
    <html lang="en">
      <body suppressHydrationWarning className="h-full">
        <Provider store={store}>
          <ThemeProvider>
            {isAuthPage || isPublicShare ? content : <AuthGuard>{content}</AuthGuard>}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}