"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  setCredentials,
  clearCredentials,
} from "@/lib/store/slices/auth-slice";
import { api } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import axios from "axios";

/**
 * Initializes the auth state by checking the session on mount.
 * Place this component inside StoreProvider (e.g. in the root layout).
 * It renders nothing — it only dispatches to the Redux store.
 */
export function SessionInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.AUTH.SESSION);

        if (response.data?.id) {
          dispatch(setCredentials(response.data));
        } else {
          dispatch(clearCredentials());
        }
      } catch {
        dispatch(clearCredentials());
      }
    };

    const keepAlive = async () => {
      try {
        await axios.get("/api/health/app");
        console.log("✅ Keep-alive ping sent");
      } catch (err) {
        console.log("❌ Keep-alive failed", err);
      }
    };

    // Run immediately
    checkSession();
    keepAlive();

    // Keep alive every 10 minutes (600000 ms)
    const interval = setInterval(() => {
      keepAlive();
    }, 600000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
}