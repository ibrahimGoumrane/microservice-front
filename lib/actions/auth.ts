"use server";

import { z } from "zod";
import { State } from "@/lib/schema/base";
import * as authApi from "@/lib/network/api/auth";
import { redirect } from "next/navigation";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    roles: z.string().default("ROLE_USER"),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

// Server Actions
export async function loginAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const submittedData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const parsed = loginSchema.safeParse(submittedData);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        data: { email: submittedData.email } as any, // Preserve email, not password
      };
    }

    const response = await authApi.login(parsed.data);

    if (response.success) {
      // Redirect will be handled in the component
      return {
        success: true,
        errors: {},
        data: response,
      };
    } else {
      return {
        success: false,
        errors: { general: ["Login failed. Please check your credentials."] },
        data: { email: submittedData.email } as any, // Preserve email, not password
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
      data: { email: submittedData.email } as any, // Preserve email, not password
    };
  }
}

export async function registerAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const submittedData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  try {
    const parsed = registerSchema.safeParse(submittedData);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        data: { name: submittedData.name, email: submittedData.email } as any, // Preserve name and email, not passwords
      };
    }

    const { confirmPassword, ...registerData } = parsed.data;
    // Add roles field for the API
    const apiData = { ...registerData, roles: "ROLE_USER" };
    const response = await authApi.register(apiData);

    if (response.success) {
      return {
        success: true,
        errors: {},
        data: response,
      };
    } else {
      return {
        success: false,
        errors: { general: ["Registration failed. Please try again."] },
        data: { name: submittedData.name, email: submittedData.email } as any, // Preserve name and email, not passwords
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
      data: { name: submittedData.name, email: submittedData.email } as any, // Preserve name and email, not passwords
    };
  }
}

export async function logoutAction() {
  await authApi.logout();
  redirect("/login");
}
