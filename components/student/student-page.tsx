"use client";

import { SearchInput } from "@/components/common/search-input";
import { PaginationTabs } from "@/components/common/pagination";
import { ActiveFilters } from "@/components/common/active-filters";
import { SkeletonLoader } from "@/components/common/skeleton-loader";
import { ErrorMessage } from "@/components/common/error-message";

import { useSearchFilter } from "@/lib/hooks/ui/use-search-filter";
import { useGetAllStudents } from "@/lib/hooks/queries/use-student-queries";
import { FILTER_CONFIGS } from "@/lib/constants/filter-configs";
import { ERROR_MESSAGES } from "@/lib/constants/error-messages";

import { StudentList } from "./student-list";

export const StudentPage = () => {
  const {
    filters,
    localSearchTerm,
    setLocalSearchTerm,
    setPage,
    resetFilters,
    triggerSearch,
    getApiParams,
  } = useSearchFilter("students", FILTER_CONFIGS.STUDENTS);

  const {
    data: studentData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllStudents(getApiParams());

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Students</h3>
      </div>

      <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-1/2">
          <SearchInput
            value={localSearchTerm}
            onChange={setLocalSearchTerm}
            onSearch={triggerSearch}
            placeholder="Search by name or index number"
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
        <ErrorMessage message={ERROR_MESSAGES.STUDENTS} refetch={refetch} />
      )}

      {!isLoading && !isError && (
        <>
          <StudentList students={studentData?.data || []} />

          <PaginationTabs
            page={studentData?.meta?.page ?? filters.page}
            size={studentData?.meta?.limit ?? filters.size}
            total={studentData?.meta?.total ?? 0}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
};
