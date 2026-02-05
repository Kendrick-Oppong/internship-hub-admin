"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 2 * 60 * 1000, // Reduced to 2 minutes for more frequent updates
            gcTime: 10 * 60 * 1000, // 10 minutes for garbage collection
            refetchOnWindowFocus: false,
            refetchOnMount: true, //  Allow refetch on mount for fresh data after mutations
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
