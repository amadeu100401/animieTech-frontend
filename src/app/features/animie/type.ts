import { Animie, Pagination } from "@/app/types/types";

export type GetAnimieList = {
    data: Animie[] | null;
    pagination: Pagination | null;
}