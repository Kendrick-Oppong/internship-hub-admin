"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  setCredentials,
  clearCredentials,
} from "@/lib/store/slices/auth-slice";
import { api } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";

/**
 * Initializes the auth state by checking the session on mount.
 * It renders nothing — it only dispatches to the Redux store.
 */
export function SessionInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.AUTH.SESSION);
        const userData = response.data;

        // Retrieve CSRF token from localStorage (set during login or refresh)
        const csrfToken = localStorage.getItem("csrf_token") || undefined;

        if (userData?.id) {
          dispatch(setCredentials({ user: userData, csrfToken }));
        } else {
          localStorage.removeItem("csrf_token");
          dispatch(clearCredentials());
        }
      } catch (error) {
        console.error("Session check failed:", error);
        localStorage.removeItem("csrf_token");
        dispatch(clearCredentials());
      }
    };

    checkSession();
  }, [dispatch]);

  return null;
}
