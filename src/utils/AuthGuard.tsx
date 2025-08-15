'use client';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import decodeJWT from 'jwt-decode';
import { useFetchUserIfNull } from '../utils/sessionRecover';
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

    useFetchUserIfNull();

    useEffect(() => {
        const channel = new BroadcastChannel('my_channel');

        const checkTokenExp = (token: any) => {
            if (token) {
                // eslint-disable-next-line
                const decodedToken = decodeJWT(token) as any;
                const hasValidPermission =
                    decodedToken.adminPermission ||
                    decodedToken.developerPermission ||
                    decodedToken.onboardingPermission ||
                    decodedToken.readOnlyPermission ||
                    decodedToken.setupPermission;

                if (decodedToken.exp <= Date.now() / 1000) {
                    sessionStorage.removeItem('access_token');
                    setIsAuth(false);
                    dispatch(hideRenewDialog());

                    router.push('/login');
                    configFetchedRef.current = false;
                } else if (!hasValidPermission) {
                    setIsAuth(false);
                    configFetchedRef.current = false;
                    dispatch(
                        setErrorMessage(
                            'You do not have permission to access this page.',
                        ),
                    );
                    sessionStorage.removeItem('access_token');
                } else {
                    if (
                        decodedToken.exp - Date.now() / 1000 <=
                        warningBufferTime
                    ) {
                        dispatch(showRenewDialog());
                    }
                    
                }
            } else {
                dispatch(hideRenewDialog());
                setIsAuth(false);
                router.push('/login');
                configFetchedRef.current = false;
            }
        };

       
        const handleMessage = (event: any) => {
            const message = event.data;
            if (message.type === 'new-token') {
                sessionStorage.setItem('access_token', message.token);
                configFetchedRef.current = false;
                checkTokenExp(message.token);
            } else if (message.type === 'request-token') {
                const localToken = sessionStorage.getItem('access_token');
                if (localToken) {
                    // eslint-disable-next-line
                    const decodedToken = decodeJWT(localToken) as any;
                    if (decodedToken.exp > Date.now() / 1000) {
                        channel.postMessage({
                            type: 'new-token',
                            token: localToken,
                        });
                    }
                }
            } else if (message.type === 'logout') {
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

        const localToken = sessionStorage.getItem('access_token');
        checkTokenExp(localToken);

        const interval = setInterval(() => {
            const updatedToken = sessionStorage.getItem('access_token');
            checkTokenExp(updatedToken);
        }, sessionRefreshDuration);

        return () => {
            clearInterval(interval);
            channel.close();
        };
    }, []);

    return null;
};

export default Auth;
