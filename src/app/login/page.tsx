"use client";

import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import Image from "next/image";
import login from "../../../public/login.png";
import bglogin from "../../../public/bglogin.png";

export const dynamic = 'force-dynamic';

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL)

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem("access_token");
      setToken(storedToken);
    }
  }, []);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setDisplayError(false);

    const u = username.trim();
    const p = password;

    const usernameRegex = /^(?=.*[A-Za-z])(?=.*(?:\d|[^A-Za-z0-9])).{8,}$/;

    const usernameOk = usernameRegex.test(u);
    const passwordOk = p.length >= 8;

    if (!usernameOk || !passwordOk) {
      setDisplayError(true);
      setError("Please fix the highlighted fields.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: u, password: p }),
        }
      );

      let result;
      try {
        result = await res.json();
      } catch {
        console.error("Invalid response from server");
      }

      if (!res.ok) {
        const serverMsg =
          result?.message ||
          result?.error ||
          "User or Password are incorrect, try again!";
        console.error(serverMsg);
        setDisplayError(true);
        setError(serverMsg);
        return;
      }

      if (!result?.access_token) {
        console.error("Login response missing access_token");
        setDisplayError(true);
        setError("Login failed - invalid response from server");
        return;
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem("access_token", result.access_token);
      }

      setSuccess(true);
      setDisplayError(false);
      
      setTimeout(() => {
        router.push("/popular");
      }, 100);
      
    } catch (err: any) {
      console.error(err);
      setDisplayError(true);
      setError(err?.message || "User or Password are incorrect, try again!");
    }
  };

  useEffect(() => {
    if (!isClient || !token) return;
    
    const checkSessionAndRedirect = () => {
      try {
        const decodedToken: { exp: number } = jwt_decode(token);
        const sessionValid = decodedToken.exp > Date.now() / 1000;
        if (sessionValid) {
          router.push("/popular");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem("access_token");
        }
        setToken(null);
      }
    };

    checkSessionAndRedirect();
  }, [token, router, isClient]); // Added proper dependencies

  if (!isClient) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full p-2 flex justify-center items-center ">
      <Image
        src={bglogin}
        alt="Background"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 backdrop-blur-md bg-black/10"></div>

      <div className="relative z-10 flex flex-col items-center justify-center pb-2 lg:flex-row w-full max-w-[700px] bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg">
        <div className="w-full lg:w-1/2 p-8 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              label="Username"
              color="white"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
              crossOrigin={undefined}
            />
            <Input
              label="Password"
              type="password"
              color="white"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              crossOrigin={undefined}
            />
            <Button
              type="submit"
              fullWidth
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Sign In
            </Button>
          </form>
          <span className="mt-2 underline">
            <Link
              href="/forgot-password"
              className="ml-2 text-white text-xl hover:text-blue-500"
            >
              Forgot Password
            </Link>
          </span>
          {success && <p className="text-green-600 mt-4">Login successful!</p>}
          {displayError && (
            <p className="text-red-600 mt-4">
              <strong>{error}</strong>
            </p>
          )}

          <p className="text-sm mt-5 text-white">
            <strong>Don't have an account?</strong>
            <Link
              href="/signup"
              className="ml-2 text-blue-300 text-xl hover:text-blue-500"
            >
              Signup
            </Link>
          </p>
        </div>

        <div className="block flex flex-col lg:block w-1/2 items-center">
          <Image
            src={login}
            alt="Background"
            className="object-cover brightness-50"
            priority
          />
        </div>
      </div>
    </div>
  );
}
