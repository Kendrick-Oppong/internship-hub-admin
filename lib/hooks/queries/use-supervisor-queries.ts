import { useQuery } from "@tanstack/react-query";
import { supervisorApi } from "@/lib/api/queries/supervisor";
import { Query_Keys } from "@/lib/constants/query-keys";
import { ApiQueryParams } from "@/types/common/filter-config";

export const useGetAllSupervisors = (params: ApiQueryParams) => {
  return useQuery({
    queryKey: Query_Keys.supervisors.all(params),
    queryFn: () => supervisorApi.getAllSupervisors(params),
  });
};
