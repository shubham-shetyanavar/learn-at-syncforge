"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/admin/dashboard");
    } catch (err) {
      alert("Invalid credentials");
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2d2d2d]">
      <form
        onSubmit={login}
        className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
      >
        <h1 className="mb-8 text-3xl font-bold text-white">Admin Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
        />

        <button className="w-full rounded-xl bg-purple-600 p-3 text-white">
          Login
        </button>
      </form>
    </div>
  );
}
