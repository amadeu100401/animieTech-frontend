import { GetAnimieList } from "../type";

export async function getAllAnimies(): Promise<GetAnimieList> {
    const response = await fetch("http://localhost:8080/api/v1/Animie/list", {
        method: "GET",
        cache: "no-store",
        body: null,
    });

    if (!response.ok) {
        throw new Error("Failed to fetch animies");
    }
    
    const data = await response.json();
    
    return data;
}