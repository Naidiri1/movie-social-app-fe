"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const configFetchedRef = useRef(false);
  const [isClient, setIsClient] = useState(false);
  const { username, loading } = useSelector((state: any) => state.auth);

  const isAuthPage = pathname === "/login" || pathname === "/signUp";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const channel = new BroadcastChannel("my-channel");
    
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.type === "new-token") {
        sessionStorage.setItem("access_token", message.token);
        configFetchedRef.current = false;
      }

      if (message.type === "request-token") {
        const token = sessionStorage.getItem("access_token");
        if (token) {
          channel.postMessage({ type: "new-token", token });
        }
      }

      if (message.type === "logout") {
        sessionStorage.removeItem("access_token");
        configFetchedRef.current = false;
        router.push("/login");
      }
    };

    channel.postMessage({ type: "request-token" });
    channel.onmessage = handleMessage;

    const token = sessionStorage.getItem("access_token");
    
    if (token && !username && !configFetchedRef.current) {
      dispatch(fetchUser());
      configFetchedRef.current = true;
    }

    if (!token && !isAuthPage) {
      router.push("/login");
    }

    return () => {
      channel.close();
    };
  }, [isClient, username, dispatch, router, isAuthPage]);

  if (!isClient) {
    return null; 
  }

  const token = typeof window !== 'undefined' ? sessionStorage.getItem("access_token") : null;

  if (!token && !isAuthPage) {
    return null; 
  }

  if (loading && !isAuthPage) {
    return <div className="text-white p-4">Loading session...</div>;
  }

  return <>{children}</>;
}