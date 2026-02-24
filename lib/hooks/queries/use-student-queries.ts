import { useQuery } from "@tanstack/react-query";
import { studentApi } from "@/lib/api/queries/student";
import { Query_Keys } from "@/lib/constants/query-keys";
import { ApiQueryParams } from "@/types/common/filter-config";

export const useGetAllStudents = (params: ApiQueryParams) => {
  return useQuery({
    queryKey: Query_Keys.students.all(params),
    queryFn: () => studentApi.getAllStudents(params),
  });
};

export const useGetStudentById = (id: string) => {
  return useQuery({
    queryKey: Query_Keys.students.byId(id),
    queryFn: () => studentApi.getStudentById(id),
    enabled: !!id,
  });
};
