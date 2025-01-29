import { useEffect, useState } from "react";
import { crearTarjetaNueva } from "@/app/lib/actions";
import { Tarjeta } from "@/app/lib/definitions";

interface AddCardFormProps {
  listaId: string;
  tarjeta?: Tarjeta | null;
}

export const AddCardForm: React.FC<AddCardFormProps> = ({
  listaId,
  tarjeta,
}) => {
  const [formData, setFormData] = useState({
    palabra: "",
    traduccion: "",
    cat_gramatical: "",
    frase_ejemplo: "",
    pronunciacion: "",
    idioma: "",
  });

  useEffect(() => {
    if (tarjeta) {
      // si estamos editando, llenamos el formulario con los datos de la tarjeta
      setFormData({
        palabra: tarjeta.palabra,
        traduccion: tarjeta.traduccion,
        cat_gramatical: tarjeta.cat_gramatical || "",
        frase_ejemplo: tarjeta.frase_ejemplo || "",
        pronunciacion: tarjeta.pronunciacion || "",
        idioma: tarjeta.idioma,
      });
    } else {
      setFormData({
        palabra: "",
        traduccion: "",
        cat_gramatical: "",
        frase_ejemplo: "",
        pronunciacion: "",
        idioma: "",
      });
    }
  }, [tarjeta]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center gap-8 max-w-7xl mx-auto">
      <form
        action={crearTarjetaNueva}
        className="bg-white text-black rounded shadow-md p-5 mb-8 w-full max-w-md"
      >
        <input type="hidden" name="lista_id" value={listaId} />
        <h3 className="text-3xl font-bold mb-4 text-center">
          Añadir Nueva Tarjeta
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2" htmlFor="palabra">
            Palabra
          </label>
          <input
            type="text"
            id="palabra"
            name="palabra"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.palabra}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="traduccion"
          >
            Traducción
          </label>
          <input
            type="text"
            id="traduccion"
            name="traduccion"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.traduccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="cat_gramatical"
          >
            Categoría Gramatical
          </label>
          <input
            type="text"
            id="cat_gramatical"
            name="cat_gramatical"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.cat_gramatical}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="frase_ejemplo"
          >
            Frase de Ejemplo
          </label>
          <input
            type="text"
            id="frase_ejemplo"
            name="frase_ejemplo"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.frase_ejemplo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="pronunciacion"
          >
            Pronunciación
          </label>
          <input
            type="text"
            id="pronunciacion"
            name="pronunciacion"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.pronunciacion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2" htmlFor="idioma">
            Idioma
          </label>
          <input
            type="text"
            id="idioma"
            name="idioma"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.idioma}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-colors-buttonColor text-white py-2 px-6 rounded-md hover:bg-colors-buttonColorHover transition duration-300"
          >
            Añadir
          </button>
        </div>
      </form>

      <div className="max-w-md mx-auto bg-white text-black rounded shadow-md p-5 w-full h-[40vh] overflow-y-auto">
        <h3 className="text-3xl font-bold mb-4 text-center">
          {formData.palabra.toUpperCase()}
        </h3>

        {formData.cat_gramatical && (
          <p className="text-sm font-semibold italic text-right mb-4">
            {formData.cat_gramatical}
          </p>
        )}

        {formData.pronunciacion && (
          <p className="text-sm italic text-right mb-4">
            /{formData.pronunciacion}/
          </p>
        )}

        <hr className="border-t-2 border-colors-buttonColorHover my-2" />

        <p className="text-lg text-left mb-4">{formData.traduccion}</p>

        {formData.frase_ejemplo && (
          <p className="text-sm italic text-left mb-4">
            {formData.frase_ejemplo}
          </p>
        )}
      </div>
    </div>
  );
};
