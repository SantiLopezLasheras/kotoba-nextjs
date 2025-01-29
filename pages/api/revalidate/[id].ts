import { revalidatePath } from "next/cache";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    revalidatePath(`/listas/${id}`);
    res.status(200).json({ message: "Page revalidated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error during revalidation" });
  }
}
