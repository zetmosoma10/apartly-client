import { z } from "zod";

const accountSchema = z.object({
  firstName: z
    .string()
    .nonempty("FirstName required")
    .max(255, "FirstName too long"),
  lastName: z
    .string()
    .nonempty("LastName required")
    .max(255, "LastName too long"),
  email: z.string().nonempty("Email required").email(),
  phone: z
    .string()
    .nonempty("Phone required")
    .max(10, "phone number must be 10 digits"),
  joined: z.string(),
  role: z.string(),
});

export default accountSchema;
