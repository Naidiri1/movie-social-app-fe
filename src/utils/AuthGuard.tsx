"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { restoreUserSession } from "../redux/reducers/authSlice";
import { AppDispatch } from "../redux/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const configFetchedRef = useRef(false);
  const { username, loading } = useSelector((state: any) => state.auth);

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
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
    if (channel) {
      channel.postMessage({ type: "request-token" });
      channel.onmessage = handleMessage;
    }

    const token = sessionStorage.getItem("access_token");
    if (token && !username && !configFetchedRef.current) {
      dispatch(restoreUserSession());
      configFetchedRef.current = true;
    }

    if (!token) {
      channel.postMessage({ type: "request-token" });
      router.push('login');
    }

    if (token && !username) {
      dispatch(restoreUserSession());
      console.log("lest getting back");
    }

     if (!token && !username) {
      router.push('/login')
      console.log("lest getting back");
    }

    return () => {
      channel.close();
    };
  }, [token, username]);

  if (!username && !isAuthPage && loading) {
    return <div className="text-white p-4">Loading session...</div>;
  }

  return <>{children}</>;
}
