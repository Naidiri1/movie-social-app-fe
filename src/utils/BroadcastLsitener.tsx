'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authSlice';
import { useRouter } from 'next/navigation';

export default function BroadcastLogoutListener() {
  const dispatch = useDispatch();
  const router = useRouter();

    useEffect(() => {
  console.log('[👂] Listener mounted');
  const channel = new BroadcastChannel('auth_channel');

  channel.onmessage = (event) => {
    console.log('[📢] Received message:', event.data); 

    if (event.data?.type === 'logout') {
      console.log('[🔒] Logging out this tab');
      dispatch(logout());
      sessionStorage.removeItem('access_token');
      router.push('/login');
    }
  };

  return () => {
    channel.close();
  };
}, [dispatch, router]);
    
  return null;
}
