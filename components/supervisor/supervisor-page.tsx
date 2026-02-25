"use client";

import { SearchInput } from "@/components/common/search-input";
import { PaginationTabs } from "@/components/common/pagination";
import { ActiveFilters } from "@/components/common/active-filters";
import { SkeletonLoader } from "@/components/common/skeleton-loader";
import { ErrorMessage } from "@/components/common/error-message";

import { useSearchFilter } from "@/lib/hooks/ui/use-search-filter";
import { useGetAllSupervisors } from "@/lib/hooks/queries/use-supervisor-queries";
import { FILTER_CONFIGS } from "@/lib/constants/filter-configs";
import { ERROR_MESSAGES } from "@/lib/constants/error-messages";

import { SupervisorTable } from "./supervisor-table";

export const SupervisorPage = () => {
  const {
    filters,
    localSearchTerm,
    setLocalSearchTerm,
    setPage,
    resetFilters,
    triggerSearch,
    getApiParams,
  } = useSearchFilter("supervisors", FILTER_CONFIGS.SUPERVISORS);

  const {
    data: supervisorData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllSupervisors(getApiParams());

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Supervisors</h3>
      </div>

      <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-1/2">
          <SearchInput
            value={localSearchTerm}
            onChange={setLocalSearchTerm}
            onSearch={triggerSearch}
            placeholder="Search by supervisor name or staff ID"
            disabled={isLoading}
            isLoading={isFetching}
          />
        </div>
      </div>

      <ActiveFilters
        filters={filters}
        isLoading={isLoading}
        resetFilters={resetFilters}
      />

      {isLoading && <SkeletonLoader type="table" count={5} />}

      {!isLoading && isError && (
        <ErrorMessage message={ERROR_MESSAGES.SUPERVISORS} refetch={refetch} />
      )}

      {!isLoading && !isError && (
        <>
          <SupervisorTable supervisors={supervisorData?.data || []} />

          <PaginationTabs
            page={supervisorData?.meta?.page ?? filters.page}
            size={supervisorData?.meta?.limit ?? filters.size}
            total={supervisorData?.meta?.total ?? 0}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
};
