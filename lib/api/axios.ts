import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/lib/constants/api-endpoints";

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

// Error handler function
const handleApiError = (error: AxiosError<ApiErrorResponse>) => {
  // Handle unauthorized globally
  if (error.response?.status === 401 || error.response?.status === 403) {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;

      if (currentPath.startsWith("/dashboard")) {
        window.location.href = "/auth/login";
      }
    }
  }

  const message =
    // error.response?.data?.error ||
    error.response?.data?.message || error.message;

  return Promise.reject(new Error(message));
};

// ✅ Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ✅ Attach interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      return handleApiError(error);
    }

    return Promise.reject(error);
  }
);
