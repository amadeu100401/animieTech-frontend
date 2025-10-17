import { AnimieList } from "../features/animie/components/AnimieList";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Catálogo de Animes
      </h1>
      <AnimieList />
    </main>
  );
}