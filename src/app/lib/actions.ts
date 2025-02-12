"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { signIn } from "../../../auth";

/*******************************/
// LISTAS //
/*******************************/

const FormSchemaLista = z.object({
  idioma: z.string(),
  nivel: z.coerce.number(),
  nombreLista: z.string(),
});

export type State = {
  errors?: {
    idioma?: string[];
    nivel?: string[];
    nombreLista?: string[];
  };
  message?: string | null;
};

// Crear una lista nueva
export async function crearListaNueva(formData: FormData) {
  const { idioma, nivel, nombreLista } = FormSchemaLista.parse({
    idioma: formData.get("idioma"),
    nivel: formData.get("nivel"),
    nombreLista: formData.get("nombreLista"),
  });

  await sql`
    INSERT INTO listas (idioma, nivel, nombre)
    VALUES (${idioma}, ${nivel}, ${nombreLista})
  `;

  revalidatePath("/listas");
  redirect("/listas");
}

// Editar una lista
export async function editarLista(id: string, formData: FormData) {
  const validatedFields = FormSchemaLista.safeParse({
    idioma: formData.get("idioma"),
    nivel: formData.get("nivel"),
    nombreLista: formData.get("nombreLista"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Falta información requerida, no se ha podido actualizar la lista",
    };
  }

  const { idioma, nivel, nombreLista } = validatedFields.data;

  try {
    await sql`
      UPDATE listas
      SET idioma = ${idioma}, nivel = ${nivel}, nombre = ${nombreLista}
      WHERE id = ${id}  
    `;
  } catch (error) {
    console.log("Error al actualizar la lista: ", error);
    return { message: "Error al actulizar la lista." };
  }

  revalidatePath("/listas");
  redirect("/listas");
}

// Eliminar una lista
export async function eliminarLista(id: string) {
  try {
    const result = await sql`
      DELETE FROM listas
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.rowCount === 0) {
      console.log("Lista no encontrada");
      return null;
    }
  } catch (error) {
    console.error("Error al borrar la lista: ", error);
    throw new Error("Error al borrar la lista");
  }
}

/*******************************/
// TARJETAS //
/*******************************/
const FormSchemaTarjeta = z.object({
  palabra: z.string(),
  traduccion: z.string(),
  frase_ejemplo: z.string().optional(),
  pronunciacion: z.string().optional(),
  cat_gramatical: z.string().optional(),
  idioma: z.string(),
  notas: z.string().optional(),
  lista_id: z.string(),
});

export async function crearTarjetaNueva(formData: FormData) {
  const {
    palabra,
    traduccion,
    frase_ejemplo,
    pronunciacion,
    cat_gramatical,
    idioma,
    lista_id,
  } = FormSchemaTarjeta.parse({
    palabra: (formData.get("palabra") as string) || "",
    cat_gramatical: (formData.get("cat_gramatical") as string) || "",
    traduccion: (formData.get("traduccion") as string) || "",
    frase_ejemplo: formData.get("frase_ejemplo")
      ? (formData.get("frase_ejemplo") as string)
      : "",
    pronunciacion: formData.get("pronunciacion")
      ? (formData.get("pronunciacion") as string)
      : "",
    idioma: (formData.get("idioma") as string) || "",
    lista_id: (formData.get("lista_id") as string) || "",
  });

  await sql`
    INSERT INTO tarjetas (palabra, traduccion, frase_ejemplo, pronunciacion, cat_gramatical, idioma, lista_id)
    VALUES (${palabra}, ${traduccion}, ${frase_ejemplo}, ${pronunciacion}, ${cat_gramatical}, ${idioma}, ${lista_id})
  `;

  revalidatePath(`/listas/${lista_id}`);
  redirect(`/listas/${lista_id}`);
}

export async function editarTarjeta(id: string, formData: FormData) {
  const {
    palabra,
    traduccion,
    frase_ejemplo,
    pronunciacion,
    cat_gramatical,
    idioma,
    lista_id,
  } = FormSchemaTarjeta.parse({
    palabra: (formData.get("palabra") as string) || "",
    cat_gramatical: (formData.get("cat_gramatical") as string) || "",
    traduccion: (formData.get("traduccion") as string) || "",
    frase_ejemplo: formData.get("frase_ejemplo")
      ? (formData.get("frase_ejemplo") as string)
      : "",
    pronunciacion: formData.get("pronunciacion")
      ? (formData.get("pronunciacion") as string)
      : "",
    idioma: (formData.get("idioma") as string) || "",
    lista_id: (formData.get("lista_id") as string) || "",
  });

  await sql`
    UPDATE tarjetas
    SET palabra = ${palabra}, traduccion = ${traduccion}, frase_ejemplo = ${frase_ejemplo}, pronunciacion = ${pronunciacion}, cat_gramatical = ${cat_gramatical}, idioma = ${idioma}
    WHERE card_id = ${id}
  `;

  revalidatePath(`/listas/${lista_id}`);
  redirect(`/listas/${lista_id}`);
}

export async function eliminarTarjeta(cardId: number) {
  try {
    await sql`DELETE FROM tarjetas WHERE card_id = ${cardId} RETURNING *`;
    return { message: "Tarjeta eliminada" };
  } catch (error) {
    console.log(error);
    return { message: "Database Error: No se ha podido eliminar la lista" };
  }
}

/*******************************/
// USUARIOS //
/*******************************/
// Registrar a un usuario
export async function register(formData: FormData) {
  const user = formData.get("user") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!user || !email || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  // Comprobar si el usuario ya existe
  const { rows: existingUsers } = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (existingUsers.length > 0) {
    throw new Error("El usuario ya existe");
  }

  const hashedPassword = await hash(password, 10);

  // establecer conexión con la base de datos e insertar usuario
  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${user}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    throw new Error("Error al registrar usuario: " + error);
  }

  redirect("/login");
}

// Iniciar sesión de un usuario
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + error);
  }

  redirect("/");
}
