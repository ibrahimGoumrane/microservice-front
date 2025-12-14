"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface StarRatingInputProps {
    value: number;
    onChange: (rating: number) => void;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function StarRatingInput({
    value,
    onChange,
    size = "lg",
    className,
}: StarRatingInputProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
    };

    const displayRating = hoverRating || value;

    return (
        <div className={cn("flex items-center gap-1", className)}>
            {[1, 2, 3, 4, 5].map((rating) => (
                <button
                    key={rating}
                    type="button"
                    onClick={() => onChange(rating)}
                    onMouseEnter={() => setHoverRating(rating)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                    <Star
                        className={cn(
                            sizeClasses[size],
                            rating <= displayRating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                        )}
                    />
                </button>
            ))}
        </div>
    );
}
