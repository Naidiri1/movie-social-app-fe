"use client";

import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "../components/NavBar";
import { usePathname } from "next/navigation";
import AuthGuard from "../utils/AuthGuard";
import Footer from "../components/Footer";
import ScrollArrows from "../components/ScrollArrows"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname() || "";

  const isAuthPage = path === "/login" || path === "/signup";
  const isPublicShare = path.startsWith("/share/");
  const hideNavbarFooter = isAuthPage || isPublicShare;

  const content = (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavbarFooter && <Footer />}
      {!hideNavbarFooter && <ScrollArrows />}
    </>
  );

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Provider store={store}>
          <ThemeProvider>
            {isPublicShare || isAuthPage ? (
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
