'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import decodeJWT from 'jwt-decode';

const Auth = ({ setIsAuth }: any) => { 
  const pathname = usePathname();
  const router = useRouter();
  const { username } = useSelector((state: any) => state.auth);
  const hasInitialized = useRef(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);
  
  // Check if we're on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/signUp';
  
  // Ensure component is mounted before using router
  useEffect(() => {
    console.log('[Auth] Component mounting...');
    setIsMounted(true);
    return () => {
      console.log('[Auth] Component unmounting...');
    };
  }, []);
  
  // Handle pending redirects after mount
  useEffect(() => {
    if (isMounted && pendingRedirect) {
      console.log('[Auth] Executing pending redirect to:', pendingRedirect);
      router.push(pendingRedirect);
      setPendingRedirect(null);
    }
  }, [isMounted, pendingRedirect, router]);
  
  // Safe router push
  const safeRouterPush = (path: string) => {
    console.log('[Auth] safeRouterPush called, mounted:', isMounted, 'path:', path);
    
    if (!isMounted) {
      console.log('[Auth] Component not mounted, setting pending redirect:', path);
      setPendingRedirect(path);
    } else {
      console.log('[Auth] Component mounted, navigating immediately to:', path);
      router.push(path);
    }
  };
  
  // Initialize only once
  useEffect(() => {
    if (hasInitialized.current) {
      console.log('[Auth] Already initialized, skipping...');
      return;
    }
    hasInitialized.current = true;
    
    console.log('[Auth] Initializing, pathname:', pathname, 'isAuthPage:', isAuthPage);
    
    // Set up broadcast channel
    const channel = new BroadcastChannel("my-channel");
    channelRef.current = channel;
    
    const checkTokenExp = (token: string | null) => {
      console.log('[Auth] Checking token:', token ? 'exists' : 'null');
      
      if (!token) {
        console.log('[Auth] No token found, isAuthPage:', isAuthPage);
        setIsAuth(false);
        if (!isAuthPage) {
          console.log('[Auth] Not on auth page, redirecting to login...');
          safeRouterPush('/login');
        }
        return false;
      }
      
      try {
        const decodedToken = decodeJWT(token) as any;
        const now = Date.now() / 1000;
        
        console.log('[Auth] Token decode successful, checking expiry...');
        console.log('[Auth] Token exp:', new Date(decodedToken.exp * 1000).toISOString());
        console.log('[Auth] Current time:', new Date(now * 1000).toISOString());
        
        if (decodedToken.exp <= now) {
          console.log('[Auth] Token expired');
          sessionStorage.removeItem('access_token');
          setIsAuth(false);
          if (!isAuthPage) {
            safeRouterPush('/login');
          }
          return false;
        }
        
        console.log('[Auth] Token valid');
        setIsAuth(true);
        return true;
      } catch (error) {
        console.error('[Auth] Invalid token:', error);
        sessionStorage.removeItem('access_token');
        setIsAuth(false);
        if (!isAuthPage) {
          safeRouterPush('/login');
        }
        return false;
      }
    };

    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      console.log('[Auth] Broadcast message:', message.type);

      if (message.type === "new-token") {
        sessionStorage.setItem("access_token", message.token);
        const isValid = checkTokenExp(message.token);
        setIsAuth(isValid);
      }

      if (message.type === "request-token") {
        const token = sessionStorage.getItem("access_token");
        if (token) {
          channel.postMessage({ type: "new-token", token });
        }
      }

      if (message.type === "logout") {
        console.log('[Auth] Logout message received');
        sessionStorage.removeItem("access_token");
        setIsAuth(false);
        if (!isAuthPage) {
          safeRouterPush("/login");
        }
      }
    };
    
    // Set up channel listener
    channel.onmessage = handleMessage;
    channel.postMessage({ type: "request-token" });
    
    // Initial token check
    console.log('[Auth] Performing initial token check...');
    const token = sessionStorage.getItem("access_token");
    const isValid = checkTokenExp(token);
    
    console.log('[Auth] Initial check complete, isValid:', isValid);
    
    // Cleanup
    return () => {
      console.log('[Auth] Cleaning up...');
      if (channelRef.current) {
        channelRef.current.close();
      }
    };
  }, []); // Empty array - only run once
  
  // Update auth state when username changes
  useEffect(() => {
    if (username) {
      console.log('[Auth] Username detected:', username);
      setIsAuth(true);
    }
  }, [username, setIsAuth]);
  
  return null;
}

export default Auth;