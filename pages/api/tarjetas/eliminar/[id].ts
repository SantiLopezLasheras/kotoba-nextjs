import { eliminarTarjeta } from "@/app/lib/actions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { card_id } = req.query;
  const method = req.method;

  if (method === "DELETE") {
    try {
      await eliminarTarjeta(Number(card_id));
      res.status(200).json({ message: "Tarjeta eliminada exitosamente" });
    } catch (error) {
      console.error("Error deleting tarjeta:", error);
      res.status(500).json({ error: "Error al eliminar la tarjeta" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
