import { z } from "zod";

export const apartmentSchema = z.object({
  title: z.string().min(1, "title required").max(255, "title too long"),
  description: z
    .string()
    .min(1, "description required")
    .max(1024, "description too long"),
  price: z.coerce
    .number({ invalid_type_error: "price must be a number" })
    .positive("price must be a positive")
    .min(1, "price is required"),
  bedrooms: z.coerce
    .number({ invalid_type_error: "bedrooms must be a number" })
    .min(1, "bedrooms is required"),
  bathrooms: z.coerce
    .number({
      invalid_type_error: "bathrooms must be a number",
    })
    .min(1, "bathrooms is required"),
  address: z.string().min(1, "address required").max(255, "address too long"),
  city: z.string().min(1, "city required").max(255, "city to long"),
  status: z.enum(["available", "rented", "maintenance"], {
    message: "status is required",
  }),
  type: z.enum(
    ["1-bedrooms", "2-bedrooms", "3-bedrooms", "studio", "bachelor", "other"],
    { message: "type is required" }
  ),
  amenities: z.string().optional(),
});
