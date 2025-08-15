"use client";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  // Use Redux hooks properly
  const userId = useSelector((state: RootState) => state?.auth?.userId);
  const username = useSelector((state: RootState) => state?.auth?.username);
  const email = useSelector((state: RootState) => state?.auth?.email);
  const loading = useSelector((state: RootState) => state?.auth?.loading);
  
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setToken(sessionStorage.getItem("access_token"));
    }
  }, []);

  return {
    userId,
    username,
    email,
    token,
    loading,
    isAuthenticated: !!userId && !!token,
    isReady: mounted && !loading,
  };
};