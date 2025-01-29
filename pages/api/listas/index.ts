import { NextApiRequest, NextApiResponse } from "next";
import { fetchListas } from "@/app/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const listas = await fetchListas();
      res.status(200).json(listas);
    } catch (error) {
      console.error("Error fetching listas:", error);
      res.status(500).json({ error: "Failed to fetch listas" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
