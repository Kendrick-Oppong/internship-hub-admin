"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import {
  selectIsAuthenticated,
  selectIsLoading,
} from "@/lib/store/slices/auth-slice";

/**
 * Wraps protected routes. Redirects to /auth/login if not authenticated.
 * Shows a loading state while session is being checked.
 */
export function AuthGuard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Show loading spinner while checking session status
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="text-sm text-muted-foreground">
            Loading application...
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated (and not loading), don't render children
  // The useEffect will handle the redirect
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
