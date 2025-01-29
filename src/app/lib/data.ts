import { sql } from "@vercel/postgres";
import { Tarjeta, Lista } from "./definitions";

// LISTAS

// Recuperar todas las listas
export async function fetchListas() {
  try {
    const data = await sql<Lista>`SELECT * FROM listas`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch listas.");
  }
}

// Recuperar una lista por ID
export async function fetchListaByID(id: number) {
  try {
    const data = await sql<Lista>`SELECT * FROM listas WHERE id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch listas.");
  }
}

// Comprobar si una lista está vacía
export async function comprobarContenidoLista(id: number) {
  try {
    const result = await sql`
      SELECT COUNT(*) AS numero_tarjetas
      FROM tarjetas
      WHERE lista_id = ${id}
    `;

    if (result.rowCount === 0) {
      return null; // Lista no encontrada
    }

    return result.rows[0].numero_tarjetas;
  } catch (error) {
    console.error("Error al buscar la lista:", error);
    throw new Error("Error al buscar la lista");
  }
}

// Eliminar una lista
export async function eliminarLista(id: number) {
  try {
    const result = await sql`
      DELETE FROM listas
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.rowCount === 0) {
      return null; // Lista no encontrada
    }
  } catch (error) {
    console.error("Error al borrar la lista: ", error);
    throw new Error("Error al borrar la lista");
  }
}

// TARJETAS
const ITEMS_PER_PAGE = 10;
export async function fetchTarjetas(currentPage: number, listaId: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tarjetas =
      await sql<Tarjeta>`SELECT * FROM tarjetas WHERE lista_id = ${listaId} ORDER BY card_id DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;

    return tarjetas.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tarjetas.");
  }
}
