import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "@/lib/zod";
import { getUserFromDb } from "@/lib/utils";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // lógica para verificar si el usuario existe en la base de datos
          const user = await getUserFromDb(email);

          if (!user) {
            throw new Error("Usuario no encontrado");
          }

          console.log("Comparing passwords...");
          const passwordsMatch = await bcrypt.compare(password, user.password);

          // devuelve un JSON object con los datos del usuario
          if (passwordsMatch) {
            return user;
          } else {
            throw new Error("Contraseña incorrecta");
          }
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Zod validation error:", error.errors);
            // Devuelve null para indicar que no se pudo iniciar sesión
            return null;
          }

          // Handle any unexpected error y devuelve null
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/login" },
});
