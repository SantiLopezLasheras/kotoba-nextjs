import { sql } from "@vercel/postgres";
import { Tarjeta } from "./definitions";

export async function fetchTarjetas() {
  try {
    const data = await sql<Tarjeta>`SELECT * FROM tarjetas`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tarjetas.");
  }
}
