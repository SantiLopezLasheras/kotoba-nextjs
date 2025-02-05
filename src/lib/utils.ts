import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserFromDb(email: string): Promise<User | undefined> {
  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    const user = result.rows[0];

    if (!user) {
      return undefined;
    }

    return user as User;
  } catch (error) {
    console.error("No se ha podido recuperar el usuario:", error);
    throw new Error("Error al recuperar el usuario.");
  }
}
