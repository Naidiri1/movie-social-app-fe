"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserIfNull } from "../utils/sessionRecover";
import decodeJWT from 'jwt-decode';

const Auth = ({ setIsAuth }: any) => { 
  const router = useRouter();
  const configFetchedRef = useRef(false);
  const { username, loading } = useSelector((state: any) => state.auth);
  useFetchUserIfNull();
  useEffect(() => {
    const channel = new BroadcastChannel("my-channel");
       const checkTokenExp = (token: any) => {
            if (token) {
                const decodedToken = decodeJWT(token) as any;
                if (decodedToken.exp <= Date.now() / 1000) {
                    sessionStorage.removeItem('access_token');
                    setIsAuth(false);
                    router.push('/login');
                    configFetchedRef.current = false;
                }  
            } else {
                setIsAuth(false);
                router.push('/login');
                configFetchedRef.current = false;
            }
        };

    const handleMessage = (event: any) => {
      const message = event.data;

      if (message.type === "new-token") {
        sessionStorage.setItem("access_token", message.token);
        configFetchedRef.current = false;
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
      configFetchedRef.current = true;
    }

    if (!token) {
      channel.postMessage({ type: "request-token" });
      router.push('login');
    }

     if (!token && !username) {
      router.push('/login')
    }

    return () => {
      channel.close();
    };
  }, []);

useEffect(() => {
    if (username) {
      setIsAuth(true);
    }
  }, [username, setIsAuth]);
  return null;
}
export default Auth;
