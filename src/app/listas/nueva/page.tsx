"use client";

import { crearListaNueva } from "@/app/lib/actions";
import Link from "next/link";

const NuevaLista = () => {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl text-center mb-6">Crear una lista nueva</h1>

      <form action={crearListaNueva} className="space-y-4">
        <div>
          <label htmlFor="idioma" className="block text-lg font-semibold">
            Idioma
          </label>
          <input
            id="idioma"
            name="idioma"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="nombreLista" className="block text-lg font-semibold">
            Nombre de la lista
          </label>
          <input
            id="nombreLista"
            name="nombreLista"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="nivel" className="block text-lg font-semibold">
            Nivel
          </label>
          <input
            id="nivel"
            name="nivel"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
            min="1"
            max="5"
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/listas"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          <button
            className="bg-colors-buttonColor  text-white  rounded-lg hover:bg-colors-buttonColorHover transition duration-300 px-3"
            type="submit"
          >
            Crear lista
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevaLista;
