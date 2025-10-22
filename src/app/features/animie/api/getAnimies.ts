import { GetAnimieList } from "../type";

export async function getAnimieListPagined(page?: number, limi?: number): Promise<GetAnimieList> {

    const params = new URLSearchParams();
    if (page == null) page = 1;
    if (limi == null) limi = 24;

    params.append("page", page.toString());
    params.append("limit", limi.toString());

    const response = await fetch(`http://localhost:8080/api/v1/Animie/list?${params.toString()}`, {
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