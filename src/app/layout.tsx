'use client';

import { Provider } from 'react-redux';
import './globals.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import Auth from '../utils/AuthGuard';
import { store } from '../redux/store';
import SessionExpiryWarningDialog from '../components/SessionWarning';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();
    const [isAuth, setIsAuth] = useState(false);

    if (path.endsWith('/login/')) {
        return (
            <Provider store={store}>
                <Auth setIsAuth={setIsAuth} />
                <html lang="en">
                    <body>
                        <title>Loading...</title>
                        {children}
                    </body>
                </html>
            </Provider>
        );
    }
    if (!isAuth) {
        return (
            <Provider store={store}>
                <html lang="en">
                    <body>
                        <title>Loading...</title>
                        <div className="flex flex-row">
                            <Auth setIsAuth={setIsAuth} />
                            <div className="ag-theme-alpine w-full h-full">
                                <div className="flex items-center bg-[#465460] text-white pl-2 h-9 text-xl font-bold">
                                    <div>Loading...</div>
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
            </Provider>
        );
    } else {
        return (
            <Provider store={store}>
                <html lang="en">
                    <body>
                        <title>Loading...</title>
                        <div className="flex flex-row">
                            <div className="z-50">
                            </div>
                            <SessionExpiryWarningDialog />
                            <Auth setIsAuth={setIsAuth} />
                            {children}
                        </div>
                    </body>
                </html>
            </Provider>
        );
    }
}
