import { Tarjeta } from "@/app/lib/definitions";

interface TarjetaDetailProps {
  tarjeta: Tarjeta;
}

export const TarjetaDetail: React.FC<TarjetaDetailProps> = ({ tarjeta }) => (
  <div className="max-w-md mx-auto bg-white text-black rounded shadow-md p-5">
    <h3 className="text-3xl font-bold mb-4 text-center ">
      {tarjeta.palabra.toUpperCase()}
    </h3>

    {tarjeta.cat_gramatical && (
      <p className="text-sm font-semibold italic text-right mb-4">
        {tarjeta.cat_gramatical}
      </p>
    )}
    {tarjeta.pronunciacion && (
      <p className="text-sm italic text-right mb-4">
        /{tarjeta.pronunciacion}/
      </p>
    )}
    <hr className="border-t-2 border-colors-buttonColorHover my-2" />
    <p className="text-lg text-left mb-4">{tarjeta.traduccion}</p>
    {tarjeta.frase_ejemplo && (
      <p className="text-sm italic text-left mb-4">{tarjeta.frase_ejemplo}</p>
    )}
  </div>
);
