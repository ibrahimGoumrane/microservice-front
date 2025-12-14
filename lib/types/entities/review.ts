// Review Entity Types

export interface Review {
    id: number;
    userId: number;
    productId: number;
    rating: number; // 1-5
    comment: string | null;
    createdAt: string;
    username: string | null;
}

export interface CreateReviewDTO {
    rating: number; // 1-5
    comment?: string; // Optional, max 1000 chars
}

export interface ReviewsResponse {
    success: boolean;
    data: {
        reviews: Review[];
        totalReviews: number;
        totalPages: number;
        currentPage: number;
    };
}

export interface ReviewResponse {
    success: boolean;
    data: Review;
}
