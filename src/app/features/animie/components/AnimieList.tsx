"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimieCard } from "./AnimieCard";
import { useAnimies } from "../hooks/useAnimies";

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
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Buscar animies..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="md:w-1/2"
        />

        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="w-full md:w-1/2">
            <SelectValue placeholder="Filtrar por gênero" />
          </SelectTrigger>
          <SelectContent>
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
