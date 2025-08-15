'use client';

import React, { useState, useEffect } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/authSlice";
import popcorn from "../../../public/popcorn.png";
import bglogin from "../../../public/bglogin.png";
import Image from "next/image";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [checklistPassword, setchecklistPassword] = useState(false);
  const [checklistUsername, setchecklistUsername] = useState(false);
  const [isValidUser, setIsvalidUser] = useState(false);
  const [isValidPassword, setIsvalidPassword] = useState(false);
  const [isValidEmail, setIsvalidEmail] = useState(false);
  const [token, setToken] = useState<string | null>(null);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      const storedToken = typeof window !== 'undefined' 
        ? sessionStorage.getItem("access_token") 
        : null;
      setToken(storedToken);
    }, []);



  const handleSignup = async (e: React.FormEvent) => {
    if(!mounted || !token) return
    e.preventDefault();
    setMessage("");
    if (!isValidUser || !isValidEmail || !isValidPassword) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage("Signup failed, Username or Email already Exists");
        return;
      }
      const loginData = await response.json();
      setSuccessMessage("Signup successful! You are now logged in.");
      setMessage("");
      router.push("./popular");
       const store = (window as any).__REDUX_STORE__;
        if (store) {
          // Dispatch setUser action
          import("../../redux/reducers/authSlice").then(({ setUser }) => {
            store.dispatch(setUser({
              username: loginData.username || username,
              email: loginData.email || email,
              userId: loginData.userId || loginData.id,
            }));
          });
        }
    } catch (err) {
      setMessage("Server error");
      setSuccessMessage("");
    }
  };

  const checks = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "At least 1 number OR symbol",
      valid: /[\d!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const checkUser = [
    {
      label: "At least 8 characters",
      valid: username.length >= 8,
    },
    {
      label: "At least 1 number OR symbol",
      valid: /[\d!@#$%^&*(),.?":{}|<>]/.test(username),
    },
    {
      label: "At least 1 letter",
      valid: /[A-Za-z]/.test(username),
    },
  ];

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPassword(input);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*[\d!@#$%^&*(),.?":{}|<>])[^\s]{8,}$/;
    setIsvalidPassword(passwordRegex.test(input));
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUsername(input);
    const usernameRegex = /^(?=.*[A-Za-z])(?=.*(?:\d|[^A-Za-z0-9])).{8,}$/; // or the no-spaces one
    setIsvalidUser(usernameRegex.test(input));
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setEmail(input);
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setIsvalidEmail(emailRegex.test(input));
  };

  return (
    <div className="relative p-2 min-h-screen w-full flex justify-center items-center overflow-hidden">
      <Image
        src={bglogin}
        alt="Background"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 backdrop-blur-md bg-black/10"></div>

      <div className="relative z-10 flex pb-2 p-3 mb-5 items-center flex-col lg:flex-row w-full max-w-[700px] h-[auto] bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg">
        <div className="block flex flex-col  justify-center lg:block w-1/2 ">
          <Image
            src={popcorn}
            alt="Background"
            className="object-cover brightness-50"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 p-8 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <Input
              label="Username"
              color="white"
              value={username}
              onChange={(e: any) => handleUsername(e)}
              onFocus={() => setchecklistUsername(true)}
              onBlur={() => setchecklistUsername(false)}
            />
            {checklistUsername && (
              <ul className="mt-3 space-y-1 text-sm">
                {checkUser.map((check, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center gap-2 ${
                      check.valid ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {check.valid ? (
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    {check.label}
                  </li>
                ))}
              </ul>
            )}
            <Input
              label="Email"
              color="white"
              type="email"
              value={email}
              onChange={(e) => handleEmail(e)}
            />
            <Input
              label="Password"
              color="white"
              type="password"
              value={password}
              onFocus={() => setchecklistPassword(true)}
              onBlur={() => setchecklistPassword(false)}
              onChange={(e) => handlePassword(e)}
            />

            {checklistPassword && (
              <ul className="mt-3 space-y-1 text-sm">
                {checks.map((check, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center gap-2 ${
                      check.valid ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {check.valid ? (
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    {check.label}
                  </li>
                ))}
              </ul>
            )}
            <Button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200"
              fullWidth
            >
              Create Account
            </Button>
          </form>

          {message && (
            <Typography color="red" className="mt-4 text-center">
              {message}
            </Typography>
          )}
          {successMessage && (
            <Typography color="green" className="mt-4 text-center">
              {successMessage}
            </Typography>
          )}

          <p className="text-sm mt-5 text-white">
            <strong>Do you have an account?</strong>
            <Link href="/login">
              <button className="ml-2 text-blue-500 text-xl hover:text-blue-700">
                Login
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
