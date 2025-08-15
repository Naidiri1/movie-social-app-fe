
'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from '@material-tailwind/react';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>
  );
}