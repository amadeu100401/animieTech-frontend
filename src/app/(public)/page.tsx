import { AnimieList } from "../features/animie/components/AnimieList";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">
        Catálogo de Animes
      </h1> */}
      <Header />
      <HeroSection />
      <AnimieList />
    </main>
  );
}