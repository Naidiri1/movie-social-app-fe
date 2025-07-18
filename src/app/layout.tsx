'use client';

import './globals.css';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="" suppressHydrationWarning={true}>
        <Provider store={store}>
          <ThemeProvider>
            <div>{children}</div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
