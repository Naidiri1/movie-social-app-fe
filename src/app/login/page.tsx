'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';


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
        body: JSON.stringify({ username, password }),
      };
      fetch('http://localhost:8080/api/auth/login', requestOptions
       )
       .then(async (response) => {
        console.log(response)
        if(response.status === 200){
        setDisplayError(false);
        return await response.json();
        } else {
       setDisplayError(true);
       setError("User or Password are incorrect, try again!")
      }
      })
      .then((result) => {
                console.log(result)

        if(result === undefined || null){
       setDisplayError(true);
       setError("User or Password are incorrect, try again!")
        } else {
        router.push('./home');
        sessionStorage.setItem(
          'access_token',
          result.access_token,
        );
        }
      
        // checkUserSession(result.access_token)
      })
       .catch((err: any) =>{
         console.error(err)
        });
        
    };

 useEffect(() => {
        const checkSessionAndRedirect = () => {
            const token = sessionStorage.getItem('access_token');
            if (token) {
                const decodedToken: number = jwt_decode<{ exp: number }>(
                    token,
                ).exp;
                try {
                    const sessionValid = decodedToken > Date.now() / 1000;
                    if (sessionValid) {
                        router.push('/home');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        // check if session exists and redirect if so
        checkSessionAndRedirect();
      },[router]);
      

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
