import { z } from "zod";

const loginSchema = z.object({
  email: z.string().nonempty("Email required").email(),
  password: z
    .string()
    .nonempty("Password required")
    .min(4, "Password too short")
    .max(100, "Password require 100+ characters"),
});

export default loginSchema;
