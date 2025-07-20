'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import Link from 'next/link';


export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const[ displayError, setDisplayError] = useState(false);
  const router = useRouter();
 

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
        router.push('./popular');
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
                        router.push('/popular');
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
            type="password"
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
         <p className="text-sm mt-5 text-gray-500">
            Do you not have an account?  
            <Link href="/signup">
                <button className="ml-2 text-blue-500 underline hover:text-blue-700">
                Signup
                </button>
            </Link>
          </p>
      </Card>
    </div>
  );
}
