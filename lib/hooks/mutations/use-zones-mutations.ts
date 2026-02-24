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
  // Ensure the polygon is closed for the API (GeoJSON requirement)
  const closedCoordinates = [...coordinates];
  const first = closedCoordinates.at(0);
  const last = closedCoordinates.at(-1);

  if (
    closedCoordinates.length > 0 &&
    first &&
    last &&
    (first[0] !== last[0] || first[1] !== last[1])
  ) {
    closedCoordinates.push(first);
  }

  return {
    name: data.name,
    color: data.color,
    coordinates: closedCoordinates,
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
  const allCoords = zone.boundary.coordinates[0] as [number, number][];

  // Remove the closing point for internal UI state (unique vertices only)
  // this makes editing much cleaner as we don't have overlapping handles
  const coordinates = [...allCoords];
  const first = coordinates.at(0);
  const last = coordinates.at(-1);

  if (
    coordinates.length > 1 &&
    first &&
    last &&
    first[0] === last[0] &&
    first[1] === last[1]
  ) {
    coordinates.pop();
  }

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
