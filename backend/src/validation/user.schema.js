import z from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe contener al menos 2 letras"),
  bio: z.string().trim().optional(),
  avatarUrl: z.string().url("URL inválida").optional(),
});
