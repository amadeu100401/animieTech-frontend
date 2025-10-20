"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimieCard } from "./AnimieCard";
import { useAnimies } from "../hooks/useAnimies";
import { Search } from "lucide-react";

export function AnimieList() {
  const { data, isLoading, isError, error } = useAnimies();
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");

  const animieList = data?.data ?? [];

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
    return animieList.filter(animie => {
      const matchesSearch = searchTerm ? animie.title?.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      const matchesGenre = genre === "all" || genre === "" || animie.genres?.some(g => g.name === genre);
      return matchesSearch && matchesGenre;
    });
  }, [animieList, searchTerm, genre]);

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
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(animie => (
            <AnimieCard key={animie.id ?? animie.title ?? Math.random()} animie={animie} />
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            Nenhum anime encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
