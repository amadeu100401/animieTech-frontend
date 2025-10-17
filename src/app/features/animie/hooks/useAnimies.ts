import { useQuery } from "@tanstack/react-query";
import { getAllAnimies } from "../api/getAllAnimies";

export function useAnimies() {
    return useQuery({
        queryKey: ["responseData"],
        queryFn: getAllAnimies,
        staleTime: 1000 * 60 * 5,
    });
}