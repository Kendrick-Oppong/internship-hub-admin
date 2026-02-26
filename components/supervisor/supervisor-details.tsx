"use client";

import { useParams } from "next/navigation";
import { useGetSupervisorById } from "@/lib/hooks/queries/use-supervisor-queries";
import { SupervisorHeader } from "./detail/supervisor-header";
import { SupervisorInfoGrid } from "./detail/supervisor-info-grid";
import { AlertCircle } from "lucide-react";
import { SkeletonLoader } from "@/components/common/skeleton-loader";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SupervisorDetails() {
  const { id } = useParams();
  const {
    data: supervisor,
    isLoading,
    isError,
    refetch,
  } = useGetSupervisorById(id as string);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-7 w-40 bg-slate-200" />
          <Skeleton className="h-8 w-24 bg-slate-200" />
        </div>
        <SkeletonLoader type="student-detail" />
      </>
    );
  }

  if (isError || !supervisor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-4 text-center px-6 bg-white rounded-lg border border-gray-300 shadow-card p-4">
        <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Supervisor Not Found
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
            We couldn&apos;t find the supervisor record you&apos;re looking for.
            It may have been removed or you may have followed an invalid link.
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="sm" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Supervisor Profile</h3>
        <Button size="sm" variant="outline" asChild className="h-8 text-xs">
          <Link href="/dashboard/supervisors">Back to List</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-6 pb-16">
        <section className="bg-white rounded-xl border border-gray-300 shadow-card overflow-hidden scroll-mt-6 p-4">
          <SupervisorHeader supervisor={supervisor} />
        </section>

        <section>
          <SupervisorInfoGrid supervisor={supervisor} />
        </section>
      </div>
    </>
  );
}
