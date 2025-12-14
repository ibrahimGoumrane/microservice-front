"use server";

import { fetchData } from "../utils/main";
import type { Review, ReviewsResponse, ReviewResponse, CreateReviewDTO } from "../../types/main";

/**
 * Get reviews for a product with pagination
 */
export async function getProductReviews(
    productId: number,
    page: number = 0,
    limit: number = 10
): Promise<ReviewsResponse["data"]> {
    try {
        const response = await fetchData<ReviewsResponse>(
            `/api/v1/products/${productId}/reviews?page=${page}&limit=${limit}`,
            { method: "GET" }
        ) as ReviewsResponse;

        return response.data;
    } catch (error) {
        console.error("Error fetching product reviews:", error);
        return {
            reviews: [],
            totalReviews: 0,
            totalPages: 0,
            currentPage: 0,
        };
    }
}

/**
 * Create a review for a product (requires authentication)
 */
export async function createProductReview(
    productId: number,
    reviewData: CreateReviewDTO
): Promise<ReviewResponse> {
    try {
        const response = await fetchData<ReviewResponse>(
            `/api/v1/products/${productId}/reviews`,
            {
                method: "POST",
                body: JSON.stringify(reviewData),
            }
        ) as ReviewResponse;

        return response;
    } catch (error) {
        console.error("Error creating review:", error);
        throw error;
    }
}
