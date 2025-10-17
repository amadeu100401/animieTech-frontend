import { Card, CardContent } from "@/components/ui/card";
import { Animie } from "../../../types/types";

export function AnimieCard({ animie }: { animie: Animie }) {

    console.log("Rendering AnimieCard for:", animie);

    return (
        <Card className = "overflow-hidden hover:shadow-md transaction-shadow">
            <img
                src={animie.imageUrl || "/placeholder-image.png"}
                alt={animie.title || "Anime Image"}
                className="w-full h-48 object-cover"
            />
            <CardContent>
                <h3 className="text-lg font-semibold">{animie.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {animie.synopsis || "No synopsis available."}
                </p>
                <p className="text-xs mt-2 text-muted-foreground">
                    {animie.type} | Episodes: {animie.episodes || "N/A"} | Score: {animie.score || "N/A"}
                </p>
            </CardContent>
        </Card>
    );
}
