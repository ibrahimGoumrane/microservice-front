import { Star } from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface StarRatingProps {
    rating: number; // 0-5, can be decimal (e.g., 4.5)
    maxRating?: number;
    size?: "sm" | "md" | "lg";
    showNumber?: boolean;
    className?: string;
}

export function StarRating({
    rating,
    maxRating = 5,
    size = "md",
    showNumber = false,
    className,
}: StarRatingProps) {
    const sizeClasses = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
    };

    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
        const fillPercentage = Math.min(Math.max(rating - (i - 1), 0), 1) * 100;

        stars.push(
            <div key={i} className="relative inline-block">
                {/* Empty star (background) */}
                <Star className={cn(sizeClasses[size], "text-muted-foreground")} />
                {/* Filled star (overlay) */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${fillPercentage}%` }}
                >
                    <Star className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")} />
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex items-center gap-1", className)}>
            {stars}
            {showNumber && (
                <span className="ml-1 text-sm text-muted-foreground">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
}
