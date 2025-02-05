import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "El campo email es obligatorio" })
    .min(1, "Campo obligatorio")
    .email("Email no válido"),
  password: string({ required_error: "El campo contraseña es obligatorio" })
    .min(1, "Campo obligatorio")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
});
