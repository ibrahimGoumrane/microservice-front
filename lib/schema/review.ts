import { z } from "zod";

// Review validation schema
export const createReviewSchema = z.object({
    rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
    comment: z.string().max(1000, "Comment must be less than 1000 characters").optional(),
});
