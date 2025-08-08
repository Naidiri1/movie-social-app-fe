'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppDispatch } from '../../redux/store'; 
import { useEffect } from 'react';
import { restoreUserSession, logout } from '../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
import {setUser} from '../../redux/reducers/authSlice'
import popcorn from "../../../public/popcorn.png"; 
import bglogin from "../../../public/bglogin.png"
import Image from "next/image";

export default function Signup() {

const dispatch = useDispatch<AppDispatch>();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState('');
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.error || 'Signup failed');
                return;
            }
            const data = await response.json();
            sessionStorage.setItem('access_token', data.access_token);
            setSuccessMessage('Signup successful! You are now logged in.');
            setMessage('');
            router.push('./popular');
           dispatch(setUser({ username: data.username, email: data.email, userId: data.userId}));

        } catch (err) {
            setMessage('Server error');
            setSuccessMessage('');
        }
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
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Email"
                color="white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                color="white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" 
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200"
              fullWidth>
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
