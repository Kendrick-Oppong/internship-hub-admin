import { api } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { ZonesResponse } from "@/types/api/map";

export const zonesApi = {
  getAllZones: async () => {
    const response = await api.get<ZonesResponse>(API_ENDPOINTS.ZONES.BASE);
    return response.data;
  },
};
