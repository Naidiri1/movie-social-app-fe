'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import decodeJWT from 'jwt-decode';
const Auth = ({ setIsAuth }: any) => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  
  const token = sessionStorage.getItem("access_token");
  
  if (!token && !isAuthPage) {
    setIsAuth(false);
    // Use window.location - it works even if component unmounts
    window.location.href = '/login';
  } else {
    setIsAuth(!!token);
  }
  
  return null;
}

export default Auth;