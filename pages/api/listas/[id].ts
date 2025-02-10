import { NextApiRequest, NextApiResponse } from "next";
import { fetchListaByID } from "@/app/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID es necesario" });
  }

  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ error: "ID es necesario y debe ser una cadena" });
  }

  // Obtener una lista por su ID
  if (req.method === "GET") {
    try {
      const lista = await fetchListaByID(id);
      res.status(200).json(lista);
    } catch (error) {
      console.error("Error fetching lista:", error);
      res.status(500).json({
        error: "No se han podido recuperar la lista de la base de datos.",
      });
    }
  }
}
