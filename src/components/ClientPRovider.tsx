"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function AuthWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const publicPaths = ["/login", "/signup", "/"];
    const isPublic = publicPaths.some(path => pathname === path);
    const hasToken = typeof window !== 'undefined' && sessionStorage.getItem("access_token");
    
    if (!isPublic && !hasToken) {
      router.replace("/login");
    } else if (hasToken && (pathname === "/login" || pathname === "/signup")) {
      router.replace("/popular");
    } else {
      setIsReady(true);
    }
  }, []);
  
  if (!isReady) return null;
  return <>{children}</>;
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null; // Prevent SSR issues
  }
  
  return (
    <Provider store={store}>
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </Provider>
  );
}