'use client';
export const dynamic = 'force-dynamic';
"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier }),
    });
    setSent(true); 
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Forgot password</h1>
      {sent ? (
        <p> If an account exists, a reset link was sent. Check your email. </p>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full text-black border rounded p-2"
            placeholder="Email or username"
            value={identifier}
            onChange={(e)=>setIdentifier(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white rounded p-2">Send reset link</button>
        </form>
      )}
    </div>
  );
}
