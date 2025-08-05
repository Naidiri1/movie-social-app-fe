'use client';

import './globals.css';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Navbar from '../components/NavBar';
import { usePathname } from 'next/navigation';
import AuthGuard from '../utils/AuthGuard';
import BroadcastLogoutListener from "@/utils/BroadcastLsitener";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const hideNavbar = path === "/login" || path === "/signup";

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <ThemeProvider>
            <AuthGuard>
                 <BroadcastLogoutListener />
              {!hideNavbar && <Navbar />}
              <main>{children}</main>
            </AuthGuard>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
