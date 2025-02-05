"use client";

import Link from "next/link";
import { Eye, Plus, Trash, Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Lista } from "../lib/definitions";

export default function Listas() {
  const [listas, setListas] = useState<Lista[]>([]);

  // fetch listas al montar el componente
  useEffect(() => {
    getListas();
  }, []);

  // fetch listas desde la API
  const getListas = async () => {
    try {
      const res = await fetch("/api/listas");

      if (!res.ok) {
        throw new Error("No se ha conseguido recuperar las listas.");
      }
      const listasData = await res.json();
      setListas(listasData);
    } catch (error) {
      console.error("Error fetching listas:", error);
      alert("Failed to fetch listas");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // comprobar si la lista esta vacía
      const res = await fetch(`/api/listas/${id}/comprobar_contenido`);
      const contenidoLista = await res.json();

      // mostrar mensaje de confirmación diferente dependiendo de si la lista está vacía o no
      if (contenidoLista.numeroTarjetas > 0) {
        const confirmaBorrarLista = window.confirm(
          "¿Seguro que quieres eliminar esta lista con todo su contenido? Con lo que te ha costado añadir todas esas tarjetas..."
        );
        if (!confirmaBorrarLista) return;
      } else {
        const confirmaBorrarLista = window.confirm(
          "¿Seguro que quieres eliminar esta lista? Total, no habías añadido nada..."
        );
        if (!confirmaBorrarLista) return;
      }

      // api con la lógica para borrar lista
      const deleteRes = await fetch(`/api/listas/${id}`, {
        method: "DELETE",
      });

      if (!deleteRes.ok) {
        const errorData = await deleteRes.json();
        console.log("Error durante la eliminación:", errorData.error);
        alert(errorData.error || "No se pudo eliminar la lista");
        return;
      }

      alert("Otra lista que pereció por el camino... No somos nadie :(");

      const listasActualizadas = listas.filter((lista) => lista.id !== id);
      setListas(listasActualizadas);

      // hacemos fetch de las listas otra vez
      getListas();
    } catch (error) {
      console.log(error);
      alert("Failed to delete lista");
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl p-5">Listas</h1>

      <div className="flex justify-end mb-4 px-8">
        <Link
          href="/listas/nueva"
          className="bg-colors-buttonColor text-white p-3 rounded-lg shadow-lg hover:bg-colors-buttonColorHover transition duration-300 flex gap-2"
        >
          <span>Crear nueva lista</span> <Plus />
        </Link>
      </div>

      <div
        id="card-list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8"
      >
        {listas.map((lista) => (
          <div
            key={lista.id}
            className="w-full max-w-sm bg-white rounded-xl shadow-md p-4"
          >
            <div className="flex flex-col justify-center items-center text-black">
              <h3 className="text-2xl font-bold mb-2 text-cente">
                {lista.nombre}
              </h3>
              <p className="text-lg font-semibold text-center">
                Idioma: {lista.idioma}
              </p>
              <p className="text-lg font-semibold text-center">
                Nivel: {lista.nivel}
              </p>

              <div className="text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-4">
                {/* Ver contenido de la lista*/}
                <Link
                  href={`/listas/${lista.id}`}
                  className="flex justify-between items-center bg-green-500 hover:bg-green-600 text-white p-2 my-2 rounded"
                >
                  <span>Ir a la lista</span>
                  <Eye />
                </Link>

                {/* Repasar lista*/}
                <Link
                  href={`/juegos/repasar/${lista.id}`}
                  className="flex justify-between items-center bg-orange-500 hover:bg-orange-600 text-white p-2 my-2 rounded"
                >
                  <span>Repasar</span>
                  <Eye />
                </Link>

                {/* Editar detalles de la lista */}
                <Link
                  href={`/listas/editar/${lista.id}`}
                  className="flex justify-between items-center bg-blue-500 hover:bg-blue-600 text-white p-2 my-2 rounded"
                >
                  <span>Editar</span>
                  <Edit2 />
                </Link>
                {/* Borrar lista */}
                <button
                  onClick={() => handleDelete(lista.id)}
                  className="flex justify-between items-center bg-red-500 hover:bg-red-600 text-white p-2 my-2 rounded"
                >
                  <span>Eliminar</span>
                  <Trash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
