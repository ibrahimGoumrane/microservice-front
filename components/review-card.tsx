import { Card } from "@/components/ui/card";
import { StarRating } from "@/components/star-rating";
import { User } from "lucide-react";
import type { Review } from "@/lib/types/main";
import { formatDistanceToNow } from "date-fns";

interface ReviewCardProps {
    review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
    const displayName = review.username || `User #${review.userId}`;
    const timeAgo = formatDistanceToNow(new Date(review.createdAt), { addSuffix: true });

    return (
        <Card className="p-4">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">{displayName}</p>
                            <p className="text-xs text-muted-foreground">{timeAgo}</p>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                    </div>
                    {review.comment && (
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                    )}
                </div>
            </div>
        </Card>
    );
}
