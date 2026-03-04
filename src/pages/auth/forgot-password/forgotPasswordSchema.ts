import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().nonempty("Email required").email(),
});

export default forgotPasswordSchema;
