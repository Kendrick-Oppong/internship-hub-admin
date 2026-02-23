import { useQuery } from "@tanstack/react-query";
import { zonesApi } from "@/lib/api/queries/zones";
import { Query_Keys } from "@/lib/constants/query-keys";

export const useGetAllZones = () => {
  return useQuery({
    queryKey: Query_Keys.zones.all(),
    queryFn: () => zonesApi.getAllZones(),
    placeholderData: (previousData) => previousData,
  });
};
