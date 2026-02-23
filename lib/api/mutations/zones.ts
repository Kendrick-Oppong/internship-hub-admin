import { api } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { CreateZoneRequest, UpdateZoneRequest, ZoneApiResponse } from "@/types/api/map";

export const zonesMutationsApi = {
  createZone: async (data: CreateZoneRequest) => {
    const response = await api.post<ZoneApiResponse>(
      API_ENDPOINTS.ZONES.BASE,
      data
    );
    return response.data;
  },

  updateZone: async ({
    id,
    data,
  }: {
    id: string;
    data: UpdateZoneRequest;
  }) => {
    const response = await api.patch<ZoneApiResponse>(
      API_ENDPOINTS.ZONES.BY_ID(id),
      data
    );
    return response.data;
  },

  deleteZone: async (id: string) => {
    await api.delete(API_ENDPOINTS.ZONES.BY_ID(id));
  },
};
