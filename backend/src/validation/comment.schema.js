import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().trim().min(1, "El contenido es obligatorio (requerido, mínimo 1 caracter)"),
});
