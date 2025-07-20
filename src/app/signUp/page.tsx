'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';

import { AppDispatch } from '../../redux/store'; // Adjust the path
import { useEffect } from 'react';
import { restoreUserSession, logout } from '../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
import {setUser} from '../../redux/reducers/authSlice'
export default function SignUp() {

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
            setSuccessMessage('✅ Signup successful! You are now logged in.');
            setMessage('');
            router.push('./home');
           dispatch(setUser({ username: data.username, email: data.email, userId: data.userId}));

        } catch (err) {
            setMessage('❌ Server error');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-96 p-6">
                <Typography variant="h4" color="blue-gray" className="mb-4">
                    Sign Up
                </Typography>

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" fullWidth>
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
            </Card>
        </div>
    );
}
