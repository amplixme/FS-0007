import z from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe contener al menos 2 letras"),
  bio: z.string().trim().optional(),
  avatarUrl: z.string().url("URL inválida").optional(),
});

export const createUserSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe contener al menos 2 letras"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe contener al menos 6 caracteres"),
  role: z.enum(["USER", "ADMIN"], { message: "Rol inválido" }).optional().default("USER"),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe contener al menos 2 letras").optional(),
  email: z.string().email("Email inválido").optional(),
  role: z.enum(["USER", "ADMIN"], { message: "Rol inválido" }).optional(),
});