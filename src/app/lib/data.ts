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
export async function fetchListaByID(id: string) {
  try {
    const data = await sql<Lista>`SELECT * FROM listas WHERE id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch listas.");
  }
}

// Comprobar si una lista está vacía
// export async function comprobarContenidoLista(id: number) {
//   try {
//     const result = await sql`
//       SELECT COUNT(*) AS numero_tarjetas
//       FROM tarjetas
//       WHERE lista_id = ${id}
//     `;

//     if (result.rowCount === 0) {
//       return null; // Lista no encontrada
//     }

//     return result.rows[0].numero_tarjetas;
//   } catch (error) {
//     console.error("Error al buscar la lista:", error);
//     throw new Error("Error al buscar la lista");
//   }
// }

// TARJETAS
export async function fetchTarjetas(
  currentPage: number,
  listaId: number,
  itemsPerPage = 10
) {
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    const tarjetas =
      await sql<Tarjeta>`SELECT * FROM tarjetas WHERE lista_id = ${listaId} ORDER BY card_id DESC LIMIT ${itemsPerPage} OFFSET ${offset}`;

    return tarjetas.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tarjetas.");
  }
}

export async function fetchListaNombre(
  listaId: number
): Promise<string | null> {
  try {
    const lista = await sql<{ nombre: string }>`
      SELECT nombre
      FROM listas
      WHERE id = ${listaId}
      LIMIT 1
    `;

    return lista.rows.length > 0 ? lista.rows[0].nombre : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch list name.");
  }
}

// ESTADÍSTICAS
export async function fetchTotales() {
  try {
    const totalListasQuery = await sql`
      SELECT COUNT(*) FROM listas;
    `;
    const totalTarjetasQuery = await sql`
      SELECT COUNT(*) FROM tarjetas;
    `;
    const totalUsuariosQuery = await sql`
      SELECT COUNT(*) FROM users;
    `;

    const totalListas = totalListasQuery.rows[0].count;
    const totalTarjetas = totalTarjetasQuery.rows[0].count;
    const totalUsuarios = totalUsuariosQuery.rows[0].count;

    return { totalListas, totalTarjetas, totalUsuarios };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Error al recuperar los datos de la base de datos.");
  }
}

export async function fetchListasPorIdioma() {
  try {
    const listsPerLanguageQuery = await sql`
      SELECT idioma, COUNT(*) as total_lists
      FROM listas
      GROUP BY idioma
    `;

    // Map the results into an object format
    const listsPerLanguage = listsPerLanguageQuery.rows.map((row) => ({
      idioma: row.idioma,
      totalLists: row.total_lists,
    }));

    return listsPerLanguage;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Error al recuperar los datos de la base de datos.");
  }
}
