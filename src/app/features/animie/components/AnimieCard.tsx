import { Card, CardContent } from "@/components/ui/card";
import { Animie } from "../../../types/types";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnimieCardProps {
    animie: Animie;
    onClick?: () => void;
}

export function AnimieCard({ animie }: { animie: Animie }) {
    return (
        <Card
            className=" group p-0 gap-0 cursor-pointer overflow-hidden border-border/50 bg-card
                hover:border-primary/50 transition-all duration-300
                hover:glow-primary hover:scale-105"
        >
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={animie.imageUrl || "/placeholder-image.png"}
                    alt={animie.title || "Anime Image"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-50" />
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-2sm px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-secondary text-secondary"/>
                    <span className="text-xs font-medium"> {animie.score || "N/A"} </span>
                </div>
            </div>
            <CardContent className="p-4">
                <h3 className="flex text-lg font-semibold mb-2 line-clamp-1 group-hover-text-primary transition-colors">
                    {animie.title}
                </h3>
                
                <div className="flex flex-wrap gap-1 mb-2">
                    {animie.genres?.slice(0, 3).map((genre) => (
                        <Badge
                            key={genre.malId}
                            variant="secondary"
                            className="text-sx bg-muted hover:bg-muted"
                        >
                            {genre.name}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{animie.episodes} episódios</span>
                    <span className="capitalize">{animie.status}</span>
                </div>
            </CardContent>
        </Card>
    );
}
