"use client";

import { useParams } from "next/navigation";

export default function RepasarMazo() {
  const { id } = useParams();

  return (
    <h1 className="text-center text-3xl p-5">
      Repasar Mazo {id ? id : "Cargando..."}
    </h1>
  );
}
