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
  if (
    closedCoordinates.length > 0 &&
    (closedCoordinates[0][0] !==
      closedCoordinates[closedCoordinates.length - 1][0] ||
      closedCoordinates[0][1] !==
        closedCoordinates[closedCoordinates.length - 1][1])
  ) {
    closedCoordinates.push(closedCoordinates[0]);
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
  if (
    coordinates.length > 1 &&
    coordinates[0][0] === coordinates[coordinates.length - 1][0] &&
    coordinates[0][1] === coordinates[coordinates.length - 1][1]
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
