"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { restoreUserSession } from "../redux/reducers/authSlice";
import { AppDispatch } from "../redux/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const configFetchedRef = useRef(false);
  const { username, loading } = useSelector((state: any) => state?.auth);
  const [token, setToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password" || pathname === "/reset-password";

  useEffect(() => {
      const storedToken = sessionStorage.getItem("access_token");
      setToken(storedToken);
      setIsCheckingAuth(false);
  }, []);

  useEffect(() => {
    
    let channel: BroadcastChannel | null = null;
    
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel("my-channel");
        
        const handleMessage = (event: MessageEvent) => {
          const message = event.data;

          if (message.type === "new-token" && typeof window !== 'undefined') {
            sessionStorage.setItem("access_token", message.token);
            setToken(message.token);
            configFetchedRef.current = false;
          }

          if (message.type === "request-token" && token) {
            channel?.postMessage({ type: "new-token", token });
          }

          if (message.type === "logout" && typeof window !== 'undefined') {
            sessionStorage.removeItem("access_token");
            setToken(null);
            configFetchedRef.current = false;
            router.push("/login");
          }
        };

        channel.onmessage = handleMessage;
        
        if (!token) {
          channel.postMessage({ type: "request-token" });
        }
      }
    } catch (error) {
      console.error("BroadcastChannel error:", error);
    }

    if (token && !username && !configFetchedRef.current) {
      dispatch(restoreUserSession());
      configFetchedRef.current = true;
    }

    if (!token && !isAuthPage) {
      const timeoutId = setTimeout(() => {
        if (typeof window !== 'undefined') {
          const currentToken = sessionStorage.getItem("access_token");
          if (!currentToken) {
            router.push("/login");
          } else {
            setToken(currentToken);
          }
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }

    return () => {
      if (channel) {
        channel.close();
      }
    };
  }, [ token, username, isAuthPage, dispatch, router, isCheckingAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white p-4">Loading...</div>
      </div>
    );
  }

  if (!username && !isAuthPage && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white p-4">Loading session...</div>
      </div>
    );
  }

  if (!token && !isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white p-4">Redirecting to login...</div>
      </div>
    );
  }

  return <>{children}</>;
}