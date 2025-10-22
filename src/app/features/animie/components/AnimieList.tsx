"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimieCard } from "./AnimieCard";
import { useAnimies } from "../hooks/useAnimies";
import { Search } from "lucide-react";
import { Animie } from "@/app/types/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAnimieListPagined } from "../api/getAnimies";

enum SortBy {
  Alphabetical = "alphabetical",
  Score = "score",
  Episodes = "episodes",
}

export function AnimieList() {
  const { data, isLoading, isError, error } = useAnimies();
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState(SortBy.Alphabetical);
  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState(data?.pagination);
  const [animieList, setAnimieList] = useState(data?.data ?? []);

  const itemsPerPage = pagination?.count ?? 24;

  const uniqueGenres = useMemo(() => {
    const map = new Map<number, string>();
    animieList.forEach(animie => {
      animie.genres?.forEach(g => {
        if (g.malId != null && g.name) map.set(g.malId, g.name);
      });
    });
    return Array.from(map.entries()).map(([malId, name]) => ({ malId, name }));
  }, [animieList]);

  const filtered = useMemo(() => {
    let Animiefiltered = animieList.filter(animie => {
      const matchesSearch = searchTerm ? animie.title?.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      const matchesGenre = genre === "all" || genre === "" || animie.genres?.some(g => g.name === genre);
      return matchesSearch && matchesGenre;
    });

    return Animiefiltered.sort((a, b) => {
      switch (sortBy) {
        case SortBy.Alphabetical:
          return (a.title || "").localeCompare(b.title || "");
        case SortBy.Score:
          return (b.score || 0) - (a.score || 0);
        case SortBy.Episodes:
          return (b.episodes || 0) - (a.episodes || 0);
        default:
          return 0;
      }
    });
  }, [animieList, searchTerm, genre, sortBy]);

  useEffect(() => {
    if (data?.data) {
      setAnimieList(data.data);
      setPagination(data.pagination);
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genre, sortBy])

  const totalPages = pagination?.count ? pagination?.lastVisablePage : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  const handleGetPageItems = (page: number) => {
    setCurrentPage(page);

    let data = getAnimieListPagined(page, itemsPerPage);

    data.then(response => {
      setAnimieList(response.data ?? []);
      setPagination(response.pagination);
    });
  };
  
  const handleCardClick = (animie: Animie) => {
    // Lógica para lidar com o clique no cartão do anime (por exemplo, navegação para detalhes)
  }
  
  if (isLoading) return <div>Carregando animies...</div>;
  if (isError) return <div>Erro ao carregar animies: {error?.message}</div>;

  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-zinc-100">
          Catálogo de Animes
        </h2>

        {filtered.length > 0 && (
          <p className="text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "anime" : "animes"} encontrado{filtered.length === 1 ? "" : "s"}
          </p>
        )}
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
          <Input
            type="text"
            placeholder="Buscar animies..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="w-full sm:w-[200px] bg-transparent">
            <SelectValue placeholder="Filtrar por gênero"/>
          </SelectTrigger>
          <SelectContent className="border-slate-900 bg-zinc-900 backdrop-blur shadow-md">
            <SelectItem value="all">Todos</SelectItem>
            {uniqueGenres.map(g => (
              <SelectItem key={g.malId} value={g.name}>
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
          <SelectTrigger className="w-full sm:w-[200px] bg-transparent">
            <SelectValue placeholder="Ordenar por"/>
          </SelectTrigger>
          <SelectContent className="border-slate-900 bg-zinc-900 backdrop-blur shadow-md">
            <SelectItem value={SortBy.Alphabetical}>A-Z</SelectItem>
            <SelectItem value={SortBy.Score}>Manior Nota</SelectItem>
            <SelectItem value={SortBy.Episodes}>Número de Episódios</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(animie => (
            <AnimieCard key={animie.id ?? animie.title ?? Math.random()} animie={animie} />
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            Nenhum anime encontrado.
          </p>
        )}
      </div>

      {/* {filtered.length > itemsPerPage && ( */}
      {filtered.length > 1 && (
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handleGetPageItems(Math.max(currentPage - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handleGetPageItems(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                      {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return null;
              })}

              <PaginationItem>
                <PaginationNext
                    onClick={() => handleGetPageItems(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
