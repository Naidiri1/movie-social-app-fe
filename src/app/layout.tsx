'use client';

import './globals.css';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Navbar from '../components/NavBar';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const hideNavbar = path === "/login" || path === "/signup";

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <ThemeProvider>
            {!hideNavbar && <Navbar />}
            <main>
              {children}
            </main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
