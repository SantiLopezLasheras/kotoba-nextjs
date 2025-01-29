"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tarjeta } from "@/app/lib/definitions";
import { Pencil, Trash2 } from "lucide-react";
import { AddCardForm } from "@/components/AddCardForm";
import { TarjetaDetail } from "@/components/TarjetaDetail";

export default function Tarjetas() {
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [selectedTarjeta, setSelectedTarjeta] = useState<Tarjeta | null>(null);
  const [listaNombre, setListaNombre] = useState<string>("");
  const [isAddingCard, setIsAddingCard] = useState(false);
  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (id) {
      const fetchTarjetasData = async (page = 1) => {
        const response = await fetch(`/api/tarjetas/lista/${id}?page=${page}`);
        const data = await response.json();
        setTarjetas(data);

        const listaResponse = await fetch(`/api/listas/${id}`);
        const listaData = await listaResponse.json();
        setListaNombre(listaData.nombre || `Lista nº ${id}`);
      };

      fetchTarjetasData();
    }
  }, [id]);

  const handleCardClick = (tarjeta: Tarjeta) => {
    setSelectedTarjeta(tarjeta);
    setIsAddingCard(false);
  };

  const handleAddCard = () => {
    setIsAddingCard(true);
    setSelectedTarjeta(null);
  };

  const handleEditCard = (tarjeta: Tarjeta) => {
    setIsAddingCard(true);
    setSelectedTarjeta(tarjeta);
  };

  const handleDeleteCard = async (tarjeta: Tarjeta) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta tarjeta?"
    );
    if (confirmDelete) {
      const response = await fetch(
        `/api/tarjetas/eliminar/${tarjeta.card_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Quitar tarjeta eliminada de la UI
        setTarjetas(tarjetas.filter((t) => t.card_id !== tarjeta.card_id));
        setIsAddingCard(false);

        // Call the revalidate API route (esto no funciona)
        const revalidateResponse = await fetch(`/api/revalidate/${id}`);
        const revalidateResult = await revalidateResponse.json();
        console.log(revalidateResult);
      } else {
        alert("Error al eliminar la tarjeta.");
      }
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl p-5">Tarjetas</h1>
      <h2 className="text-center text-xl">
        {listaNombre || "Cargando nombre del mazo..."}
      </h2>

      <div className="flex flex-col lg:flex-row mt-5">
        <div className="w-full lg:w-1/3 p-5">
          <div className="flex justify-start mb-5">
            <button
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition duration-300"
              onClick={handleAddCard}
            >
              Añadir Tarjeta
            </button>
          </div>
          <div id="card-list" className="space-y-4">
            {tarjetas.map((tarjeta) => (
              <li
                key={tarjeta.card_id}
                className="w-full max-w-sm bg-white text-black shadow-md p-4 cursor-pointer flex justify-between items-center"
                onClick={() => handleCardClick(tarjeta)}
              >
                <span className="text-xl font-semibold">
                  {tarjeta.palabra.toUpperCase()}
                </span>
                <div className="flex gap-2">
                  <button
                    className="flex items-center bg-colors-buttonColor text-white py-2 px-4 rounded hover:bg-colors-buttonColorHover transition duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCard(tarjeta);
                    }}
                  >
                    <Pencil className="mr-2" />
                    Editar
                  </button>
                  <button
                    className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCard(tarjeta);
                    }}
                  >
                    <Trash2 className="mr-2" />
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="w-full lg:w-2/3 p-5">
          {isAddingCard ? (
            <AddCardForm listaId={id} tarjeta={selectedTarjeta} />
          ) : selectedTarjeta ? (
            <TarjetaDetail tarjeta={selectedTarjeta} />
          ) : (
            <p className="text-center text-xl text-gray-500">
              Selecciona una tarjeta para previsualizarla
            </p>
          )}
        </div>
      </div>
    </>
  );
}
