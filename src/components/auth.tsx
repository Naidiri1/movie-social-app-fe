'use client';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import {
    hideRenewDialog,
    showRenewDialog,
    setErrorMessage,
} from '../redux/reducers/authSlice';

const Auth = ({ setIsAuth }: any) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const sessionRefreshDuration = 60000;
    const configFetchedRef = useRef(false);
    const warningBufferTime = 120;


    useEffect(() => {
        const channel = new BroadcastChannel('my_channel');
        const handleMessage = (event: any) => {
            const message = event.data;
            if (message.type === 'new-token') {
                sessionStorage.setItem('access_token', message.token);
                configFetchedRef.current = false;
            }  else if (message.type === 'logout') {
                sessionStorage.removeItem('access_token');
                setIsAuth(false);
                router.push('/login');
                configFetchedRef.current = false;
            }
        };

        if (channel) {
            channel.postMessage({ type: 'request-token' });
            channel.onmessage = handleMessage;
        }


    }, []);

    return null;
};

export default Auth;
