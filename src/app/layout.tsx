"use client";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "../components/NavBar";
import { usePathname } from "next/navigation";
import AuthGuard from "../utils/AuthGuard";
import Footer from "../components/Footer";
import ScrollArrows from "../components/ScrollArrows";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname() || "";
  // Normalize path by removing trailing slash (trailingSlash: true in next.config.js)
  const normalizedPath = path.replace(/\/$/, "") || "/";
  
  useEffect(() => {
    document.title = "Iriscope";
  }, []);
  
  const isAuthPage =
    normalizedPath === "/login" ||
    normalizedPath === "/signUp" ||
    normalizedPath === "/forgot-password" ||
    normalizedPath === "/reset-password";

  const isPublicShare = normalizedPath.startsWith("/share");

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
            {isAuthPage || isPublicShare ? (
              content
            ) : (
              <AuthGuard>{content}</AuthGuard>
            )}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}