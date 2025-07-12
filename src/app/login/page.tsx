'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Input, Typography } from "@material-tailwind/react";


export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({   username: 'admin',
        password: 'password', }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        sessionStorage.setItem('jwtToken', data.token);
        setSuccess(true);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 p-6">
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-4">
           <Input
            label="username"
            value={username}
            onChange={(e:any) => setUsername(e.target.value)}
            />
          <Input
            label="Password"
            value={password}
            onChange={(e:any) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </form>

        {success && (
          <Typography color="green" className="mt-4 text-center">
            ✅ Login successful!
          </Typography>
        )}
        {error && (
          <Typography color="red" className="mt-4 text-center">
            ❌ {error}
          </Typography>
        )}
      </Card>
    </div>
  );
}
