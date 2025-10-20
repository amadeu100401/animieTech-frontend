export const HeroSection = () => { 
    return(
      <section className="bg-gradient-hero py-20 px-4" 
      style={{ backgroundImage: "var(--gradient-hero)" }}>
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}>
            Bem-vindo ao Animie Tech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore o maior catálogo de animes com informações detalhadas, avaliações e muito mais
          </p>
        </div>
      </section>
    );
};