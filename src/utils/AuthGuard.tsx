
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useFetchUserIfNull } from "../utils/sessionRecover";
import decodeJWT from 'jwt-decode';

// const Auth = ({ setIsAuth }: any) => { 
//   const pathname = usePathname();
//   // const router = useRouter();
//   const { username } = useSelector((state: any) => state.auth);
//   const hasInitialized = useRef(false);
//   const channelRef = useRef<BroadcastChannel | null>(null);
  
//   // Check if we're on auth pages
//   const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/signUp';
  
//   // Call the hook
//   // useFetchUserIfNull();
  
//   // Initialize only once
//   useEffect(() => {
//     if (hasInitialized.current) return;
//     hasInitialized.current = true;
    
//     // Set up broadcast channel
//     const channel = new BroadcastChannel("my-channel");
//     channelRef.current = channel;
    
//     const checkTokenExp = (token: string | null) => {
//       if (!token) {
//         setIsAuth(false);
//         if (!isAuthPage) {
//           // router.push('/login');
//         }
//         return false;
//       }
      
//       try {
//         const decodedToken = decodeJWT(token) as any;
//         if (decodedToken.exp <= Date.now() / 1000) {
//           sessionStorage.removeItem('access_token');
//           setIsAuth(false);
//           if (!isAuthPage) {
//             // router.push('/login');
//           }
//           return false;
//         }
//         return true;
//       } catch (error) {
//         console.error('Invalid token:', error);
//         sessionStorage.removeItem('access_token');
//         setIsAuth(false);
//         if (!isAuthPage) {
//           // router.push('/login');
//         }
//         return false;
//       }
//     };

//     const handleMessage = (event: MessageEvent) => {
//       const message = event.data;

//       if (message.type === "new-token") {
//         sessionStorage.setItem("access_token", message.token);
//         checkTokenExp(message.token);
//       }

//       if (message.type === "request-token") {
//         const token = sessionStorage.getItem("access_token");
//         if (token) {
//           channel.postMessage({ type: "new-token", token });
//         }
//       }

//       if (message.type === "logout") {
//         sessionStorage.removeItem("access_token");
//         setIsAuth(false);
//         if (!isAuthPage) {
//           // router.push("/login");
//         }
//       }
//     };
    
//     // Set up channel listener
//     channel.onmessage = handleMessage;
//     channel.postMessage({ type: "request-token" });
    
//     // Initial token check
//     const token = sessionStorage.getItem("access_token");
//     const isValid = checkTokenExp(token);
    
//     if (isValid || isAuthPage) {
//       setIsAuth(isValid);
//     }
    
//     // Cleanup
//     return () => {
//       if (channelRef.current) {
//         channelRef.current.close();
//       }
//     };
//   }, []); // Empty dependency array - runs once
  
//   // Update auth state when username changes
//   useEffect(() => {
//     if (username) {
//       setIsAuth(true);
//     }
//   }, [username, setIsAuth]);
  
//   return null;
// }

// export default Auth;

const Auth = ({ setIsAuth }: any) => { 
  const pathname = usePathname();
  const router = useRouter();
  const { username } = useSelector((state: any) => state.auth);
  const hasInitialized = useRef(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Check if we're on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/signUp';
  
  // Ensure component is mounted before using router
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Safe router push that only works after mount
  const safeRouterPush = (path: string) => {
    if (!isMounted) {
      console.log('[Auth] Delaying navigation until mounted:', path);
      // Delay navigation until next tick
      setTimeout(() => {
        router.push(path);
      }, 0);
    } else {
      console.log('[Auth] Navigating to:', path);
      router.push(path);
    }
  };
  
  // Initialize only once
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    console.log('[Auth] Initializing, pathname:', pathname);
    
    // Set up broadcast channel
    const channel = new BroadcastChannel("my-channel");
    channelRef.current = channel;
    
    const checkTokenExp = (token: string | null) => {
      if (!token) {
        console.log('[Auth] No token found');
        setIsAuth(false);
        if (!isAuthPage) {
          safeRouterPush('/login');
        }
        return false;
      }
      
      try {
        const decodedToken = decodeJWT(token) as any;
        const now = Date.now() / 1000;
        
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
        checkTokenExp(message.token);
      }

      if (message.type === "request-token") {
        const token = sessionStorage.getItem("access_token");
        if (token) {
          channel.postMessage({ type: "new-token", token });
        }
      }

      if (message.type === "logout") {
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
    
    // Initial token check - delay to ensure mount
    setTimeout(() => {
      const token = sessionStorage.getItem("access_token");
      const isValid = checkTokenExp(token);
      
      if (isValid || isAuthPage) {
        setIsAuth(isValid);
      }
    }, 0);
    
    // Cleanup
    return () => {
      if (channelRef.current) {
        channelRef.current.close();
      }
    };
  }, [isAuthPage]); // Include isAuthPage in dependencies
  
  // Update auth state when username changes
  useEffect(() => {
    if (username) {
      setIsAuth(true);
    }
  }, [username, setIsAuth]);
  
  return null;
}

export default Auth;