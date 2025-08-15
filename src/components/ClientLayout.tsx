// components/ClientLayout.tsx
"use client";

import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "./NavBar";
import { usePathname } from "next/navigation";
import AuthGuard from "../utils/AuthGuard";
import Footer from "./Footer";
import ScrollArrows from "./ScrollArrows";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname() || "";

  const isAuthPage =
    path === "/login" ||
    path === "/signup" ||
    path === "/forgot-password" ||
    path === "/reset-password";

  const isPublicShare = path.startsWith("/share/");

  const hideNavbarFooter = isAuthPage || isPublicShare;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          {!hideNavbarFooter && <Navbar />}
          <main className="flex-1">
            {isAuthPage || isPublicShare ? (
              children
            ) : (
              <AuthGuard>{children}</AuthGuard>
            )}
          </main>
          {!hideNavbarFooter && <Footer />}
          {!hideNavbarFooter && <ScrollArrows />}
        </div>
      </ThemeProvider>
    </Provider>
  );
}