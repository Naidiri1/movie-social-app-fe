"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";
  
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");
  const [mismatch, setMismatch] = useState(false);

  useEffect(() => {
    if (pw1 && pw2 && pw1 !== pw2) {
      setMismatch(true);
    } else {
      setMismatch(false);
    }
  }, [pw1, pw2]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mismatch || !pw1 || !pw2) {
      setMsg("Passwords do not match");
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: pw1 }),
    });
    if (res.ok) {
      setMsg("✅ Password reset. Redirecting to login...");
      setTimeout(() => router.push("/login"), 1200);
    } else {
      const j = await res.json().catch(() => ({}));
      setMsg(j?.error || "Invalid or expired link.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Set a new password</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          className={`w-full border rounded p-2 text-black ${mismatch && pw1 && pw2 ? "border-red-500" : "border-gray-300"}`}
          type="password"
          placeholder="New password"
          value={pw1}
          onChange={(e) => setPw1(e.target.value)}
        />
        <input
          className={`w-full border rounded p-2 text-black ${mismatch && pw1 && pw2 ? "border-red-500" : "border-gray-300"}`}
          type="password"
          placeholder="Confirm new password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
        />
        {mismatch && pw1 && pw2 && (
          <p className="text-red-500 text-sm">⚠ Passwords do not match</p>
        )}
        <button
          className={`w-full rounded p-2 text-white ${mismatch || !pw1 || !pw2 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={mismatch || !pw1 || !pw2}
        >
          Reset password
        </button>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
