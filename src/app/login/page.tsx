'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';


export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const[ displayError, setDisplayError] = useState(false);
  const router = useRouter();
 
  //checksessionmakeapi

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

      const requestOptions = {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({   username: 'admin', password: 'password', }),
      };
      fetch('http://localhost:8080/api/auth/login', requestOptions
       )
       .then(async (response) => {
        if(response.status === 200){
        setDisplayError(false);
        return await response.json();
        }
       setDisplayError(true);
       throw new Error(
            `bad credentials status code ${response.status}`,
       )
      })
      .then((result) => {
        console.log(result)
        router.push('./home');
        sessionStorage.setItem(
          'access_token',
          result.access_token,
        );
        // checkUserSession(result.access_token)
      })
      .catch((error) => {
      setError(error);
    });
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
        {displayError && (
          <Typography color="red" className="mt-4 text-center">
            ❌ {error}
          </Typography>
        )}
      </Card>
    </div>
  );
}
