import { z } from "zod";

export const loginSchema = z.object({
 username: z.string()
    .trim()
    .min(3, "El username es obligatorio")
    .max(50, "Máximo 50 caracteres"),
  
  password: z.string()
    .min(6, "Tu contraseña tiene minimo 6 caracteres")
    .max(100, "Máximo 100 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
