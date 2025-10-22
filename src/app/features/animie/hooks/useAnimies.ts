import { useQuery } from "@tanstack/react-query";
import { getAnimieListPagined } from "../api/getAnimies";

export function useAnimies(page?: number, limit?: number) {
    return useQuery({
        queryKey: ["responseData", page, limit],
        queryFn: () => getAnimieListPagined(page, limit),
        staleTime: 1000 * 60 * 5,
    });
}