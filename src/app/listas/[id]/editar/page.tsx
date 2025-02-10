// pages/listas/editar/[id].tsx
import { fetchListaByID } from "@/app/lib/data";
import EditarListaForm from "@/app/ui/editarListaForm";

import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lista = await fetchListaByID(id);

  if (!lista) {
    notFound();
  }

  return <EditarListaForm lista={lista} />;
}
