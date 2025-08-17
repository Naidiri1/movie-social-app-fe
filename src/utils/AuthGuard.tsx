"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/store";
import { selectUser } from "../redux/reducers/userSlice";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const configFetchedRef = useRef(false);
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { loading } = useSelector((state: any) => state.auth);
  const user = useSelector(selectUser);
  const username = user?.username;
  const userId = user?.userId;
  const isAuthPage = pathname === "/login" || pathname === "/signUp";

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("access_token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const channel = new BroadcastChannel("my-channel");

    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.type === "new-token") {
        sessionStorage.setItem("access_token", message.token);
        setToken(message.token);
        configFetchedRef.current = false;
      }

      if (message.type === "request-token") {
        const currentToken = sessionStorage.getItem("access_token");
        if (currentToken) {
          channel.postMessage({ type: "new-token", token: currentToken });
        }
      }

      if (message.type === "logout") {
        sessionStorage.removeItem("access_token");
        setToken(null);
        configFetchedRef.current = false;
        router.push("/login");
      }
    };

    channel.postMessage({ type: "request-token" });
    channel.onmessage = handleMessage;

    const currentToken = sessionStorage.getItem("access_token");
    if (currentToken && !username && !configFetchedRef.current) {
      dispatch(fetchUser());
      configFetchedRef.current = true;
    }

    if (!currentToken && !isAuthPage) {
      router.push("/login");
    }

    return () => {
      channel.close();
    };
  }, [isClient, username, dispatch, router, isAuthPage]);

  if (!isClient) {
    return null;
  }

  if (!token && !isAuthPage) {
    return null;
  }

  if (loading && !isAuthPage) {
    return <div className="text-white p-4">Loading session...</div>;
  }

  return <>{children}</>;
}