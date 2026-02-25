import { ApiQueryParams } from "@/types/common/filter-config";

export const Query_Keys = {
  internship: {
    all: (params: ApiQueryParams) => [
      "internship-periods",
      JSON.stringify(params),
    ],
    byId: (id: string) => ["internship-periods", id],
  },
  supervision: {
    overallStats: (internshipPeriodId?: string) => [
      "supervision",
      "stats",
      "overall",
      internshipPeriodId,
    ],
  },
  zones: {
    all: () => ["zones"],
    byId: (id: string) => ["zones", id],
  },
  students: {
    all: (params: ApiQueryParams) => ["students", JSON.stringify(params)],
    byId: (id: string) => ["students", id],
  },
  supervisors: {
    all: (params: ApiQueryParams) => ["supervisors", JSON.stringify(params)],
    byId: (id: string) => ["supervisors", id],
  },
} as const;
