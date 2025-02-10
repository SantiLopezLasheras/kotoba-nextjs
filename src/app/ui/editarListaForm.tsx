"use client";

import { State, editarLista } from "@/app/lib/actions";
import { useState } from "react";
import Link from "next/link";
import { Lista } from "../lib/definitions";

interface EditarListaFormProps {
  lista: Lista;
}

export default function EditarListaForm({ lista }: EditarListaFormProps) {
  const initialState: State = { message: null, errors: {} };
  const [state, setState] = useState(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await editarLista(lista.id, formData);

    if (result?.errors) {
      setState({ ...state, errors: result.errors, message: result.message });
    } else {
      setState({ ...state, message: "Lista actualizada correctamente" });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl text-center mb-6">Editar Lista</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="idioma"
            className="block text-black text-lg font-semibold"
          >
            Idioma
          </label>
          <input
            id="idioma"
            name="idioma"
            type="text"
            className="w-full text-black bg-slate-200 p-3 border border-gray-300 rounded-lg"
            defaultValue={lista.idioma}
            required
          />
        </div>

        <div>
          <label
            htmlFor="nombreLista"
            className="block text-black text-lg font-semibold"
          >
            Nombre de la lista
          </label>
          <input
            id="nombreLista"
            name="nombreLista"
            type="text"
            className="w-full text-black bg-slate-200 p-3 border border-gray-300 rounded-lg"
            defaultValue={lista.nombre}
            required
          />
        </div>

        <div>
          <label
            htmlFor="nivel"
            className="block text-black text-lg font-semibold"
          >
            Nivel
          </label>
          <input
            id="nivel"
            name="nivel"
            type="number"
            className="w-full text-black bg-slate-200 p-3 border border-gray-300 rounded-lg"
            defaultValue={lista.nivel}
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
            className="bg-colors-buttonColor text-white rounded-lg hover:bg-colors-buttonColorHover transition duration-300 px-3"
            type="submit"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}
