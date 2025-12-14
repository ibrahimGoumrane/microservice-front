"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarRatingInput } from "@/components/star-rating-input";
import { createProductReview } from "@/lib/network/api/reviews";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

interface ReviewFormProps {
    productId: number;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function ReviewForm({ productId, onSuccess, onCancel }: ReviewFormProps) {
    const router = useRouter();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating < 1 || rating > 5) {
            toast.error("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        try {
            await createProductReview(productId, {
                rating,
                comment: comment.trim() || undefined,
            });

            toast.success("Review submitted successfully!");
            setRating(5);
            setComment("");
            router.refresh();
            onSuccess?.();
        } catch (error) {
            toast.error("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label className="text-base font-semibold">Write a Review</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                        Share your thoughts about this product
                    </p>
                </div>

                <div>
                    <Label htmlFor="rating">Your Rating *</Label>
                    <div className="mt-2">
                        <StarRatingInput value={rating} onChange={setRating} />
                    </div>
                </div>

                <div>
                    <Label htmlFor="comment">Your Review (Optional)</Label>
                    <Textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us what you think about this product..."
                        rows={4}
                        maxLength={1000}
                        className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        {comment.length}/1000 characters
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                    </Button>
                    {onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Card>
    );
}
