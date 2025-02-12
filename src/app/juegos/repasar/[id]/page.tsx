"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Tarjeta } from "@/app/lib/definitions";

export default function RepasarMazo() {
  const params = useParams();
  const id = params?.id as string;

  const [flashcards, setFlashcards] = useState<Tarjeta[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mostrar, setMostrar] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchFlashcards = async () => {
        const response = await fetch(`/api/tarjetas/lista/${id}`);
        const data = await response.json();

        if (response.ok) {
          setFlashcards(shuffleCards(data.tarjetas));
        } else {
          console.error(
            "Error fetching flashcards:",
            data.error || data.message
          );
        }
      };

      fetchFlashcards();
    }
  }, [id]);

  const shuffleCards = (cards: Tarjeta[]) => {
    return cards.sort(() => Math.random() - 0.5);
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= flashcards.length) return 0;
      return nextIndex;
    });
    setMostrar(false);
  };

  return (
    <div className="container mx-auto p-4 mb-6">
      <h1 className="text-center text-3xl sm:text-4xl p-5 mb-5">
        Repasar Mazo {id ? id : "Cargando..."}
      </h1>

      {flashcards.length > 0 ? (
        <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
          {/* Parte frontal de la flashcard */}
          <div className="w-full sm:w-[500px] h-72 flex flex-col items-center justify-center bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
              {flashcards[currentIndex].palabra}
            </h2>

            <button
              onClick={() => setMostrar(!mostrar)}
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all"
            >
              {mostrar ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {/* Parte trasera de la flashcard */}
          <div className="w-full sm:w-[500px] h-72 bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <div className={mostrar ? "" : "hidden"}>
              <h2 className="text-center text-2xl sm:text-3xl font-bold mb-3">
                {flashcards[currentIndex].traduccion}
              </h2>
              <p className="font-semibold text-sm italic text-right">
                {flashcards[currentIndex].cat_gramatical}
              </p>
              {flashcards[currentIndex].pronunciacion && (
                <p className="text-right text-sm italic">
                  /{flashcards[currentIndex].pronunciacion}/
                </p>
              )}
              <hr className="my-4 border-gray-300" />
              <p className="italic">{flashcards[currentIndex].frase_ejemplo}</p>
            </div>
            {!mostrar && (
              <Image
                width={200}
                height={200}
                src="/images/interrogation.webp"
                alt="interrogantes"
                className="my-4 rounded-md mx-auto"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto text-center rounded-md bg-purple-300">
          <h2 className="text-2xl font-bold pt-5">Nada que mostrar todavía</h2>
          <p>Deberías añadir algunas tarjetas primero...</p>
          <Image
            width={400}
            height={400}
            className="w-1/4 mx-auto py-5 rounded-md"
            src="/images/not-found-1024x1024.png"
            alt="no hay nada que mostrar"
          />
        </div>
      )}

      {flashcards.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={nextCard}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Siguiente
          </button>
        </div>
      )}

      <Link href={`/listas`} className="mt-4 block text-center text-blue-500">
        Volver a las listas
      </Link>
    </div>
  );
}
