"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchemaLista = z.object({
  id: z.string(),
  idioma: z.string(),
  nivel: z.coerce.number(),
  nombreLista: z.string(),
});

const CrearListaNueva = FormSchemaLista.omit({ id: true });

export async function crearListaNueva(formData: FormData) {
  const { idioma, nivel, nombreLista } = CrearListaNueva.parse({
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

const CrearTarjetaNueva = FormSchemaTarjeta.omit({ id: true });
export async function crearTarjetaNueva(formData: FormData) {
  const {
    palabra,
    traduccion,
    frase_ejemplo,
    pronunciacion,
    cat_gramatical,
    idioma,
    lista_id,
  } = CrearTarjetaNueva.parse({
    palabra: formData.get("palabra"),
    cat_gramatical: formData.get("cat_gramatical"),
    traduccion: formData.get("traduccion"),
    frase_ejemplo: formData.get("frase_ejemplo"),
    pronunciacion: formData.get("pronunciacion"),
    idioma: formData.get("idioma"),
    lista_id: formData.get("lista_id"),
  });

  await sql`
    INSERT INTO tarjetas (palabra, traduccion, frase_ejemplo, pronunciacion, cat_gramatical, idioma, lista_id)
    VALUES (${palabra}, ${traduccion}, ${frase_ejemplo}, ${pronunciacion}, ${cat_gramatical}, ${idioma}, ${lista_id})
  `;

  revalidatePath(`/listas/${lista_id}`);
  redirect(`/listas/${lista_id}`);
}

export async function eliminarTarjeta(cardId: number) {
  await sql`DELETE FROM tarjetas WHERE card_id = ${cardId}`;
}
