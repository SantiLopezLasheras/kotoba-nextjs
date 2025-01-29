import { NextApiRequest, NextApiResponse } from "next";
import { comprobarContenidoLista } from "@/app/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID es necesario" });
  }

  try {
    const numeroTarjetas = await comprobarContenidoLista(Number(id));
    res.status(200).json({ numeroTarjetas });
  } catch (error) {
    console.error("Error al comprobar el contenido de la lista: ", error);
    res
      .status(500)
      .json({ error: "Error al comprobar el contenido de la lista." });
  }
}
