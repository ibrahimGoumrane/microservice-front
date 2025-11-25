"use server";
import { ZodSchema } from "zod";
import { ApiResponse } from "@/lib/types/subTypes/commonTypes";
import { State } from "@/lib/schema/base";
import { revalidatePath } from "next/cache";

export async function handleAction<T, CreateDTO, UpdateDTO>(
  data: CreateDTO | UpdateDTO | Record<string, string | number | File>,
  schema: ZodSchema,
  action: () => Promise<ApiResponse<T | null>>,
  revalidatePaths?: string | string[] // New parameter
): Promise<State> {
  try {
    // In the data Convert every Numeric value to a number
    const transformedData: Record<string, string | number | File> = {};
    for (const key in data as Record<string, string | number | File>) {
      const value = (data as Record<string, any>)[key];
      if (typeof value === "string" && !isNaN(Number(value))) {
        transformedData[key] = Number(value);
      } else {
        transformedData[key] = value;
      }
    }
    console.log("Transformed data:", transformedData);
    const parsed = schema.safeParse(transformedData);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      console.error("Validation errors:", fieldErrors);
      return {
        success: false,
        errors: fieldErrors as Record<string, string[]>,
      };
    }
    const returnedData = await action();

    // Revalidate paths if provided and action was successful
    if (revalidatePaths) {
      if (Array.isArray(revalidatePaths)) {
        revalidatePaths.forEach((path) => revalidatePath(path));
      } else {
        revalidatePath(revalidatePaths);
      }
    }
    return {
      success: true,
      errors: {},
      data: returnedData,
    };
  } catch (error) {
    console.error("Action error:", (error as Error).message);
    return {
      success: false,
      errors: { general: [(error as Error).message] },
      data: null,
    };
  }
}
