import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("FirstName required")
      .max(255, "FirstName too long"),
    lastName: z
      .string()
      .nonempty("LastName required")
      .max(255, "LastName too long"),
    email: z.string().nonempty("Email required").email(),
    role: z.enum(["tenant", "landlord", "admin"]).default("tenant").optional(),
    phone: z
      .string()
      .nonempty("Phone required")
      .max(10, "phone number must be 10 digits"),
    password: z
      .string()
      .nonempty("Password required")
      .min(4, "Password too short")
      .max(100, "Password require 100+ characters"),
    confirmPassword: z.string().nonempty("ConfirmPassword required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export default registerSchema;
