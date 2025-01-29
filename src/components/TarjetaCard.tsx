import { Pencil, Trash2 } from "lucide-react";
import { Tarjeta } from "@/app/lib/definitions";

interface TarjetaCardProps {
  tarjeta: Tarjeta;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TarjetaCard: React.FC<TarjetaCardProps> = ({
  tarjeta,
  onClick,
  onEdit,
  onDelete,
}) => (
  <li
    key={tarjeta.card_id}
    className="w-full max-w-sm bg-white text-black shadow-md p-4 cursor-pointer flex justify-between items-center"
    onClick={onClick}
  >
    <span className="text-xl font-semibold">
      {tarjeta.palabra.toUpperCase()}
    </span>
    <div className="flex gap-2">
      <button
        className="flex items-center bg-colors-buttonColor text-white py-2 px-4 rounded hover:bg-colors-buttonColorHover transition duration-300"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <Pencil className="mr-2" />
        Editar
      </button>
      <button
        className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="mr-2" />
        Eliminar
      </button>
    </div>
  </li>
);
