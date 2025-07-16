'use client';
import './globals.css';

import { ThemeProvider } from "@material-tailwind/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='' suppressHydrationWarning={true} >
        <ThemeProvider>
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
