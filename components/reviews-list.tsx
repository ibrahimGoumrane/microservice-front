"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "@/components/review-card";
import { ReviewForm } from "@/components/review-form";
import { MessageSquare, Plus } from "lucide-react";
import type { Review } from "@/lib/types/main";

interface ReviewsListProps {
    productId: number;
    initialReviews: Review[];
    totalReviews: number;
    totalPages: number;
    currentPage: number;
    isAuthenticated: boolean;
}

export function ReviewsList({
    productId,
    initialReviews,
    totalReviews,
    totalPages,
    currentPage,
    isAuthenticated,
}: ReviewsListProps) {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviews, setReviews] = useState(initialReviews);

    const handleReviewSuccess = () => {
        setShowReviewForm(false);
        // Reviews will be refreshed via router.refresh() in ReviewForm
    };

    if (totalReviews === 0 && !showReviewForm) {
        return (
            <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                <p className="text-muted-foreground mb-4">
                    Be the first to review this product!
                </p>
                {isAuthenticated && (
                    <Button onClick={() => setShowReviewForm(true)} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Write a Review
                    </Button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Write Review Button */}
            {isAuthenticated && !showReviewForm && (
                <Button onClick={() => setShowReviewForm(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Write a Review
                </Button>
            )}

            {/* Review Form */}
            {showReviewForm && (
                <ReviewForm
                    productId={productId}
                    onSuccess={handleReviewSuccess}
                    onCancel={() => setShowReviewForm(false)}
                />
            )}

            {/* Reviews List */}
            {reviews.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        Customer Reviews ({totalReviews})
                    </h3>
                    <div className="space-y-3">
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>

                    {/* Pagination - TODO: Implement if needed */}
                    {totalPages > 1 && (
                        <div className="text-center text-sm text-muted-foreground">
                            Showing page {currentPage + 1} of {totalPages}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
