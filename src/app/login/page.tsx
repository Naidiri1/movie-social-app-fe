"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import Image from "next/image";
import login from "../../../public/login.png";
import bglogin from "../../../public/bglogin.png";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    fetch("http://localhost:8080/api/auth/login", requestOptions)
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          setDisplayError(false);
          return await response.json();
        } else {
          setDisplayError(true);
          setError("User or Password are incorrect, try again!");
        }
      })
      .then((result) => {
        console.log(result);

        if (result === undefined || null) {
          setDisplayError(true);
          setError("User or Password are incorrect, try again!");
        } else {
          router.push("./popular");
          sessionStorage.setItem("access_token", result.access_token);
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const checkSessionAndRedirect = () => {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        const decodedToken: number = jwt_decode<{ exp: number }>(token).exp;
        try {
          const sessionValid = decodedToken > Date.now() / 1000;
          if (sessionValid) {
            router.push("/popular");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkSessionAndRedirect();
  }, [router]);

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
            />
            <Input
              label="Password"
              type="password"
              color="white"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200"
            >
              Sign In
            </Button>
          </form>

          {success && <p className="text-green-600 mt-4"> Login successful!</p>}
          {displayError && (
            <p className="text-red-600 mt-4">
              {" "}
              <strong>{error}</strong>
            </p>
          )}

          <p className="text-sm mt-5 text-white">
            <strong>Don’t have an account?</strong>
            <Link
              href="/signup"
              className="ml-2 text-blue-300 text-xl hover:text-blue-500"
            >
              Signup
            </Link>
          </p>
        </div>

        <div className="block flex flex-col  lg:block w-1/2 items-center">
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
