import Link from "next/link";
import { Eye, Plus, BookOpenCheck } from "lucide-react";
import { fetchListas } from "../lib/data";
import { EditarListaBtn, EliminarListaBtn } from "../ui/buttons";

export default async function Listas() {
  const listas = await fetchListas();

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
                  <BookOpenCheck />
                </Link>
                {/* Editar detalles de la lista */}
                <EditarListaBtn id={lista.id} />

                {/* Borrar lista */}
                <EliminarListaBtn id={lista.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
