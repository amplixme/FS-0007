import { z } from "zod";

export const postSchema = z.object({
  title: z.string({ required_error: "El título es requerido" }).min(1),
  content: z.string({ required_error: "El contenido es requerido" }).min(1),
  published: z.boolean().optional().default(false),
  categoryIds: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
});