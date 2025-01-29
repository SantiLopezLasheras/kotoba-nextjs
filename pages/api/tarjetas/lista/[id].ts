import { NextApiRequest, NextApiResponse } from "next";
import { fetchTarjetas } from "@/app/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID es necesario" });
  }
  const { page = 1 } = req.query;

  try {
    const tarjetas = await fetchTarjetas(Number(page), Number(id));
    res.status(200).json(tarjetas);
  } catch (error) {
    console.error("Error fetching tarjetas:", error);
    res.status(500).json({
      error: "No se han podido recuperar las tarjetas de la base de datos.",
    });
  }
}
