import { api } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { Supervisor, SupervisorsResponse } from "@/types/api/supervisor";
import { ApiQueryParams } from "@/types/common/filter-config";

export const supervisorApi = {
  getAllSupervisors: async (params: ApiQueryParams) => {
    const response = await api.get<SupervisorsResponse>(
      API_ENDPOINTS.AUTH.SUPERVISOR.LIST,
      { params }
    );
    return response.data;
  },
  getSupervisorById: async (userId: string) => {
    const response = await api.get<Supervisor>(
      API_ENDPOINTS.AUTH.SUPERVISOR.LIST + `/${userId}`
    );
    return response.data;
  },
};
