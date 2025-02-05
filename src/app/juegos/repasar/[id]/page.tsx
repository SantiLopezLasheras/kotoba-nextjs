"use client";

import { useParams } from "next/navigation";

export default function RepasarMazo() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <h1 className="text-center text-3xl p-5">
      Repasar Mazo {id ? id : "Cargando..."}
    </h1>
  );
}
