import { NextApiRequest, NextApiResponse } from "next";
import { eliminarLista, fetchListaByID } from "@/app/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID es necesario" });
  }

  // Obtener una lista por su ID
  if (req.method === "GET") {
    try {
      const lista = await fetchListaByID(Number(id));
      res.status(200).json(lista);
    } catch (error) {
      console.error("Error fetching lista:", error);
      res.status(500).json({
        error: "No se han podido recuperar la lista de la base de datos.",
      });
    }
  }

  // Eliminar una lista por su ID
  if (req.method === "DELETE") {
    try {
      const deleted = await eliminarLista(Number(id));
      if (deleted) {
        res.status(200).json({ message: "Se ha eliminado la lista" });
      } else {
        res.status(404).json({ error: "Lista no encontrada" });
      }
    } catch (error) {
      console.error("Error deleting lista:", error);
      res.status(500).json({ error: "No se pudo eliminar la lista" });
    }
  }
}
