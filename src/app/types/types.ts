export type Animie = {
   id: number;
   title: string | null;
   titleJapanese: string | null;
   imageUrl: string | null; // <- minúsculo
   type: string | null;
   episodes: number | null;
   status: string | null;
   score: number | null;
   year: number | null;
   genres: GenresResponse[] | null;
   synopsis: string | null;
   trailerUrl: string | null;
   url: string | null;
};


 export type GenresResponse = {
    malId: number;
    type: string;
    name: string;
    url: string;
 }

 export type Pagination = {
    currentPage: number;
    lastVisablePage: number;
    hasNextPage: boolean;
    count: number;
 }