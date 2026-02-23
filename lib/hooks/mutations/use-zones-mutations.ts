import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zonesMutationsApi } from "@/lib/api/mutations/zones";
import { toast } from "@/lib/providers/toaster-provider";
import { ZoneFormData } from "@/lib/validations/forms/map";
import { CreateZoneRequest, ZoneApiResponse, ZoneData } from "@/types/api/map";
import { Query_Keys } from "@/lib/constants/query-keys";

// Transform ZoneFormData to API request format
const transformZoneFormDataToRequest = (
  data: ZoneFormData,
  coordinates: [number, number][]
): CreateZoneRequest => {
  return {
    name: data.name,
    color: data.color,
    coordinates,
    description: data.description,
    polygonTransparency: data.transparency,
    borderWidth: data.borderWidth,
  };
};

// Transform API response to ZoneData format
export const transformZoneApiResponseToZoneData = (
  zone: ZoneApiResponse
): ZoneData => {
  // Extract coordinates from GeoJSON Polygon format
  // API returns: boundary.coordinates = [[[lng, lat], [lng, lat], ...]]
  // We need: [number, number][]
  const coordinates = zone.boundary.coordinates[0] as [number, number][];

  return {
    id: zone.id,
    name: zone.name,
    color: zone.color,
    coordinates,
    transparency: zone.polygonTransparency,
    borderWidth: zone.borderWidth,
    description: zone.description,
  };
};

export const useMutateZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      coordinates,
    }: {
      id?: string;
      data: ZoneFormData;
      coordinates: [number, number][];
    }) => {
      const requestData = transformZoneFormDataToRequest(data, coordinates);

      return id
        ? zonesMutationsApi.updateZone({ id, data: requestData })
        : zonesMutationsApi.createZone(requestData);
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: Query_Keys.zones.all() });
      toast.success(
        variables.id ? "Zone updated successfully" : "Zone created successfully"
      );
    },

    onError: (err: Error) => {
      toast.error(err.message || "Failed to save zone");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: Query_Keys.zones.all() });
    },
  });
};

export const useDeleteZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => zonesMutationsApi.deleteZone(id),

    onSuccess: () => {
      toast.success("Zone deleted successfully");
      queryClient.invalidateQueries({ queryKey: Query_Keys.zones.all() });
    },

    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete zone");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: Query_Keys.zones.all() });
    },
  });
};
