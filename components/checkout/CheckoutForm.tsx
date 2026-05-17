"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CheckoutFormProps {
  drawingId: string;
}

const CheckoutForm = ({ drawingId }: CheckoutFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please provide your name and email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          drawing_id: drawingId,
          buyer_name: name,
          buyer_email: email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initialize checkout");
      }

      // Redirect to Paystack checkout page
      window.location.href = data.authorization_url;
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCheckout} className="space-y-3">      
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full h-11 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent text-gray-900"
          placeholder="John Doe"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-11 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent text-gray-900"
          placeholder="john@example.com"
        />
        <p className="text-xs text-gray-500">Your design files will be sent to this email address.</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-red text-white font-bold rounded-md hover:bg-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
      >
        {loading ? "Processing..." : "Pay Securely with Paystack"}
      </button>
    </form>
  );
};

export default CheckoutForm;
