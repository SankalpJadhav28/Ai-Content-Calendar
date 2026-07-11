"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSignup() {
    if (!email || !password) return;
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="text-xl font-bold text-white mb-2">
            Check your email
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            We sent a confirmation link to{" "}
            <span className="text-white">{email}</span>. Click it to activate
            your account.
          </p>
          <Link
            href="/login"
            className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
          >
            Back to login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs text-violet-400">AI powered</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="text-gray-500 text-sm mt-2">
            Start planning your content today
          </p>
        </div>

        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              placeholder="••••••••"
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 text-sm transition-colors"
            />
          </div>

          <button
            onClick={handleSignup}
            disabled={loading || !email || !password || !confirmPassword}
            className="bg-violet-600 hover:bg-violet-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-medium py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>

          <p className="text-center text-xs text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
