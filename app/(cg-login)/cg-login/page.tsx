"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { RestrictionLockIcon } from "@/constants/images";

const CgLoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTarget = (() => {
    const redirect = searchParams.get("redirect");
    return redirect && redirect.startsWith("/") ? redirect : "/cg-admin";
  })();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (!data.session) {
      setError("Sign-in succeeded but no session was returned.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      }),
    });

    if (!response.ok) {
      setError("Unable to persist your admin session. Please try again.");
      setLoading(false);
      return;
    }

    router.replace(redirectTarget);
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-[#555555] rounded-[10px]">
      <div className="w-full max-w-[508px] h-full max-h-[591px]">
        {/* Card */}
        <div className="bg-[#555555] rounded-[10px] px-8 pt-10 pb-8 shadow-2xl flex flex-col items-center gap-10">
          {/* Lock Icon */}
          <div>
            <div className="mx-auto w-fit">
              <RestrictionLockIcon />
            </div>
            <div className="flex flex-col items-center mt-4 mb-5 font-nunito">
              <h1 className="text-2xl font-semibold text-white">
                Company Restricted Page
              </h1>
              <p className="text-D6D6D6 text-base font-normal">
                Sign in to manage your structural designs and orders
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="w-full bg-red/20 border border-red/40 rounded-lg px-4 py-2 -mb-4 -mt-10 text-sm text-red">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn} className="w-full">
            {/* Email */}
            <div className="space-y-1 mb-3">
              <label
                htmlFor="email"
                className="block text-[13px] text-[#FCFAFA] font-medium font-nunito"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@crystalgenius.com"
                required
                className="w-full h-10 bg-[#333333] border border-D6D6D6 rounded-[6px] px-4 text-white placeholder-[#999999] focus:outline-none focus:border-red transition-colors text-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-1 mb-3">
              <label
                htmlFor="password"
                className="block text-[13px] text-[#FCFAFA] font-medium font-nunito"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input"
                required
                className="w-full h-10 bg-[#333333] border border-D6D6D6 rounded-[6px] px-4 text-white placeholder-[#999999] focus:outline-none focus:border-red transition-colors text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-[300px] mx-auto h-[55px] mt-7 bg-red hover:bg-red/70 disabled:bg-red/80 disabled:opacity-60 text-white font-medium text-sm font-nunito rounded-[6px] transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          {/* Back to public site */}
          <Link
            href="/"
            className="-mt-5 flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Public Site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CgLoginPage;
