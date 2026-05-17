"use client";

import { useEffect } from "react";
import { supabase } from "../../lib/supabase";

const AuthSessionSync = () => {
  useEffect(() => {
    const syncSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token || !session.refresh_token) {
        return;
      }

      await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at,
        }),
      });
    };

    void syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        await fetch("/api/auth/session", {
          method: "DELETE",
        });
        return;
      }

      if (!session?.access_token || !session.refresh_token) {
        return;
      }

      await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at,
        }),
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
};

export default AuthSessionSync;
