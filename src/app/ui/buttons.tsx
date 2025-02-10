import Link from "next/link";
import { eliminarLista } from "../lib/actions";
import { Trash2, Edit2 } from "lucide-react";

export function EditarListaBtn({ id }: { id: string }) {
  return (
    <Link
      href={`/listas/${id}/editar`}
      className="flex justify-between items-center bg-blue-500 hover:bg-blue-600 text-white p-2 my-2 rounded"
    >
      <span>Editar</span>
      <Edit2 className="w-4" />
    </Link>
  );
}

export function EliminarListaBtn({ id }: { id: string }) {
  const eliminarListaWithId = eliminarLista.bind(null, id);

  return (
    <form onClick={eliminarListaWithId}>
      <button
        type="submit"
        className="flex justify-between items-center bg-red-500 hover:bg-red-600 text-white p-2 my-2 rounded"
      >
        <span>Eliminar</span>
        <Trash2 className="w-4" />
      </button>
    </form>
  );
}
