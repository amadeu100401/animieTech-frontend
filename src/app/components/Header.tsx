import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
    return(
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        AnimieTech
                    </h1>

                    <nav className="hidden md:flex gap-6">
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hover:drop-shadow-sd">
                            Home
                        </a>
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hover:drop-shadow-sd">
                            Catalogo
                        </a>
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hover:drop-shadow-sd">
                            Sobre
                        </a>
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <User className="h-5 w-5 text-white" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <Menu className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>
        </header>
    );
}