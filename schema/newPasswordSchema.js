import { object, string, number } from "zod"
export const newPasswordSchema = object({
  password: string({ required_error: "Password is required" })
    .min(6, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
