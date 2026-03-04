import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Password required")
      .min(4, "Password too short")
      .max(100, "Password require 100+ characters"),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password required")
      .min(4, "Confirm Password too short")
      .max(100, "Confirm Password require 100+ characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

export default resetPasswordSchema;
